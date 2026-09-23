"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
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
  FiCompass,
  FiFeather,
  FiDroplet,
} from "react-icons/fi";

const CHAPTERS = [
  {
    id: "01",
    period: "1996 – 2009",
    phase: "The Early Soil",
    title: "Learning the Language of Bees",
    summary:
      "Long before Bee Desi had a name, Suresh Yadav was on his family's farm in Balaghat, learning traditional apiculture box by box.",
    story:
      "In 1996, Suresh placed his very first wooden bee box under wild berry and mustard blooms. He spent early mornings studying queen flight cycles, seasonal nectar flows, and the delicate hive equilibrium. Over thirteen years of boots-on-the-ground beekeeping, he trained dozens of local youth and lived alongside traditional forest gatherers. He learned the single most important lesson of his life: bees never cheat. A healthy colony produces liquid perfection—if humans don't interfere.",
    takeaway: "13 years of raw, traditional beekeeping experience in Central India.",
  },
  {
    id: "02",
    period: "2010 – 2017",
    phase: "The Detour",
    title: "Leaving the Hives: The Jewellery Trade",
    summary:
      "In 2010, family responsibilities and life circumstances led Suresh to leave beekeeping and step into the jewellery business.",
    story:
      "For nearly eight years, Suresh operated a jewellery business. In jewellery, purity is not an advertising slogan—it is a legal and moral oath. Gold is weighed to the third decimal place. Every ornament is held to a touchstone; 24 carats means 24 carats. If a jeweller hides 2 carats of impurity, it is fraud, plain and simple. Suresh lived by that uncompromising discipline day in and day out, building deep trust with families who brought their life savings to his counter.",
    takeaway: "Learning the sacred discipline of 24-karat hallmarked purity and zero tolerance for deception.",
  },
  {
    id: "03",
    period: "2018 – 2021",
    phase: "The Awakening",
    title: "The Shocking Reality of the Honey Market",
    summary:
      "While running his jewellery shop, Suresh began looking into what was happening to the honey on Indian grocery shelves.",
    story:
      "What he discovered horrified him. Commercial honey had turned into a multi-million-dollar scam. Giant corporate brands were importing cheap inverted sugar syrups, engineered rice syrups, and high-fructose corn syrups from abroad—engineered specifically to bypass outdated Indian laboratory tests. Honey was being boiled at 75°C to prevent crystallization, stripped of wild pollen, and blended with 70% industrial sugar syrup. Mothers were spooning it to sick infants; elders and diabetics were consuming it thinking it was Ayurvedic nectar. Meanwhile, honest beekeepers who refused to adulterate their hives were going bankrupt because factories could make fake syrup for a fraction of the cost.",
    takeaway: "Witnessing how synthetic sugar syrup pushed honest beekeepers out of work and misled millions of Indian families.",
  },
  {
    id: "04",
    period: "2022",
    phase: "The Decision",
    title: "Back to the Soil: 'People Deserve the Truth'",
    summary:
      "Suresh realized he could no longer stand behind a jewellery counter while knowing the truth.",
    story:
      "Suresh couldn't sleep. 'In jewellery,' he told his family, 'if I sold 18 carats as 24 carats, I would lose my honour. Why are big factories allowed to sell sugar syrup as medicinal honey to innocent families?' He realized he had something very rare: decades of hands-on beekeeping mastery combined with the uncompromising purity ethics of a jeweller. He made the radical choice to leave the jewellery business behind, pack his boots, and walk straight back to the soil.",
    takeaway: "Leaving a comfortable jewellery business to restore honest, unadulterated honey to Indian homes.",
  },
  {
    id: "05",
    period: "Today",
    phase: "The Standard",
    title: "Bee Desi: The 24-Karat Standard in Honey",
    summary:
      "Founded with a singular mission: pure, raw, unheated honey directly from Indian forest blooms.",
    story:
      "Bee Desi was created as an uncompromising answer to commercial syrup. Suresh reconnected with tribal forest foragers and traditional beekeepers across Central India, Kashmir, and Rajasthan. Every drop of Bee Desi honey is kept raw—never heated above hive temperature (35°C), never ultra-filtered to remove medicinal pollen, and 100% free of sugar syrups. To provide the same certainty as hallmarked gold, every single batch is certified using German Bruker 400MHz NMR spectroscopy—confirming 0.00% synthetic adulterants.",
    takeaway: "Direct from traditional beekeepers. German NMR tested. Unheated, raw, and 100% pure.",
  },
];

export default function OurStoryPage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181512] selection:bg-amber-200 selection:text-stone-900">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        
        {/* ── SECTION 1: EDITORIAL COVER / HERO ── */}
        <section className="relative border-b border-[#E7E2D8] bg-[#F4EFE6] pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          {/* Subtle archival texture watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top metadata strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#DCD5C8]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                  Documentary Chronicle
                </span>
                <span className="text-[#C5BDB0]">/</span>
                <span className="font-mono text-xs text-stone-500">The Suresh Yadav Story</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                <span>BALAGHAT, MADHYA PRADESH</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8C4A00]" />
                <span className="text-stone-900 font-semibold">1996 — TODAY</span>
              </div>
            </div>

            {/* Giant Editorial Headline */}
            <div className="max-w-5xl">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[74px] font-bold text-[#181512] leading-[1.08] tracking-tight mb-8">
                In 2010, he left the bees to sell gold.{" "}
                <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#8C4A00]">
                  Then he saw what was being sold as honey.
                </span>
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-[#DCD5C8]">
                <p className="lg:col-span-8 text-lg sm:text-xl text-[#3A322C] leading-relaxed font-sans">
                  The true story of <strong className="text-stone-950 font-bold">Suresh Yadav</strong>: a beekeeper who spent years working in the jewellery trade, witnessed how industrial inverted sugar syrup took over the Indian honey market, and chose to walk back to the soil to give people the purest honey they deserve.
                </p>

                <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-[#DCD5C8] flex flex-col gap-1.5 font-mono text-xs text-stone-600">
                  <div className="text-[11px] text-[#8C4A00] font-bold uppercase tracking-wider">
                    Founder Credentials
                  </div>
                  <div className="text-sm font-bold text-stone-900 font-sans">Suresh Yadav</div>
                  <div>Grassroots Beekeeper (Est. 1996)</div>
                  <div>Former Jeweller &amp; Hallmarking Advocate</div>
                  <div className="text-[#8C4A00] font-semibold pt-1 border-t border-stone-200">
                    Founder, Bee Desi Artisanal Honey
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
                    <div className="absolute bottom-3 left-3 right-3 bg-[#181512]/80 backdrop-blur-md px-3 py-2 rounded-lg text-white text-[11px] font-mono flex items-center justify-between">
                      <span>Suresh Yadav · Balaghat HQ</span>
                      <span className="text-amber-300 font-bold">Est. 1996</span>
                    </div>
                  </div>

                  {/* Caption & Authentic Proof */}
                  <div className="mt-4 pt-3 border-t border-[#E5E0D5] flex flex-col gap-2 text-xs text-stone-600">
                    <p className="italic text-stone-700 font-serif text-sm">
                      "I spent years weighing gold by the milligram. You cannot lie about purity. When I returned to bees, I brought that exact same rule with me."
                    </p>
                    <span className="text-[11px] font-mono text-stone-400">
                      Photographed at Bee Desi Central Processing Center, Balaghat (M.P.)
                    </span>
                  </div>

                  {/* Direct Contact Desk Box */}
                  <div className="mt-5 p-4 rounded-xl bg-white border border-[#DCD5C8] flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-stone-500 uppercase tracking-wider text-[10px] font-bold">
                        Founder Direct Line
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        Available for Visits
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
                        href="https://wa.me/917071101119?text=Namaste%20Suresh%20ji,%20I%20read%20your%20story%20on%20Bee%20Desi%20and%20wanted%20to%20reach%20out."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FiMessageCircle />
                        <span>WhatsApp Desk</span>
                      </a>
                      <a
                        href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FiMapPin />
                        <span>View Location</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Suresh's Authentic Narrative */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C4A00] font-bold block mb-2">
                    In The Founder's Own Words
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181512] leading-[1.14]">
                    "When you sell gold, cheating by 1 carat is a crime. Why should feeding sugar syrup to people be any different?"
                  </h2>
                </div>

                <div className="space-y-5 text-[#2E2824] text-base sm:text-lg leading-relaxed font-sans">
                  <p>
                    "I began keeping bees in 1996 on our family land. In those days, beekeeping was quiet, honest agricultural work. We put our wooden boxes where the flowers bloomed—mustard in the winter, wild berries in spring, jamun in the summer. We watched the bees, waited for them to seal the comb with natural beeswax, and harvested only the surplus. That honey was medicine. People took a spoonful with crushed ginger for a cold, or used it during holy fasts. You could smell the actual flower the moment you opened the container."
                  </p>

                  <p>
                    "In 2010, due to family and life situations, I had to step away from beekeeping. I started a jewellery business. In jewellery, purity is not an opinion. When someone walks into your shop to buy gold, they bring their hard-earned life savings. You put the ornament on a touchstone. You weigh it down to milligrams. If you claim 24 carats and secretly give 18 carats, you are a cheat. I spent years in that trade, and that discipline of absolute, uncompromising purity became part of who I am."
                  </p>

                  {/* Spotlight Quote */}
                  <div className="p-6 bg-[#FAF7F2] rounded-2xl border-l-4 border-[#8C4A00] border-t border-r border-b border-[#E5E0D5]">
                    <p className="font-serif italic text-xl sm:text-2xl text-[#181512] leading-snug">
                      "Then, after a few years, I started looking closely at what was happening in the honey market. What I saw broke my heart."
                    </p>
                  </div>

                  <p>
                    "Massive commercial brands were flooding grocery store shelves with plastic squeeze bottles labeled '100% Pure Forest Honey.' But behind the scenes, Chinese-imported inverted sugar syrups, engineered rice syrups, and high-fructose corn syrups were being mixed by the tanker-load. These syrups were chemically engineered to fool basic C3/C4 lab tests. They boiled the honey at 75°C so it would stay watery and never crystallize, completely destroying live enzymes like diastase and invertase."
                  </p>

                  <p>
                    "Mothers were feeding this boiled sugar syrup to their sick children for coughs. Elders were taking it for diabetes, thinking it was pure Ayurvedic medicine. Meanwhile, honest village beekeepers who refused to cheat were going bankrupt because big factories told them: <em>'Why should we buy your real honey at ₹300 when we can buy fake syrup for ₹70?'</em>"
                  </p>

                  <p>
                    "I couldn't just sit behind my jewellery counter and ignore it. I knew the bees. I knew the soil. I had nearly 30 years of knowledge about how real honey is actually gathered. If someone with that experience doesn't stand up and go back to the soil, who will?"
                  </p>

                  <p>
                    "So I made the decision: I left the jewellery business, put my boots back on, and went back to the fields. I started <strong className="text-stone-950 font-bold">Bee Desi</strong> with one clear promise: to give people the purest honey they deserve. No sugar syrup. No boiling. No shortcuts. Honey held to the exact same 24-karat standard as hallmarked gold."
                  </p>
                </div>

                {/* Signature Block */}
                <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#8C4A00]">
                      Suresh Yadav
                    </div>
                    <div className="text-xs font-mono text-stone-500 mt-0.5">
                      Master Farmer &amp; Founder, Bee Desi
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 text-xs font-mono font-bold text-stone-800">
                      Balaghat, M.P.
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#FAF0E4] border border-[#E8D0B5] text-xs font-mono font-bold text-[#8C4A00]">
                      100% Farmer Owned
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
                The Turning Point
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2 mb-4 leading-tight">
                Two Worlds: The Jeweller's Scale vs. The Supermarket Shelf
              </h2>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                Why Suresh's background in the jewellery trade became the foundation for India's strictest honey purity standards.
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
                    What He Learned in 2010
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                    The 24-Karat Principle
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    In jewellery, every milligram is weighed. Purity is assayed by fire and touchstones. A jeweller who cheats by 1% is ruined forever because customer trust is sacred.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono font-semibold text-stone-800">
                  <FiAward className="text-[#8C4A00]" />
                  <span>Absolute Precision &amp; Trust</span>
                </div>
              </div>

              {/* Pillar 2: The Honey Market Reality */}
              <div className="bg-[#FAF5EE] p-7 sm:p-8 rounded-2xl border border-amber-300/80 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100/40 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-lg mb-5 font-bold font-mono">
                    02
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-red-700 font-bold block mb-1">
                    The Crisis He Uncovered
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                    The Sugar Syrup Invasion
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Massive brands secretly mixing 70% inverted sugar and rice syrups, boiling honey at 75°C to make it clear, and bankrupting traditional beekeepers who refused to cheat.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-amber-200/80 flex items-center gap-2 text-xs font-mono font-semibold text-red-800">
                  <FiX className="text-red-600 text-base" />
                  <span>Cheating Families for Profit</span>
                </div>
              </div>

              {/* Pillar 3: The Bee Desi Resolution */}
              <div className="bg-[#181512] text-white p-7 sm:p-8 rounded-2xl border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#8C4A00] text-amber-100 flex items-center justify-center text-lg mb-5 font-bold font-mono">
                    03
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    The Bee Desi Answer
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    Back to the Soil
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    Suresh applied the jeweller’s zero-tolerance standard to honey: cold-extracted below 35°C, zero sugar feeds, and independent Bruker 400MHz German NMR testing.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-700 flex items-center gap-2 text-xs font-mono font-semibold text-amber-300">
                  <FiCheck className="text-emerald-400 text-base" />
                  <span>0.00% Adulteration Guaranteed</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 4: THE FIVE CHAPTERS CHRONICLE (INTERACTIVE & ARCHIVAL) ── */}
        <section className="py-20 bg-white border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                  Chronological Monograph
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2">
                  The Journey: Step by Step
                </h2>
              </div>
              <p className="text-stone-500 text-sm font-mono max-w-sm">
                Click any era below to follow Suresh's path from village hives, into the jewellery trade, and back to the earth.
              </p>
            </div>

            {/* Timeline Stepper Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
              {CHAPTERS.map((ch, idx) => {
                const isSelected = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`text-left p-4 rounded-xl border transition-all text-xs ${
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
                    <span className="block font-bold text-sm truncate">{ch.phase}</span>
                    <span
                      className={`block font-mono text-[11px] mt-1 ${
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
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#DCD5C8] p-8 sm:p-12 shadow-sm relative overflow-hidden">
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
                      Key Takeaway
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

        {/* ── SECTION 5: WHAT "PURE HONEY" ACTUALLY MEANS ── */}
        <section className="py-20 bg-[#F4EFE6] border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8C4A00] font-bold">
                The Beekeeper's Truth
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] mt-2 mb-4 leading-tight">
                Why Real Honey Doesn’t Look Like Supermarket Syrup
              </h2>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                Industrial factories convinced a generation of Indians that honey should be clear, runny, and identical all year round. Here is what real raw honey actually looks and behaves like:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-[#DCD5C8] flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg font-bold">
                  01
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  It Naturally Crystallizes
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Real raw honey has natural glucose and pollen that naturally form crystals in winter. Fake sugar syrup stays runny forever because it was boiled and diluted. Crystallization is proof of life!
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DCD5C8] flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg font-bold">
                  02
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Never Heated Above 35°C
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Commercial brands boil honey at 75°C to pasteurize it. We keep our honey strictly under 35°C (the natural temperature of the beehive), keeping diastase and invertase enzymes alive.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DCD5C8] flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg font-bold">
                  03
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Zero Inverted or Rice Syrups
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  We never feed sugar water or artificial corn syrups to the bees. Even during dry seasons, the bees feed on their own reserve honeycomb, never synthetic substitutes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DCD5C8] flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg font-bold">
                  04
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Bruker NMR Gold Standard
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Just like a hallmarked gold bar, every harvest is certified with 400MHz Nuclear Magnetic Resonance spectroscopy in Germany, guaranteeing zero adulterants down to 0.01%.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 6: INVITATION & DIRECT ACTION ── */}
        <section className="py-20 bg-[#181512] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold block mb-3">
              Open Door Apiaries · Balaghat, M.P.
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Come Taste What Real Honey Is Supposed to Be
            </h2>
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              We welcome doctors, chefs, mothers, beekeepers, and curious customers to visit our extraction center in Balaghat, meet Suresh Yadav in person, and inspect the hives.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#catalog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8C4A00] hover:bg-[#733C00] text-white font-bold text-sm transition-all shadow-lg shadow-black/40 group"
              >
                <span>Shop Raw Single-Origin Honeys</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/917071101119?text=Namaste%20Suresh%20ji,%20I%20would%20like%20to%20order%20pure%20honey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <FiMessageCircle className="text-emerald-400" />
                <span>Talk to Suresh on WhatsApp</span>
              </a>

              <a
                href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <FiMapPin className="text-amber-400" />
                <span>Open Google Maps</span>
                <FiExternalLink className="text-xs text-stone-400" />
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-stone-800 text-xs font-mono text-stone-400 flex flex-wrap justify-center gap-6">
              <span>FOUNDER PHONE: +91 7071101119 / 9307777500</span>
              <span>EMAIL: hello@beedesi.in</span>
              <span>LOCATION: Balaghat, Madhya Pradesh, India</span>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
