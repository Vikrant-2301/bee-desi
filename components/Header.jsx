"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
  FiCompass,
  FiUser,
  FiLogOut,
  FiPackage,
  FiTruck,
  FiPhone,
  FiMapPin,
  FiExternalLink,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "Shop Nectars", href: "/#catalog", section: "catalog" },
  { label: "Our Story", href: "/our-story", section: null, highlight: "Suresh Yadav '96" },
  { label: "Why Us", href: "/why-us", section: null },
  { label: "NMR Lab", href: "/#nmr-lab", section: "nmr-lab", badge: "0.00% Pure" },
  { label: "FAQs", href: "/faqs", section: null },
  { label: "Contact & HQ", href: "/contact", section: null },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, subtotal, wishlist, openQuiz, user, logout, currency, setCurrency } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update dynamic CSS header height variable
  useEffect(() => {
    const updateHeaderH = () => {
      const h = document.querySelector("header")?.getBoundingClientRect().height;
      if (h) document.documentElement.style.setProperty("--header-h", `${Math.round(h)}px`);
    };
    updateHeaderH();
    window.addEventListener("resize", updateHeaderH);
    return () => window.removeEventListener("resize", updateHeaderH);
  }, [searchOpen, mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (!id) return;
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    scrollToSection("catalog");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none">
      {/* ── TOP TICKER: Micro Bar with Live Signals & Contacts ── */}
      <div className="bg-[#120c06] text-amber-100/90 text-[11px] font-medium border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          
          {/* Left: Founder trust mark */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <span className="relative w-3.5 h-3.5 flex-shrink-0 animate-bounce">
                <Image src="/images/assets/10.png" alt="Bee" fill className="object-contain" />
              </span>
              <span>Suresh Yadav's Apiaries</span>
            </span>
            <span className="hidden md:inline text-stone-500">·</span>
            <span className="hidden md:inline text-stone-300">Farmer Founded 1996</span>
            <span className="hidden lg:inline text-stone-500">·</span>
            <span className="hidden lg:inline text-emerald-400 font-mono text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
              German NMR Tested
            </span>
          </div>

          {/* Right: Phone Helplines + Office Map */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <div className="flex items-center gap-2 text-stone-300">
              <FiPhone className="text-amber-400 text-xs flex-shrink-0" />
              <a href="tel:7071101119" className="hover:text-amber-300 font-bold tracking-tight transition-colors">
                7071101119
              </a>
              <span className="text-stone-600">/</span>
              <a href="tel:9307777500" className="hover:text-amber-300 font-bold tracking-tight transition-colors">
                9307777500
              </a>
            </div>

            <span className="hidden sm:inline text-stone-700">|</span>

            {/* Office Map Link */}
            <a
              href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-amber-400 hover:text-white font-medium transition-colors group"
            >
              <FiMapPin className="text-xs group-hover:scale-110 transition-transform" />
              <span>Office Map</span>
              <FiExternalLink className="text-[10px] opacity-70" />
            </a>

            <span className="hidden sm:inline text-stone-700">|</span>

            {/* Currency toggle */}
            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="text-amber-400 font-bold hover:text-white transition-colors"
            >
              {currency === "INR" ? "₹ INR" : "$ USD"}
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CRAZY LUXURY NAVBAR ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#fffdfa]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(180,83,9,0.12)] border-b border-amber-300/40"
            : "bg-[#fffdfa]/90 backdrop-blur-md border-b border-amber-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">

            {/* LOGO: Distinctive Brand Mark with Golden Halo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-[2px] shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 flex-shrink-0">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Bee Desi"
                    width={38}
                    height={38}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 tracking-tight flex items-center gap-1">
                  Bee Desi
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-700 mt-0.5">
                  Artisanal Apiaries
                </span>
              </div>
            </Link>

            {/* CENTER NAVIGATION PILLS */}
            <nav className="hidden lg:flex items-center gap-1 bg-amber-50/70 border border-amber-200/50 rounded-full px-3 py-1 shadow-inner">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => link.section && scrollToSection(link.section)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-white transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-[9px] font-bold bg-amber-500 text-stone-950 px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                      {link.highlight}
                    </span>
                  )}
                  {link.badge && (
                    <span className="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* RIGHT CONTROLS: Sommelier Quiz Pill + Search + Account + Cart */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">

              {/* Honey Sommelier Quiz Pill */}
              <button
                onClick={openQuiz}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm shadow-amber-500/30"
              >
                <FiCompass className="text-sm" />
                <span>Sommelier Quiz</span>
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-amber-200/60 flex items-center justify-center transition-colors"
              >
                <FiSearch className="text-base" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => scrollToSection("catalog")}
                aria-label="Wishlist"
                className="relative w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-amber-200/60 hidden sm:flex items-center justify-center transition-colors"
              >
                <FiHeart className="text-base" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-black">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-amber-200/60 flex items-center justify-center transition-colors"
                  aria-label="Account"
                >
                  <FiUser className="text-base" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-amber-200/80 p-2 z-50">
                    <div className="px-3 py-2 border-b border-stone-100 mb-1">
                      <strong className="block text-stone-900 font-serif text-sm truncate">
                        {user?.name || "Guest Connoisseur"}
                      </strong>
                      <span className="text-[10px] text-amber-700 font-semibold">
                        {user ? "Verified Member" : "Direct Farm Access"}
                      </span>
                    </div>
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-800 font-semibold text-xs transition-colors"
                        >
                          <FiPackage className="text-amber-600" />
                          My Orders
                        </Link>
                        <Link
                          href="/track-order"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-800 font-semibold text-xs transition-colors"
                        >
                          <FiTruck className="text-amber-600" />
                          Track Parcel
                        </Link>
                        <div className="my-1 border-t border-stone-100" />
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-red-50 text-red-700 font-semibold text-xs text-left transition-colors"
                        >
                          <FiLogOut />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-center mx-1 my-1 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs uppercase tracking-wide hover:bg-amber-700 transition-colors shadow-sm"
                        >
                          Sign In / Join
                        </Link>
                        <Link
                          href="/track-order"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-700 font-semibold text-xs mt-1 transition-colors"
                        >
                          <FiTruck className="text-amber-600" />
                          Track Order
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 text-white hover:bg-amber-600 active:scale-95 transition-all shadow-md group"
                aria-label="Cart"
              >
                <div className="relative">
                  <FiShoppingCart className="text-base text-amber-400 group-hover:text-white transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-stone-950 rounded-full text-[9px] font-black flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-amber-200 group-hover:text-white">
                  {subtotal > 0 ? `₹${subtotal.toLocaleString("en-IN")}` : "Cart"}
                </span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-xl bg-amber-50 text-stone-800 hover:bg-amber-100 transition-colors flex items-center justify-center border border-amber-200"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <FiX className="text-lg text-amber-700" /> : <FiMenu className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Quick Expandable Search Bar */}
          {searchOpen && (
            <div className="py-2.5 border-t border-amber-100 animate-fade-in-down">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search raw honey by terroir, floral bloom, Jamun, Acacia, Sidr..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-amber-200 bg-amber-50/50 focus:bg-white focus:outline-none focus:border-amber-500 text-stone-900 placeholder-stone-400"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-amber-200 shadow-2xl">
          <div className="px-4 py-4 flex flex-col gap-2 max-w-lg mx-auto">
            {/* Direct hotline bar in mobile drawer */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                <FiPhone className="text-amber-600" />
                <span>7071101119 / 9307777500</span>
              </div>
              <a
                href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <FiMapPin /> Office Map
              </a>
            </div>

            <div className="flex flex-col divide-y divide-stone-100">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.section) scrollToSection(link.section);
                  }}
                  className="py-3 px-2 text-sm font-bold text-stone-800 flex items-center justify-between hover:text-amber-600 transition-colors"
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                      {link.highlight}
                    </span>
                  )}
                  {link.badge && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuiz();
              }}
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <FiCompass /> Take Honey Sommelier Quiz
            </button>

            {!user ? (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-stone-900 text-white font-bold text-xs uppercase tracking-wider text-center hover:bg-amber-600 transition-colors"
              >
                Sign In / Join Guild
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-700 font-bold text-xs uppercase"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}