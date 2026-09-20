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
  FiLock,
  FiMail,
  FiUser,
  FiPhone,
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiShield,
  FiAlertCircle,
} from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, showToast } = useCart();

  const [mode, setMode] = useState("signin"); // "signin" or "register"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        login(data.user);
        router.push("/");
      } else {
        setErrorMsg(data.error || "Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      setErrorMsg("Network error connecting to Apiary authentication service.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        login(data.user);
        showToast("Welcome to the Bee Desi Harvest Guild! Account created successfully.");
        router.push("/");
      } else {
        setErrorMsg(data.error || "Failed to create account. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error during Guild registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-36 pb-20 flex flex-col justify-center">
        {/* Auth Box */}
        <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/30 shadow-honey flex flex-col gap-6">
          {/* Brand Crest */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full border border-amber-radiance/40 bg-surface shadow-sm flex items-center justify-center p-1 mb-3">
              <Image
                src="/images/logo.png"
                alt="Bee Desi Crest"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
              Bee Desi Harvest Guild
            </h1>
            <p className="text-xs text-on-surface-variant font-sans mt-1">
              Private access to seasonal micro-harvests &amp; NMR purity records
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-surface-container p-1 border border-outline-variant/30">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMsg("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                mode === "signin"
                  ? "bg-surface text-propolis-charcoal shadow-sm border border-amber-radiance/20"
                  : "text-on-surface-variant hover:text-propolis-charcoal"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMsg("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                mode === "register"
                  ? "bg-surface text-propolis-charcoal shadow-sm border border-amber-radiance/20"
                  : "text-on-surface-variant hover:text-propolis-charcoal"
              }`}
            >
              Join Guild
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <FiAlertCircle className="text-base flex-shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Forms */}
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="connoisseur@beedesi.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded text-amber-radiance" defaultChecked />
                  <span>Remember my session</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast("Password reset link sent to your email", "info"); }} className="hover:text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile disabled:opacity-50"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Guild"}</span>
                <FiArrowRight />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Radhika Apte"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="radhika@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1.5">
                  Choose Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>
              </div>

              {/* Guild Member Privileges */}
              <div className="p-3 rounded-xl bg-amber-radiance/10 border border-amber-radiance/20 text-[11px] text-amber-deep flex flex-col gap-1">
                <span className="font-bold flex items-center gap-1">
                  <FiAward /> Guild Member Privileges:
                </span>
                <span>• Instant 10% Welcome Voucher applied automatically</span>
                <span>• Private batch reservations before seasonal public release</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile disabled:opacity-50"
              >
                <span>{loading ? "Creating Guild Profile..." : "Create Free Guild Account"}</span>
                <FiArrowRight />
              </button>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-outline-variant/20 text-center text-[11px] text-on-surface-variant flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <FiShield className="text-amber-radiance" />
              <span>Zero-Spam Promise</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FiCheckCircle className="text-emerald-700" />
              <span>Secure MongoDB Cloud</span>
            </span>
          </div>
        </div>
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
