import mongoose from "mongoose";

const ProductVariantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  label: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String },
});

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    subtitle: { type: String, default: "" },
    tag: { type: String, default: "" },
    vintage: { type: String, default: "Spring 2026 Harvest" },
    batchCode: { type: String, default: "BD-JAMUN-2026" },
    biome: { type: String, default: "Deciduous Forest" },
    terroir: { type: String, default: "Balaghat Canopy" },
    elevation: { type: String, default: "680m MSL" },
    ayurvedicBenefit: { type: String, default: "Immune Radiance" },
    crystallization: { type: String, default: "Liquid Amber" },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 48 },
    basePrice: { type: Number, required: true },
    variants: [ProductVariantSchema],
    image: { type: String, required: true },
    secondaryImage: { type: String },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 150 },
    featured: { type: Boolean, default: false },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
