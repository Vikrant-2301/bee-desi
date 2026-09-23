"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiArrowRight,
  FiPhone,
  FiMapPin,
  FiShield,
  FiCheck,
  FiX,
  FiExternalLink,
  FiMessageCircle,
  FiAward,
} from "react-icons/fi";

export default function OurStoryPage() {
  const { getStoryData } = useLanguage();
  const s = getStoryData();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapters = s.chapters || [];
  const activeChapter = chapters[activeChapterIndex] || chapters[0] || {};

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181512] selection:bg-amber-200 selection:text-stone-900">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        
        {/* ── SECTION 1: EDITORIAL COVER / HERO ── */}
        <section className="relative border-b border-[#E7E2D8] bg-[#F4EFE6] pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top metadata strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#DCD5C8]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                  {s.badge_chronicle || "Documentary Chronicle"}
                </span>
                <span className="text-[#C5BDB0]">/</span>
                <span className="font-mono text-xs text-stone-500">
                  {s.badge_story_of || "The Suresh Yadav Story"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-stone-600">
                <span>{s.badge_location || "KANPUR, UTTAR PRADESH"}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8C4A00]" />
                <span className="text-stone-900 font-bold">{s.badge_est || "EST. 1996"}</span>
              </div>
            </div>

            {/* Giant Editorial Headline */}
            <div className="max-w-5xl">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[72px] font-bold text-[#181512] leading-[1.08] tracking-tight mb-8">
                {s.h1_part1 || "In 2010, he started a jewellery business."}{" "}
                <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#8C4A00]">
                  {s.h1_part2 || "Then he saw what was being sold as honey."}
                </span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#DCD5C8]">
                <p className="lg:col-span-8 text-lg sm:text-xl text-[#3A322C] leading-relaxed font-sans">
                  {s.hero_p}
                </p>

                <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#DCD5C8] flex flex-col gap-1.5 font-mono text-xs text-stone-600">
                  <div className="text-[11px] text-[#8C4A00] font-bold uppercase tracking-wider">
                    {s.founder_profile_tag || "Founder Profile"}
                  </div>
                  <div className="text-sm font-bold text-stone-900 font-sans">{s.founder_name}</div>
                  <div>{s.founder_location}</div>
                  <div>{s.founder_legacy1}</div>
                  <div>{s.founder_legacy2}</div>
                  <div className="text-[#8C4A00] font-semibold pt-1 border-t border-stone-200">
                    {s.founder_role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: THE FOUNDER & THE MANIFESTO LETTER ── */}
        <section className="py-16 lg:py-24 bg-white border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Authentic Portrait Card */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#DCD5C8] shadow-sm">
                  {/* Photo Frame */}
                  <div className="relative aspect-[3.6/4.6] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <Image
                      src="/images/assets/suresh.jpg"
                      alt="Suresh Yadav — Founder of Bee Desi"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-[#181512]/85 backdrop-blur-md px-3 py-2 rounded-lg text-white text-[11px] font-mono flex items-center justify-between">
                      <span>Suresh Yadav · Kanpur (U.P.)</span>
                      <span className="text-amber-300 font-bold">{s.badge_est || "Est. 1996"}</span>
                    </div>
                  </div>

                  {/* Caption & Authentic Proof */}
                  <div className="mt-4 pt-3 border-t border-[#E5E0D5] flex flex-col gap-2 text-xs text-stone-600">
                    <p className="italic text-stone-700 font-serif text-sm">
                      {s.founder_quote}
                    </p>
                    <span className="text-[11px] font-mono text-stone-400">
                      Suresh Yadav · Kanpur, Uttar Pradesh
                    </span>
                  </div>

                  {/* Direct Contact Desk Box (Only 7071101119 & 9307777500) */}
                  <div className="mt-5 p-4 rounded-xl bg-white border border-[#DCD5C8] flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                        {s.direct_lines_title || "Founder Direct Lines"}
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        {s.direct_lines_badge || "Direct Access"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-900">
                      <a href="tel:7071101119" className="hover:text-[#8C4A00] transition-colors flex items-center gap-1.5">
                        <FiPhone className="text-[#8C4A00]" />
                        <span>7071101119</span>
                      </a>
                      <span className="text-stone-300">/</span>
                      <a href="tel:9307777500" className="hover:text-[#8C4A00] transition-colors">
                        9307777500
                      </a>
                    </div>
                    <div className="flex gap-2 pt-1 border-t border-stone-100">
                      <a
                        href="https://wa.me/917071101119?text=Namaste%20Suresh%20ji,%20I%20read%20your%20story%20and%20wanted%20to%20order%20pure%20honey."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FiMessageCircle />
                        <span>{s.btn_whatsapp || "WhatsApp Desk"}</span>
                      </a>
                      <a
                        href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FiMapPin />
                        <span>{s.btn_hq || "Processing HQ"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Suresh's Authentic Narrative */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C4A00] font-bold block mb-2">
                    {s.words_tag || "In The Founder's Own Words"}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181512] leading-[1.14]">
                    {s.words_h2}
                  </h2>
                </div>

                <div className="space-y-5 text-[#2E2824] text-base sm:text-lg leading-relaxed font-sans">
                  <p>{s.words_p1}</p>
                  <p>{s.words_p2}</p>

                  {/* Spotlight Quote */}
                  <div className="p-6 bg-[#FAF7F2] rounded-2xl border-l-4 border-[#8C4A00] border-t border-r border-b border-[#E5E0D5]">
                    <p className="font-serif italic text-xl sm:text-2xl text-[#181512] leading-snug">
                      {s.words_spotlight}
                    </p>
                  </div>

                  <p>{s.words_p3}</p>
                  <p>{s.words_p4}</p>
                  <p>{s.words_p5}</p>
                  <p>{s.words_p6}</p>
                </div>

                {/* Signature Block */}
                <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#8C4A00]">
                      Suresh Yadav
                    </div>
                    <div className="text-xs font-mono text-stone-500 mt-0.5">
                      {s.founder_title_sign}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 text-xs font-mono font-bold text-stone-800">
                      Kanpur (U.P.)
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#FAF0E4] border border-[#E8D0B5] text-xs font-mono font-bold text-[#8C4A00]">
                      {s.zero_sugar_badge || "0.00% Sugar Syrup"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE CONTRAST (GOLD STANDARD vs. THE SYRUP CRISIS) ── */}
        <section className="py-20 bg-[#F4EFE6] border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                {s.contrast_tag || "The Turning Point"}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2 mb-4 leading-tight">
                {s.contrast_h2}
              </h2>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                {s.contrast_p}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1: The Jewellery Trade */}
              <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#DCD5C8] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg mb-5 font-bold font-mono">
                    01
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 font-bold block mb-1">
                    {s.contrast_card1_tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                    {s.contrast_card1_title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {s.contrast_card1_desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono font-semibold text-stone-800">
                  <FiAward className="text-[#8C4A00]" />
                  <span>{s.contrast_card1_sub}</span>
                </div>
              </div>

              {/* Pillar 2: The Honey Market Reality */}
              <div className="bg-[#FAF5EE] p-7 sm:p-8 rounded-2xl border border-amber-300/80 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg mb-5 font-bold font-mono">
                    02
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-red-700 font-bold block mb-1">
                    {s.contrast_card2_tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                    {s.contrast_card2_title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {s.contrast_card2_desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-200/80 flex items-center gap-2 text-xs font-mono font-semibold text-red-800">
                  <FiX className="text-red-600 text-base" />
                  <span>{s.contrast_card2_sub}</span>
                </div>
              </div>

              {/* Pillar 3: The Bee Desi Resolution */}
              <div className="bg-[#181512] text-white p-7 sm:p-8 rounded-2xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#8C4A00] text-amber-100 flex items-center justify-center text-lg mb-5 font-bold font-mono">
                    03
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    {s.contrast_card3_tag}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {s.contrast_card3_title}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    {s.contrast_card3_desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-700 flex items-center gap-2 text-xs font-mono font-semibold text-amber-300">
                  <FiCheck className="text-emerald-400 text-base" />
                  <span>{s.contrast_card3_sub}</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 4: THE FIVE CHAPTERS CHRONICLE ── */}
        <section className="py-20 bg-white border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                  {s.chronicle_tag || "Chronological Monograph"}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2">
                  {s.chronicle_h2 || "The Journey: Step by Step"}
                </h2>
              </div>
              <p className="text-stone-500 text-sm font-mono max-w-sm">
                {s.chronicle_p}
              </p>
            </div>

            {/* Timeline Stepper Navigation — Swipeable on mobile, grid on desktop */}
            <div className="flex sm:grid sm:grid-cols-5 overflow-x-auto scrollbar-none gap-2.5 pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              {chapters.map((ch, idx) => {
                const isSelected = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`flex-shrink-0 w-36 sm:w-auto text-left p-3.5 sm:p-4 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? "bg-[#181512] text-white border-[#181512] shadow-md shadow-stone-900/10"
                        : "bg-[#FAF7F2] text-stone-700 border-[#DCD5C8] hover:border-[#8C4A00]/40 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`block font-mono text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        isSelected ? "text-amber-400" : "text-[#8C4A00]"
                      }`}
                    >
                      Chapter {ch.id}
                    </span>
                    <span className="block font-bold text-xs sm:text-sm truncate">{ch.phase}</span>
                    <span
                      className={`block font-mono text-[10px] sm:text-[11px] mt-1 ${
                        isSelected ? "text-stone-300" : "text-stone-500"
                      }`}
                    >
                      {ch.period}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Card */}
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#DCD5C8] p-6 sm:p-12 shadow-sm relative overflow-hidden">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-[#181512] text-white">
                    {activeChapter.period}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#8C4A00] font-bold">
                    Chapter {activeChapter.id} · {activeChapter.phase}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181512] mb-4">
                  {activeChapter.title}
                </h3>

                <p className="text-lg text-stone-700 font-medium mb-6 leading-relaxed">
                  {activeChapter.summary}
                </p>

                <div className="border-t border-[#DCD5C8] pt-6 mb-8 text-stone-800 text-base sm:text-lg leading-relaxed space-y-4">
                  <p>{activeChapter.story}</p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#DCD5C8] flex items-start gap-3.5">
                  <FiAward className="text-[#8C4A00] text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#8C4A00] block mb-0.5">
                      {s.key_takeaway || "Key Takeaway"}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                      {activeChapter.takeaway}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── SECTION 5: INVITATION & DIRECT ACTION ── */}
        <section className="py-20 bg-[#181512] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold block mb-3">
              {s.invite_tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              {s.invite_h2}
            </h2>
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              {s.invite_p}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#catalog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8C4A00] hover:bg-[#733C00] text-white font-bold text-sm transition-all shadow-lg shadow-black/40 group"
              >
                <span>{s.btn_shop_honeys}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/917071101119?text=Namaste%20Suresh%20ji,%20I%20would%20like%20to%20order%20pure%20honey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <FiMessageCircle className="text-emerald-400" />
                <span>{s.btn_talk_whatsapp}</span>
              </a>

              <a
                href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <FiMapPin className="text-amber-400" />
                <span>{s.btn_open_maps}</span>
                <FiExternalLink className="text-xs text-stone-400" />
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-stone-800 text-xs font-mono text-stone-400 flex flex-wrap justify-center gap-6">
              <span>{s.footer_direct_phones || "DIRECT PHONES:"} <a href="tel:7071101119" className="hover:underline text-amber-300">7071101119</a> / <a href="tel:9307777500" className="hover:underline text-amber-300">9307777500</a></span>
              <span>EMAIL: hello@beedesi.in</span>
              <span>{s.footer_origin || "ORIGIN: Kanpur, Uttar Pradesh, India"}</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
