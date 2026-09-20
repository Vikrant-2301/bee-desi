import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/Order";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const order = await Order.findOne({
      $or: [
        { orderId: id.trim() },
        { orderId: id.trim().toUpperCase() },
        { "customer.phone": id.trim() },
      ],
    });

    if (!order) {
      return NextResponse.json({ error: "No order found with this reference" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Fetch single order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
