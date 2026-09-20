import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    promoCodeIssued: { type: String, default: "BEEFIRST10" },
    source: { type: String, default: "footer_newsletter" },
  },
  { timestamps: true }
);

export default mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema);
