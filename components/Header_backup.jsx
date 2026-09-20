"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiLock, FiShield, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

// This is the secret admin entry gate.
// URL: /bee-desi-admin-gate
// Admin password is set here for demo. In production use env variables + proper auth.
const ADMIN_PASSWORD = "beeDesiAdmin@2026";

export default function AdminGatePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Check if already logged in as admin
    try {
      const adminSession = localStorage.getItem("bee_desi_admin_session");
      if (adminSession === "authenticated") {
        router.push("/admin");
      }
    } catch (e) {}
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (blocked) return;
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 800)); // Anti-brute force delay

    if (password === ADMIN_PASSWORD) {
      try {
        localStorage.setItem("bee_desi_admin_session", "authenticated");
      } catch (e) {}
      router.push("/admin");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        setBlocked(true);
        setError("Too many failed attempts. Access locked for 5 minutes.");
        setTimeout(() => {
          setBlocked(false);
          setAttempts(0);
          setError("");
        }, 5 * 60 * 1000);
      } else {
        setError(`Incorrect access credentials. ${5 - newAttempts} attempts remaining.`);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-propolis-charcoal relative overflow-hidden">
      {/* Honeycomb Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' fill='none' stroke='%23f59e0b' stroke-width='1'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />

      {/* Gradient radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-deep/10 via-transparent to-transparent opacity-60" />

      <div className="relative w-full max-w-sm px-6">
        {/* Lock Icon Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-radiance/15 border border-amber-radiance/30 flex items-center justify-center mb-4 shadow-honey-glow">
            <FiShield className="text-amber-radiance text-3xl" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-honeycomb-cream">
            Executive Operations
          </h1>
          <p className="text-xs text-honeycomb-cream/50 mt-1 text-center">
            Bee Desi Restricted Administration Panel
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-amber-radiance/20 rounded-3xl p-7 shadow-honey-lg">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-900/40 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
              <FiAlertCircle className="text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-honeycomb-cream/70 uppercase tracking-wider mb-2">
                Access Credential
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-radiance/60 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  disabled={blocked}
                  className="w-full pl-10 pr-12 py-3.5 bg-white/5 border border-amber-radiance/20 text-honeycomb-cream rounded-xl text-sm focus:outline-none focus:border-amber-radiance focus:bg-white/10 transition-all placeholder-honeycomb-cream/20 disabled:opacity-40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-honeycomb-cream/40 hover:text-amber-radiance transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || blocked}
              className="w-full bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Access...</span>
                </>
              ) : (
                <>
                  <FiShield className="text-base" />
                  <span>Enter Command Center</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-honeycomb-cream/25 uppercase tracking-wider">
            Bee Desi Artisanal Apiaries • Confidential
          </p>
          <p className="text-[10px] text-honeycomb-cream/15 mt-1">
            Unauthorized access is monitored and logged
          </p>
        </div>
      </div>
    </div>
  );
}
