"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  FiShield,
  FiAward,
  FiShoppingBag,
  FiEye,
  FiCheckCircle,
  FiActivity
} from "react-icons/fi";

export default function FeaturedJamunSpotlight() {
  const { openProductModal, addToCart, openNMRLookup, liveProducts } = useCart();
  const jamunProduct =
    (liveProducts && liveProducts.find((p) => p.id === "wild-raw-jamun")) ||
    PRODUCTS.find((p) => p.id === "wild-raw-jamun") ||
    PRODUCTS[0];

  const isOutOfStock =
    jamunProduct.inStock === false ||
    (jamunProduct.stockCount !== undefined &&
      jamunProduct.stockCount !== null &&
      Number(jamunProduct.stockCount) <= 0);

  return (
    <section id="single-flora" className="w-full py-24 bg-surface relative overflow-hidden scroll-mt-24">
      {/* Decorative Gold Honeycomb Corner Motif (asset 6.png) */}
      <div className="absolute -top-12 -right-12 w-48 h-60 opacity-[0.12] pointer-events-none select-none">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Motif"
          width={200}
          height={260}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-surface-container-low rounded-3xl p-6 sm:p-10 lg:p-14 border border-primary/20 shadow-honey grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative overflow-hidden">
          
          {/* Subtle Honeycomb Pattern Tile Accent in Card Corner (asset 7.png) */}
          <div className="absolute -bottom-8 -right-8 w-36 h-36 opacity-10 pointer-events-none">
            <Image
              src="/images/assets/7.png"
              alt="Honeycomb Grid"
              fill
              className="object-contain"
            />
          </div>

          {/* Left Column: Media Stage (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* 3D Raw Dripping Honeycomb Floating Accent (asset 3.png) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-8 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none drop-shadow-xl"
            >
              <Image
                src="/images/assets/3.png"
                alt="Raw Dripping Honeycomb"
                fill
                className="object-contain"
              />
            </motion.div>

            <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-surface-container shadow-inner group">
              <img
                src={jamunProduct.image}
                alt="Balaghat Wild Jamun Honey"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
                onClick={() => openProductModal(jamunProduct)}
              />

              {/* Terroir Tag */}
              <div className="absolute top-4 left-4 glass-dark text-honeycomb-cream px-3 py-1.5 rounded-full text-xs font-bold shadow-honey">
                Balaghat Satpura Canopy • 680m MSL
              </div>

              {/* Floating Live Diastase Pill */}
              <div className="absolute bottom-4 left-4 right-4 glass-pill p-3 rounded-xl flex items-center justify-between text-xs text-propolis-charcoal font-semibold">
                <div className="flex items-center gap-2">
                  <FiActivity className="text-primary text-base" />
                  <span>Diastase Enzyme Activity</span>
                </div>
                <strong className="text-emerald-800 font-bold font-serif text-sm">21.4 DN (Live)</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Sensory Metrics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 relative">
            {/* Flying Honeybee floating above (asset 10.png) */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 right-4 w-14 h-14 pointer-events-none select-none drop-shadow-sm hidden sm:block"
            >
              <Image
                src="/images/assets/10.png"
                alt="Honeybee"
                width={56}
                height={56}
                className="object-contain"
              />
            </motion.div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Single-Flora Terroir Spotlight
              </span>
              <span className="opacity-40">•</span>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                Naturally Low Glycemic
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-propolis-charcoal leading-tight">
              Wild Raw Jamun Honey from Satpura's Deep Canopy
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Harvested during the fleeting monsoon blossoming of *Syzygium cumini* in the biodiverse Balaghat tiger corridor. Unlike overly sweet supermarket honey, Wild Jamun carries a rich, dark purple undertone with a distinct, pleasant astringency and tart plum bouquet revered in Ayurvedic medicine.
            </p>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="bg-surface p-3.5 rounded-xl border border-outline-variant/20 shadow-sm text-center">
                <span className="text-[10px] text-outline uppercase font-bold block">Glycemic Index</span>
                <span className="font-serif text-sm sm:text-base font-bold text-emerald-800">Low GI</span>
                <span className="text-[10px] text-on-surface-variant block">Diabetic-conscious</span>
              </div>
              <div className="bg-surface p-3.5 rounded-xl border border-outline-variant/20 shadow-sm text-center">
                <span className="text-[10px] text-outline uppercase font-bold block">C4 Sugar Syrup</span>
                <span className="font-serif text-sm sm:text-base font-bold text-emerald-800">0.00% Neg</span>
                <span className="text-[10px] text-on-surface-variant block">Bruker NMR Tested</span>
              </div>
              <div className="bg-surface p-3.5 rounded-xl border border-outline-variant/20 shadow-sm text-center">
                <span className="text-[10px] text-outline uppercase font-bold block">Forager Collective</span>
                <span className="font-serif text-sm sm:text-base font-bold text-propolis-charcoal">Baiga Tribe</span>
                <span className="text-[10px] text-on-surface-variant block">₹320/kg Direct Pay</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <button
                onClick={() => openProductModal(jamunProduct)}
                className="py-3.5 px-6 rounded-xl bg-propolis-charcoal text-honeycomb-cream text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-honey flex items-center gap-2 btn-tactile"
              >
                <FiEye className="text-golden-nectar" />
                <span>Deep Sensory &amp; Ritual Inspection</span>
              </button>

              <button
                onClick={() => addToCart(jamunProduct, jamunProduct.variants?.[0], 1)}
                disabled={isOutOfStock}
                className={`py-3.5 px-6 rounded-xl border text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 btn-tactile ${
                  isOutOfStock
                    ? "bg-stone-200 border-stone-300 text-stone-500 cursor-not-allowed"
                    : "bg-surface border-outline-variant/40 text-propolis-charcoal hover:bg-beeswax-surface"
                }`}
              >
                <FiShoppingBag className={isOutOfStock ? "text-stone-400" : "text-primary"} />
                <span>
                  {isOutOfStock
                    ? "Sold Out • Harvest Depleted"
                    : `Add ${(jamunProduct.variants?.[0]?.size || "350g")} Jar • ₹${(jamunProduct.variants?.[0]?.price || jamunProduct.basePrice || 690).toLocaleString("en-IN")}`}
                </span>
              </button>

              <button
                onClick={() => openNMRLookup("BD-JAMUN-2026")}
                className="py-3.5 px-4 rounded-xl text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <FiShield />
                <span>Inspect NMR Batch BD-JAMUN-2026 →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
