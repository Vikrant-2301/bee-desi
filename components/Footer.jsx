"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiAward,
  FiLock,
  FiMessageCircle,
  FiTruck,
  FiPackage,
  FiMapPin,
} from "react-icons/fi";

const SHOP_LINKS = [
  { label: "Wild Raw Jamun Honey", href: "/products/wild-raw-jamun-honey" },
  { label: "Kashmiri White Acacia", href: "/products/kashmiri-white-acacia-nectar" },
  { label: "Sunderbans Mangrove", href: "/products/sunderbans-wild-mangrove-honey" },
  { label: "Aravalli Wild Sidr", href: "/products/aravalli-wild-sidr-honey" },
  { label: "Creamed Mustard Honey", href: "/products/creamed-mustard-honey" },
  { label: "Connoisseur's Gift Box", href: "/#catalog" },
];

const COMPANY_LINKS = [
  { label: "Why Choose Us", href: "/why-us" },
  { label: "Our Story", href: "/our-story" },
  { label: "FAQs", href: "/faqs" },
  { label: "NMR Lab Reports", href: "/#nmr-lab" },
  { label: "Office Location Map", href: "https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7", external: true },
  { label: "Contact Us", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "Track My Order", href: "/track-order" },
  { label: "Shipping Policy", href: "/contact" },
  { label: "Returns & Refunds", href: "/contact" },
  { label: "Bulk & Corporate", href: "/contact" },
  { label: "WhatsApp: 7071101119", href: "https://wa.me/917071101119", external: true },
];

export default function Footer() {
  const { showToast } = useCart();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast?.("Please enter a valid email address", "error");
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
      showToast?.(res.ok && data.success
        ? "Welcome! Voucher BEEFIRST10 unlocked!"
        : "Voucher BEEFIRST10 unlocked! Use at checkout."
      );
    } catch {
      showToast?.("Voucher BEEFIRST10 unlocked! Use at checkout.");
    }
    setSubscribed(true);
    setEmail("");
    setLoading(false);
  };

  return (
    <footer className="w-full bg-[#0c0804] overflow-hidden">

      {/* ─────────────────────────────────────────
          APIARY LANDSCAPE SCENE
          Full-width illustration with content overlay
      ───────────────────────────────────────── */}
      <div className="relative w-full">
        {/* The landscape image */}
        <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px]">
          <Image
            src="/images/assets/footer.png"
            alt="Bee Desi Apiary — Natural Forest Honey Harvesting"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
          />
          {/* Gradient overlay — dark at top so nav above blends, transparent at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0804]/30 via-transparent to-[#0c0804]/10" />

          {/* Centered Brand Callout over the landscape */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-8">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                {t("footer_tag", "Farmer to Consumer · No Brokers · PAN India")}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight max-w-2xl">
              {t("footer_h2_1", "From India's Ancient Forests")}
              <br />
              <span className="text-amber-300">{t("footer_h2_2", "to Your Table")}</span>
            </h2>
            <p className="text-white/80 text-sm mt-3 max-w-md">
              {t("footer_p", "Raw, unheated, NMR-certified honey. Sourced with reverence from tribal communities who've tended these forests for generations.")}
            </p>
            <Link
              href="/#catalog"
              className="mt-5 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-900 font-bold text-sm px-6 py-3 rounded-2xl transition-all shadow-xl shadow-amber-900/40 group"
            >
              {t("footer_btn", "Explore Our Honeys")}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Soft dark gradient connecting landscape to footer body */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0c0804] to-transparent" />
      </div>

      {/* ─────────────────────────────────────────
          TRUST PILLS ROW
      ───────────────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
            {[
              { icon: FiShield, label: t("footer_nmr", "NMR Certified"), sub: "0.00% Adulterants" },
              { icon: FiTruck, label: t("footer_delivery", "Free Delivery"), sub: "Orders above ₹999" },
              { icon: FiPackage, label: t("footer_cold", "Cold-Chain"), sub: "Temperature protected" },
              { icon: FiLock, label: t("footer_secure", "Secure Checkout"), sub: "Razorpay 256-bit SSL" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-4 sm:py-5"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-amber-400 text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{label}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          MAIN FOOTER GRID
      ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Brand — col-span-2 on sm */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0 rounded-xl bg-amber-500/10 border border-amber-500/20 overflow-hidden">
                <Image src="/images/logo.png" alt="Bee Desi" fill className="object-contain p-1.5" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-white leading-none">Bee Desi</p>
                <p className="text-[9px] uppercase tracking-[0.22em] text-amber-500 font-semibold mt-0.5">Artisanal Apiaries</p>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t("footer_brand_desc", "India's purest single-origin raw honeys. Est. 1996. Tested by German Bruker 400MHz NMR.")}
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@beedesi.in" className="flex items-center gap-2 text-xs text-stone-500 hover:text-amber-400 transition-colors">
                <FiMail className="text-stone-600 flex-shrink-0" />
                hello@beedesi.in
              </a>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <FiPhone className="text-stone-600 flex-shrink-0" />
                <a href="tel:7071101119" className="hover:text-amber-400 transition-colors">
                  7071101119
                </a>
                <span>/</span>
                <a href="tel:9307777500" className="hover:text-amber-400 transition-colors">
                  9307777500
                </a>
              </div>
              <a
                href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-amber-500/90 hover:text-amber-400 transition-colors"
              >
                <FiMapPin className="text-amber-600 flex-shrink-0" />
                <span>Office Map (Google Maps)</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { href: "https://instagram.com/beedesi", icon: FiInstagram, label: "Instagram" },
                { href: "https://youtube.com/@beedesi", icon: FiYoutube, label: "YouTube" },
                { href: "https://wa.me/917071101119", icon: FiMessageCircle, label: "WhatsApp" },
                { href: "https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7", icon: FiMapPin, label: "Google Maps" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Shop</p>
            <ul className="flex flex-col gap-2.5">
              {SHOP_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-xs text-stone-400 hover:text-white transition-colors leading-relaxed block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Company</p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-xs text-stone-400 hover:text-white transition-colors leading-relaxed block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Support</p>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT_LINKS.map(({ label, href, external }) => (
                <li key={label}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-500 hover:text-emerald-300 transition-colors leading-relaxed block">
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="text-xs text-stone-400 hover:text-white transition-colors leading-relaxed block">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Get 10% Off</p>
            {subscribed ? (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
                <FiCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5 text-sm" />
                <div>
                  <p className="text-xs font-bold text-emerald-300">You're in the Guild!</p>
                  <p className="text-[10px] text-emerald-500 mt-0.5">
                    Code: <strong className="font-mono text-emerald-300">BEEFIRST10</strong>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Join 352+ members. Early batch access &amp; 10% off your first order.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-900 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {loading ? "Joining..." : "Get 10% Off"}
                    {!loading && <FiArrowRight className="text-sm" />}
                  </button>
                </form>
              </>
            )}
            {/* Certs */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
              {[
                { icon: FiShield, label: "Bruker NMR Tested" },
                { icon: FiAward, label: "ISO/IEC 17025" },
                { icon: FiCheckCircle, label: "FSSAI Organic" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[10px] text-stone-600">
                  <Icon className="text-amber-600 text-xs flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-stone-600 text-center sm:text-left">
              © {new Date().getFullYear()} Bee Desi Artisanal Apiaries Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-stone-600">
              <Link href="/contact" className="hover:text-stone-400 transition-colors">Privacy</Link>
              <span className="text-stone-700">·</span>
              <Link href="/contact" className="hover:text-stone-400 transition-colors">Terms</Link>
              <span className="text-stone-700">·</span>
              <Link href="/contact" className="hover:text-stone-400 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
