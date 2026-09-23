"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  FiAward,
  FiShoppingBag,
  FiCheck,
  FiStar,
  FiBox,
  FiDroplet
} from "react-icons/fi";

export default function TerroirFlightSection() {
  const { addToCart, openProductModal, liveProducts, showToast } = useCart();
  const flightProduct =
    (liveProducts && liveProducts.find((p) => p.id === "connoisseurs-terroir-flight")) ||
    PRODUCTS.find((p) => p.id === "connoisseurs-terroir-flight") ||
    PRODUCTS[0];

  const isOutOfStock =
    flightProduct.inStock === false ||
    (flightProduct.stockCount !== undefined &&
      flightProduct.stockCount !== null &&
      Number(flightProduct.stockCount) <= 0);

  const handleAddFlight = () => {
    if (isOutOfStock) {
      if (showToast) showToast(`${flightProduct.name} is currently sold out`, "error");
      return;
    }
    addToCart(flightProduct, flightProduct.variants?.[0], 1);
  };

  return (
    <section id="terroir-flight" className="w-full py-24 bg-surface-container-low relative overflow-hidden scroll-mt-24">
      {/* Golden Atmosphere Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-golden-nectar/15 blur-3xl pointer-events-none"></div>

      {/* Subtle Honeycomb Corner Lattice (asset 6.png) */}
      <div className="absolute -bottom-10 -left-10 w-44 h-56 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Ornament"
          width={180}
          height={230}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-surface rounded-3xl p-6 sm:p-10 lg:p-14 border border-primary/20 shadow-honey-lg grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative overflow-hidden">
          
          {/* Decorative Honeycomb Cluster Accent (asset 1.png) */}
          <div className="absolute -top-6 -right-6 w-28 h-28 opacity-15 pointer-events-none">
            <Image
              src="/images/assets/1.png"
              alt="Honeycomb Cluster"
              fill
              className="object-contain"
            />
          </div>

          {/* Left Media Column (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* Wooden Honey Dipper Drizzle Floating (asset 4.png) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-10 w-24 h-32 sm:w-28 sm:h-36 z-20 pointer-events-none drop-shadow-xl hidden sm:block"
            >
              <Image
                src="/images/assets/4.png"
                alt="Honey Dipper Drizzle"
                fill
                className="object-contain"
              />
            </motion.div>

            <div className="relative aspect-[4/3.5] rounded-2xl overflow-hidden bg-surface-container shadow-inner group">
              <img
                src={flightProduct.image}
                alt="The Connoisseur's Terroir Flight"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Floating Bundle Badge */}
              <div className="absolute top-4 left-4 glass-dark text-golden-nectar px-3.5 py-1.5 rounded-full text-xs font-bold shadow-honey flex items-center gap-2">
                <FiBox />
                <span>Curated 3-Jar Box Set</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 glass-pill p-3 rounded-xl flex items-center justify-between text-xs text-propolis-charcoal font-semibold">
                <span>Includes Hand-Forged Solid Brass Tasting Wand</span>
                <span className="text-primary font-bold">Complimentary</span>
              </div>
            </div>

            {/* 3 Micro Swatches of the Varietals Included */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20 text-center">
                <span className="text-[10px] text-outline uppercase font-bold block">1. Alpine Flora</span>
                <span className="font-serif text-xs font-bold text-propolis-charcoal">Kashmir Acacia</span>
                <span className="text-[10px] text-on-surface-variant block mt-0.5">Whisper Vanilla</span>
              </div>
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20 text-center">
                <span className="text-[10px] text-outline uppercase font-bold block">2. Canopy Bloom</span>
                <span className="font-serif text-xs font-bold text-propolis-charcoal">Balaghat Jamun</span>
                <span className="text-[10px] text-on-surface-variant block mt-0.5">Tart Purple Plum</span>
              </div>
              <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20 text-center">
                <span className="text-[10px] text-outline uppercase font-bold block">3. Coastal Wild</span>
                <span className="font-serif text-xs font-bold text-propolis-charcoal">Sunderbans</span>
                <span className="text-[10px] text-on-surface-variant block mt-0.5">Smoky Caramel</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Narrative Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 relative">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} className="text-golden-nectar fill-golden-nectar text-sm" />
                  ))}
                </div>
                <span className="text-xs font-bold text-propolis-charcoal">5.0 / 5.0 Sommelier Rated</span>
                <span className="text-outline text-xs hidden sm:inline">• Limited 150-Box Micro-Batch</span>
              </div>

              {/* Hand-lettered Gold Honey Badge (asset 9.png) */}
              <div className="w-14 h-6 relative opacity-80">
                <Image
                  src="/images/assets/9.png"
                  alt="Honey Badge"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-propolis-charcoal leading-tight">
              The Connoisseur’s Terroir Flight
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Designed for sensory exploration. Experience the extraordinary botanical diversity of the Indian subcontinent through three contrasting raw honeys harvested from distinct ecosystems — from snow-fed Kashmiri valleys to central deciduous forests and wild mangrove tidal estuaries.
            </p>

            {/* Inclusions List */}
            <div className="flex flex-col gap-2.5 w-full text-xs sm:text-sm text-on-surface">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-xs" />
                </div>
                <span>3 x 200g Hexagonal Amber Glass Jars (Acacia, Jamun, Mangrove)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-xs" />
                </div>
                <span>Hand-carved Solid Brass Apiary Tasting Spoon with engraved bee insignia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-xs" />
                </div>
                <span>Printed Sommelier Tasting Guide &amp; Batch 1H-NMR Spectroscopy dossiers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <FiCheck className="text-xs" />
                </div>
                <span>Handcrafted plantation teak gift casket with wax-stamped seal</span>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/30 w-full">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-outline font-bold">
                  Curated Box Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-propolis-charcoal">
                    ₹{(flightProduct.basePrice || 1980).toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-outline line-through">₹2,450</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Save 19%
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddFlight}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-400/30"
                    : "bg-propolis-charcoal text-honeycomb-cream hover:bg-primary shadow-honey btn-tactile"
                }`}
              >
                <FiShoppingBag className={isOutOfStock ? "text-stone-400" : "text-golden-nectar text-base"} />
                <span>{isOutOfStock ? "Sold Out • Flight Depleted" : "Reserve Flight Set"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
