import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "kingsaksham90@gmail.com",
    pass: process.env.SMTP_PASS || "qsfb olzy fybn skjg",
  },
});

export async function sendOrderConfirmationEmail(order) {
  try {
    const itemsHtml = order.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #eae3d2;">
        <td style="padding: 12px 8px; color: #1c1c17; font-size: 14px;">
          <strong>${item.name}</strong><br/>
          <span style="color: #864f00; font-size: 12px;">Size: ${item.size} | Batch: ${item.batchCode || "N/A"}</span>
        </td>
        <td style="padding: 12px 8px; text-align: center; color: #524437; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; color: #1c1c17; font-weight: bold; font-size: 14px;">₹${item.price * item.quantity}</td>
      </tr>
    `
      )
      .join("");

    const emailContent = `
      <div style="background-color: #fdf9f1; padding: 40px 20px; font-family: 'Georgia', serif; color: #1c1c17;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e7d8bf; box-shadow: 0 10px 30px rgba(134,79,0,0.08);">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #1b1411 0%, #2b1a12 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #f5bd47;">
            <h1 style="margin: 0; color: #f5bd47; font-size: 28px; letter-spacing: 2px; font-weight: normal;">BEE DESI</h1>
            <p style="margin: 6px 0 0 0; color: #fdf9f2; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Artisanal Native Indian Apiaries</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 28px;">
            <div style="display: inline-block; background-color: #f5efe4; color: #864f00; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 16px;">
              ✓ NMR Pure Certified Harvest Confirmed
            </div>
            
            <h2 style="font-size: 22px; color: #1b1411; margin-top: 0;">Namaste ${order.customer.name},</h2>
            <p style="color: #524437; font-size: 15px; line-height: 1.6; font-family: sans-serif;">
              Your order of unheated, single-flora wild honey has been consecrated for allocation at our forest apiaries. We harvest with reverence for native bees (<em>Apis Cerana Indica</em>) and strictly test every harvest via Bruker 400MHz 1H-NMR.
            </p>

            <div style="background: #faf7f2; border-left: 4px solid #f5bd47; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 13px; font-family: sans-serif; color: #3b2c21;">
                <strong>Order Reference:</strong> <span style="font-family: monospace; font-size: 14px; color: #864f00;">#${order.orderId}</span><br/>
                <strong>Payment Mode:</strong> ${order.paymentMethod === "razorpay" ? "Razorpay Online (Paid)" : "Cash On Delivery"}<br/>
                <strong>Dispatch Address:</strong> ${order.customer.address}, ${order.customer.city} ${order.customer.pincode}
              </p>
            </div>

            <!-- Items Table -->
            <table style="width: 100%; border-collapse: collapse; margin-top: 24px; font-family: sans-serif;">
              <thead>
                <tr style="border-bottom: 2px solid #1b1411; background: #faf5eb;">
                  <th style="padding: 10px 8px; text-align: left; font-size: 12px; text-transform: uppercase; color: #1b1411;">Floral Harvest</th>
                  <th style="padding: 10px 8px; text-align: center; font-size: 12px; text-transform: uppercase; color: #1b1411;">Qty</th>
                  <th style="padding: 10px 8px; text-align: right; font-size: 12px; text-transform: uppercase; color: #1b1411;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Total Calculation -->
            <div style="margin-top: 24px; border-top: 2px solid #eae3d2; padding-top: 14px; font-family: sans-serif;">
              <div style="display: flex; justify-content: space-between; font-size: 14px; color: #524437; margin-bottom: 6px;">
                <span>Subtotal:</span>
                <span style="font-weight: bold; color: #1b1411;">₹${order.subtotal}</span>
              </div>
              ${
                order.discount > 0
                  ? `<div style="display: flex; justify-content: space-between; font-size: 14px; color: #2e7d32; margin-bottom: 6px;">
                      <span>Harvest Guild Discount:</span>
                      <span>-₹${order.discount}</span>
                    </div>`
                  : ""
              }
              <div style="display: flex; justify-content: space-between; font-size: 14px; color: #524437; margin-bottom: 8px;">
                <span>Forest Cold-Chain Dispatch:</span>
                <span>${order.shippingFee === 0 ? "Complimentary (FREE)" : `₹${order.shippingFee}`}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #1b1411; border-top: 1px solid #1b1411; padding-top: 10px;">
                <span>Total Amount:</span>
                <span style="color: #864f00;">₹${order.total}</span>
              </div>
            </div>

            <!-- Ritual Note -->
            <div style="margin-top: 32px; background: #fff8eb; border: 1px dashed #f5bd47; padding: 18px; border-radius: 12px; font-size: 13px; color: #524437; font-family: sans-serif;">
              <strong style="color: #864f00; display: block; margin-bottom: 6px;">Ayurvedic Storage Ritual:</strong>
              Do not refrigerate. Raw honey never expires. Should gentle crystallization occur, place the amber jar in warm sun or tepid water (under 40°C) to preserve live diastase enzymes.
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #1b1411; color: #e6e2da; padding: 20px; text-align: center; font-size: 11px; font-family: sans-serif;">
            <p style="margin: 0;">© 2026 Bee Desi Artisanal Apiaries. Sourced with Baiga & Mawali Forest Collectives.</p>
            <p style="margin: 4px 0 0 0; color: #f5bd47;">Intertek & Bruker 400MHz 1H-NMR Certified Purity</p>
          </div>
        </div>
      </div>
    `;

    return await transporter.sendMail({
      from: `"Bee Desi Apiaries" <${process.env.SMTP_USER || "kingsaksham90@gmail.com"}>`,
      to: order.customer.email,
      bcc: process.env.SMTP_USER || "kingsaksham90@gmail.com",
      subject: `Harvest Allocation Confirmed: Order #${order.orderId} [Bee Desi]`,
      html: emailContent,
    });
  } catch (error) {
    console.error("Failed to send order email:", error);
    return null;
  }
}

export async function sendContactNotificationEmail(messageData) {
  try {
    const adminEmail = process.env.SMTP_USER || "kingsaksham90@gmail.com";

    // 1. Send alert to Admin
    await transporter.sendMail({
      from: `"Bee Desi Inquiries" <${adminEmail}>`,
      to: adminEmail,
      subject: `[New Inquiry] ${messageData.subject || "Customer Message"} from ${messageData.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #fdf9f1; color: #1c1c17;">
          <h2 style="color: #864f00;">New Customer Message Received</h2>
          <p><strong>Name:</strong> ${messageData.name}</p>
          <p><strong>Email:</strong> ${messageData.email}</p>
          <p><strong>Phone:</strong> ${messageData.phone || "Not provided"}</p>
          <p><strong>Inquiry Type:</strong> ${messageData.inquiryType || "General"}</p>
          <p><strong>Subject:</strong> ${messageData.subject}</p>
          <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #d7c3b2; margin-top: 10px;">
            <p style="white-space: pre-line; margin: 0;">${messageData.message}</p>
          </div>
        </div>
      `,
    });

    // 2. Send acknowledgement to Customer
    await transporter.sendMail({
      from: `"Bee Desi Concierge" <${adminEmail}>`,
      to: messageData.email,
      subject: `We have received your message — Bee Desi Artisanal Apiaries`,
      html: `
        <div style="font-family: 'Georgia', serif; padding: 30px; background: #fdf9f1; color: #1c1c17;">
          <div style="max-width: 550px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #e7d8bf;">
            <h2 style="color: #864f00; margin-top: 0;">Namaste ${messageData.name},</h2>
            <p style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #524437;">
              Thank you for reaching out to the Bee Desi Apiary Concierge. Our sommelier and harvest team have received your note regarding <strong>"${messageData.subject || messageData.inquiryType}"</strong>.
            </p>
            <p style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #524437;">
              We take utmost care in personally answering every question about our single-flora vintages, Bruker NMR purity testing, and ethical tribal beekeeping. A member of our team will reply within 12–24 hours.
            </p>
            <div style="border-top: 1px solid #f5efe4; margin-top: 20px; padding-top: 14px; font-size: 12px; color: #864f00;">
              Bee Desi Concierge & Sommelier Guild • Kashmir & Balaghat
            </div>
          </div>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Failed to send contact emails:", error);
    return false;
  }
}

export async function sendNewsletterWelcomeEmail(email, promoCode = "BEEFIRST10") {
  try {
    const adminEmail = process.env.SMTP_USER || "kingsaksham90@gmail.com";
    return await transporter.sendMail({
      from: `"Bee Desi Apiaries" <${adminEmail}>`,
      to: email,
      subject: `Welcome to the Bee Desi Harvest Guild (Enjoy 10% Off)`,
      html: `
        <div style="font-family: 'Georgia', serif; padding: 30px; background: #fdf9f1; color: #1c1c17;">
          <div style="max-width: 550px; margin: 0 auto; background: #fff; border-radius: 14px; padding: 28px; border: 1px solid #e7d8bf; text-align: center;">
            <h1 style="color: #864f00; letter-spacing: 2px; margin: 0 0 10px 0;">BEE DESI</h1>
            <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #b45309; margin: 0 0 20px 0;">Artisanal Apiculture Guild</p>
            <h2 style="font-size: 20px; color: #1b1411; margin: 0 0 12px 0;">Welcome to Rare Indian Terroirs</h2>
            <p style="font-family: sans-serif; font-size: 14px; color: #524437; line-height: 1.6; margin: 0 0 24px 0;">
              As a member of our Harvest Guild, you receive private access to new single-flora seasonal micro-extractions before public allocation.
            </p>
            <div style="background: #faf5eb; border: 2px dashed #f5bd47; padding: 16px; border-radius: 10px; display: inline-block; margin-bottom: 24px;">
              <span style="font-size: 12px; color: #71594f; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Your First Harvest Voucher</span>
              <span style="font-family: monospace; font-size: 22px; font-weight: bold; color: #864f00; letter-spacing: 3px;">${promoCode}</span>
            </div>
            <p style="font-family: sans-serif; font-size: 12px; color: #857465; margin: 0;">
              Apply at checkout for 10% off any single-origin jar or terroir flight.
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send newsletter email:", error);
    return false;
  }
}
