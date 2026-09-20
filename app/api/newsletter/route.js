import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Newsletter from "@/lib/models/Newsletter";
import { sendNewsletterWelcomeEmail } from "@/lib/mailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await Newsletter.findOne({ email });
    const promoCode = "BEEFIRST10";

    if (!existing) {
      await Newsletter.create({
        email,
        promoCodeIssued: promoCode,
        source: "footer_newsletter",
      });

      sendNewsletterWelcomeEmail(email, promoCode).catch((err) =>
        console.error("Newsletter email error:", err)
      );
    }

    return NextResponse.json({
      success: true,
      message: "Welcome to the Bee Desi Harvest Guild! Check your inbox for your 10% voucher.",
      promoCode,
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
