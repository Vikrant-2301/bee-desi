"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";
import {
  FiTruck,
  FiSearch,
  FiCheckCircle,
  FiShield,
  FiPackage,
  FiClock,
  FiArrowLeft,
  FiPrinter,
  FiAlertCircle,
} from "react-icons/fi";

export default function TrackOrderPage() {
  const { openNMRLookup, showToast } = useCart();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      showToast("Please enter an Order ID or Phone Number", "error");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      const cleanId = query.trim().replace(/^#/, "");
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`);
      const data = await res.json();

      if (res.ok && data.success && data.order) {
        setOrder(data.order);
        showToast("Parcel journey located!");
      } else {
        setErrorMsg(data.error || "No order found matching this reference.");
      }
    } catch (err) {
      setErrorMsg("Network error querying courier dispatch system.");
    } finally {
      setLoading(false);
    }
  };

  const getStepNumber = (status) => {
    switch (status) {
      case "delivered":
        return 5;
      case "dispatched":
        return 4;
      case "inspected":
        return 3;
      case "harvest_allocated":
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-36 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6 font-sans">
          <Link href="/" className="hover:text-primary">
            Apiary Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-propolis-charcoal">Courier Tracking</span>
        </nav>

        {/* Page Title & Search Bar */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-radiance/10 text-amber-deep text-xs font-bold uppercase tracking-wider mb-3 border border-amber-radiance/20">
            <FiTruck className="text-amber-radiance" />
            <span>Live Apiary Dispatch Network</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-propolis-charcoal">
            Track Your Artisanal Honey Parcel
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 font-sans">
            Enter your Order ID (e.g. <strong className="font-mono text-amber-deep">BD-849201</strong>) or 10-digit delivery phone number to inspect real-time cold-chain transit.
          </p>

          <form onSubmit={handleTrack} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Order # or Phone (e.g. BD-100234)"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-amber-radiance/30 bg-surface text-xs sm:text-sm font-mono uppercase focus:outline-none focus:border-amber-radiance shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-honey btn-tactile disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "Searching..." : "Track Parcel"}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-center gap-2 max-w-lg mx-auto">
              <FiAlertCircle />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Found Order Details */}
        {order && (
          <div className="gold-glass rounded-3xl p-6 sm:p-9 border border-amber-radiance/30 shadow-honey flex flex-col gap-6">
            {/* Header Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-deep block">
                  Consignment Status
                </span>
                <h3 className="font-serif text-2xl font-bold text-propolis-charcoal capitalize">
                  {order.orderStatus.replace("_", " ")}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant block">
                  Order Reference
                </span>
                <strong className="font-mono text-base text-propolis-charcoal font-bold">
                  #{order.orderId}
                </strong>
              </div>
            </div>

            {/* Stepper (Amazon / Flipkart Style) */}
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/25">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-xs font-sans">
                <div>
                  <span className="text-on-surface-variant block text-[11px]">Carrier Partner:</span>
                  <strong className="font-serif text-base text-propolis-charcoal">
                    {order.carrier || "BlueDart Apiary Cold-Chain"}
                  </strong>
                </div>

                {order.trackingNumber && (
                  <div className="text-right">
                    <span className="text-on-surface-variant block text-[11px]">Tracking Number:</span>
                    <strong className="font-mono text-sm text-amber-deep font-bold bg-amber-radiance/10 px-2.5 py-1 rounded-md border border-amber-radiance/20">
                      {order.trackingNumber}
                    </strong>
                  </div>
                )}
              </div>

              {/* Progress Line */}
              <div className="grid grid-cols-5 gap-2 relative">
                {[
                  { title: "Consecrated", desc: "Order booked" },
                  { title: "Allocated", desc: "Batch sealed" },
                  { title: "NMR Checked", desc: "Purity verified" },
                  { title: "Dispatched", desc: "In transit" },
                  { title: "Delivered", desc: "At doorstep" },
                ].map((step, idx) => {
                  const currentStepNum = getStepNumber(order.orderStatus);
                  const isCompleted = currentStepNum >= idx + 1;
                  const isCurrent = currentStepNum === idx + 1;

                  return (
                    <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-amber-deep text-white shadow-sm"
                            : "bg-surface-container text-on-surface-variant border border-outline-variant/40"
                        } ${isCurrent ? "ring-4 ring-amber-radiance/30 animate-pulse" : ""}`}
                      >
                        {isCompleted ? "✓" : idx + 1}
                      </div>
                      <strong className="text-[11px] text-propolis-charcoal block leading-tight">
                        {step.title}
                      </strong>
                      <span className="text-[10px] text-on-surface-variant/70 hidden sm:inline">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consignment Items */}
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-deep block mb-3">
                Items in This Shipment ({order.items?.length || 0})
              </span>
              <div className="divide-y divide-outline-variant/20 border border-outline-variant/20 rounded-2xl p-3 bg-surface">
                {order.items?.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface border border-amber-radiance/20 flex-shrink-0">
                        <img
                          src={item.image || "/images/bee_desi_hero_custom.png"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <strong className="font-serif text-sm text-propolis-charcoal block">
                          {item.name}
                        </strong>
                        <span className="text-on-surface-variant text-[11px]">
                          {item.size} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    {item.batchCode && (
                      <button
                        onClick={() => openNMRLookup(item.batchCode)}
                        className="text-[11px] text-amber-deep font-mono hover:underline"
                      >
                        Batch #{item.batchCode} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Info */}
            <div className="p-4 rounded-xl bg-surface-container-low text-xs flex flex-wrap items-center justify-between gap-3 text-on-surface-variant">
              <div>
                <span>Deliver To: </span>
                <strong className="text-propolis-charcoal font-semibold">
                  {order.customer.name}, {order.customer.address}, {order.customer.city} {order.customer.pincode}
                </strong>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg border border-outline-variant/30 bg-surface font-bold text-propolis-charcoal hover:bg-surface-container flex items-center gap-1.5 btn-tactile text-xs"
              >
                <FiPrinter />
                <span>Print Bill</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
