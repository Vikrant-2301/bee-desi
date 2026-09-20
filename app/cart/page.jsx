"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import {
  FiTrash2,
  FiArrowRight,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiTag,
  FiGift,
  FiAward,
  FiLock,
  FiCompass,
} from "react-icons/fi";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    isFreeShipping,
    freeShippingRemaining,
    freeShippingProgress,
    activePromo,
    applyPromoCode,
    removePromoCode,
    openNMRLookup,
    addToCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput("");
  };

  const sommelierFlightUpsell = {
    id: "sommelier-flight-3x",
    name: "The Connoisseur's Terroir Flight",
    subtitle: "3-Jar Tasting Box (Jamun, Acacia, Sidr)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ6g4P92VzP6T31x7oX3F_k0QjPzQe1oTLGXRgtmN2BaDZgtGAx0TWzELr14bHA2meR3h_5fWP4q9m6OwpKxlUDu1wSphSFdCmx9XqZwBWJXNYbTTb0hsPnGsCRO6fkzFIXYgYCx5j9EBZuxz3TOExNtmdD41ClqtcqPX7ScObd4TUVsN",
    variants: [{ size: "3x150g", label: "3 x 150g Tasting Flight", price: 1290, sku: "BD-FLIGHT-3X" }],
    batchCode: "BD-FLIGHT-TRIO",
  };

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span>Apiary Home</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-propolis-charcoal">Shopping Cart ({cartCount})</span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-primary/15 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-radiance/10 text-amber-deep text-xs font-bold uppercase tracking-widest mb-2 border border-amber-radiance/20">
              <FiShoppingBag className="text-amber-radiance" />
              <span>Sacred Micro-Harvest Basket</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-propolis-charcoal">
              Your Artisanal Honey Selection
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant font-sans max-w-md">
            Each jar is hand-filled, sealed with natural beeswax, and NMR certified for 100% molecular purity.
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Basket State */
          <div className="py-20 px-6 text-center max-w-xl mx-auto flex flex-col items-center gap-6 gold-glass rounded-3xl border border-amber-radiance/20 shadow-honey">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-amber-radiance text-4xl border border-amber-radiance/30 relative">
              <FiShoppingBag />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-propolis-charcoal text-golden-nectar flex items-center justify-center text-xs">
                0
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal mb-2">
                Your Harvest Basket is Currently Empty
              </h2>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Discover our rare single-flora nectars harvested by indigenous forest beekeepers across the Himalayas, Satpura canopies, and Sunderbans.
              </p>
            </div>
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 bg-propolis-charcoal text-honeycomb-cream px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-primary transition-all shadow-honey btn-tactile"
            >
              <span>Explore Single-Flora Terroirs</span>
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          /* Populated Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Items List (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Free Express Shipping Meter */}
              <div className="p-5 rounded-2xl gold-glass border border-amber-radiance/25 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-propolis-charcoal">
                    <FiTruck className="text-amber-radiance text-lg flex-shrink-0" />
                    {isFreeShipping ? (
                      <span className="text-emerald-800 flex items-center gap-1 font-bold">
                        <FiCheckCircle className="text-emerald-600" />
                        Complimentary Express Cold-Chain Delivery Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-amber-deep">₹{freeShippingRemaining}</strong> more to qualify for Free Express Delivery
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <div
                    className="h-full bg-gradient-to-r from-amber-radiance via-golden-nectar to-emerald-600 transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="gold-glass rounded-3xl border border-amber-radiance/20 shadow-honey overflow-hidden">
                <div className="divide-y divide-outline-variant/20">
                  {cart.map((item) => (
                    <div
                      key={item.sku}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:bg-surface-container-low/40 transition-colors"
                    >
                      {/* Product Media & Details */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-surface-container flex-shrink-0 border border-amber-radiance/30 shadow-sm">
                          <img
                            src={item.image || "/images/bee_desi_hero_custom.png"}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-deep">
                            {item.size} Amber Vessel
                          </span>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-propolis-charcoal">
                            {item.name}
                          </h3>
                          <span className="text-xs text-on-surface-variant font-sans">
                            {item.subtitle}
                          </span>
                          {item.batchCode && (
                            <button
                              onClick={() => openNMRLookup(item.batchCode)}
                              className="inline-flex items-center gap-1 text-[11px] text-amber-radiance font-mono mt-1 hover:underline text-left"
                            >
                              <FiShield className="text-xs" />
                              <span>NMR Batch #{item.batchCode}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Pricing & Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-outline-variant/20">
                        {/* Stepper */}
                        <div className="flex items-center border border-outline-variant/40 bg-surface rounded-xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            className="px-3 py-1.5 text-base font-bold text-on-surface hover:bg-surface-container transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 py-1.5 text-xs font-bold font-mono min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                            className="px-3 py-1.5 text-base font-bold text-on-surface hover:bg-surface-container transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price Calculation */}
                        <div className="text-right min-w-[5rem]">
                          <span className="text-base sm:text-lg font-serif font-bold text-propolis-charcoal">
                            ₹{item.price * item.quantity}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[11px] text-on-surface-variant">
                              ₹{item.price} each
                            </span>
                          )}
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.sku)}
                          className="text-on-surface-variant hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove item"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complimentary Eco Gift Wrap & Wooden Honey Dipper */}
              <div className="p-5 rounded-2xl gold-glass border border-amber-radiance/20 shadow-sm flex items-start gap-4">
                <input
                  type="checkbox"
                  id="giftWrap"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-amber-radiance focus:ring-amber-radiance cursor-pointer"
                />
                <label htmlFor="giftWrap" className="cursor-pointer text-xs sm:text-sm text-on-surface leading-relaxed">
                  <strong className="text-propolis-charcoal flex items-center gap-1 font-serif text-sm sm:text-base">
                    <FiGift className="text-amber-radiance" />
                    Complimentary Engraved Wooden Honey Dipper &amp; Terroir Tasting Notes
                  </strong>
                  Includes a handcrafted neem-wood apiary dipper, sealed tasting flight card, and reusable cotton muslin pouch with our compliments.
                </label>
              </div>

              {/* Sommelier Cross-Sell Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-amber-radiance/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface border border-amber-radiance/30 flex-shrink-0">
                    <img
                      src={sommelierFlightUpsell.image}
                      alt={sommelierFlightUpsell.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-deep">
                      Sommelier Flight Pairing
                    </span>
                    <h4 className="font-serif font-bold text-propolis-charcoal text-base">
                      {sommelierFlightUpsell.name}
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      3-Jar Discovery Box (Jamun, Acacia, Sidr) • ₹1,290
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(sommelierFlightUpsell, sommelierFlightUpsell.variants[0], 1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface border border-amber-radiance text-xs font-bold uppercase tracking-wider text-propolis-charcoal hover:bg-amber-radiance hover:text-white transition-all btn-tactile whitespace-nowrap"
                >
                  + Add to Flight
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/30 shadow-honey flex flex-col gap-5 sticky top-28">
                <h3 className="font-serif text-2xl font-bold text-propolis-charcoal border-b border-outline-variant/20 pb-4">
                  Order Summary
                </h3>

                {/* Promo Code Input */}
                <div>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Voucher: BEEFIRST10"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-xs font-mono uppercase focus:outline-none focus:border-amber-radiance"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-propolis-charcoal text-honeycomb-cream text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors btn-tactile"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Active Promo Pill */}
                  {activePromo && (
                    <div className="mt-2.5 flex items-center justify-between bg-amber-radiance/10 border border-amber-radiance/30 rounded-xl px-3 py-1.5 text-xs text-amber-deep">
                      <span className="font-semibold flex items-center gap-1">
                        <FiCheckCircle className="text-amber-radiance" />
                        {activePromo.code} ({activePromo.label})
                      </span>
                      <button
                        onClick={removePromoCode}
                        className="text-on-surface-variant hover:text-red-700 font-bold ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Financial Breakdown */}
                <div className="flex flex-col gap-3 text-sm border-t border-b border-outline-variant/20 py-4 font-sans">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal ({cartCount} items):</span>
                    <span className="font-semibold text-propolis-charcoal">₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-semibold">
                      <span>Harvest Guild Discount:</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-on-surface-variant">
                    <span>Express Cold-Chain Dispatch:</span>
                    <span className="font-semibold text-propolis-charcoal">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-on-surface-variant/80">
                    <span>Estimated GST (5% Included):</span>
                    <span>₹{Math.round((finalTotal * 0.05) / 1.05)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold block">
                      Total Payable
                    </span>
                    <span className="text-[11px] text-on-surface-variant">All taxes &amp; forest royalties included</span>
                  </div>
                  <span className="font-serif text-3xl font-bold text-propolis-charcoal">
                    ₹{finalTotal}
                  </span>
                </div>

                {/* Primary Checkout CTA */}
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile group"
                >
                  <FiLock className="text-base" />
                  <span>Proceed to Secure Checkout</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Button */}
                <Link
                  href="/#catalog"
                  className="text-center text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors"
                >
                  ← Continue Browsing Single-Flora Vintages
                </Link>

                {/* Purity Guarantee Trust Seal */}
                <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-2 text-[11px] text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-amber-radiance text-sm flex-shrink-0" />
                    <span>German Bruker 400MHz 1H-NMR Certified Purity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiAward className="text-amber-radiance text-sm flex-shrink-0" />
                    <span>Direct ₹320–₹380/kg fair payout to indigenous tribes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiLock className="text-amber-radiance text-sm flex-shrink-0" />
                    <span>Razorpay 256-Bit Encrypted Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
