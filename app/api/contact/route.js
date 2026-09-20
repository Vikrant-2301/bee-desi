import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";
import { sendContactNotificationEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiryType, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const savedMessage = await ContactMessage.create({
      name,
      email,
      phone,
      inquiryType: inquiryType || "general",
      subject: subject || `Inquiry from ${name}`,
      message,
      status: "unread",
    });

    // Send email notification to Admin & Confirmation to user
    sendContactNotificationEmail({
      name,
      email,
      phone,
      inquiryType,
      subject,
      message,
    }).catch((err) => console.error("Contact email error:", err));

    return NextResponse.json({
      success: true,
      message: "Your message has been received by our apiary team. We will get back to you shortly!",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
