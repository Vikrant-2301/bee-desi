import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/lib/models/Product";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    let dbProducts = await Product.find({}).sort({ createdAt: -1 }).lean();

    // If database is empty, seed it with PRODUCTS
    if (!dbProducts || dbProducts.length === 0) {
      const seedData = PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle || "",
        tag: p.tag || "",
        vintage: p.vintage || "Monsoon Harvest 2026",
        batchCode: p.batchCode || "BD-2026-01",
        biome: p.biome || "Deciduous Forest",
        terroir: p.terroir || "Balaghat Reserve",
        elevation: p.elevation || "680m MSL",
        ayurvedicBenefit: p.ayurvedicBenefit || "Diabetes & Agni",
        crystallization: p.crystallization || "Liquid Amber",
        rating: p.rating || 4.9,
        reviewsCount: p.reviewsCount || 85,
        basePrice: p.basePrice || 690,
        variants: p.variants || [{ size: "350g", label: "350g Amber Glass Jar", price: p.basePrice || 690, sku: `${p.id}-350` }],
        image: p.image || "/images/bee_desi_hero_custom.png",
        secondaryImage: p.secondaryImage || "",
        inStock: true,
        stockCount: 120,
        featured: p.id === "wild-raw-jamun",
        description: p.description || "100% Raw unheated single-flora artisanal honey.",
      }));

      await Product.insertMany(seedData);
      dbProducts = await Product.find({}).sort({ createdAt: -1 }).lean();
    }

    // Merge any rich local fields from PRODUCTS (gallery, sensoryRadar, metrics) if not present in DB
    const mergedProducts = dbProducts.map((dbP) => {
      const localP = PRODUCTS.find((p) => p.id === dbP.id || p.slug === dbP.slug) || {};
      const basePrice = dbP.basePrice || localP.basePrice || 690;

      const rawVariants = (dbP.variants && dbP.variants.length > 0) ? dbP.variants : (localP.variants || [
        { size: "350g", label: "350g Amber Glass Jar", price: basePrice, sku: `${dbP.id || "bee"}-350` }
      ]);

      const variants = rawVariants.map((v, idx) => {
        if (idx === 0 && dbP.basePrice) {
          return { ...v, price: Number(dbP.basePrice) };
        }
        return v;
      });

      const inStock = dbP.inStock !== undefined 
        ? Boolean(dbP.inStock) && (dbP.stockCount === undefined || Number(dbP.stockCount) > 0)
        : (dbP.stockCount === undefined || Number(dbP.stockCount) > 0);

      return {
        ...localP,
        ...dbP,
        basePrice,
        inStock,
        stockCount: dbP.stockCount !== undefined ? Number(dbP.stockCount) : 100,
        variants,
      };
    });

    return NextResponse.json({
      success: true,
      count: mergedProducts.length,
      products: mergedProducts,
    });
  } catch (error) {
    console.error("Public fetch products error:", error);
    // Graceful fallback to static PRODUCTS if DB connection is temporarily unavailable
    return NextResponse.json({
      success: true,
      count: PRODUCTS.length,
      products: PRODUCTS,
      fromFallback: true,
    });
  }
}
