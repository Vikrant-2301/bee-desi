import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/Order";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query = searchParams.get("q");

    await connectToDatabase();

    let filter = {};
    if (status && status !== "all") {
      filter.orderStatus = status;
    }
    if (query) {
      filter.$or = [
        { orderId: { $regex: query, $options: "i" } },
        { "customer.name": { $regex: query, $options: "i" } },
        { "customer.email": { $regex: query, $options: "i" } },
        { "customer.phone": { $regex: query, $options: "i" } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Admin fetch orders error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { orderId, orderStatus, carrier, trackingNumber, estimatedDelivery, dispatchNotes } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    await connectToDatabase();

    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const updates = {};
    if (orderStatus) updates.orderStatus = orderStatus;
    if (carrier) updates.carrier = carrier;
    if (trackingNumber !== undefined) updates.trackingNumber = trackingNumber;
    if (estimatedDelivery) updates.estimatedDelivery = estimatedDelivery;
    if (dispatchNotes !== undefined) updates.dispatchNotes = dispatchNotes;

    // Append to timeline
    const timelineStep = {
      status: orderStatus || order.orderStatus,
      title:
        orderStatus === "placed"
          ? "Order Consecrated"
          : orderStatus === "harvest_allocated"
          ? "Harvest Batch Allocated & Sealed"
          : orderStatus === "inspected"
          ? "German Bruker NMR Inspection Complete"
          : orderStatus === "dispatched"
          ? "Dispatched via Temperature-Controlled Transit"
          : orderStatus === "delivered"
          ? "Delivered to Customer Doorstep"
          : "Order Status Updated",
      description:
        dispatchNotes ||
        `Carrier: ${carrier || order.carrier || "BlueDart Express"} | Tracking: ${
          trackingNumber || order.trackingNumber || "Pending"
        }`,
      timestamp: new Date(),
      completed: true,
    };

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      {
        $set: updates,
        $push: { timeline: timelineStep },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: `Order #${orderId} status updated to ${orderStatus}`,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Admin update order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}
