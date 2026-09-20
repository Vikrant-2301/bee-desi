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
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "Shop Nectars", href: "/#catalog", section: "catalog" },
  { label: "Terroirs", href: "/#single-flora", section: "single-flora" },
  { label: "NMR Lab", href: "/#nmr-lab", section: "nmr-lab", badge: "Certified" },
  { label: "Tasting Flight", href: "/#terroir-flight", section: "terroir-flight" },
  { label: "Our Heritage", href: "/#heritage", section: "heritage" },
  { label: "Contact", href: "/contact", section: null },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, subtotal, wishlist, openQuiz, user, logout, currency, setCurrency } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
    scrollToSection("catalog");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none">

      {/* ── STRIP 1: Farmer to Consumer Announcement ── */}
      <div className="bg-amber-deep text-honeycomb-cream text-[11px] font-bold">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-2">
              <span className="relative w-4 h-4 flex-shrink-0 animate-pulse">
                <Image
                  src="/images/assets/10.png"
                  alt="Bee"
                  fill
                  className="object-contain"
                />
              </span>
              <span>Farmer to Consumer</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-golden-nectar">
              <span>•</span>
              <span>No Brokers</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-golden-nectar">
              <span>•</span>
              <span>PAN India Delivery</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-golden-nectar">
              <FiPhone className="text-[10px]" />
              <span>Support Indian Farmers</span>
            </span>
            <span className="text-honeycomb-cream/30">|</span>
            <a href="tel:+919133757575" className="text-honeycomb-cream/80 hover:text-white transition-colors">
              +91 91337 57575
            </a>
            <span className="text-honeycomb-cream/30">|</span>
            <Link href="/contact" className="text-honeycomb-cream/80 hover:text-white transition-colors">
              Help Centre
            </Link>
            <span className="text-honeycomb-cream/30">|</span>
            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="text-golden-nectar font-black hover:text-white transition-colors"
            >
              {currency === "INR" ? "₹ INR" : "$ USD"}
            </button>
          </div>
        </div>
      </div>

      {/* ── STRIP 2: Main Navbar (Logo + Search + Actions) ── */}
      <div className={`transition-all duration-300 ${scrolled ? "bg-surface/98 backdrop-blur-xl shadow-honey" : "bg-surface"} border-b border-outline-variant/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-6 py-3">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-radiance/40 bg-surface shadow-sm group-hover:border-amber-radiance transition-all duration-300 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Bee Desi Artisanal Honey Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-serif text-[22px] font-bold text-propolis-charcoal tracking-tight">Bee Desi</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-amber-deep mt-0.5">Artisanal Apiaries</span>
              </div>
            </Link>

            {/* SEARCH BAR */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1">
              <div className="flex w-full rounded-xl border-2 border-amber-radiance/20 hover:border-amber-radiance/50 focus-within:border-amber-radiance transition-all overflow-hidden shadow-sm bg-surface">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search honey by terroir, flora, or tasting notes..."
                  className="flex-1 px-4 py-2.5 text-sm text-on-surface bg-transparent outline-none placeholder-on-surface-variant/50"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-radiance hover:bg-amber-deep text-white transition-colors flex items-center gap-2 font-bold text-sm"
                >
                  <FiSearch />
                  <span className="hidden lg:inline">Search</span>
                </button>
              </div>
            </form>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-1 flex-shrink-0 ml-auto md:ml-0">

              {/* Delivery Location */}
              <button
                onClick={() => scrollToSection("catalog")}
                className="hidden xl:flex flex-col items-start px-3 py-1 rounded-xl hover:bg-surface-container transition-colors"
              >
                <span className="text-[9px] text-on-surface-variant uppercase tracking-wide font-semibold">Delivering to</span>
                <span className="text-[11px] font-bold text-propolis-charcoal flex items-center gap-1">
                  <FiMapPin className="text-amber-radiance text-[10px]" />
                  All India
                  <FiChevronDown className="text-[9px] text-on-surface-variant" />
                </span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => scrollToSection("catalog")}
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-amber-deep transition-colors hidden sm:flex items-center justify-center"
              >
                <FiHeart className="text-lg" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center font-black">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex flex-col items-center px-2 sm:px-3 py-1 rounded-xl hover:bg-surface-container transition-colors"
                >
                  <FiUser className="text-[18px] text-on-surface-variant" />
                  <span className="hidden sm:block text-[9px] font-semibold text-on-surface-variant mt-0.5 max-w-[60px] truncate">
                    {user?.name ? user.name.split(" ")[0] : "Account"}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-2xl shadow-honey-lg border border-amber-radiance/20 p-2 z-50">
                    <div className="px-3 py-2.5 border-b border-outline-variant/20 mb-1">
                      <strong className="block text-propolis-charcoal font-serif text-sm truncate">
                        {user?.name || "Guest Visitor"}
                      </strong>
                      <span className="text-[10px] text-amber-deep font-semibold">
                        {user ? "Harvest Guild Member" : "Sign in for exclusive access"}
                      </span>
                    </div>
                    {user ? (
                      <>
                        <Link href="/dashboard" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-surface-container text-propolis-charcoal font-semibold text-xs transition-colors">
                          <FiPackage className="text-amber-deep" />My Orders
                        </Link>
                        <Link href="/track-order" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-surface-container text-propolis-charcoal font-semibold text-xs transition-colors">
                          <FiTruck className="text-amber-deep" />Track Parcel
                        </Link>
                        <div className="my-1 border-t border-outline-variant/20" />
                        <button onClick={() => { logout(); setUserDropdownOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-700 font-semibold text-xs text-left transition-colors">
                          <FiLogOut />Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setUserDropdownOpen(false)} className="flex items-center justify-center mx-1 my-1 py-2.5 rounded-xl bg-amber-deep text-white font-bold text-xs uppercase tracking-wide hover:bg-primary transition-colors">
                          Sign In / Join Guild
                        </Link>
                        <Link href="/track-order" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-surface-container text-propolis-charcoal font-semibold text-xs mt-1 transition-colors">
                          <FiTruck className="text-amber-deep" />Track Order
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex flex-col items-center px-2 sm:px-3 py-1 rounded-xl hover:bg-surface-container transition-colors group"
                aria-label="Cart"
              >
                <div className="relative">
                  <FiShoppingCart className="text-[18px] text-propolis-charcoal group-hover:text-amber-deep transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-radiance text-white rounded-full text-[8px] font-black flex items-center justify-center">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-[9px] font-semibold text-on-surface-variant mt-0.5">
                  {subtotal > 0 ? `₹${subtotal.toLocaleString("en-IN")}` : "Cart"}
                </span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <FiX className="text-xl text-amber-deep" /> : <FiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── STRIP 3: Category Nav (dark bar) ── */}
      <div className="bg-propolis-charcoal border-b border-amber-radiance/15 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center h-10 overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => link.section && scrollToSection(link.section)}
                className="flex items-center gap-1.5 px-4 h-full text-[11px] font-bold uppercase tracking-wider text-honeycomb-cream/75 hover:text-golden-nectar hover:bg-white/5 transition-all whitespace-nowrap border-r border-white/5 last:border-r-0"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-black leading-none">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <button
              onClick={openQuiz}
              className="flex items-center gap-1.5 px-4 h-full text-[11px] font-bold uppercase tracking-wider text-golden-nectar hover:text-amber-radiance hover:bg-white/5 transition-all whitespace-nowrap ml-auto"
            >
              <FiCompass className="text-xs" />
              Honey Sommelier Quiz
            </button>
          </nav>
        </div>
      </div>

      {/* ── STRIP 4: Mobile Search ── */}
      <div className="md:hidden bg-surface border-b border-outline-variant/20 px-4 py-2.5">
        <form onSubmit={handleSearch}>
          <div className="flex rounded-xl border border-amber-radiance/25 focus-within:border-amber-radiance overflow-hidden bg-surface-container-low">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by terroir, flora..."
              className="flex-1 px-4 py-2.5 text-sm bg-transparent outline-none text-on-surface placeholder-on-surface-variant/50"
            />
            <button type="submit" className="px-4 bg-amber-radiance text-white flex items-center">
              <FiSearch />
            </button>
          </div>
        </form>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-amber-radiance/20 shadow-honey-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-bold text-propolis-charcoal flex items-center gap-2">
                <FiPackage className="text-amber-deep" /><span>My Orders</span>
              </Link>
              <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-bold text-propolis-charcoal flex items-center gap-2">
                <FiTruck className="text-amber-deep" /><span>Track Parcel</span>
              </Link>
            </div>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => { setMobileMenuOpen(false); if (link.section) scrollToSection(link.section); }} className="py-3 px-2 border-b border-outline-variant/15 text-sm font-serif font-bold text-propolis-charcoal flex items-center justify-between hover:text-amber-deep transition-colors">
                <span>{link.label}</span>
                {link.badge && <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">{link.badge}</span>}
              </Link>
            ))}
            {!user ? (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="mt-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-deep to-amber-radiance text-honeycomb-cream font-bold text-xs uppercase tracking-wider text-center">
                Sign In / Join Harvest Guild
              </Link>
            ) : (
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="mt-3 w-full py-3 rounded-xl border border-red-200 text-red-700 font-bold text-xs uppercase">
                Sign Out
              </button>
            )}
            <button onClick={() => { setMobileMenuOpen(false); openQuiz(); }} className="mt-2 w-full py-3 rounded-xl bg-propolis-charcoal text-golden-nectar font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              <FiCompass />Take Honey Sommelier Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
}