"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import {
  FiShield,
  FiLock,
  FiTruck,
  FiCheckCircle,
  FiCreditCard,
  FiSmartphone,
  FiArrowLeft,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    activePromo,
    triggerOrderPlaced,
    clearCart,
    showToast,
    user,
  } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: "Karnataka",
    pincode: user?.pincode || "",
    notes: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // "razorpay" or "cod"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatedShipping =
    shippingMethod === "priority" ? shippingFee + 80 : shippingFee;
  const calculatedGrandTotal = Math.max(0, finalTotal + (shippingMethod === "priority" ? 80 : 0));

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      // 1. Create order on backend
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: calculatedGrandTotal,
          currency: "INR",
          receipt: `bd_${Date.now().toString().slice(-6)}`,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || "Failed to initialize payment gateway");
      }

      // 2. Configure Razorpay modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Bee Desi Artisanal Apiaries",
        description: `Order of ${cartCount} Single-Flora Honey Vintages`,
        image: "/images/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#8f4f00",
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            showToast("Payment window closed", "info");
          },
        },
        handler: async function (response) {
          try {
            // 3. Verify signature on backend
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  orderId: `BD-${Date.now().toString().slice(-6)}`,
                  customer: formData,
                  items: cart,
                  subtotal,
                  discount: discountAmount,
                  shippingFee: calculatedShipping,
                  total: calculatedGrandTotal,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              triggerOrderPlaced({
                ...formData,
                orderId: verifyData.orderId,
                paymentMethod: "razorpay",
                razorpayPaymentId: response.razorpay_payment_id,
              });
              router.push(`/order-success?orderId=${verifyData.orderId}`);
            } else {
              throw new Error(verifyData.error || "Payment verification failed");
            }
          } catch (err) {
            console.error("Verification error:", err);
            setErrorMessage(err.message || "Failed to verify transaction");
            setIsSubmitting(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        setIsSubmitting(false);
        setErrorMessage(response.error.description || "Payment failed. Please try again.");
      });
      razorpayInstance.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      setErrorMessage(err.message || "Something went wrong initiating payment");
      setIsSubmitting(false);
    }
  };

  const handleCODOrder = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const orderId = `BD-COD-${Date.now().toString().slice(-6)}`;
      const res = await fetch("/api/orders/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderDetails: {
            orderId,
            customer: formData,
            items: cart,
            subtotal,
            discount: discountAmount,
            shippingFee: calculatedShipping,
            total: calculatedGrandTotal,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerOrderPlaced({
          ...formData,
          orderId: data.orderId,
          paymentMethod: "cod",
        });
        router.push(`/order-success?orderId=${data.orderId}`);
      } else {
        throw new Error(data.error || "Failed to place COD order");
      }
    } catch (err) {
      console.error("COD error:", err);
      setErrorMessage(err.message || "Failed to place COD order");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim()) {
      setErrorMessage("Please fill in all mandatory shipping address fields.");
      return;
    }

    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else {
      handleCODOrder();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-honeycomb-pattern">
        <Header />
        <main className="flex-1 max-w-xl mx-auto px-4 pt-40 pb-20 text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-3xl text-amber-radiance border border-amber-radiance/30">
            <FiPackage />
          </div>
          <h1 className="font-serif text-3xl font-bold text-propolis-charcoal">
            Your Basket is Empty
          </h1>
          <p className="text-sm text-on-surface-variant">
            Please add some artisanal single-flora honey to your basket before proceeding to checkout.
          </p>
          <Link
            href="/#catalog"
            className="bg-propolis-charcoal text-honeycomb-cream px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors"
          >
            Explore Honey Vintages
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
          <Link href="/cart" className="hover:text-primary flex items-center gap-1 font-medium">
            <FiArrowLeft />
            <span>Return to Basket</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-propolis-charcoal">Secure Checkout</span>
        </div>

        {/* Header Title */}
        <div className="mb-8 border-b border-primary/15 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            <FiLock className="text-xs" />
            <span>256-Bit SSL Encrypted Apiary Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-propolis-charcoal">
            Shipping &amp; Payment Confirmation
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-3">
            <FiAlertCircle className="text-lg flex-shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Checkout Split Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Controls (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Customer Information */}
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/20 shadow-honey flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                <span className="w-7 h-7 rounded-full bg-amber-radiance text-white font-serif font-bold text-sm flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-propolis-charcoal">
                  Customer &amp; Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    Full Name <span className="text-amber-deep">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    Email Address <span className="text-amber-deep">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. vikram@domain.in"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                  <span className="text-[10px] text-on-surface-variant mt-1 block">
                    Your Bruker NMR digital batch report will be emailed here.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-on-surface mb-1.5">
                    Phone Number (SMS &amp; WhatsApp Tracking) <span className="text-amber-deep">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-outline-variant/40 bg-surface-container text-xs font-semibold text-on-surface-variant">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3 rounded-r-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/20 shadow-honey flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                <span className="w-7 h-7 rounded-full bg-amber-radiance text-white font-serif font-bold text-sm flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-propolis-charcoal">
                  Delivery Destination
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-on-surface mb-1.5">
                    Street Address, Estate or Villa <span className="text-amber-deep">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. Flat 502, Ivory Orchards, Forest Sanctuary Lane"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    City <span className="text-amber-deep">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Bengaluru / New Delhi / Mumbai"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    PIN Code <span className="text-amber-deep">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="560102"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-on-surface mb-1.5">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  >
                    {[
                      "Andhra Pradesh", "Delhi", "Gujarat", "Haryana", "Karnataka",
                      "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan",
                      "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal", "Other"
                    ].map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-on-surface mb-1.5">
                    Delivery Instructions / Gate Security Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Leave with security or call upon arrival"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Dispatch Shipping Method */}
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/20 shadow-honey flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                <span className="w-7 h-7 rounded-full bg-amber-radiance text-white font-serif font-bold text-sm flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-propolis-charcoal">
                  Dispatch &amp; Temperature Control
                </h2>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    shippingMethod === "standard"
                      ? "border-amber-radiance bg-amber-radiance/10 shadow-sm"
                      : "border-outline-variant/30 hover:border-amber-radiance/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="text-amber-radiance focus:ring-amber-radiance"
                    />
                    <div>
                      <strong className="block font-serif text-sm text-propolis-charcoal">
                        Standard Apiary Express Dispatch (3–5 business days)
                      </strong>
                      <span className="text-on-surface-variant">
                        Eco-cushioned insulated transit with glass protective sleeves.
                      </span>
                    </div>
                  </div>
                  <span className="font-bold font-mono text-sm text-propolis-charcoal">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    shippingMethod === "priority"
                      ? "border-amber-radiance bg-amber-radiance/10 shadow-sm"
                      : "border-outline-variant/30 hover:border-amber-radiance/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="priority"
                      checked={shippingMethod === "priority"}
                      onChange={() => setShippingMethod("priority")}
                      className="text-amber-radiance focus:ring-amber-radiance"
                    />
                    <div>
                      <strong className="block font-serif text-sm text-propolis-charcoal">
                        Priority Cold-Pack Apiary Transit (1–2 business days)
                      </strong>
                      <span className="text-on-surface-variant">
                        Cold-packed non-refrigerated thermal wraps preserving live active diastase enzymes.
                      </span>
                    </div>
                  </div>
                  <span className="font-bold font-mono text-sm text-propolis-charcoal">
                    ₹{shippingFee + 80}
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Selection */}
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/20 shadow-honey flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                <span className="w-7 h-7 rounded-full bg-amber-radiance text-white font-serif font-bold text-sm flex items-center justify-center">
                  4
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-propolis-charcoal">
                  Payment Gateway
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {/* Razorpay Option */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-amber-radiance bg-amber-radiance/10 shadow-sm"
                      : "border-outline-variant/30 hover:border-amber-radiance/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="text-amber-radiance focus:ring-amber-radiance"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-serif text-base text-propolis-charcoal">
                          Razorpay Secure Checkout
                        </strong>
                        <span className="text-[10px] bg-amber-deep text-white px-2 py-0.5 rounded-full font-bold uppercase">
                          Recommended
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant">
                        Instant confirmation via UPI (GPay, PhonePe, Paytm), Credit/Debit Cards &amp; NetBanking.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-lg text-primary">
                    <FiSmartphone />
                    <FiCreditCard />
                  </div>
                </label>

                {/* COD Option */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === "cod"
                      ? "border-amber-radiance bg-amber-radiance/10 shadow-sm"
                      : "border-outline-variant/30 hover:border-amber-radiance/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-amber-radiance focus:ring-amber-radiance"
                    />
                    <div>
                      <strong className="font-serif text-base text-propolis-charcoal">
                        Cash on Delivery (Forest Guild Pay)
                      </strong>
                      <span className="text-xs text-on-surface-variant block">
                        Pay cash or scan courier QR upon doorstep arrival.
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-on-surface-variant">COD Available</span>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2.5 btn-tactile disabled:opacity-50"
            >
              <FiLock className="text-base" />
              {isSubmitting ? (
                <span>Consecrating Order &amp; Connecting Gateway...</span>
              ) : paymentMethod === "razorpay" ? (
                <span>Pay ₹{calculatedGrandTotal} via Razorpay</span>
              ) : (
                <span>Confirm Cash on Delivery Order (₹{calculatedGrandTotal})</span>
              )}
            </button>
          </div>

          {/* Right Column: Order Summary Sidebar (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/30 shadow-honey flex flex-col gap-5 sticky top-28">
              <h3 className="font-serif text-2xl font-bold text-propolis-charcoal border-b border-outline-variant/20 pb-4">
                Allocation Summary ({cartCount} jars)
              </h3>

              {/* Items List Mini */}
              <div className="divide-y divide-outline-variant/20 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.sku} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface border border-amber-radiance/20 flex-shrink-0">
                        <img
                          src={item.image || "/images/bee_desi_hero_custom.png"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold font-serif text-propolis-charcoal block text-sm">
                          {item.name}
                        </span>
                        <span className="text-on-surface-variant text-[11px]">
                          {item.size} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-propolis-charcoal text-sm">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="flex flex-col gap-2.5 text-xs border-t border-b border-outline-variant/20 py-4 font-sans">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-propolis-charcoal">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Harvest Guild Discount ({activePromo?.code}):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Dispatch Shipping:</span>
                  <span className="font-semibold text-propolis-charcoal">
                    {calculatedShipping === 0 ? "FREE" : `₹${calculatedShipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-on-surface-variant">
                  <span>GST &amp; FSSAI Testing Cess:</span>
                  <span>Included</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-serif text-base font-bold text-on-surface uppercase tracking-wider">
                  Total Payable:
                </span>
                <span className="font-serif text-3xl font-bold text-amber-deep">
                  ₹{calculatedGrandTotal}
                </span>
              </div>

              {/* Accreditations Trust Panel */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-2.5 text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <FiShield className="text-amber-radiance text-sm flex-shrink-0" />
                  <span>German Bruker 400MHz 1H-NMR Certified Single-Flora</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTruck className="text-amber-radiance text-sm flex-shrink-0" />
                  <span>Fragile Glass Express Transport with Free Breakage Replacement</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-amber-radiance text-sm flex-shrink-0" />
                  <span>100% Direct Fair Payout to Baiga &amp; Mawali Forest Gatherers</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
