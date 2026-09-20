"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BENCHMARKS } from "@/data/products";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiHeart,
  FiShield,
  FiSun,
  FiUsers,
  FiFeather
} from "react-icons/fi";

export default function HeritageStory() {
  const [showCrystallizationGuide, setShowCrystallizationGuide] = useState(false);

  return (
    <section id="heritage" className="w-full py-24 bg-surface scroll-mt-24 relative overflow-hidden">
      {/* Decorative Gold Honeycomb Corner Motif (asset 6.png) */}
      <div className="absolute top-10 left-4 w-40 h-52 opacity-10 pointer-events-none select-none hidden lg:block">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Ornament"
          width={160}
          height={210}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Sacred Apiculture &amp; Ethical Stewardship
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-propolis-charcoal mt-2 mb-4">
            Reviving Native Indian Bees &amp; Tribal Livelihoods
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            In modern commercial beekeeping, European bees are trucked across monocultures and subjected to chemical fumigation. Bee Desi is built upon the timeless wisdom of India’s indigenous forest foragers and gentle native bees (*Apis Cerana Indica*).
          </p>
        </div>

        {/* 4 Pillars Grid with Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {/* Pillar 1: 40% Hive Retention with Honeycomb Cluster (asset 1.png) */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3 relative overflow-hidden group hover:border-amber-radiance/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-radiance/20 text-primary flex items-center justify-center text-xl">
                <FiHeart />
              </div>
              <div className="w-12 h-12 relative opacity-70 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/assets/1.png"
                  alt="Honeycomb Retention"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="font-serif text-lg font-bold text-propolis-charcoal">
              40% Hive Retention
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Industrial apiaries strip every drop of honey, starving colonies and feeding them white sugar water. Bee Desi harvesters always preserve at least 40% of the honeycomb for the bees' offspring.
            </p>
          </div>

          {/* Pillar 2: Zero-Smoke with Honeycomb Panel (asset 8.png) */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3 relative overflow-hidden group hover:border-amber-radiance/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-700/20 text-emerald-800 flex items-center justify-center text-xl">
                <FiFeather />
              </div>
              <div className="w-12 h-12 relative opacity-60 group-hover:opacity-90 transition-opacity">
                <Image
                  src="/images/assets/8.png"
                  alt="Natural Honeycomb"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="font-serif text-lg font-bold text-propolis-charcoal">
              Zero-Smoke Harvesting
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              We reject suffocating kerosene or torch smoke. Traditional Baiga and Mawali foragers use gentle herbal leaf brushing and night harvesting, ensuring zero trauma or fatality to the queen and her brood.
            </p>
          </div>

          {/* Pillar 3: ₹320+ Direct Pay */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3 relative overflow-hidden group hover:border-amber-radiance/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-radiance/20 text-primary flex items-center justify-center text-xl">
              <FiUsers />
            </div>
            <h3 className="font-serif text-lg font-bold text-propolis-charcoal">
              ₹320+ / kg Direct Fair Pay
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Commercial honey aggregators pay forest gatherers as little as ₹140/kg. Bee Desi pays direct fair wages of ₹320–₹380/kg, bypassing exploitative middlemen to fund tribal solar grids and clean water.
            </p>
          </div>

          {/* Pillar 4: Native Indian Bees with Flying Honeybee (asset 10.png) */}
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3 relative overflow-hidden group hover:border-amber-radiance/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center text-xl">
                <FiSun />
              </div>
              <div className="w-14 h-14 relative group-hover:scale-110 transition-transform">
                <Image
                  src="/images/assets/10.png"
                  alt="Apis Cerana Native Bee"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="font-serif text-lg font-bold text-propolis-charcoal">
              Crop Pollination Catalyst
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Native *Apis cerana indica* bees forage sustainably without aggressive migration, boosting agricultural crop yields for marginal Indian farmers by 30% to 60% through natural cross-pollination.
            </p>
          </div>
        </div>

        {/* The Benchmark Comparison Table */}
        <div className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/30 shadow-sm mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Radical Purity Comparison
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal mt-1">
                Industrial Honey vs. Conventional Organic vs. Bee Desi
              </h3>
            </div>
            <span className="text-xs text-outline font-semibold">
              Benchmarked against FSSAI &amp; European Honey Standards
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-outline-variant/30 text-propolis-charcoal">
                  <th className="py-3 px-4 font-bold font-serif text-sm">Quality Parameter</th>
                  <th className="py-3 px-4 text-outline font-medium">Mass Supermarket Honey</th>
                  <th className="py-3 px-4 text-outline font-medium">Generic "Organic" Brands</th>
                  <th className="py-3 px-4 bg-primary/10 text-primary font-bold rounded-t-xl">
                    Bee Desi Artisanal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {BENCHMARKS.map((b, i) => (
                  <tr key={i} className="hover:bg-surface/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-propolis-charcoal">
                      {b.parameter}
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">
                      <div className="flex items-start gap-1.5 text-red-900/80">
                        <FiXCircle className="text-red-500 text-base flex-shrink-0 mt-0.5" />
                        <span>{b.supermarket}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">
                      <div className="flex items-start gap-1.5 text-on-surface-variant">
                        <FiAlertCircle className="text-amber-600 text-base flex-shrink-0 mt-0.5" />
                        <span>{b.competitors}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 bg-primary/10 text-propolis-charcoal font-semibold">
                      <div className="flex items-start gap-1.5 text-emerald-900">
                        <FiCheckCircle className="text-emerald-700 text-base flex-shrink-0 mt-0.5" />
                        <span>{b.beeDesi}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The Honey Crystallization Truth Card with Liquid Honey Swirl (asset 5.png) */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 text-amber-950 relative overflow-hidden shadow-sm">
          {/* Artisanal Honey Swirl Illustration (asset 5.png) */}
          <div className="w-24 h-28 sm:w-32 sm:h-36 relative flex-shrink-0 filter drop-shadow-md">
            <Image
              src="/images/assets/5.png"
              alt="Natural Honey Swirl"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-primary">
                Dispelling the Commercial Myth
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                Living Science
              </span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-propolis-charcoal">
              Why Real Raw Honey Crystallizes (And Why You Should Celebrate It)
            </h4>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Many consumers believe that honey turning cloudy, thick, or crystalline is a sign of sugar adulteration. In reality, **the exact opposite is true**. Raw, unpasteurized honey naturally contains living glucose and microscopic wild pollen grains. Over time, natural glucose molecules form fine crystal lattices. Honey that stays crystal-clear forever has usually been ultra-heated to 75°C, micro-filtered to strip all pollen, or spiked with artificial syrups.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-primary">
                Tip: If you prefer a fluid texture, simply place your jar in warm water (under 40°C) for 10 minutes. Never microwave!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
