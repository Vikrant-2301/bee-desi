"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
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
  FiStar,
} from "react-icons/fi";

const DIFFERENTIATORS = [
  {
    icon: FiShield,
    title: "German NMR Lab Certification",
    desc: "Every single batch is independently tested at Bruker BioSpin NMR Laboratories in Rheinstetten, Germany using 400MHz proton NMR spectroscopy. This is the most advanced honey purity test in the world, and we publish every result openly on our website. No other Indian honey brand does this.",
    stat: "0.00%",
    statLabel: "Adulteration Detected",
    color: "emerald",
  },
  {
    icon: FiUsers,
    title: "Direct Tribal Sourcing",
    desc: "We work directly with Baiga, Gond, Mawali, and Gujjar-Bakarwal indigenous communities across India. No brokers, no middlemen, no mandi aggregators. We transfer fair wages (₹320–₹380/kg) directly to forager wallets within 48 hours of harvest delivery.",
    stat: "₹380/kg",
    statLabel: "Direct Fair Wage",
    color: "amber",
  },
  {
    icon: FiDroplet,
    title: "Single-Flora, Single-Terroir",
    desc: "Commercial honey is blended from dozens of sources to achieve consistent colour and taste. Ours is the opposite — each jar comes from a single flora, a single forest, a single harvest. Like wine with a vintage label, every batch has a personality you can taste.",
    stat: "6",
    statLabel: "Exclusive Terroirs",
    color: "blue",
  },
  {
    icon: FiHeart,
    title: "Raw, Unheated, Unpasteurized",
    desc: "Heating honey above 40°C destroys diastase enzymes, kills antioxidants, and increases HMF (a marker of degradation). Our honey is cold-settled and bottled below 35°C. What you receive is the same living nectar the bees produced — not a processed sugar syrup.",
    stat: "21.4 DN",
    statLabel: "Live Enzyme Activity",
    color: "purple",
  },
  {
    icon: FiTruck,
    title: "Cold-Chain Delivery",
    desc: "Raw honey must be kept below 35°C to preserve its molecular integrity. We dispatch every order in insulated packaging with cold-chain logistics partners. Your honey arrives exactly as it left the forest — alive and pure.",
    stat: "2–4 Days",
    statLabel: "Delivery Across India",
    color: "orange",
  },
  {
    icon: FiAward,
    title: "Sustainable Apiculture",
    desc: "We leave a minimum 40% hive reserve for colony health. We never use smoke bombs. We never transport hives from their native forests. Our bee species — Apis Cerana Indica — are never replaced with commercial Apis Mellifera. This honey is truly native.",
    stat: "40%",
    statLabel: "Hive Reserve Retained",
    color: "green",
  },
];

const colorMap = {
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", stat: "text-emerald-700", iconBg: "bg-emerald-100" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600", stat: "text-amber-700", iconBg: "bg-amber-100" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", stat: "text-blue-700", iconBg: "bg-blue-100" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600", stat: "text-purple-700", iconBg: "bg-purple-100" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", icon: "text-orange-600", stat: "text-orange-700", iconBg: "bg-orange-100" },
  green: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600", stat: "text-green-700", iconBg: "bg-green-100" },
};

const COMPARISON = [
  { feature: "NMR Lab Tested", us: true, them: false },
  { feature: "Single-Flora, Single Terroir", us: true, them: false },
  { feature: "Raw & Unheated (<40°C)", us: true, them: false },
  { feature: "Zero Sugar Syrups", us: true, them: "?" },
  { feature: "Direct Tribal Sourcing", us: true, them: false },
  { feature: "Published Lab Reports", us: true, them: false },
  { feature: "Cold-Chain Delivery", us: true, them: false },
  { feature: "Sustainable Apiculture", us: true, them: false },
  { feature: "Native Apis Cerana Bees", us: true, them: false },
  { feature: "FSSAI Organic Certified", us: true, them: "?" },
];

const STATS = [
  { value: "352+", label: "Verified Customers" },
  { value: "0.00%", label: "Adulteration" },
  { value: "6", label: "Forest Terroirs" },
  { value: "400MHz", label: "NMR Precision" },
];

export default function WhyUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 py-16 lg:py-24 overflow-hidden border-b border-amber-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-widest mb-6">
              Why Bee Desi · Farmer Suresh Yadav (Est. 1996)
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight mb-6">
              Honey Like{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                Nature Intended
              </span>
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Founded in 1996 by farmer Suresh Yadav. In an industry flooded with inverted sugar syrups, we built an uncompromising, farmer-owned alternative tested by German Bruker NMR.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#catalog"
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-7 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-amber-200 group"
              >
                Shop Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/our-story"
                className="flex items-center gap-2 bg-white border border-stone-200 hover:border-amber-300 text-stone-700 px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm"
              >
                Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-stone-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-4xl font-bold text-amber-400 mb-1">{value}</p>
                <p className="text-sm text-stone-400">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6 Differentiators */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-3">
                6 Reasons We're Different
              </h2>
              <p className="text-stone-400 text-base max-w-xl mx-auto">
                These aren't marketing claims. Every point below is verifiable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DIFFERENTIATORS.map((item, idx) => {
                const c = colorMap[item.color];
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`relative rounded-3xl border ${c.border} ${c.bg} p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
                        <Icon className={`${c.icon} text-xl`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-stone-400 bg-white/60 px-2 py-1 rounded-full border border-stone-200">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className={`mt-auto pt-4 border-t ${c.border}`}>
                      <span className={`font-serif text-2xl font-bold ${c.stat}`}>{item.stat}</span>
                      <p className="text-xs text-stone-400 mt-0.5">{item.statLabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-stone-900 mb-3">
                Bee Desi vs. Commercial Honey
              </h2>
              <p className="text-stone-400 text-base max-w-xl mx-auto">
                Side-by-side comparison. The facts speak for themselves.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-stone-900 text-white">
                <div className="p-4 text-sm font-bold text-stone-300">Feature</div>
                <div className="p-4 text-center">
                  <span className="text-sm font-bold text-amber-400">🍯 Bee Desi</span>
                </div>
                <div className="p-4 text-center">
                  <span className="text-sm font-bold text-stone-400">Commercial Brands</span>
                </div>
              </div>

              {/* Rows */}
              {COMPARISON.map(({ feature, us, them }, i) => (
                <div
                  key={feature}
                  className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-stone-50"} border-b border-stone-100 last:border-b-0`}
                >
                  <div className="p-4 text-sm text-stone-700 font-medium">{feature}</div>
                  <div className="p-4 flex items-center justify-center">
                    {us === true ? (
                      <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FiCheck className="text-emerald-600 text-sm" />
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                        <FiX className="text-red-500 text-sm" />
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {them === true ? (
                      <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FiCheck className="text-emerald-600 text-sm" />
                      </span>
                    ) : them === false ? (
                      <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                        <FiX className="text-red-500 text-sm" />
                      </span>
                    ) : (
                      <span className="text-stone-400 text-sm font-bold">?</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700 text-white text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4">
              {[1,2,3,4,5].map(s => (
                <FiStar key={s} className="fill-amber-300 text-amber-300 text-xl" />
              ))}
            </div>
            <h2 className="font-serif text-4xl font-bold mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="text-amber-100 text-base mb-8 leading-relaxed">
              Join 352 verified customers who've made the switch to real, pure, unadulterated honey from India's ancient forests.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#catalog"
                className="flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 px-7 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg group"
              >
                Shop All Honeys <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/faqs"
                className="flex items-center gap-2 border border-amber-400 text-white hover:bg-amber-500 px-6 py-4 rounded-2xl font-bold text-sm transition-all"
              >
                Have Questions? See FAQs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
