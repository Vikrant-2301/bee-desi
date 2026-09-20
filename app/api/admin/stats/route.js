import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";
import ContactMessage from "@/lib/models/ContactMessage";
import Newsletter from "@/lib/models/Newsletter";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    const [orders, userCount, messageCount, subscriberCount] = await Promise.all([
      Order.find({}),
      User.countDocuments({}),
      ContactMessage.countDocuments({ status: "unread" }),
      Newsletter.countDocuments({}),
    ]);

    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "paid" || o.orderStatus === "delivered")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const activeShipments = orders.filter(
      (o) => o.orderStatus === "harvest_allocated" || o.orderStatus === "inspected" || o.orderStatus === "dispatched"
    ).length;

    const deliveredCount = orders.filter((o) => o.orderStatus === "delivered").length;
    const placedCount = orders.filter((o) => o.orderStatus === "placed").length;

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        activeShipments,
        deliveredCount,
        placedCount,
        userCount,
        unreadMessages: messageCount,
        subscriberCount,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
