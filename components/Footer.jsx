"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  FiShield,
  FiMail,
  FiArrowRight,
  FiCheckCircle,
  FiMapPin,
  FiHeart,
  FiAward,
  FiLock,
  FiPhone,
  FiSun,
  FiClock,
  FiCopy,
  FiCheck,
  FiExternalLink,
  FiDroplet,
  FiMessageCircle
} from "react-icons/fi";

const TERROIR_ORIGINS = [
  {
    title: "Kashmir Alpine Acacia",
    elevation: "1,850m MSL",
    biome: "Pristine Himalayan Valley",
    notes: "Water-Clear • Vanilla Orchid Floral Notes",
    tribe: "Gaddi & Gujjar Nomadic Apiarists",
    image: "/images/assets/1.png",
  },
  {
    title: "Balaghat Wild Jamun",
    elevation: "680m MSL",
    biome: "Satpura Dense Forest Canopy",
    notes: "Deep Purple Amber • Low Glycemic Tartness",
    tribe: "Baiga Indigenous Forest Gatherers",
    image: "/images/assets/3.png",
  },
  {
    title: "Sunderbans Estuary Wild",
    elevation: "Sea Level (Tidal)",
    biome: "Sacred Mangrove Biosphere",
    notes: "Pungent Savory Caramel • High Bioflavonoids",
    tribe: "Traditional Mawali Honey Hunters",
    image: "/images/assets/5.png",
  },
  {
    title: "Rajasthan Wild Sidr",
    elevation: "720m MSL",
    biome: "Aravalli Ancient Scrub Jungle",
    notes: "Rich Butterscotch • Viscous Medicinal Nectar",
    tribe: "Bhil & Sahariya Native Stewards",
    image: "/images/assets/7.png",
  },
];

export default function Footer() {
  const { openNMRLookup, openQuiz, showToast } = useCart();
  const [email, setEmail] = useState("");
  const [subscribedCode, setSubscribedCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribedCode(data.promoCode || "BEEFIRST10");
        showToast("Welcome to the Harvest Guild! 10% voucher unlocked.");
        setEmail("");
      } else {
        setSubscribedCode("BEEFIRST10");
        showToast("Voucher BEEFIRST10 generated! Enjoy 10% off your order.");
        setEmail("");
      }
    } catch (err) {
      setSubscribedCode("BEEFIRST10");
      showToast("Voucher BEEFIRST10 unlocked! 10% discount applied.");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (subscribedCode) {
      navigator.clipboard.writeText(subscribedCode);
      setCopied(true);
      showToast("Code copied to clipboard! Paste at checkout.");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#120a05] text-[#fef9f2] relative overflow-hidden selection:bg-golden-nectar selection:text-propolis-charcoal">
      {/* ── TOP GOLDEN HONEY WAVE & DRIP DIVIDER ── */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg
          viewBox="0 0 1440 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-surface block transform rotate-180"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,45 480,75 720,45 C960,15 1200,65 1440,25 L1440,84 L0,84 Z"
            fill="currentColor"
          />
          <path
            d="M0,20 C320,60 640,10 960,50 C1200,80 1360,30 1440,40 L1440,84 L0,84 Z"
            fill="#d97706"
            fillOpacity="0.25"
          />
          <path
            d="M0,35 C280,75 560,35 840,65 C1120,95 1320,45 1440,55 L1440,84 L0,84 Z"
            fill="#120a05"
          />
        </svg>
      </div>

      {/* ── AMBIENT HONEY GLOW ORBS & BACKGROUND TEXTURES ── */}
      <div className="absolute top-10 left-1/4 w-[38rem] h-[38rem] bg-gradient-to-br from-amber-600/15 via-golden-nectar/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 right-10 w-[36rem] h-[36rem] bg-gradient-to-tl from-amber-700/20 via-golden-nectar/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Decorative Golden Honey Watermark Badge (asset 9.png) */}
      <div className="absolute -top-12 -right-16 w-96 h-96 opacity-[0.04] pointer-events-none select-none">
        <Image
          src="/images/assets/9.png"
          alt="Honey Emblem Watermark"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Decorative Honeycomb Corner Lattice (asset 6.png) */}
      <div className="absolute top-16 left-2 w-48 h-64 opacity-[0.07] pointer-events-none select-none">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Lattice"
          width={200}
          height={300}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 pb-16">

        {/* ── HEROIC TOP APICULTURE VIGNETTE & ASSET SHOWCASE ── */}
        <div className="rounded-3xl bg-gradient-to-br from-[#21140b]/90 via-[#190d06]/90 to-[#100703]/95 border border-amber-500/25 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden mb-16 backdrop-blur-md">
          {/* Subtle Honeycomb Texture Background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Golden Corner Motif Accent (asset 6.png) */}
          <div className="absolute -bottom-10 -right-10 w-44 h-44 opacity-20 pointer-events-none hidden sm:block">
            <Image
              src="/images/assets/6.png"
              alt="Honeycomb Ornament"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Brand Crest, Manifesto & Real-Time Apiary Status */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Crest Badge */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl p-1 bg-gradient-to-br from-amber-400/30 to-amber-900/60 border border-amber-400/40 shadow-honey-glow flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Bee Desi Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#fffcf5]">
                      Bee Desi
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      Artisanal Apiaries
                    </span>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-golden-nectar font-semibold mt-0.5">
                    100% Raw • Forest Gathered • Single Terroir
                  </span>
                </div>
              </div>

              {/* Editorial Statement */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#fff7ea] font-medium leading-tight">
                The Sacred Nectar of Ancient Canopies, Preserved in Its Purest Molecular State.
              </h2>
              <p className="text-sm text-[#e6d7c3]/85 font-sans leading-relaxed max-w-2xl">
                India’s premier artisanal apiculture house. Sourcing pure, unpasteurized micro-harvests directly from indigenous tribal foragers across Kashmir, the Satpura hills, Sunderbans mangroves, and the Aravalli forest. Tested by German Bruker 400MHz 1H-NMR for 0.00% synthetic adulteration.
              </p>

              {/* Real-time Tickers with Honeybee in Flight (asset 10.png) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-[#2c1a0e]/80 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-200 shadow-inner">
                  <FiClock className="text-amber-400 animate-pulse" />
                  <span>Apiary IST: {currentTime || "17:30:00"}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#2c1a0e]/80 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-200 shadow-inner">
                  <FiSun className="text-golden-nectar" />
                  <span>Kashmir Alpine: 14°C • Hive Health Pristine</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Apis Cerana Native Forage Active</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Product Vignette & Harvest Guild Card */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Product Visual Showcase: Realistic Dripping Honeycomb + Honey Dipper + Flying Bee */}
              <div className="relative rounded-2xl bg-gradient-to-tr from-black/40 via-amber-950/20 to-amber-900/10 border border-amber-500/20 p-4 flex items-center justify-between shadow-inner">
                {/* 3D Dripping Honeycomb Stack (asset 3.png) */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 filter drop-shadow-[0_10px_16px_rgba(217,119,6,0.35)] hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/assets/3.png"
                    alt="Pure Raw Dripping Honeycomb"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Flying Honeybee (asset 10.png) hovering between them */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 animate-float flex-shrink-0 filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
                  <Image
                    src="/images/assets/10.png"
                    alt="Apis Cerana Indica Native Honeybee"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Ultra-realistic Dripping Dipper (asset 4.png) */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 filter drop-shadow-[0_10px_16px_rgba(217,119,6,0.35)] hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/images/assets/4.png"
                    alt="Golden Honey Drizzle Wand"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Harvest Guild Private Club Invitation Card */}
              <div className="rounded-2xl bg-[#1c0f07] border border-amber-500/40 p-5 shadow-honey-lg flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-golden-nectar flex items-center gap-1.5">
                    <FiMail className="text-amber-400" /> Harvest Guild Allocations
                  </span>
                  <span className="text-[10px] font-mono bg-gradient-to-r from-amber-500 to-amber-600 text-black px-2.5 py-0.5 rounded-full font-black shadow-sm">
                    10% VOUCHER INSIDE
                  </span>
                </div>

                <p className="text-xs text-[#ded1be] font-sans leading-relaxed">
                  Join our private collector circle to unlock seasonal single-flora allocations before public bottling runs.
                </p>

                {subscribedCode ? (
                  <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/50 flex flex-col items-center gap-2">
                    <span className="text-xs text-amber-200 font-semibold flex items-center gap-1.5">
                      <FiCheckCircle className="text-emerald-400" /> Welcome to the Guild! Your private voucher:
                    </span>
                    <div className="flex items-center gap-2 w-full justify-center">
                      <span className="font-mono text-xl font-black tracking-widest text-golden-nectar bg-black/50 px-4 py-1.5 rounded-lg border border-amber-500/40 select-all">
                        {subscribedCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-2 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1 btn-tactile"
                        title="Copy voucher code"
                      >
                        {copied ? <FiCheck /> : <FiCopy />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <span className="text-[11px] text-amber-300/80">
                      Apply at checkout for 10% off your entire artisanal order.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-1">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email for 10% off..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-500/30 text-xs text-[#fffcf5] placeholder-amber-200/40 focus:outline-none focus:border-amber-400 font-sans shadow-inner"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-golden-nectar to-amber-600 text-black text-xs font-black uppercase tracking-wider hover:brightness-110 transition-all btn-tactile shadow-honey whitespace-nowrap flex items-center justify-center gap-1.5"
                    >
                      <span>{loading ? "Joining..." : "Join & Save 10%"}</span>
                      <FiArrowRight className="text-sm" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 SACRED INDIGENOUS BIOMES GALLERY ── */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-400">
                <FiDroplet className="text-xs" />
              </div>
              <h3 className="text-xs uppercase font-black tracking-[0.22em] text-golden-nectar">
                Sacred Indigenous Indian Terroirs &amp; Biomes
              </h3>
            </div>
            <span className="text-[11px] font-mono text-amber-200/70">
              100% Native Apis Cerana Indica Stewardship
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TERROIR_ORIGINS.map((t, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-gradient-to-b from-[#1e1108] to-[#150a04] p-5 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* Background Asset Accent */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-15 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
                  <Image
                    src={t.image}
                    alt={t.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {t.elevation}
                    </span>
                    <span className="text-[10px] text-amber-300/70 font-sans">
                      {t.biome}
                    </span>
                  </div>
                  <strong className="font-serif text-lg text-[#fff7ea] group-hover:text-golden-nectar transition-colors">
                    {t.title}
                  </strong>
                  <p className="text-xs text-[#d8c7b0] leading-relaxed">
                    {t.notes}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-amber-500/15 text-[11px] text-amber-400/90 font-mono flex items-center justify-between relative z-10">
                  <span>{t.tribe}</span>
                  <span className="text-golden-nectar opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HIGH-END 5-COLUMN DIRECTORY NAVIGATION ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 py-12 border-t border-b border-amber-500/20 text-xs font-sans">
          
          {/* Column 1: Single-Flora Spectrum (3 cols) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col gap-3.5">
            <span className="font-serif text-base font-bold tracking-wider text-golden-nectar uppercase">
              Single-Flora Spectrum
            </span>
            <ul className="flex flex-col gap-2.5 text-[#dcd0bf]">
              <li>
                <button
                  onClick={() => scrollToSection("catalog")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Wild Raw Jamun Honey (Balaghat)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("catalog")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Kashmiri White Acacia Honey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("catalog")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Sunderbans Wild Mangrove Honey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("catalog")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Aravalli Wild Sidr (Jujube) Honey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("catalog")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Naturally Creamed Mustard Honey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("terroir-flight")}
                  className="text-amber-300 font-bold hover:text-white transition-colors text-left flex items-center gap-1.5 pt-1"
                >
                  <span>★ The Connoisseur’s Terroir Flight</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Molecular Purity Science (3 cols) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col gap-3.5">
            <span className="font-serif text-base font-bold tracking-wider text-golden-nectar uppercase">
              Molecular Purity Science
            </span>
            <ul className="flex flex-col gap-2.5 text-[#dcd0bf]">
              <li>
                <button
                  onClick={() => openNMRLookup("BD-JAMUN-2026")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-2 text-amber-200 font-bold"
                >
                  <FiShield className="text-amber-400 flex-shrink-0" />
                  <span>German Bruker 400MHz 1H-NMR</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openNMRLookup("BD-ACACIA-2026")}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Diastase Enzyme Activity (&gt; 18 DN)</span>
                </button>
              </li>
              <li>
                <span className="text-[#a89b88] flex items-center gap-1.5">
                  <span className="text-amber-500/60">›</span>
                  <span>Low Moisture Unheated Standard (&lt; 17%)</span>
                </span>
              </li>
              <li>
                <span className="text-[#a89b88] flex items-center gap-1.5">
                  <span className="text-amber-500/60">›</span>
                  <span>C4 Corn &amp; C3 Invert Sugar Negativity (0.00%)</span>
                </span>
              </li>
              <li>
                <span className="text-[#a89b88] flex items-center gap-1.5">
                  <span className="text-amber-500/60">›</span>
                  <span>Pollen Spectrogram Fingerprinting</span>
                </span>
              </li>
              <li>
                <button
                  onClick={() => openNMRLookup("BD-SUNDER-2026")}
                  className="text-golden-nectar hover:underline transition-all text-left pt-1 font-mono text-[11px]"
                >
                  [Verify Batch Lab Spectrogram →]
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sacred Tribal Apiculture (3 cols) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col gap-3.5">
            <span className="font-serif text-base font-bold tracking-wider text-golden-nectar uppercase">
              Ethical Forest Stewardship
            </span>
            <p className="text-[#c7baa7] text-[11px] leading-relaxed">
              We pledge direct, fair living wages (₹320–₹380/kg) directly to indigenous Baiga, Gond, and Mawali honey gatherers. We never use smoke bombs or harm wild queen bees.
            </p>
            <div className="flex flex-col gap-2 text-[11px] text-amber-300/90 pt-1 font-mono">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0" />
                <span>Non-Violent Herbal Leaf Brushing</span>
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0" />
                <span>40% Minimum Hive Reserve Retained</span>
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0" />
                <span>100% Recyclable Amber Glass Jars</span>
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0" />
                <span>Zero Microplastics In Packaging</span>
              </span>
            </div>
          </div>

          {/* Column 4: Concierge & Orders (3 cols) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col gap-3.5">
            <span className="font-serif text-base font-bold tracking-wider text-golden-nectar uppercase">
              Apiary Concierge &amp; Help
            </span>
            <ul className="flex flex-col gap-2.5 text-[#dcd0bf]">
              <li>
                <Link href="/cart" className="hover:text-golden-nectar transition-colors flex items-center gap-1.5 group">
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Shopping Basket &amp; Discount Vouchers</span>
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-golden-nectar transition-colors flex items-center gap-1.5 group">
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Track Consignment Delivery</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={openQuiz}
                  className="hover:text-golden-nectar transition-colors text-left flex items-center gap-1.5 group text-amber-200 font-semibold"
                >
                  <span className="text-amber-400">✦</span>
                  <span>Honey Sommelier Terroir Quiz</span>
                </button>
              </li>
              <li>
                <Link href="/contact" className="hover:text-golden-nectar transition-colors flex items-center gap-1.5 group">
                  <span className="text-amber-500/60 group-hover:text-amber-400">›</span>
                  <span>Direct Concierge &amp; FAQ</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919133757575?text=Hello%20Bee%20Desi%20Concierge,%20I%20would%20like%20to%20inquire%20about%20your%20raw%20artisanal%20honey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 transition-colors font-medium mt-1"
                >
                  <FiMessageCircle className="text-emerald-400" />
                  <span>WhatsApp Concierge Hotline</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── ACCREDITATIONS, PAYMENT SECURITY & SIGNATURE STRIP ── */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#b8a792]">
          {/* Scientific & Quality Accreditations */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-[#fffaf0] font-semibold bg-white/5 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <FiShield className="text-amber-400 text-sm" />
              <span>Bruker 400MHz 1H-NMR</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#fffaf0] font-semibold bg-white/5 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <FiAward className="text-amber-400 text-sm" />
              <span>Intertek ISO/IEC 17025</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#fffaf0] font-semibold bg-white/5 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <FiCheckCircle className="text-emerald-400 text-sm" />
              <span>FSSAI Jaivik Bharat Organic</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#fffaf0] font-semibold bg-white/5 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <FiLock className="text-golden-nectar text-sm" />
              <span>Razorpay 256-Bit Encrypted</span>
            </span>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="flex flex-col items-center lg:items-end gap-1 text-center lg:text-right text-[11px]">
            <p className="text-[#e2d5c3] font-medium">
              © {new Date().getFullYear()} Bee Desi Artisanal Apiaries Pvt. Ltd. All Rights Reserved.
            </p>
            <p className="text-[#8e7e6e]">
              Handcrafted for Connoisseurs of Unheated Single-Flora Raw Honey across India &amp; Worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
