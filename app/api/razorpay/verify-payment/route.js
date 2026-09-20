import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = await req.json();

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature
    const hmac = crypto.createHmac("sha256", key_secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed: Invalid signature" },
        { status: 400 }
      );
    }

    // Save to MongoDB
    await connectToDatabase();

    const orderId = orderDetails.orderId || `BD-${Date.now().toString().slice(-6)}`;

    const newOrder = await Order.create({
      orderId,
      customer: orderDetails.customer,
      items: orderDetails.items,
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount || 0,
      shippingFee: orderDetails.shippingFee || 0,
      total: orderDetails.total,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      orderStatus: "harvest_allocated",
    });

    // Send confirmation email asynchronously
    sendOrderConfirmationEmail(newOrder).catch((err) =>
      console.error("Order email error:", err)
    );

    return NextResponse.json({
      success: true,
      message: "Payment verified and order saved successfully",
      orderId: newOrder.orderId,
      order: newOrder,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
