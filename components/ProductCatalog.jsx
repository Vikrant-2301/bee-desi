"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { PRODUCTS, TERROIRS, AYURVEDIC_BENEFITS } from "@/data/products";
import ProductCard from "./ProductCard";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiSearch,
  FiSliders,
  FiCompass,
  FiX,
} from "react-icons/fi";

export default function ProductCatalog() {
  const { openQuiz, liveProducts } = useCart();
  const { t } = useLanguage();
  const [selectedTerroir, setSelectedTerroir] = useState("all");
  const [selectedBenefit, setSelectedBenefit] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const [productsList, setProductsList] = useState(
    liveProducts && liveProducts.length > 0 ? liveProducts : PRODUCTS
  );

  // Sync with liveProducts from CartContext
  React.useEffect(() => {
    if (liveProducts && liveProducts.length > 0) {
      setProductsList(liveProducts);
    }
  }, [liveProducts]);

  // Direct fetch fallback on mount to ensure immediate real-time sync
  React.useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (isMounted && data.success && data.products && data.products.length > 0) {
          setProductsList(data.products);
        }
      } catch (err) {
        console.error("Error loading products in catalog:", err);
      }
    };
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchTerroir =
        selectedTerroir === "all" ||
        product.biome === selectedTerroir ||
        (product.terroir && product.terroir.toLowerCase().includes(selectedTerroir.toLowerCase()));

      const matchBenefit =
        selectedBenefit === "all" || product.ayurvedicBenefit === selectedBenefit;

      const matchSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.terroir && product.terroir.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.sensoryNotes && product.sensoryNotes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchTerroir && matchBenefit && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.basePrice - b.basePrice;
      if (sortBy === "price-high") return b.basePrice - a.basePrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [productsList, selectedTerroir, selectedBenefit, searchQuery, sortBy]);

  // Clean list of unique terroirs without duplicate "all"
  const terroirOptions = useMemo(() => {
    return TERROIRS.filter((t) => t.id !== "all");
  }, []);

  // Clean list of unique benefits without duplicate "all"
  const benefitOptions = useMemo(() => {
    return AYURVEDIC_BENEFITS.filter((b) => b.id !== "all");
  }, []);

  return (
    <section id="catalog" className="w-full py-20 bg-[#FAF7F2] scroll-mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#E8E2D6] pb-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8C4A00]">
              {t("cat_tag", "The Seasonal Flora Portfolio")}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181512] leading-tight">
              {t("cat_h2", "Single-Flora Forest Canopies")}
            </h2>
            <p className="text-sm sm:text-base text-[#4A4038] leading-relaxed">
              {t("cat_sub", "Each jar captures the unadulterated nectar of a single botanical bloom in a single Indian forest terroir. Never blended with sugar syrup, never micro-filtered.")}
            </p>
          </div>

          {/* Sommelier Matcher Quick Link */}
          <button
            onClick={openQuiz}
            className="flex-shrink-0 px-4 py-3 rounded-2xl bg-white border border-[#E0D8CB] hover:border-[#8C4A00] text-[#181512] flex items-center gap-3 shadow-xs transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-sm">
              <FiCompass />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#181512]">{t("cat_quiz_box_title", "Not sure which nectar to choose?")}</span>
              <span className="text-[11px] text-[#8C4A00] font-semibold">{t("cat_quiz_box_link", "Take 30-sec Terroir Matcher Quiz →")}</span>
            </div>
          </button>
        </div>

        {/* Clean Modern Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#E0D8CB] mb-12 flex flex-col gap-4 shadow-xs">
          
          {/* Top Line: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("cat_search_placeholder", "Search flora, terroir, tasting notes...")}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-[#FAF7F2] border border-[#E0D8CB] focus:outline-none focus:border-[#8C4A00] text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs text-stone-600 font-mono">
                {t("cat_showing", "Showing")} <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> {t("cat_harvests", "single-flora harvests")}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-mono hidden sm:inline">{t("cat_sort", "Sort:")}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E0D8CB] text-xs font-semibold text-stone-800 focus:outline-none focus:border-[#8C4A00] cursor-pointer"
                >
                  <option value="featured">{t("cat_sort_featured", "Featured First")}</option>
                  <option value="rating">{t("cat_sort_rating", "Highest Rated")}</option>
                  <option value="price-low">{t("cat_sort_low", "Price: Low to High")}</option>
                  <option value="price-high">{t("cat_sort_high", "Price: High to Low")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terroirs Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs text-stone-500 font-mono font-semibold flex-shrink-0 flex items-center gap-1">
              <FiSliders className="text-[#8C4A00] text-xs" /> {t("cat_terroirs", "Terroirs:")}
            </span>
            <button
              onClick={() => setSelectedTerroir("all")}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all flex-shrink-0 ${
                selectedTerroir === "all"
                  ? "bg-[#181512] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-stone-600 hover:bg-[#EFE8DC] border border-[#E0D8CB]"
              }`}
            >
              {t("cat_all_regions", "All Regions")}
            </button>
            {terroirOptions.map((tItem) => (
              <button
                key={tItem.id}
                onClick={() => setSelectedTerroir(tItem.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all flex-shrink-0 ${
                  selectedTerroir === tItem.id
                    ? "bg-[#181512] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-stone-600 hover:bg-[#EFE8DC] border border-[#E0D8CB]"
                }`}
              >
                {tItem.label}
              </button>
            ))}
          </div>

          {/* Ayurvedic Health Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#EDE7DD] pt-3">
            <span className="text-xs text-stone-500 font-mono font-semibold flex-shrink-0">
              {t("cat_intentions", "Health Intention:")}
            </span>
            <button
              onClick={() => setSelectedBenefit("all")}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all flex-shrink-0 ${
                selectedBenefit === "all"
                  ? "bg-[#8C4A00] text-white shadow-xs"
                  : "bg-[#FAF7F2] text-stone-600 hover:bg-[#EFE8DC] border border-[#E0D8CB]"
              }`}
            >
              {t("cat_all_intentions", "All Intentions")}
            </button>
            {benefitOptions.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBenefit(b.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all flex-shrink-0 ${
                  selectedBenefit === b.id
                    ? "bg-[#8C4A00] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-stone-600 hover:bg-[#EFE8DC] border border-[#E0D8CB]"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── PRODUCTS GRID (RELIABLE, 100% VISIBLE, NO CARD BOX/BORDER) ── */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E0D8CB] flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-2xl">
              🍯
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#181512]">
              No matching single-flora harvests found
            </h3>
            <p className="text-sm text-stone-600 max-w-md">
              Try adjusting your terroir or ayurvedic filters, or reset to view all available harvests.
            </p>
            <button
              onClick={() => {
                setSelectedTerroir("all");
                setSelectedBenefit("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#181512] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#8C4A00] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
