"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  FiX,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiCreditCard,
  FiSmartphone,
  FiArrowRight,
  FiPackage
} from "react-icons/fi";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    finalTotal,
    cart,
    triggerOrderPlaced,
    orderConfirmed,
    setOrderConfirmed
  } = useCart();

  const [formData, setFormData] = useState({
    name: "Vikrant Sharma",
    phone: "9876543210",
    email: "vikrant@example.com",
    address: "B-402, Lotus Grandeur, Forest Reserve Road",
    city: "Bengaluru",
    pincode: "560102",
    paymentMethod: "upi", // upi, card, cod
  });

  useEffect(() => {
    if (isCheckoutOpen) {
      closeCheckout();
      window.location.href = "/checkout";
    }
  }, [isCheckoutOpen, closeCheckout]);

  if (!isCheckoutOpen && !orderConfirmed) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerOrderPlaced(formData);
    }, 1000);
  };

  // Order Confirmed Screen
  if (orderConfirmed) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-propolis-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-surface rounded-3xl p-6 sm:p-8 shadow-2xl border border-primary/20 text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-sm">
              <FiCheckCircle />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Harvest Allocation Confirmed
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal mt-1">
                Thank You, {orderConfirmed.name}!
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Order <strong className="font-mono text-propolis-charcoal">{orderConfirmed.orderId}</strong> has been received by our apiary dispatch team.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="w-full bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 text-left text-xs flex flex-col gap-2">
              <div className="flex justify-between font-bold text-propolis-charcoal border-b border-outline-variant/20 pb-2">
                <span>Dispatch To:</span>
                <span className="font-normal text-right">{orderConfirmed.city}, {orderConfirmed.pincode}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Arrival:</span>
                <span className="font-semibold text-emerald-800">3–4 Business Days (Express)</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Payment Mode:</span>
                <span className="uppercase font-bold text-propolis-charcoal">{orderConfirmed.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-propolis-charcoal border-t border-outline-variant/20 pt-2">
                <span>Total Paid:</span>
                <span className="font-serif text-base text-primary">₹{orderConfirmed.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={() => setOrderConfirmed(null)}
              className="w-full py-3.5 px-6 rounded-xl bg-propolis-charcoal text-honeycomb-cream font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary transition-colors shadow-honey btn-tactile"
            >
              Continue Exploring Apiaries
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[105] overflow-y-auto bg-propolis-charcoal/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckout}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-xl bg-surface rounded-2xl shadow-honey-lg border border-primary/20 overflow-hidden z-10 my-auto p-6 sm:p-8 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-golden-nectar/20 text-primary flex items-center justify-center">
                <FiPackage className="text-lg" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-propolis-charcoal">
                  Direct Apiary Checkout
                </h3>
                <span className="text-xs text-outline">
                  Total Payable: <strong className="text-propolis-charcoal">₹{finalTotal.toLocaleString("en-IN")}</strong>
                </span>
              </div>
            </div>

            <button
              onClick={closeCheckout}
              className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors btn-tactile"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              1. Delivery Address &amp; Contact
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
                  Phone Number (for SMS Tracking)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
                  Street Address &amp; Apartment
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal"
                />
              </div>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-primary pt-2 border-t border-outline-variant/20">
              2. Select Payment Method
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: "upi" })}
                className={`p-3 rounded-xl border text-center transition-all btn-tactile flex flex-col items-center gap-1.5 ${
                  formData.paymentMethod === "upi"
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-outline-variant/30 hover:border-primary/40 bg-surface"
                }`}
              >
                <FiSmartphone className="text-lg text-primary" />
                <span className="text-xs font-bold text-propolis-charcoal">UPI / QR</span>
                <span className="text-[10px] text-outline">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                className={`p-3 rounded-xl border text-center transition-all btn-tactile flex flex-col items-center gap-1.5 ${
                  formData.paymentMethod === "card"
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-outline-variant/30 hover:border-primary/40 bg-surface"
                }`}
              >
                <FiCreditCard className="text-lg text-primary" />
                <span className="text-xs font-bold text-propolis-charcoal">Cards</span>
                <span className="text-[10px] text-outline">Visa, Master, RuPay</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                className={`p-3 rounded-xl border text-center transition-all btn-tactile flex flex-col items-center gap-1.5 ${
                  formData.paymentMethod === "cod"
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-outline-variant/30 hover:border-primary/40 bg-surface"
                }`}
              >
                <FiTruck className="text-lg text-primary" />
                <span className="text-xs font-bold text-propolis-charcoal">Cash on Delivery</span>
                <span className="text-[10px] text-outline">Pay on delivery</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 py-3.5 px-6 rounded-xl bg-propolis-charcoal text-honeycomb-cream font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Dispatching Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{finalTotal.toLocaleString("en-IN")}</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
