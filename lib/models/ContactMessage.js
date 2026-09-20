import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    inquiryType: {
      type: String,
      enum: ["order_inquiry", "sommelier_guidance", "nmr_certificate", "bulk_gifting", "apiculture_visit", "general"],
      default: "general",
    },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "in_review", "replied"], default: "unread" },
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);
