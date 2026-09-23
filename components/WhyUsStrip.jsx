"use client";

import React from "react";
import Link from "next/link";
import { FiShield, FiTruck, FiUsers, FiAward, FiArrowRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyUsStrip() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: FiShield,
      title: t("strip_title1", "Bruker NMR Certified"),
      desc: t("strip_desc1", "German 400MHz NMR spectroscopy confirms 0.00% synthetic sugar adulteration per batch."),
    },
    {
      icon: FiUsers,
      title: t("strip_title2", "Direct Forager Payouts"),
      desc: t("strip_desc2", "No brokers or middlemen. Paying ₹320–₹380/kg directly to indigenous forest gatherers."),
    },
    {
      icon: FiAward,
      title: t("strip_title3", "Raw & Unheated (<35°C)"),
      desc: t("strip_desc3", "Never boiled or pasteurized. Living diastase and invertase enzymes remain 100% active."),
    },
    {
      icon: FiTruck,
      title: t("strip_title4", "Single-Flora Purity"),
      desc: t("strip_desc4", "Single origin, single floral season. Never blended from unknown commercial syrups."),
    },
  ];

  return (
    <section className="w-full py-12 bg-[#FAF7F2] border-y border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg flex-shrink-0">
                <Icon />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#181512] font-serif mb-1">{title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8E2D6] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <span>{t("strip_footer_tag", "ETHICAL APICULTURE · 100% TRANSPARENT BATCH FINGERPRINTS")}</span>
          <Link
            href="/why-us"
            className="text-[#8C4A00] hover:text-[#5E3200] font-semibold flex items-center gap-1 group"
          >
            <span>{t("strip_footer_link", "Read our 6 purity differentiators")}</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
