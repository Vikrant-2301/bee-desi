import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/lib/models/Product";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    let products = await Product.find({}).sort({ createdAt: -1 });

    // Auto-seed if database doesn't have products yet
    if (products.length === 0) {
      const seedData = PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle,
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
        variants: p.variants || [{ size: "350g", label: "350g Jar", price: p.basePrice || 690 }],
        image: p.image || "/images/bee_desi_hero_custom.png",
        secondaryImage: p.secondaryImage || "",
        inStock: true,
        stockCount: 120,
        featured: p.id === "wild-raw-jamun",
        description: p.description || "100% Raw unheated single-flora artisanal honey.",
      }));

      await Product.insertMany(seedData);
      products = await Product.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("Admin fetch products error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      subtitle,
      tag,
      vintage,
      batchCode,
      biome,
      terroir,
      elevation,
      basePrice,
      image,
      stockCount,
      ayurvedicBenefit,
    } = body;

    if (!name || !basePrice) {
      return NextResponse.json({ error: "Product name and price are required" }, { status: 400 });
    }

    await connectToDatabase();

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + `-${Date.now().toString().slice(-4)}`;
    const slug = id;

    const newProduct = await Product.create({
      id,
      slug,
      name,
      subtitle: subtitle || "Single-Origin Micro-Harvest",
      tag: tag || "Artisanal Reserve",
      vintage: vintage || "Harvest 2026",
      batchCode: batchCode || `BD-${Date.now().toString().slice(-4)}`,
      biome: biome || "Sub-Himalayan Canopy",
      terroir: terroir || "India Forest Reserve",
      elevation: elevation || "800m MSL",
      basePrice: Number(basePrice),
      variants: [
        { size: "350g", label: "350g Amber Glass Jar", price: Number(basePrice), sku: `${id}-350` },
        { size: "500g", label: "500g Table Flacon", price: Math.round(Number(basePrice) * 1.35), sku: `${id}-500` },
      ],
      image: image || "https://lh3.googleusercontent.com/aida-public/AB6AXuB8AJWP0gOrG-DxlXi-aooMbeb-XWif2RRWuRUzgHz4g0gPJqkgUhEN7cy2QDLUBjd843kbbEdC61RqZSVsurFhjiwnUR-F_ahqe1oTLGXRgtmN2BaDZgtGAx0TWzELr14bHA2meR3h_5fWP4q9m6OwpKxlUDu1wSphSFdCmx9XqZwBWJXNYbTTb0hsPnGsCRO6fkzFIXYgYCx5j9EBZuxz3TOExNtmdD41ClqtcqPX7ScObd4TUVsN",
      inStock: true,
      stockCount: Number(stockCount) || 100,
      ayurvedicBenefit: ayurvedicBenefit || "Immune Radiance & Agni",
      rating: 5.0,
      reviewsCount: 1,
    });

    return NextResponse.json({
      success: true,
      message: "New honey harvest vintage consecrated successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Admin add product error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, basePrice, inStock, stockCount, tag, batchCode } = body;

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    await connectToDatabase();

    const updates = {};
    if (basePrice !== undefined) updates.basePrice = Number(basePrice);
    if (inStock !== undefined) updates.inStock = Boolean(inStock);
    if (stockCount !== undefined) updates.stockCount = Number(stockCount);
    if (tag !== undefined) updates.tag = tag;
    if (batchCode !== undefined) updates.batchCode = batchCode;

    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Product ${updatedProduct.name} updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Admin update product error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}
