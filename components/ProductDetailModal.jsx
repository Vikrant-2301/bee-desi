"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  FiX,
  FiCheck,
  FiShoppingBag,
  FiStar,
  FiMapPin,
  FiShield,
  FiActivity,
  FiHeart,
  FiAlertCircle,
  FiSun,
  FiClock,
  FiDroplet
} from "react-icons/fi";

export default function ProductDetailModal() {
  const {
    selectedProductForModal,
    closeProductModal,
    addToCart,
    wishlist,
    toggleWishlist,
    openNMRLookup
  } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview"); // overview, laboratory, ayurveda, provenance

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isWishlisted = wishlist.includes(product.id);
  const gallery = product.gallery || [product.image];

  const handleAddToCart = () => {
    addToCart(product, currentVariant, quantity);
    closeProductModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] overflow-y-auto bg-propolis-charcoal/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* Backdrop Dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          className="fixed inset-0"
        />

        {/* Modal Container (Apple-style spring scale) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-5xl bg-surface rounded-2xl shadow-honey-lg border border-primary/20 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Sticky Bar with Close */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-outline-variant/30 bg-surface-container-low/90 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>BATCH CERTIFIED • {product.batchCode || "BD-2026"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-9 h-9 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors btn-tactile"
              >
                <FiHeart className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
              </button>
              <button
                onClick={closeProductModal}
                className="w-9 h-9 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors btn-tactile"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Column: Media Gallery (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant/30 shadow-inner">
                  <img
                    src={gallery[selectedImageIndex] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-3 glass-pill px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {product.terroir}
                  </div>
                </div>

                {/* Thumbnails */}
                {gallery.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all btn-tactile ${
                          selectedImageIndex === i
                            ? "border-primary shadow-sm scale-105"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Key Laboratory Highlights Box */}
                <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-propolis-charcoal">
                    <span className="flex items-center gap-1.5">
                      <FiActivity className="text-primary" />
                      Laboratory Certified Markers
                    </span>
                    <button
                      onClick={() => {
                        closeProductModal();
                        openNMRLookup(product.batchCode);
                      }}
                      className="text-primary hover:underline text-[11px] font-semibold"
                    >
                      View Spectrogram →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-surface p-2 rounded-lg">
                      <span className="text-[10px] text-outline block">Diastase Enzyme</span>
                      <strong className="text-propolis-charcoal">{product.metrics?.diastase || "18.4+ DN"}</strong>
                    </div>
                    <div className="bg-surface p-2 rounded-lg">
                      <span className="text-[10px] text-outline block">Natural Moisture</span>
                      <strong className="text-propolis-charcoal">{product.metrics?.moisture || "<17%"}</strong>
                    </div>
                    <div className="bg-surface p-2 rounded-lg">
                      <span className="text-[10px] text-outline block">C4 Added Sugars</span>
                      <strong className="text-emerald-700">0.00% (Negative)</strong>
                    </div>
                    <div className="bg-surface p-2 rounded-lg">
                      <span className="text-[10px] text-outline block">Thermal Processing</span>
                      <strong className="text-emerald-700">100% Unheated / Raw</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative, Variants & Actions (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {/* Header Information */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-1">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-golden-nectar fill-golden-nectar text-xs" />
                      <span className="font-bold text-propolis-charcoal">{product.rating}</span>
                      <span className="text-outline">({product.reviewsCount} verified reviews)</span>
                    </div>
                    <span className="opacity-40">•</span>
                    <span className="text-primary font-semibold">{product.biome}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-primary font-semibold mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 bg-surface-container-low/60 p-3 rounded-xl border border-outline-variant/20">
                  <span className="font-serif text-3xl font-bold text-propolis-charcoal">
                    ₹{currentVariant.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    / {currentVariant.size} ({currentVariant.label})
                  </span>
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    In Stock • Raw Vintage
                  </span>
                </div>

                {/* Vessel Variant Switcher */}
                {product.variants.length > 1 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-propolis-charcoal">
                      Select Vessel Format:
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {product.variants.map((variant, i) => (
                        <button
                          key={variant.sku || i}
                          onClick={() => setSelectedVariantIndex(i)}
                          className={`p-2.5 rounded-xl text-left border transition-all btn-tactile ${
                            selectedVariantIndex === i
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-outline-variant/30 hover:border-primary/50 bg-surface"
                          }`}
                        >
                          <span className="block text-xs font-bold text-propolis-charcoal">
                            {variant.size}
                          </span>
                          <span className="text-[11px] text-primary font-semibold">
                            ₹{variant.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Navigation for Detailed Sections */}
                <div className="flex border-b border-outline-variant/30 gap-6 text-xs font-bold pt-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-2 transition-all relative ${
                      activeTab === "overview"
                        ? "text-primary border-b-2 border-primary"
                        : "text-on-surface-variant hover:text-propolis-charcoal"
                    }`}
                  >
                    Sensory Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("ayurveda")}
                    className={`pb-2 transition-all relative ${
                      activeTab === "ayurveda"
                        ? "text-primary border-b-2 border-primary"
                        : "text-on-surface-variant hover:text-propolis-charcoal"
                    }`}
                  >
                    Ayurvedic Ritual (Anupana)
                  </button>
                  <button
                    onClick={() => setActiveTab("provenance")}
                    className={`pb-2 transition-all relative ${
                      activeTab === "provenance"
                        ? "text-primary border-b-2 border-primary"
                        : "text-on-surface-variant hover:text-propolis-charcoal"
                    }`}
                  >
                    Ethical Harvesting
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[140px] text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {activeTab === "overview" && (
                    <div className="flex flex-col gap-3">
                      <p>{product.description}</p>
                      <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1.5">
                        <strong className="text-propolis-charcoal text-xs uppercase tracking-wider">
                          Sommelier Tasting Notes:
                        </strong>
                        <p className="italic text-xs text-on-surface-variant">
                          "{product.sensoryNotes}"
                        </p>
                      </div>

                      {/* Sensory Bar Meters */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1 font-semibold">
                            <span>Sweetness</span>
                            <span>{product.sensoryRadar.sweetness} / 5</span>
                          </div>
                          <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-amber-radiance h-full rounded-full"
                              style={{ width: `${(product.sensoryRadar.sweetness / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1 font-semibold">
                            <span>Viscosity</span>
                            <span>{product.sensoryRadar.viscosity} / 5</span>
                          </div>
                          <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: `${(product.sensoryRadar.viscosity / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1 font-semibold">
                            <span>Floral Bouquet</span>
                            <span>{product.sensoryRadar.floral} / 5</span>
                          </div>
                          <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-700 h-full rounded-full"
                              style={{ width: `${(product.sensoryRadar.floral / 5) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1 font-semibold">
                            <span>Tannic Earth</span>
                            <span>{product.sensoryRadar.tannicDepth} / 5</span>
                          </div>
                          <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-propolis-charcoal h-full rounded-full"
                              style={{ width: `${(product.sensoryRadar.tannicDepth / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "ayurveda" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-950">
                        <FiAlertCircle className="text-amber-700 text-lg flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <strong className="text-xs uppercase tracking-wider font-bold">
                            Classical Ayurvedic Principle:
                          </strong>
                          <p className="text-xs">
                            According to *Charaka Samhita*, raw honey must **never be heated above 40°C (104°F)** or added to boiling liquids, as heat alters honey's delicate enzymes into *Ama* (metabolic toxicity).
                          </p>
                        </div>
                      </div>
                      <p>{product.ayurvedicRitual}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <span className="text-outline block">Dosha Balance:</span>
                          <strong className="text-propolis-charcoal">{product.ayurvedicBenefit}</strong>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <span className="text-outline block">Optimal Timing:</span>
                          <strong className="text-propolis-charcoal">Morning Brahma Muhurta</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "provenance" && (
                    <div className="flex flex-col gap-3">
                      <p>{product.ethicalNote}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <span className="text-outline block">Tribal Forager Collective:</span>
                          <strong className="text-propolis-charcoal">Baiga &amp; Mawali Artisans</strong>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <span className="text-outline block">Direct Pay Benchmark:</span>
                          <strong className="text-emerald-700">₹320+ / kg (1.8x Mandi)</strong>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <span className="text-outline block">Hive Preservation:</span>
                          <strong className="text-propolis-charcoal">40% Minimum Left in Comb</strong>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <span className="text-outline block">Smoke Protocol:</span>
                          <strong className="text-propolis-charcoal">Zero-Smoke / Cold Brush</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Purchase Actions Row */}
                <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30 mt-auto">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-outline-variant/40 rounded-xl bg-surface px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg text-propolis-charcoal hover:bg-surface-container flex items-center justify-center font-bold text-base btn-tactile"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-serif text-base font-bold text-propolis-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg text-propolis-charcoal hover:bg-surface-container flex items-center justify-center font-bold text-base btn-tactile"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-propolis-charcoal text-honeycomb-cream font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile"
                  >
                    <FiShoppingBag className="text-golden-nectar text-base" />
                    <span>Add to Cart • ₹{(currentVariant.price * quantity).toLocaleString("en-IN")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
