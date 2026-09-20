import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/Order";
import { sendOrderConfirmationEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { orderDetails } = await req.json();

    if (!orderDetails || !orderDetails.customer || !orderDetails.items?.length) {
      return NextResponse.json({ error: "Invalid order details" }, { status: 400 });
    }

    await connectToDatabase();

    const orderId = orderDetails.orderId || `BD-COD-${Date.now().toString().slice(-6)}`;

    const newOrder = await Order.create({
      orderId,
      customer: orderDetails.customer,
      items: orderDetails.items,
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount || 0,
      shippingFee: orderDetails.shippingFee || 0,
      total: orderDetails.total,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    // Send confirmation email asynchronously
    sendOrderConfirmationEmail(newOrder).catch((err) =>
      console.error("Order email error:", err)
    );

    return NextResponse.json({
      success: true,
      orderId: newOrder.orderId,
      order: newOrder,
    });
  } catch (error) {
    console.error("COD order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create COD order" },
      { status: 500 }
    );
  }
}
