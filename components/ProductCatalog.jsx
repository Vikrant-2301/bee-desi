"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { PRODUCTS, TERROIRS, AYURVEDIC_BENEFITS } from "@/data/products";
import ProductCard from "./ProductCard";
import { useCart } from "@/context/CartContext";
import {
  FiSearch,
  FiFilter,
  FiCompass,
  FiCheck,
  FiSliders
} from "react-icons/fi";

export default function ProductCatalog() {
  const { openQuiz } = useCart();
  const [selectedTerroir, setSelectedTerroir] = useState("all");
  const [selectedBenefit, setSelectedBenefit] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchTerroir =
        selectedTerroir === "all" || product.biome === selectedTerroir;

      const matchBenefit =
        selectedBenefit === "all" || product.ayurvedicBenefit === selectedBenefit;

      const matchSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.terroir.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sensoryNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchTerroir && matchBenefit && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.basePrice - b.basePrice;
      if (sortBy === "price-high") return b.basePrice - a.basePrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedTerroir, selectedBenefit, searchQuery, sortBy]);

  return (
    <section id="catalog" className="w-full py-20 bg-surface scroll-mt-24 relative overflow-hidden">
      {/* Background Honeycomb & Swirl Accents (assets 1.png & 5.png) */}
      <div className="absolute top-10 right-0 w-44 h-44 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/assets/1.png"
          alt="Honeycomb Accent"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-20 left-0 w-52 h-52 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/assets/5.png"
          alt="Honey Swirl Accent"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span>Botanical Single-Flora Spectrum</span>
              <span className="opacity-40">•</span>
              <span>100% Raw &amp; Traceable</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-propolis-charcoal leading-tight">
              Single-Flora Harvests from India's Forest Canopies
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Unlike industrial honey blended from unknown syrups, each Bee Desi jar captures the unadulterated nectar of a single botanical bloom in a single agro-climatic terroir.
            </p>
          </div>

          {/* Sommelier Quiz Callout with Flying Honeybee (asset 10.png) */}
          <button
            onClick={openQuiz}
            className="flex-shrink-0 px-4 py-3 rounded-xl bg-surface-container-low border border-amber-radiance/30 hover:border-amber-radiance text-propolis-charcoal flex items-center gap-3 shadow-sm btn-tactile group relative"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-radiance/20 text-primary flex items-center justify-center relative overflow-hidden">
              <Image
                src="/images/assets/10.png"
                alt="Bee"
                width={28}
                height={28}
                className="object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-propolis-charcoal">Not sure which nectar to choose?</span>
              <span className="text-[11px] text-primary font-semibold">Take 30-sec Terroir Matcher Quiz →</span>
            </div>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-surface-container-low/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-outline-variant/30 mb-10 flex flex-col gap-4 shadow-sm">
          {/* Top Line: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-sm" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flora, terroir, or tasting notes..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-on-surface placeholder:text-outline/70 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-outline hover:text-on-surface"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <span className="text-xs text-on-surface-variant font-medium">
                Showing <strong className="text-propolis-charcoal">{filteredProducts.length}</strong> single-flora harvests
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-outline hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-outline-variant/40 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terroirs / Biomes Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-outline font-semibold flex-shrink-0 flex items-center gap-1">
              <FiSliders className="text-primary text-xs" /> Terroirs:
            </span>
            <button
              onClick={() => setSelectedTerroir("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                selectedTerroir === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
              }`}
            >
              All Regions
            </button>
            {TERROIRS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTerroir(t.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                  selectedTerroir === t.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Ayurvedic Health Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-outline-variant/20 pt-3">
            <span className="text-xs text-outline font-semibold flex-shrink-0">Ayurvedic Intention:</span>
            <button
              onClick={() => setSelectedBenefit("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                selectedBenefit === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
              }`}
            >
              All Benefits
            </button>
            {AYURVEDIC_BENEFITS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBenefit(b.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                  selectedBenefit === b.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/30"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-outline-variant/30 flex flex-col items-center gap-4">
            {/* Watercolor Honey Dipper in Empty State (asset 2.png) */}
            <div className="w-20 h-28 relative">
              <Image
                src="/images/assets/2.png"
                alt="Empty Search Honey Dipper"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-serif text-xl font-semibold text-propolis-charcoal">
              No matching single-flora harvests found
            </h3>
            <p className="text-sm text-on-surface-variant max-w-md">
              Try adjusting your biome or ayurvedic filters, or clear your search query to see all available seasonal vintages.
            </p>
            <button
              onClick={() => {
                setSelectedTerroir("all");
                setSelectedBenefit("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl bg-propolis-charcoal text-honeycomb-cream text-xs font-semibold uppercase tracking-wider hover:bg-primary transition-colors btn-tactile"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
