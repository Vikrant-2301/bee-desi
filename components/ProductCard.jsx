"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiShoppingBag,
  FiHeart,
  FiCheck,
  FiMapPin,
  FiStar,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, showToast } = useCart();
  const { t } = useLanguage();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isOutOfStock =
    product.inStock === false ||
    (product.stockCount !== undefined &&
      product.stockCount !== null &&
      Number(product.stockCount) <= 0);

  const selectedVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0] || {
    price: product.basePrice || 690,
    size: "350g",
  };

  const isWishlisted = wishlist?.some
    ? wishlist.some((w) => w.id === product.id)
    : false;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) {
      if (showToast) showToast(t("stock_sold_out_msg", `${product.name} is currently sold out`), "error");
      return;
    }
    addToCart(product, selectedVariant, 1);
    if (showToast) showToast(`${product.name} added to basket!`);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="group relative flex flex-col transition-all duration-300">
      
      {/* ── IMAGE PRESENTATION (NO CARD BOX, NO HEAVY BORDER) ── */}
      <div className="relative w-full aspect-[4/4.2] flex items-center justify-center bg-[#F4EFE6]/60 rounded-3xl overflow-hidden p-6 hover:bg-[#F2ECE1] transition-colors duration-500">
        
        {/* Origin / Elevation / Sold Out Pill */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#8C4A00] shadow-xs">
            {product.terroir || product.biome}
          </span>
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-stone-900 text-amber-300 border border-amber-500/40 shadow-xs">
              {t("cat_sold_out", "Sold Out")}
            </span>
          ) : product.tag ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#181512] text-amber-200">
              {product.tag}
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Wishlist"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white text-stone-400 hover:text-red-500 transition-colors shadow-xs"
        >
          <FiHeart className={`text-base ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Clean Honey Jar Image — Floating organically */}
        <Link href={`/products/${product.slug}`} className="relative w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(24,21,18,0.12)] group-hover:scale-108 transition-transform duration-500 ease-out select-none"
            loading="lazy"
          />
        </Link>

        {/* Quick View Details on Hover */}
        <div className="absolute bottom-4 inset-x-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-[#181512]/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <span>Explore Harvest</span>
            <FiArrowRight className="text-amber-300 text-xs" />
          </span>
        </div>
      </div>

      {/* ── CONTENT & METADATA (CLEAN LUXURY EDITORIAL) ── */}
      <div className="flex flex-col pt-4 px-1 flex-1">
        
        {/* Rating & Forest Terroir */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <div className="flex items-center gap-1">
            <FiStar className="text-[#8C4A00] fill-[#8C4A00] text-xs" />
            <span className="font-bold text-[#181512]">{product.rating}</span>
            <span className="text-stone-400 font-mono">({product.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-stone-500">
            <FiMapPin className="text-[#8C4A00] text-xs" />
            <span>{product.elevation}</span>
          </div>
        </div>

        {/* Botanical Product Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#181512] hover:text-[#8C4A00] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Subtitle / Flora */}
        <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 mb-3 font-normal">
          {product.subtitle || product.sensoryNotes}
        </p>

        {/* Live Lab Markers: Diastase & 0.00% Sugar */}
        <div className="flex items-center justify-between text-[11px] font-mono py-2 border-y border-[#EDE7DD] mb-3 text-stone-600">
          <div className="flex items-center gap-1.5">
            <FiShield className="text-emerald-700 text-xs" />
            <span className="text-emerald-800 font-bold">0.00% Sugar Syrup</span>
          </div>
          <span className="text-stone-500">
            {product.metrics?.diastase ? `${product.metrics.diastase} Enzymes` : "100% Raw Unheated"}
          </span>
        </div>

        {/* Size Variant Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-4">
            {product.variants.map((v, i) => (
              <button
                key={v.sku || i}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIndex(i);
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedVariantIndex === i
                    ? "bg-[#181512] text-white shadow-xs"
                    : "bg-[#F4EFE6] text-stone-600 hover:bg-[#EAE3D5]"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart Action */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-semibold">
              {t("cat_direct_harvest", "Direct Harvest")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold text-[#181512]">
                ₹{selectedVariant.price?.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-stone-400 font-mono">/ {selectedVariant.size}</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              isOutOfStock
                ? "bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300 shadow-none"
                : addedAnimation
                ? "bg-emerald-700 text-white"
                : "bg-[#181512] hover:bg-[#8C4A00] text-white shadow-xs active:scale-95"
            }`}
          >
            {isOutOfStock ? (
              <span>{t("cat_sold_out", "Sold Out")}</span>
            ) : addedAnimation ? (
              <>
                <FiCheck className="text-sm" />
                <span>{t("cat_added", "Added")}</span>
              </>
            ) : (
              <>
                <FiShoppingBag className="text-amber-300 text-sm" />
                <span>{t("cat_add_btn", "Add to Basket")}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
