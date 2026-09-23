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
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const router = useRouter();
  const { cartCount, subtotal, wishlist, openQuiz, user, logout, currency, setCurrency } = useCart();
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav_shop", "Shop Nectars"), href: "/#catalog", section: "catalog" },
    { label: t("nav_story", "Our Story"), href: "/our-story", section: null },
    { label: t("nav_whyus", "Why Bee Desi"), href: "/why-us", section: null },
    { label: t("nav_nmr", "NMR Lab Purity"), href: "/#nmr-lab", section: "nmr-lab" },
    { label: t("nav_faqs", "FAQs & Terroirs"), href: "/faqs", section: null },
    { label: t("nav_contact", "Contact & HQ"), href: "/contact", section: null },
  ];

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
      {/* ── TOP ANNOUNCEMENT TICKER: Exact requested pointers + Indian Flag ── */}
      <div className="bg-[#1A120B] text-[#EADBCA] text-[11px] font-medium border-b border-[#332214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          
          {/* Left: Indian Flag + Core Value Pointers */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-sm flex-shrink-0" role="img" aria-label="India Flag">
              🇮🇳
            </span>
            <span className="font-semibold text-amber-200/90 whitespace-nowrap text-[10px] sm:text-[11px]">
              {t("ticker_f2c", "Farmer to Consumer")}
            </span>
            <span className="text-[#6E5540] hidden sm:inline">•</span>
            <span className="text-stone-300 whitespace-nowrap hidden sm:inline text-[11px]">
              {t("ticker_nobrokers", "No Brokers")}
            </span>
            <span className="text-[#6E5540] hidden md:inline">•</span>
            <span className="text-stone-300 whitespace-nowrap hidden md:inline text-[11px]">
              {t("ticker_panindia", "PAN India Delivery")}
            </span>
          </div>

          {/* Right: Phone | Help Centre | Currency */}
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5 text-stone-300">
              <span className="text-amber-400">📞</span>
              <a
                href="tel:7071101119"
                className="text-amber-300 font-bold hover:text-white transition-colors"
              >
                7071101119
              </a>
              <span className="text-stone-500 hidden sm:inline">/</span>
              <a
                href="tel:9307777500"
                className="text-amber-300 font-bold hover:text-white transition-colors hidden sm:inline"
              >
                9307777500
              </a>
            </div>

            <span className="text-[#4A3828] hidden sm:inline">|</span>

            <Link
              href="/contact"
              className="text-stone-300 hover:text-white transition-colors whitespace-nowrap hidden sm:inline"
            >
              {t("ticker_help", "Help Centre")}
            </Link>

            <span className="text-[#4A3828]">|</span>

            {/* Language Selector Dropdown */}
            <LanguageSelector variant="topbar" />

            <span className="text-[#4A3828]">|</span>

            {/* Currency toggle */}
            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="text-amber-400 font-bold hover:text-amber-300 transition-colors"
            >
              {currency === "INR" ? "₹ INR" : "$ USD"}
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LUXURY MODERN NAVBAR ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(24,21,18,0.06)] border-b border-[#E8E2D6]"
            : "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE7DD]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">

            {/* BRAND LOGO */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#E0D8CB] p-1.5 shadow-sm group-hover:border-amber-400 transition-all duration-300 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Bee Desi Artisanal Honey"
                  width={34}
                  height={34}
                  className="object-contain group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl sm:text-[25px] font-bold text-[#181512] tracking-tight">
                  Bee Desi
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.22em] text-[#8C4A00] mt-1">
                  Artisanal Raw Nectars
                </span>
              </div>
            </Link>

            {/* CENTER NAVIGATION LINKS (Clean, Architectural, No cheesy badges) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => link.section && scrollToSection(link.section)}
                  className="px-3.5 py-2 rounded-lg text-[13px] font-semibold text-[#3D352F] hover:text-[#181512] hover:bg-black/[0.035] transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* RIGHT UTILITIES: Find My Flavor + Search + Wishlist + Account + Cart */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

              {/* Sommelier Finder Pill */}
              <button
                onClick={openQuiz}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF0E4] hover:bg-[#F3E5D4] text-[#8C4A00] border border-[#EAD5BF] font-semibold text-xs transition-all active:scale-95"
              >
                <FiCompass className="text-sm" />
                <span>{t("nav_quiz", "Find Your Nectar")}</span>
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="w-10 h-10 rounded-xl bg-white hover:bg-[#F5F0E6] text-[#3D352F] border border-[#E0D8CB] flex items-center justify-center transition-colors shadow-xs"
              >
                <FiSearch className="text-base" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => scrollToSection("catalog")}
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-xl bg-white hover:bg-[#F5F0E6] text-[#3D352F] border border-[#E0D8CB] hidden sm:flex items-center justify-center transition-colors shadow-xs"
              >
                <FiHeart className="text-base" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Account */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-[#F5F0E6] text-[#3D352F] border border-[#E0D8CB] flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Account"
                >
                  <FiUser className="text-base" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E0D8CB] p-2 z-50">
                    <div className="px-3 py-2 border-b border-stone-100 mb-1">
                      <strong className="block text-stone-900 font-serif text-sm truncate">
                        {user?.name || "Customer Account"}
                      </strong>
                      <span className="text-[10px] text-[#8C4A00] font-mono font-semibold">
                        Direct Farm Access
                      </span>
                    </div>
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#FAF7F2] text-stone-800 font-semibold text-xs transition-colors"
                        >
                          <FiPackage className="text-[#8C4A00]" />
                          My Orders
                        </Link>
                        <Link
                          href="/track-order"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#FAF7F2] text-stone-800 font-semibold text-xs transition-colors"
                        >
                          <FiTruck className="text-[#8C4A00]" />
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
                          className="flex items-center justify-center mx-1 my-1 py-2.5 rounded-xl bg-[#181512] text-white font-bold text-xs uppercase tracking-wide hover:bg-[#8C4A00] transition-colors"
                        >
                          Sign In / Register
                        </Link>
                        <Link
                          href="/track-order"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-50 text-stone-700 font-semibold text-xs mt-1 transition-colors"
                        >
                          <FiTruck className="text-[#8C4A00]" />
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
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#181512] hover:bg-[#8C4A00] text-white active:scale-95 transition-all shadow-sm group"
                aria-label="Cart"
              >
                <div className="relative">
                  <FiShoppingCart className="text-base text-amber-300 group-hover:text-white transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#8C4A00] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-white">
                  {subtotal > 0 ? `₹${subtotal.toLocaleString("en-IN")}` : "Cart"}
                </span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white text-stone-800 hover:bg-[#F5F0E6] transition-colors flex items-center justify-center border border-[#E0D8CB]"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <FiX className="text-lg text-[#8C4A00]" /> : <FiMenu className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Expandable Search Input */}
          {searchOpen && (
            <div className="py-3 border-t border-[#E8E2D6] animate-fade-in-down">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("nav_search_placeholder", "Search raw honey by floral source: Jamun, Acacia, Mangrove, Sidr...")}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#D5CDBD] bg-white focus:outline-none focus:border-[#8C4A00] text-stone-900 placeholder-stone-400"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#181512] hover:bg-[#8C4A00] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {t("nav_search_btn", "Search")}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E0D8CB] shadow-2xl">
          <div className="px-4 py-5 flex flex-col gap-3 max-w-lg mx-auto">
            {/* Quick helpline in drawer */}
            <div className="p-3 rounded-xl bg-white border border-[#E0D8CB] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-stone-800">
                <FiPhone className="text-[#8C4A00]" />
                <a href="tel:7071101119" className="hover:underline">7071101119</a>
                <span>/</span>
                <a href="tel:9307777500" className="hover:underline">9307777500</a>
              </div>
              <span className="text-[11px] font-mono text-stone-500">Pan-India Support</span>
            </div>

            <div className="flex flex-col divide-y divide-[#EAE3D5]">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.section) scrollToSection(link.section);
                  }}
                  className="py-3 px-2 text-sm font-semibold text-stone-800 flex items-center justify-between hover:text-[#8C4A00] transition-colors"
                >
                  <span>{link.label}</span>
                  <FiArrowRight className="text-xs text-stone-400" />
                </Link>
              ))}
            </div>

            <div className="pt-1">
              <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C4A00] mb-1.5">
                Language / भाषा
              </span>
              <LanguageSelector variant="drawer" />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuiz();
              }}
              className="mt-1 w-full py-3 rounded-xl bg-[#181512] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <FiCompass /> Find Your Nectar Match
            </button>
          </div>
        </div>
      )}
    </header>
  );
}