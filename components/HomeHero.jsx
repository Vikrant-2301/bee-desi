"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiShield, FiStar, FiCompass, FiCheck } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const REVIEWS_AVATARS = [
  { init: "AK", bg: "#7A4A28" },
  { init: "RM", bg: "#1E3A2F" },
  { init: "PS", bg: "#9A6520" },
  { init: "VT", bg: "#4A2F3C" },
  { init: "MK", bg: "#2E4756" },
];

export default function HomeHero() {
  const { openQuiz } = useCart();
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const metrics = [
    { value: t("hero_metric1_val", "0.00%"), label: t("hero_metric1_lbl", "Sugar Syrup Adulteration") },
    { value: t("hero_metric2_val", "< 35°C"), label: t("hero_metric2_lbl", "Cold-Extracted & Unheated") },
    { value: t("hero_metric3_val", "400MHz"), label: t("hero_metric3_lbl", "Bruker NMR Certified") },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100vh-var(--header-h,88px))] flex items-center bg-[#FAF7F2] overflow-hidden"
      style={{
        paddingTop: "calc(var(--header-h, 88px) + 1.25rem)",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Subtle organic warmth in background (no harsh blobs) */}
      <div className="absolute top-1/4 right-1/4 w-[460px] h-[460px] rounded-full bg-amber-200/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[320px] h-[320px] rounded-full bg-amber-100/35 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── LEFT: Typography & Narrative (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">

            {/* Quiet Origin Eyebrow - properly closed! */}
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#8C4A00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A00]">
                {t("hero_tag", "Single-Origin Nectars · 100% Raw Forest Harvest")}
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-[68px] font-bold text-[#181512] leading-[1.08] tracking-tight">
              {t("hero_h1_part1", "India's Purest")}{" "}
              <span className="italic font-normal text-[#8C4A00]">
                {t("hero_h1_part2", "Raw Honey.")}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-lg text-[#3D352F] leading-relaxed max-w-xl font-normal">
              {t(
                "hero_subtext",
                "Single-flora. Truly unheated. Free from imported sugar syrups and factory pasteurization. Independently fingerprinted by German Bruker 400MHz NMR spectroscopy to guarantee 0.00% synthetic adulterants."
              )}
            </p>

            {/* Social Trust Strip */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2 flex-shrink-0">
                {REVIEWS_AVATARS.map(({ init, bg }, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#FAF7F2] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: bg }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar key={s} className="text-[#8C4A00] fill-[#8C4A00] text-xs" />
                  ))}
                  <span className="text-xs font-bold text-[#181512] ml-1">4.96 / 5.0</span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 font-mono mt-0.5">
                  {t("hero_social_trust", "Over 4,500+ jars delivered across India · Zero Syrup Adulteration")}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="flex items-center justify-center gap-2 bg-[#181512] hover:bg-[#8C4A00] active:scale-95 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm group"
              >
                <span>{t("hero_btn_shop", "Shop Single-Origin Nectars")}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/our-story"
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#F3EFE7] border border-[#D5CDBD] text-[#181512] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-xs"
              >
                <span>{t("hero_btn_story", "Our Story")}</span>
              </Link>

              <button
                type="button"
                onClick={openQuiz}
                className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#8C4A00] hover:text-[#5E3200] px-3 py-2 transition-colors"
              >
                <FiCompass className="text-base" />
                <span>{t("hero_btn_quiz", "Terroir Sommelier Quiz")}</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-[#E2DBD0] max-w-lg">
              {metrics.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col ${i > 0 ? "pl-2 sm:pl-4 border-l border-[#E2DBD0]" : ""}`}
                >
                  <span className="font-serif text-lg sm:text-2xl font-bold text-[#181512] tracking-tight">
                    {value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 mt-0.5 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: Seamless Visual (5 cols) — NO CARD, NO BORDER ── */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Natural warm ambient backlight halo — pure organic glow, NO BOX, NO CARD, NO BORDER */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/25 via-amber-200/20 to-orange-300/15 blur-2xl pointer-events-none" />

              {/* Product Jar Visual — Floating completely free, no card, no border */}
              <div className="relative w-full h-full max-h-[400px] flex items-center justify-center drop-shadow-[0_25px_40px_rgba(24,21,18,0.22)]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8AJWP0gOrG-DxlXi-aooMbeb-XWif2RRWuRUzgHz4g0gPJqkgUhEN7cy2QDLUBjd843kbbEdC61RqZSVsurFhjiwnUR-F_ahqe1oTLGXRgtmN2BaDZgtGAx0TWzELr14bHA2meR3h_5fWP4q9m6OwpKxlUDu1wSphSFdCmx9XqZwBWJXNYbTTb0hsPnGsCRO6fkzFIXYgYCx5j9EBZuxz3TOExNtmdD41ClqtcqPX7ScObd4TUVsN"
                  alt="Bee Desi Raw Wild Honey Jar"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 select-none pointer-events-auto"
                />
              </div>

              {/* Realistic Dripping Dipper Floating by Jar (asset 4.png) */}
              <div className="absolute -bottom-6 -left-6 w-24 h-28 sm:w-28 sm:h-32 z-20 pointer-events-none drop-shadow-lg select-none hidden sm:block">
                <Image
                  src="/images/assets/4.png"
                  alt="Honey Dipper Drizzle"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Little native bee hovering naturally (asset 10.png) */}
              <div className="absolute top-2 right-4 w-12 h-12 pointer-events-none select-none z-20">
                <Image
                  src="/images/assets/10.png"
                  alt="Native Indian Honeybee"
                  width={48}
                  height={48}
                  className="object-contain drop-shadow-sm animate-[bounce_4s_ease-in-out_infinite]"
                />
              </div>
            </div>

            {/* Minimalist verification pill beneath the bottle — transparent backdrop, no boxed borders */}
            <div className="mt-4 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#E0D8CB] text-xs font-mono text-[#181512] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-bold">{t("hero_badge_title", "Bruker 400MHz NMR Certified:")}</span>
              <span className="text-[#8C4A00] font-semibold">{t("hero_badge_sub", "0.00% Sugar Syrup Detected")}</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
