"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  FiX,
  FiShoppingBag,
  FiTruck,
  FiTrash2,
  FiArrowRight,
  FiTag,
  FiCheck,
  FiShield
} from "react-icons/fi";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
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
    openCheckout
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput("");
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden">
        {/* Backdrop Dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-propolis-charcoal/60 backdrop-blur-sm transition-opacity"
        />

        {/* Apple-Style Slide-Over Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-surface shadow-2xl border-l border-primary/20 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-golden-nectar/20 text-primary flex items-center justify-center">
                  <FiShoppingBag className="text-lg" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-propolis-charcoal leading-none">
                    Your Nectar Basket
                  </h3>
                  <span className="text-[11px] text-outline font-medium">
                    {cart.length} unique {cart.length === 1 ? "harvest" : "harvests"} selected
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors btn-tactile"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-amber-50 px-5 py-3 border-b border-amber-200/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-amber-950 font-semibold">
                  <FiTruck className="text-primary text-sm" />
                  {isFreeShipping ? (
                    <strong className="text-emerald-800 font-bold">
                      Complimentary Express Delivery Unlocked!
                    </strong>
                  ) : (
                    <span>
                      Add <strong className="text-primary">₹{freeShippingRemaining}</strong> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-amber-900">
                  {freeShippingProgress}%
                </span>
              </div>

              {/* Bar */}
              <div className="w-full bg-amber-200/80 h-2 rounded-full overflow-visible relative">
                <div
                  className="bg-primary h-full transition-all duration-500 rounded-full relative"
                  style={{ width: `${freeShippingProgress}%` }}
                >
                  {/* Floating Bee indicator on progress bar */}
                  <div className="absolute -right-3 -top-2.5 w-6 h-6 pointer-events-none">
                    <Image
                      src="/images/assets/10.png"
                      alt="Bee"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Line Items Body */}
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-outline-variant/20">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-3 text-on-surface-variant">
                  <div className="w-20 h-28 relative filter drop-shadow-md">
                    <Image
                      src="/images/assets/2.png"
                      alt="Empty Basket Honey Dipper"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-propolis-charcoal">
                    Your basket is empty
                  </h4>
                  <p className="text-xs text-outline max-w-xs leading-relaxed">
                    Explore our single-flora micro-harvests and sommelier tasting flights to start your raw honey journey.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-propolis-charcoal text-honeycomb-cream text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors btn-tactile"
                  >
                    Browse Harvests
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.sku} className="py-4 flex gap-4 items-start">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0 border border-outline-variant/30">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-propolis-charcoal leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.sku)}
                          className="text-outline hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <FiTrash2 className="text-xs" />
                        </button>
                      </div>

                      <span className="text-[11px] text-primary font-semibold">
                        {item.size} • {item.batchCode}
                      </span>

                      {/* Stepper and Line Total */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-outline-variant/40 rounded-lg bg-surface px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            className="w-5 h-5 rounded text-propolis-charcoal hover:bg-surface-container flex items-center justify-center text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-propolis-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                            className="w-5 h-5 rounded text-propolis-charcoal hover:bg-surface-container flex items-center justify-center text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-propolis-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-outline-variant/30 bg-surface-container-low/90 flex flex-col gap-3">
                {/* Coupon Input */}
                {!activePromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xs" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Coupon (e.g. BEEFIRST10)"
                        className="w-full pl-8 pr-3 py-1.5 text-xs font-mono uppercase rounded-lg bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-xs font-bold uppercase tracking-wider text-propolis-charcoal hover:bg-primary hover:text-white transition-colors btn-tactile"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-900 font-semibold">
                      <FiCheck className="text-emerald-700 font-bold" />
                      <span>{activePromo.code} ({activePromo.label})</span>
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-800 hover:text-red-600 font-bold ml-2"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Subtotals & Fees */}
                <div className="flex flex-col gap-1 text-xs pt-1 border-t border-outline-variant/20">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Discount ({activePromo?.code})</span>
                      <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-on-surface-variant">
                    <span>Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      <span>₹{shippingFee}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-sm font-bold text-propolis-charcoal pt-1.5 border-t border-outline-variant/20">
                    <span>Total Amount</span>
                    <span className="font-serif text-lg">
                      ₹{finalTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Full Cart Page & Checkout */}
                <div className="flex flex-col gap-2 mt-1">
                  <button
                    onClick={() => {
                      closeCart();
                      window.location.href = "/checkout";
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <FiArrowRight className="text-golden-nectar text-base" />
                  </button>

                  <button
                    onClick={() => {
                      closeCart();
                      window.location.href = "/cart";
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-amber-radiance/30 bg-surface hover:bg-surface-container text-propolis-charcoal font-bold text-xs uppercase tracking-wider transition-colors text-center btn-tactile"
                  >
                    <span>View Dedicated Basket Page ({cart.length})</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-on-surface-variant font-medium text-center pt-1">
                  <FiShield className="text-amber-radiance text-xs" />
                  <span>German Bruker NMR Tested Guarantee • Razorpay Encrypted</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
