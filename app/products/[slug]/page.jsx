"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { PRODUCTS, BATCH_DATABASE } from "@/data/products";
import {
  FiShoppingBag,
  FiHeart,
  FiShield,
  FiAward,
  FiTruck,
  FiCheck,
  FiStar,
  FiCheckCircle,
  FiMap,
  FiDroplet,
  FiZap,
  FiClock,
  FiPackage,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const SensoryDot = ({ value, max = 5 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all ${
          i < value
            ? "bg-amber-radiance scale-100"
            : "bg-outline-variant/40 scale-90"
        }`}
      />
    ))}
  </div>
);

const AccordionSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-outline-variant/30 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-container-low/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-3 font-serif text-lg font-bold text-propolis-charcoal">
          {Icon && <Icon className="text-amber-radiance text-xl" />}
          {title}
        </span>
        {open ? (
          <FiChevronUp className="text-amber-radiance flex-shrink-0" />
        ) : (
          <FiChevronDown className="text-on-surface-variant flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed font-sans border-t border-outline-variant/20">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default function ProductPage({ params }) {
  const slug = params?.slug;

  const router = useRouter();
  const { addToCart, openNMRLookup, wishlist, toggleWishlist, showToast } =
    useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (!product) {
      router.push("/#catalog");
    }
  }, [product, router]);

  if (!product) return null;

  const isWishlisted = wishlist.some((w) => w.id === product.id);
  const batchData = BATCH_DATABASE[product.batchCode];
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    addToCart(product, selectedVariant, quantity);
    showToast(`${product.name} (${selectedVariant.size}) added to harvest basket!`);
    await new Promise((r) => setTimeout(r, 600));
    setAddingToCart(false);
  };

  const galleryImages = [
    product.image,
    ...(product.gallery || []).slice(1),
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />
      <Toast />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-amber-deep transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/#catalog"
              className="hover:text-amber-deep transition-colors"
            >
              Honey Collection
            </Link>
            <span>/</span>
            <span className="text-propolis-charcoal font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Hero Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-container-low border border-amber-radiance/20 shadow-honey-lg group">
                <img
                  src={galleryImages[activeImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-propolis-charcoal/90 text-golden-nectar text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                    {product.tag}
                  </span>
                  {product.isBundle && (
                    <span className="px-3 py-1 bg-amber-radiance text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Gift Bundle
                    </span>
                  )}
                </div>
                {/* Wishlist btn */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-radiance/20 hover:bg-amber-radiance/10 transition-all shadow-sm"
                  aria-label="Toggle wishlist"
                >
                  <FiHeart
                    className={
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-on-surface-variant"
                    }
                  />
                </button>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i
                          ? "border-amber-radiance shadow-honey"
                          : "border-outline-variant/30 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* NMR Trust Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-emerald-700 text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Bruker 400MHz 1H-NMR Certified
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Batch {product.batchCode} • 0.00% Synthetic Syrups Detected
                  </p>
                </div>
                <button
                  onClick={() => openNMRLookup(product.batchCode)}
                  className="text-[10px] font-bold text-emerald-700 hover:underline whitespace-nowrap flex-shrink-0"
                >
                  View Lab →
                </button>
              </div>
            </div>

            {/* Right: Product Info & Purchase */}
            <div className="flex flex-col gap-6">
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-deep bg-amber-radiance/10 px-3 py-1 rounded-full border border-amber-radiance/25">
                    {product.biome}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-flora-sage bg-flora-sage-light px-3 py-1 rounded-full">
                    {product.vintage}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-bold text-propolis-charcoal leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-base text-on-surface-variant font-sans">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-radiance text-amber-radiance"
                            : "text-outline-variant"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-propolis-charcoal">
                    {product.rating}
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    ({product.reviewsCount} verified tasters)
                  </span>
                </div>
              </div>

              {/* Sensory Profile */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Sensory Profile
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-on-surface-variant">Sweetness</span>
                    <SensoryDot value={product.sensoryRadar.sweetness} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-on-surface-variant">Viscosity</span>
                    <SensoryDot value={product.sensoryRadar.viscosity} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-on-surface-variant">Floral Aroma</span>
                    <SensoryDot value={product.sensoryRadar.floral} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-on-surface-variant">Tannic Depth</span>
                    <SensoryDot value={product.sensoryRadar.tannicDepth} />
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant italic mt-3 pt-3 border-t border-outline-variant/20">
                  "{product.sensoryNotes}"
                </p>
              </div>

              {/* Variant Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Select Size
                  </h3>
                  <span className="text-xs text-amber-deep font-semibold">
                    From ₹{product.basePrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex flex-col items-center px-4 py-2.5 rounded-xl border-2 transition-all text-xs font-bold btn-tactile ${
                        selectedVariant?.sku === v.sku
                          ? "border-amber-radiance bg-amber-radiance/10 text-propolis-charcoal shadow-sm"
                          : "border-outline-variant/40 text-on-surface-variant hover:border-amber-radiance/50"
                      }`}
                    >
                      <span className="font-serif text-base font-bold">
                        {v.size}
                      </span>
                      <span className="font-mono text-[11px] mt-0.5">
                        ₹{v.price.toLocaleString("en-IN")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Price */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant w-20">
                  Quantity
                </span>
                <div className="flex items-center border border-outline-variant/40 bg-surface rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-base font-bold text-on-surface hover:bg-surface-container transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-sm font-bold font-mono min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-base font-bold text-on-surface hover:bg-surface-container transition-colors"
                  >
                    +
                  </button>
                </div>
                {selectedVariant && (
                  <span className="text-xl font-serif font-bold text-propolis-charcoal">
                    ₹{(selectedVariant.price * quantity).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-honey btn-tactile disabled:opacity-60"
                >
                  {addingToCart ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Adding to Basket...</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="text-lg" />
                      <span>Add to Harvest Basket</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    addToCart(product, selectedVariant, quantity);
                    router.push("/checkout");
                  }}
                  className="w-full flex items-center justify-center gap-2.5 bg-propolis-charcoal text-honeycomb-cream py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-primary transition-all btn-tactile"
                >
                  <FiZap className="text-golden-nectar" />
                  <span>Buy Now — Secure Checkout</span>
                </button>
              </div>

              {/* Trust Seals */}
              <div className="grid grid-cols-3 gap-3 text-[11px] text-on-surface-variant">
                <div className="flex flex-col items-center gap-1 text-center p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <FiTruck className="text-amber-radiance text-lg" />
                  <span className="font-semibold">Free Delivery</span>
                  <span>on ₹999+</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <FiShield className="text-emerald-600 text-lg" />
                  <span className="font-semibold">NMR Certified</span>
                  <span>0% Adulterants</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <FiPackage className="text-amber-radiance text-lg" />
                  <span className="font-semibold">Cold-Chain</span>
                  <span>Delivery</span>
                </div>
              </div>

              {/* Delivery note */}
              <div className="p-4 rounded-2xl bg-propolis-charcoal text-honeycomb-cream/90 flex items-start gap-3">
                <FiClock className="text-golden-nectar text-xl flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-honeycomb-cream">
                    Order before 2 PM for same-day cold-chain dispatch.
                  </p>
                  <p className="text-honeycomb-cream/70 mt-1">
                    Express delivery 2–4 business days across India. GST invoice
                    included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info Accordion */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccordionSection title="Origin & Terroir" icon={FiMap} defaultOpen={true}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-deep mb-0.5">Terroir</p>
                  <p>{product.terroir}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-deep mb-0.5">Elevation</p>
                  <p>{product.elevation}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-deep mb-0.5">Biome</p>
                  <p>{product.biome}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-deep mb-0.5">Vintage</p>
                  <p>{product.vintage}</p>
                </div>
                {batchData && (
                  <>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase font-bold text-amber-deep mb-0.5">Forager Community</p>
                      <p>{batchData.foragerTribe}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase font-bold text-amber-deep mb-0.5">Native Bee Species</p>
                      <p>{batchData.beeSpecies}</p>
                    </div>
                  </>
                )}
              </div>
              <p className="mt-4 pt-4 border-t border-outline-variant/20 text-sm">
                {product.description}
              </p>
            </AccordionSection>

            <AccordionSection title="NMR Purity Analysis" icon={FiShield} defaultOpen={true}>
              {batchData ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <FiCheckCircle className="text-emerald-600 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-900 text-xs">{batchData.nmrTestStatus}</p>
                      <p className="text-[10px] text-emerald-800">{batchData.laboratory}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[10px] font-bold text-amber-deep uppercase">Diastase Activity</p>
                      <p className="font-semibold">{batchData.diastaseActivity}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-deep uppercase">Moisture</p>
                      <p className="font-semibold">{batchData.moistureContent}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-deep uppercase">C4 Adulteration</p>
                      <p className="font-bold text-emerald-700">{batchData.c4Adulteration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-deep uppercase">HMF Score</p>
                      <p className="font-semibold">{batchData.hmfScore}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openNMRLookup(product.batchCode)}
                    className="text-xs text-amber-deep font-bold hover:underline text-left"
                  >
                    → View Full Spectrogram — Batch #{product.batchCode}
                  </button>
                </div>
              ) : (
                <p className="text-sm">Batch code: {product.batchCode}</p>
              )}
            </AccordionSection>

            <AccordionSection title="Ayurvedic Ritual & Usage" icon={FiDroplet}>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-amber-deep uppercase mb-1">Recommended Benefit</p>
                  <p className="font-semibold text-propolis-charcoal">{product.ayurvedicBenefit}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-deep uppercase mb-1">Ritual Instructions</p>
                  <p>{product.ayurvedicRitual}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-[10px] font-bold text-amber-deep uppercase mb-1">⚠ Important</p>
                  <p className="text-xs">Never expose raw honey to temperatures above 40°C. Always use wooden or ceramic spoon — metal oxidises delicate enzymes.</p>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection title="Ethical Sourcing & Impact" icon={FiAward}>
              <div className="space-y-3 text-sm">
                <p>{product.ethicalNote}</p>
                {batchData && (
                  <div className="p-3 bg-amber-radiance/10 rounded-xl border border-amber-radiance/20">
                    <p className="text-[10px] font-bold text-amber-deep uppercase mb-1">Direct Fair Wage</p>
                    <p className="font-bold text-propolis-charcoal">{batchData.fairWage}</p>
                    <p className="text-[11px] mt-1 text-on-surface-variant">1.8× standard mandi rates. No middlemen. Direct digital transfer to tribal communities.</p>
                  </div>
                )}
                <div className="flex flex-col gap-2 text-[11px]">
                  <div className="flex items-center gap-2"><FiCheck className="text-emerald-600 flex-shrink-0" /><span>40% hive comb preserved for colony health</span></div>
                  <div className="flex items-center gap-2"><FiCheck className="text-emerald-600 flex-shrink-0" /><span>Non-migratory, forest-native apiculture only</span></div>
                  <div className="flex items-center gap-2"><FiCheck className="text-emerald-600 flex-shrink-0" /><span>ISO/IEC 17025 certified laboratory testing</span></div>
                </div>
              </div>
            </AccordionSection>
          </div>
        </section>

        {/* Related Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="border-t border-outline-variant/20 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl font-bold text-propolis-charcoal">
                You May Also Savour
              </h2>
              <Link
                href="/#catalog"
                className="text-xs font-bold text-amber-deep hover:underline uppercase tracking-wider"
              >
                View All Nectars →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-amber-radiance/40 hover:shadow-honey transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-surface-container-low">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-deep">
                      {p.biome}
                    </span>
                    <h3 className="font-serif text-base font-bold text-propolis-charcoal mt-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {p.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-serif font-bold text-propolis-charcoal">
                        ₹{p.basePrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold text-amber-deep group-hover:underline">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}