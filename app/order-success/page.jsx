"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiShield,
  FiPrinter,
  FiArrowRight,
  FiMail,
  FiCompass,
  FiAward,
} from "react-icons/fi";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "BD-2026-LIVE";
  const { orderConfirmed, openNMRLookup } = useCart();

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d97706", "#f59e0b", "#0d0b09", "#1e4532", "#ffffff"],
      });
    } catch (e) {}
  }, []);

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-36 pb-20">
      <div className="gold-glass rounded-3xl p-6 sm:p-10 border border-amber-radiance/30 shadow-honey flex flex-col items-center text-center gap-6">
        {/* Animated Success Badge */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-deep via-golden-nectar to-emerald-600 flex items-center justify-center text-white text-4xl shadow-honey-glow">
          <FiCheckCircle />
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <span>Sacred Terroir Order Confirmed</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-propolis-charcoal">
            Thank You for Supporting Indigenous Apiculture
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mt-2 font-sans">
            Your order has been consecrated into our apiary dispatch schedule. A formal Bruker 400MHz NMR purity certificate and tracking receipt have been dispatched to your email.
          </p>
        </div>

        {/* Reference Order Badge */}
        <div className="bg-surface-container-low px-6 py-3.5 rounded-2xl border border-outline-variant/30 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant font-medium">Order Reference:</span>
            <strong className="font-mono text-base text-amber-deep font-bold tracking-wider">
              #{orderId}
            </strong>
          </div>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <div className="flex items-center gap-2 text-emerald-800 font-semibold">
            <FiShield />
            <span>100% German Bruker 1H-NMR Certified</span>
          </div>
        </div>

        {/* Dispatch Progress Stepper */}
        <div className="w-full max-w-2xl my-4 py-6 border-t border-b border-outline-variant/20">
          <h3 className="font-serif text-lg font-bold text-propolis-charcoal mb-6 text-left">
            Apiary Dispatch Journey
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left">
            <div className="flex sm:flex-col items-center sm:items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-deep text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                ✓
              </div>
              <div>
                <strong className="block text-xs font-bold text-propolis-charcoal">
                  1. Order Consecrated
                </strong>
                <span className="text-[11px] text-on-surface-variant">Batch allocated</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-radiance text-white flex items-center justify-center text-xs font-bold flex-shrink-0 animate-pulse">
                2
              </div>
              <div>
                <strong className="block text-xs font-bold text-propolis-charcoal">
                  2. NMR Laboratory Check
                </strong>
                <span className="text-[11px] text-on-surface-variant">Spectral validation</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-xs font-bold flex-shrink-0 border border-outline-variant/30">
                3
              </div>
              <div>
                <strong className="block text-xs font-bold text-on-surface-variant">
                  3. Eco Cold-Packing
                </strong>
                <span className="text-[11px] text-on-surface-variant">Neem dipper added</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-xs font-bold flex-shrink-0 border border-outline-variant/30">
                4
              </div>
              <div>
                <strong className="block text-xs font-bold text-on-surface-variant">
                  4. Express Delivery
                </strong>
                <span className="text-[11px] text-on-surface-variant">Doorstep handover</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full pt-2">
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 rounded-xl border border-outline-variant/40 bg-surface hover:bg-surface-container text-xs font-bold uppercase tracking-wider text-propolis-charcoal flex items-center gap-2 btn-tactile"
          >
            <FiPrinter />
            <span>Print Invoice Receipt</span>
          </button>

          <button
            onClick={() => openNMRLookup("BD-JAMUN-2026")}
            className="px-6 py-3.5 rounded-xl border border-amber-radiance/40 bg-amber-radiance/10 hover:bg-amber-radiance/20 text-xs font-bold uppercase tracking-wider text-amber-deep flex items-center gap-2 btn-tactile"
          >
            <FiShield />
            <span>Inspect NMR Spectrogram</span>
          </button>

          <Link
            href="/"
            className="px-7 py-3.5 rounded-xl bg-propolis-charcoal text-honeycomb-cream hover:bg-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-honey btn-tactile"
          >
            <span>Return to Apiary Home</span>
            <FiArrowRight />
          </Link>
        </div>

        {/* Ayurvedic Wisdom Banner */}
        <div className="mt-4 p-5 rounded-2xl bg-amber-radiance/5 border border-amber-radiance/20 text-left text-xs max-w-2xl w-full">
          <div className="flex items-center gap-2 text-amber-deep font-bold mb-1">
            <FiAward className="text-sm" />
            <span>Ayurvedic Storage &amp; Consumption Ritual</span>
          </div>
          <p className="text-on-surface-variant leading-relaxed font-sans">
            Never heat raw honey above 40°C or mix it into boiling hot tea, as this denatures living enzymes (*Amrita* turning to *Ama* according to Charaka Samhita). Store in a dry pantry at ambient temperature. Natural crystallization is the biological signature of raw, unheated honey.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />
      <Suspense
        fallback={
          <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-40 pb-20 text-center font-serif text-xl">
            Consecrating Harvest Order Details...
          </main>
        }
      >
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
