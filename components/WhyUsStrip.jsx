"use client";

import React from "react";
import Link from "next/link";
import { FiShield, FiTruck, FiUsers, FiAward } from "react-icons/fi";

const PILLARS = [
  {
    icon: FiShield,
    title: "NMR Lab Certified",
    desc: "German Bruker 400MHz NMR tested. Zero adulterants. Published per batch.",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    textColor: "text-emerald-900",
  },
  {
    icon: FiUsers,
    title: "Direct Tribal Sourcing",
    desc: "No brokers. Fair wages direct to indigenous honey foragers.",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    textColor: "text-amber-900",
  },
  {
    icon: FiTruck,
    title: "Cold-Chain Delivery",
    desc: "Temperature-controlled dispatch. Free shipping above ₹999.",
    bg: "bg-sky-50",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    textColor: "text-sky-900",
  },
  {
    icon: FiAward,
    title: "100% Raw & Unheated",
    desc: "Never pasteurized. All live enzymes and antioxidants fully intact.",
    bg: "bg-purple-50",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    textColor: "text-purple-900",
  },
];

export default function WhyUsStrip() {
  return (
    <section className="w-full py-10 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map(({ icon: Icon, title, desc, bg, border, iconBg, iconColor, textColor }, i) => (
            <div
              key={title}
              className={`${bg} ${border} border rounded-2xl p-5 flex gap-4 items-start hover:shadow-md transition-all duration-300`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`${iconColor} text-lg`} />
              </div>
              <div className="min-w-0">
                <h3 className={`text-sm font-bold ${textColor} mb-1 leading-snug`}>{title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/why-us"
            className="text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors underline underline-offset-4"
          >
            Learn more about why we're different →
          </Link>
        </div>
      </div>
    </section>
  );
}
