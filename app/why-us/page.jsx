"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiShield,
  FiUsers,
  FiTruck,
  FiAward,
  FiDroplet,
  FiHeart,
  FiCheck,
  FiX,
  FiArrowRight,
} from "react-icons/fi";

const PILLAR_ICONS = [FiShield, FiUsers, FiDroplet, FiHeart, FiTruck, FiAward];

export default function WhyUsPage() {
  const { getWhyUsData } = useLanguage();
  const w = getWhyUsData();

  const pillars = w.pillars || [];
  const tableRows = w.table_rows || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181512] selection:bg-amber-200 selection:text-stone-900">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        
        {/* ── EDITORIAL HERO ── */}
        <section className="relative border-b border-[#E7E2D8] bg-[#F4EFE6] pt-14 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8C4A00]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                {w.hero_tag || "The Purity Standard · No Compromise"}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[72px] font-bold text-[#181512] leading-[1.08] tracking-tight max-w-4xl mb-6">
              {w.hero_h1_part1 || "Why Bee Desi?"}{" "}
              <span className="italic font-normal text-[#8C4A00]">
                {w.hero_h1_part2 || "6 Radical Differentiators."}
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#3D352F] max-w-2xl leading-relaxed mb-8 font-sans">
              {w.hero_p}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#catalog"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#181512] hover:bg-[#8C4A00] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs group"
              >
                <span>{w.btn_shop || "Shop Raw Single-Origin Honeys"}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#EFE8DC] border border-[#D5CDBD] text-[#181512] font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>{w.btn_story || "Read Suresh's Journey"}</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ── 6 REASONS WE'RE DIFFERENT ── */}
        <section className="py-20 bg-white border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                {w.hero_tag || "Verification · Not Marketing"}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2 mb-3">
                {w.hero_h1_part2 || "Six Unbending Principles"}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {w.hero_p}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {pillars.map((item, idx) => {
                const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length] || FiShield;
                return (
                  <div
                    key={item.number}
                    className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CB] flex flex-col justify-between hover:border-[#8C4A00] transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg">
                          <Icon />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#8C4A00]">
                          #{item.number}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#181512] mb-3 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#E5DFD5]">
                      <span className="font-serif text-2xl font-bold text-[#181512] block">
                        {item.metric}
                      </span>
                      <span className="text-[11px] font-mono text-stone-500 mt-0.5 block">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HONEST COMPARISON TABLE ── */}
        <section className="py-20 bg-[#F4EFE6] border-b border-[#E7E2D8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                {w.table_tag || "Purity Confrontation"}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2 mb-3">
                {w.table_h2 || "Bee Desi vs. Commercial Brands"}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {w.table_p}
              </p>
            </div>

            <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
              <div className="min-w-[540px] md:min-w-0 bg-white rounded-2xl border border-[#DCD5C8] shadow-xs overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 bg-[#181512] text-white p-4 sm:p-5 text-xs font-mono font-bold uppercase tracking-wider">
                  <div className="col-span-6 sm:col-span-7">{w.th_parameter || "Purity Parameter"}</div>
                  <div className="col-span-3 sm:col-span-3 text-center text-amber-300">{w.th_beedesi || "Bee Desi"}</div>
                  <div className="col-span-3 sm:col-span-2 text-center text-stone-400">{w.th_commercial || "Commercial"}</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#EAE3D5]">
                  {tableRows.map((row) => (
                    <div
                      key={row.param}
                      className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-[#FAF7F2] transition-colors text-xs sm:text-sm font-sans"
                    >
                      <div className="col-span-6 sm:col-span-7 font-medium text-stone-800">
                        {row.param}
                      </div>

                      <div className="col-span-3 sm:col-span-3 flex items-center justify-center text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-800 font-mono font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                          <FiCheck className="text-emerald-600" />
                          <span>{row.desi}</span>
                        </span>
                      </div>

                      <div className="col-span-3 sm:col-span-2 flex items-center justify-center text-center">
                        <span className="inline-flex items-center gap-1 text-red-700 font-mono text-xs bg-red-50 px-2 py-1 rounded-md border border-red-200">
                          <FiX className="text-red-500" />
                          <span>{row.comm}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section className="py-20 bg-[#181512] text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold block mb-3">
              {w.cta_tag || "Taste the Truth"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4">
              {w.cta_h2 || "Ready to Taste True Raw Honey?"}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {w.cta_p}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#catalog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8C4A00] hover:bg-[#733C00] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
              >
                <span>{w.btn_shop || "Shop Single-Flora Jars"}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/faqs"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>{w.btn_story || "Common Questions"}</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
