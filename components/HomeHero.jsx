"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiShield, FiStar, FiCheck, FiCompass } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

const STATS = [
  { value: "0.00%", label: "Lab Adulteration" },
  { value: "Since 1996", label: "Farmer Experience" },
  { value: "100%", label: "Raw & Unheated" },
];

const AVATARS = [
  { init: "SY", color: "#b45309" },
  { init: "RM", color: "#0891b2" },
  { init: "MI", color: "#059669" },
  { init: "PS", color: "#7c3aed" },
  { init: "AK", color: "#d97706" },
];

export default function HomeHero() {
  const { openQuiz } = useCart();
  const sectionRef = useRef(null);

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100vh-var(--header-h,88px))] flex items-center bg-gradient-to-br from-[#fffdf9] via-[#fefaf2] to-[#faedd5] overflow-hidden"
      style={{
        paddingTop: "calc(var(--header-h, 88px) + 0.75rem)",
        paddingBottom: "1.75rem",
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-amber-300/25 to-yellow-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-200/15 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── LEFT: Text (7 cols on lg) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 animate-fade-in-up">

            {/* Subtle origin tag */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
              <span className="tracking-wide">Direct from Farmer Suresh Yadav's Apiaries · Est. 1996</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-bold text-stone-900 leading-[1.08] tracking-tight">
              India's Purest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 drop-shadow-sm">
                Raw Honey
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
              Single-origin. Truly unheated. Tested by German Bruker 400MHz NMR for zero adulteration.
              Nurtured by 30 years of beekeeping mastery and harvested directly across Kashmir, Sunderbans &amp; tribal forest reserves.
            </p>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {AVATARS.map(({ init, color }, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} className="text-amber-400 fill-amber-400 text-xs" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 mt-0.5 font-medium">
                  <strong className="text-stone-900 font-bold">4,500+ kg</strong> pure nectar delivered · 100% verified
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={scrollToCatalog}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 active:scale-95 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-amber-500/25 group"
              >
                Shop All Honeys
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/our-story"
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-stone-200 hover:border-amber-400 hover:bg-white text-stone-800 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm"
              >
                Suresh Yadav's Story
              </Link>
              <button
                onClick={openQuiz}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 px-3 py-2 transition-colors ml-1"
              >
                <FiCompass className="text-amber-600 text-sm" />
                Find My Flavor
              </button>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-amber-900/10 max-w-lg">
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col ${i > 0 ? "pl-3 border-l border-amber-900/10" : ""}`}
                >
                  <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">{value}</span>
                  <span className="text-[11px] text-stone-500 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Hero Image (5 cols on lg) — NO BORDER, SEAMLESS ORGANIC LOOK ── */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Glowing honey halo */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-gradient-to-tr from-amber-400/35 via-yellow-300/30 to-amber-200/20 rounded-full blur-2xl pointer-events-none" />

            {/* Visual presentation — completely borderless, floating naturally */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              <div className="relative aspect-[4/3.8] rounded-3xl overflow-hidden drop-shadow-2xl">
                <Image
                  src="/images/bee_desi_hero_custom.png"
                  alt="Bee Desi Raw Honey Jar"
                  fill
                  className="object-contain object-center hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Floating NMR badge — minimal, glassmorphic, no heavy black borders */}
              <div className="absolute -bottom-3 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-emerald-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider leading-none">
                    Bruker 400MHz NMR Tested
                  </p>
                  <p className="text-[11px] text-stone-600 mt-0.5 font-medium truncate">
                    0.00% Sugar Syrup · 100% Raw
                  </p>
                </div>
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 font-bold">
                  ✓
                </span>
              </div>

              {/* Floating bee illustration */}
              <div className="absolute -top-5 right-2 w-14 h-14 pointer-events-none">
                <Image
                  src="/images/assets/10.png"
                  alt="Apis Cerana Honeybee"
                  width={56}
                  height={56}
                  className="object-contain drop-shadow-md animate-[bounce_4s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
