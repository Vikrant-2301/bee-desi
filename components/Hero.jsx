"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  FiArrowRight,
  FiShield,
  FiAward,
  FiDroplet,
  FiCheckCircle,
  FiHeart,
  FiCompass,
  FiShoppingBag,
} from "react-icons/fi";

export default function Hero() {
  const { openNMRLookup, openQuiz, addToCart } = useCart();

  const featuredJar = {
    id: "wild-raw-jamun",
    name: "Wild Raw Jamun Honey",
    subtitle: "Balaghat Canopy • Syzygium Cumini Bloom",
    price: 690,
    size: "350g",
    batchCode: "BD-JAMUN-2026",
    image: "/images/bee_desi_hero_custom.png",
    variants: [
      { size: "350g", label: "350g Amber Glass Jar", price: 690, sku: "BD-JAMUN-350" },
    ],
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-honeycomb-pattern overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-amber-radiance/15">
      {/* Warm Golden Ambient Glow Orbs */}
      <div className="absolute -top-36 -right-36 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-amber-radiance/20 to-golden-nectar/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-deep/15 to-transparent blur-3xl pointer-events-none"></div>

      {/* Decorative Gold Honeycomb Corner Motif (asset 6.png) */}
      <div className="absolute top-28 left-4 w-36 h-48 opacity-[0.14] pointer-events-none select-none hidden lg:block">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Ornament"
          width={150}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Crest Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-radiance/40 bg-surface shadow-sm flex items-center justify-center p-0.5">
            <Image
              src="/images/logo.png"
              alt="Bee Desi Crest"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.24em] text-amber-deep font-bold font-sans">
              100% Raw • Single Terroir • Unheated
            </span>
            <span className="font-serif italic text-sm text-on-surface-variant font-normal">
              Sacred Wild Nectar from India’s Ancient Forest Reserves
            </span>
          </div>
        </motion.div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Narrative (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start gap-6 relative"
          >
            {/* Flying Honeybee floating above headline (asset 10.png) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-10 right-8 sm:right-24 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none select-none z-20 drop-shadow-md hidden sm:block"
            >
              <Image
                src="/images/assets/10.png"
                alt="Apis Cerana Indica Honeybee"
                width={80}
                height={80}
                className="object-contain"
              />
            </motion.div>

            {/* Vintage Pill with Golden Honey Emblem (asset 9.png) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full gold-glass border border-amber-radiance/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-bold text-propolis-charcoal font-sans">
                Spring 2026 Kashmiri White Acacia &amp; Balaghat Jamun Bottled
              </span>
              <div className="w-10 h-4 relative ml-1 opacity-85">
                <Image
                  src="/images/assets/9.png"
                  alt="Honey Badge"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Main Luxury Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-propolis-charcoal leading-[1.05] tracking-tight font-bold">
              Raw, Wild &amp; Single-Flora Nectar from India’s Ancient Terroirs
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed font-sans">
              Harvested with solemn reverence for native Indian bees (<em>Apis Cerana Indica</em>). Unheated, unpasteurized, and certified by 400MHz proton NMR in Germany for 100% molecular purity. Zero corn syrup, zero inverted rice sugar, zero commercial blending.
            </p>

            {/* CTAs & Sommelier Trigger */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto font-sans">
              <button
                onClick={() => scrollToSection("catalog")}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2.5 btn-tactile group"
              >
                <span>Explore First Harvest</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openNMRLookup("BD-JAMUN-2026")}
                className="w-full sm:w-auto gold-glass text-propolis-charcoal border border-amber-radiance/40 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-radiance/15 transition-colors shadow-sm flex items-center justify-center gap-2 btn-tactile"
              >
                <FiShield className="text-amber-radiance text-base" />
                <span>Verify NMR Spectrograms</span>
              </button>

              <button
                onClick={openQuiz}
                className="w-full sm:w-auto px-5 py-4 rounded-xl text-xs font-bold text-amber-deep hover:text-propolis-charcoal flex items-center justify-center gap-1.5 transition-colors"
              >
                <FiCompass className="text-sm" />
                <span>Terroir Sommelier Quiz</span>
              </button>
            </div>

            {/* Terroir Metrics Bar with Honeycomb Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-amber-radiance/20 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
                  18.4+ DN
                </span>
                <span className="text-[11px] text-amber-deep font-bold uppercase tracking-wider font-sans">
                  Live Enzymes
                </span>
                <span className="text-[10px] text-on-surface-variant font-sans">
                  Active Diastase
                </span>
              </div>

              <div className="flex flex-col border-l border-outline-variant/30 pl-3 sm:pl-6">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
                  &lt; 16.8%
                </span>
                <span className="text-[11px] text-amber-deep font-bold uppercase tracking-wider font-sans">
                  Raw Moisture
                </span>
                <span className="text-[10px] text-on-surface-variant font-sans">
                  Natural Viscosity
                </span>
              </div>

              <div className="flex flex-col border-l border-outline-variant/30 pl-3 sm:pl-6">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800">
                  C4 Neg
                </span>
                <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider font-sans">
                  0.00% Syrups
                </span>
                <span className="text-[10px] text-on-surface-variant font-sans">
                  Bruker 400MHz 1H-NMR
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Jar Showcase (5 Cols) with Honeycomb Framing & Dipper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Realistic Dripping Dipper Floating by the Jar (asset 4.png) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 w-28 h-36 sm:w-32 sm:h-44 z-30 pointer-events-none drop-shadow-xl hidden sm:block"
            >
              <Image
                src="/images/assets/4.png"
                alt="Honey Dipper Drizzle"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Watercolor Honeycomb Cluster Accent (asset 1.png) */}
            <div className="absolute -bottom-10 -right-8 w-24 h-24 sm:w-28 sm:h-28 z-30 pointer-events-none drop-shadow-md">
              <Image
                src="/images/assets/1.png"
                alt="Honeycomb Cluster"
                fill
                className="object-contain"
              />
            </div>

            {/* Honeycomb Geometry Floating Badges */}
            <div className="relative w-full max-w-md">
              {/* Amber Glow Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-radiance/25 to-golden-nectar/30 rounded-3xl blur-2xl transform rotate-2"></div>

              {/* Main Showcase Card */}
              <div className="relative gold-glass rounded-3xl p-5 sm:p-6 border-2 border-amber-radiance/30 shadow-honey-lg flex flex-col gap-4">
                {/* Vintage Badge Ribbon */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-radiance/15 text-amber-deep font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-radiance/30">
                    Single Origin • Terroir Batch
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant font-semibold">
                    BATCH #BD-2026/04
                  </span>
                </div>

                {/* Staged Jar Visual */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#f9f3e8] to-[#eee2cf] border border-amber-radiance/20 shadow-inner group">
                  <Image
                    src="/images/bee_desi_hero_custom.png"
                    alt="Bee Desi Pure Raw Wild Honey Jar"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* Floating Wax Seal Certification */}
                  <div className="absolute bottom-3 left-3 right-3 bg-propolis-charcoal/90 backdrop-blur-md text-honeycomb-cream p-3 rounded-xl border border-golden-nectar/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-golden-nectar/20 text-golden-nectar flex items-center justify-center text-sm border border-golden-nectar/40">
                        <FiAward />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-golden-nectar">
                          Intertek Bruker NMR Tested
                        </span>
                        <span className="text-[11px] font-serif text-honeycomb-cream">
                          Purity: 100% Authentic Single-Flora
                        </span>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-base">✓</span>
                  </div>
                </div>

                {/* Terroir Specification Footnotes */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-sans">
                  <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                      Elevation
                    </span>
                    <strong className="text-xs font-serif text-propolis-charcoal">
                      1,850m MSL
                    </strong>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                      Native Bee
                    </span>
                    <strong className="text-xs font-serif text-propolis-charcoal">
                      Apis Cerana
                    </strong>
                  </div>
                  <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                      Harvest Mode
                    </span>
                    <strong className="text-xs font-serif text-propolis-charcoal">
                      Cold Settled
                    </strong>
                  </div>
                </div>

                {/* Instant 1-Click Action */}
                <button
                  onClick={() => addToCart(featuredJar, featuredJar.variants[0], 1)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-deep to-primary hover:brightness-110 text-honeycomb-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md btn-tactile font-sans"
                >
                  <FiShoppingBag className="text-golden-nectar" />
                  <span>Allocate Wild Jamun Jar (₹690)</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
