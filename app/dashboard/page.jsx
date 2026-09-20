"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiMapPin,
  FiAward,
  FiHeart,
  FiPrinter,
  FiShield,
  FiExternalLink,
  FiClock,
  FiArrowRight,
  FiUser,
  FiPhone,
  FiMail,
  FiRefreshCw,
  FiAlertCircle,
  FiShoppingBag,
} from "react-icons/fi";

export default function UserDashboard() {
  const router = useRouter();
  const { user, openNMRLookup, showToast } = useCart();
  const [activeTab, setActiveTab] = useState("orders"); // "orders", "addresses", "guild", "wishlist"
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const userEmail = user?.email || "kingsaksham90@gmail.com";

  useEffect(() => {
    fetchOrders();
  }, [userEmail]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/user?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active")
      return o.orderStatus !== "delivered" && o.orderStatus !== "cancelled";
    if (filterStatus === "delivered") return o.orderStatus === "delivered";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return {
          label: "Delivered",
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          step: 5,
        };
      case "dispatched":
        return {
          label: "In Cold-Chain Transit",
          bg: "bg-blue-100 text-blue-900 border-blue-300",
          step: 4,
        };
      case "inspected":
        return {
          label: "NMR Tested & Packed",
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          step: 3,
        };
      case "harvest_allocated":
        return {
          label: "Harvest Allocated",
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          step: 2,
        };
      default:
        return {
          label: "Order Consecrated",
          bg: "bg-neutral-100 text-neutral-800 border-neutral-300",
          step: 1,
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Top Header Card */}
        <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/30 shadow-honey mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-deep via-primary to-amber-radiance text-white flex items-center justify-center text-2xl font-bold font-serif shadow-honey flex-shrink-0 border-2 border-golden-nectar">
              {user?.name ? user.name.charAt(0) : "V"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
                  {user?.name || "Vikrant Sharma"}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-amber-radiance/20 text-amber-deep font-mono text-xs font-bold uppercase tracking-wider border border-amber-radiance/30">
                  {user?.membershipTier || "Gold Harvest Connoisseur"}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-sans mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FiMail /> {userEmail}
                </span>
                <span>•</span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <FiAward /> 10% Lifetime Guild Voucher Active
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={fetchOrders}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface hover:bg-surface-container text-xs font-bold uppercase tracking-wider text-propolis-charcoal flex items-center gap-1.5 btn-tactile"
              title="Refresh Orders"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
            <Link
              href="/#catalog"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-honey btn-tactile flex items-center gap-1.5 whitespace-nowrap"
            >
              <FiShoppingBag />
              <span>Explore Vintages</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Grid Split: Left Navigation Sidebar (3 cols) & Main Content (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar (Amazon / Flipkart Style) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="gold-glass rounded-3xl p-3 border border-amber-radiance/20 shadow-honey flex flex-col gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab("orders")}
                className={`p-3.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                  activeTab === "orders"
                    ? "bg-propolis-charcoal text-honeycomb-cream shadow-honey"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FiPackage className="text-base text-amber-radiance" />
                  <span className="font-serif text-sm">My Orders &amp; Parcels</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`p-3.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                  activeTab === "addresses"
                    ? "bg-propolis-charcoal text-honeycomb-cream shadow-honey"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-base text-amber-radiance" />
                  <span className="font-serif text-sm">Saved Delivery Estates</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("guild")}
                className={`p-3.5 rounded-2xl flex items-center justify-between transition-all text-left ${
                  activeTab === "guild"
                    ? "bg-propolis-charcoal text-honeycomb-cream shadow-honey"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FiAward className="text-base text-amber-radiance" />
                  <span className="font-serif text-sm">Guild Perks &amp; Vouchers</span>
                </div>
                <span className="text-[10px] text-amber-radiance font-mono">10% OFF</span>
              </button>

              <Link
                href="/track-order"
                className="p-3.5 rounded-2xl flex items-center justify-between transition-all text-left text-on-surface-variant hover:bg-surface-container"
              >
                <div className="flex items-center gap-3">
                  <FiTruck className="text-base text-amber-radiance" />
                  <span className="font-serif text-sm">Live Parcel Tracker</span>
                </div>
                <FiArrowRight />
              </Link>
            </div>

            {/* Fair Trade Impact Callout */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-amber-radiance/20 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-deep block mb-1">
                Your Apiculture Impact
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                By purchasing unheated single-flora honey, you have funded <strong className="text-propolis-charcoal">₹1,240 direct payouts</strong> to Baiga tribal gatherers in Balaghat and Mawali collectives in the Sunderbans.
              </p>
            </div>
          </div>

          {/* Right Main Content (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {activeTab === "orders" && (
              <div className="flex flex-col gap-5">
                {/* Orders Filter Toolbar */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilterStatus("all")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        filterStatus === "all"
                          ? "bg-propolis-charcoal text-honeycomb-cream"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      All Orders ({orders.length})
                    </button>
                    <button
                      onClick={() => setFilterStatus("active")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        filterStatus === "active"
                          ? "bg-propolis-charcoal text-honeycomb-cream"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      Active Shipments
                    </button>
                    <button
                      onClick={() => setFilterStatus("delivered")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        filterStatus === "delivered"
                          ? "bg-propolis-charcoal text-honeycomb-cream"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      Delivered
                    </button>
                  </div>
                  <span className="text-xs text-on-surface-variant font-sans">
                    Showing {filteredOrders.length} orders
                  </span>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center gold-glass rounded-3xl border border-amber-radiance/20 shadow-sm flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-amber-radiance text-3xl">
                      <FiPackage />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-propolis-charcoal">
                      No Orders Placed Yet
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-sm">
                      When you purchase single-flora raw honey vintages, your orders and live Flipkart/Amazon-style delivery timelines will appear here.
                    </p>
                    <Link
                      href="/#catalog"
                      className="px-6 py-3 rounded-xl bg-propolis-charcoal text-honeycomb-cream font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors btn-tactile"
                    >
                      Browse First Harvests
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredOrders.map((order) => {
                      const badge = getStatusBadge(order.orderStatus);
                      return (
                        <div
                          key={order._id || order.orderId}
                          className="gold-glass rounded-3xl p-5 sm:p-7 border border-amber-radiance/25 shadow-honey flex flex-col gap-5 hover:border-amber-radiance/40 transition-all"
                        >
                          {/* Order Header Ribbon (Amazon/Flipkart Style) */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20 pb-4 text-xs font-sans">
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                              <div>
                                <span className="text-on-surface-variant block text-[10px] uppercase font-bold tracking-wider">
                                  Order Placed
                                </span>
                                <strong className="text-propolis-charcoal font-semibold">
                                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </strong>
                              </div>
                              <div>
                                <span className="text-on-surface-variant block text-[10px] uppercase font-bold tracking-wider">
                                  Total Amount
                                </span>
                                <strong className="font-serif text-sm font-bold text-amber-deep">
                                  ₹{order.total}
                                </strong>
                              </div>
                              <div>
                                <span className="text-on-surface-variant block text-[10px] uppercase font-bold tracking-wider">
                                  Payment Mode
                                </span>
                                <span className="text-propolis-charcoal font-semibold uppercase">
                                  {order.paymentMethod === "razorpay" ? "Razorpay (Paid)" : "Cash On Delivery"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
                              >
                                {badge.label}
                              </span>
                              <span className="font-mono text-xs text-on-surface-variant">
                                #{order.orderId}
                              </span>
                            </div>
                          </div>

                          {/* Amazon-Style Horizontal 5-Step Order Tracking Bar */}
                          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
                            <div className="flex items-center justify-between mb-4 text-xs font-bold">
                              <span className="text-propolis-charcoal flex items-center gap-1.5 font-serif text-sm">
                                <FiTruck className="text-amber-radiance" />
                                {order.carrier || "BlueDart Apiary Cold-Chain"}
                              </span>
                              {order.trackingNumber ? (
                                <span className="font-mono text-amber-deep bg-amber-radiance/10 px-2.5 py-0.5 rounded-md border border-amber-radiance/20">
                                  Tracking ID: {order.trackingNumber}
                                </span>
                              ) : (
                                <span className="text-on-surface-variant font-normal">
                                  Est: {order.estimatedDelivery || "3-5 business days"}
                                </span>
                              )}
                            </div>

                            {/* Stepper Dots & Line */}
                            <div className="grid grid-cols-5 gap-2 relative">
                              {[
                                { title: "Consecrated", step: 1 },
                                { title: "Harvest Allocated", step: 2 },
                                { title: "NMR Certified", step: 3 },
                                { title: "In Transit", step: 4 },
                                { title: "Delivered", step: 5 },
                              ].map((st, idx) => {
                                const isPassed = badge.step >= st.step;
                                const isCurrent = badge.step === st.step;
                                return (
                                  <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-all ${
                                        isPassed
                                          ? "bg-amber-deep text-white shadow-sm"
                                          : "bg-surface-container text-on-surface-variant border border-outline-variant/40"
                                      } ${isCurrent ? "ring-4 ring-amber-radiance/30 animate-pulse" : ""}`}
                                    >
                                      {isPassed ? "✓" : st.step}
                                    </div>
                                    <span
                                      className={`text-[10px] leading-tight font-medium ${
                                        isPassed
                                          ? "text-propolis-charcoal font-bold"
                                          : "text-on-surface-variant/70"
                                      }`}
                                    >
                                      {st.title}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Ordered Products Items List */}
                          <div className="divide-y divide-outline-variant/15">
                            {order.items?.map((item, i) => (
                              <div
                                key={i}
                                className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface border border-amber-radiance/20 flex-shrink-0">
                                    <img
                                      src={item.image || "/images/bee_desi_hero_custom.png"}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-serif text-base font-bold text-propolis-charcoal">
                                      {item.name}
                                    </h4>
                                    <span className="text-on-surface-variant text-[11px]">
                                      Size: {item.size} • Qty: {item.quantity}
                                    </span>
                                    {item.batchCode && (
                                      <button
                                        onClick={() => openNMRLookup(item.batchCode)}
                                        className="text-[10px] text-amber-deep font-mono block hover:underline"
                                      >
                                        Inspect NMR #{item.batchCode} →
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right flex items-center gap-4 sm:flex-col sm:items-end w-full sm:w-auto justify-between">
                                  <span className="font-serif text-base font-bold text-propolis-charcoal">
                                    ₹{item.price * item.quantity}
                                  </span>
                                  <Link
                                    href="/#catalog"
                                    className="text-[11px] font-bold text-amber-deep hover:underline"
                                  >
                                    Buy Again
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Action Buttons */}
                          <div className="pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="text-on-surface-variant text-[11px]">
                              Shipping To: <strong>{order.customer.address}, {order.customer.city} {order.customer.pincode}</strong>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <button
                                onClick={() => {
                                  setSelectedOrderForTracking(order);
                                  window.print();
                                }}
                                className="px-3.5 py-2 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container font-bold text-propolis-charcoal flex items-center gap-1.5 btn-tactile text-[11px]"
                              >
                                <FiPrinter />
                                <span>Tax Invoice</span>
                              </button>
                              <Link
                                href={`/contact?orderId=${order.orderId}`}
                                className="px-3.5 py-2 rounded-xl border border-amber-radiance/30 bg-amber-radiance/10 hover:bg-amber-radiance/20 font-bold text-amber-deep flex items-center gap-1.5 btn-tactile text-[11px]"
                              >
                                <span>Order Help</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/25 shadow-honey flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-propolis-charcoal">
                      Saved Delivery Estates &amp; Addresses
                    </h2>
                    <p className="text-xs text-on-surface-variant font-sans">
                      All shipments are insulated and dispatched via climate-conscious cold chain.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast("Address updated successfully")}
                    className="px-4 py-2 rounded-xl bg-propolis-charcoal text-honeycomb-cream text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors btn-tactile"
                  >
                    + Add New Estate
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border-2 border-amber-radiance bg-surface shadow-sm flex flex-col gap-3 relative">
                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold bg-amber-radiance/20 text-amber-deep px-2 py-0.5 rounded-full border border-amber-radiance/30">
                      Primary Destination
                    </span>
                    <strong className="font-serif text-base text-propolis-charcoal">
                      {user?.name || "Vikrant Sharma"}
                    </strong>
                    <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                      B-402, Ivory Orchards, Forest Reserve Road<br />
                      Bengaluru, Karnataka 560102<br />
                      Phone: +91 98765 43210
                    </p>
                    <div className="pt-2 border-t border-outline-variant/20 flex gap-3 text-xs font-bold text-amber-deep">
                      <button className="hover:underline">Edit</button>
                      <span>•</span>
                      <button className="hover:underline">Delivery Notes</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Harvest Guild Perks Tab */}
            {activeTab === "guild" && (
              <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/25 shadow-honey flex flex-col gap-6">
                <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-deep to-golden-nectar flex items-center justify-center text-white text-2xl shadow-sm">
                    <FiAward />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-propolis-charcoal">
                      Apiary Harvest Guild Privileges
                    </h2>
                    <span className="text-xs text-amber-deep font-bold font-sans">
                      Tier: Gold Connoisseur Member
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
                    <span className="text-[10px] text-amber-deep uppercase font-bold">Voucher #1</span>
                    <strong className="font-mono text-lg font-bold text-propolis-charcoal">
                      BEEFIRST10
                    </strong>
                    <span className="text-xs text-on-surface-variant">
                      10% discount on all single-flora jars and tasting flights.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
                    <span className="text-[10px] text-amber-deep uppercase font-bold">Voucher #2</span>
                    <strong className="font-mono text-lg font-bold text-propolis-charcoal">
                      FREESHIP
                    </strong>
                    <span className="text-xs text-on-surface-variant">
                      Complimentary express cold-pack delivery without minimum order value.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface border border-outline-variant/30 flex flex-col gap-2">
                    <span className="text-[10px] text-amber-deep uppercase font-bold">Voucher #3</span>
                    <strong className="font-mono text-lg font-bold text-propolis-charcoal">
                      HARVEST15
                    </strong>
                    <span className="text-xs text-on-surface-variant">
                      15% off orders exceeding ₹2,500 for seasonal bulk reservas.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
