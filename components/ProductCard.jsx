"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
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
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isWishlisted = wishlist.some
    ? wishlist.some((w) => w.id === product.id)
    : wishlist.includes(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    if (showToast) showToast(`${product.name} added to basket!`);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col"
    >
      {/* Image Area */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-sm border border-amber-200 text-amber-800 shadow-sm">
              {product.terroir}
            </span>
            {product.tag && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900 text-amber-300">
                {product.tag}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-label="Toggle Wishlist"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
          >
            <FiHeart className={`text-sm ${isWishlisted ? "fill-red-500 text-red-500" : "text-stone-400"}`} />
          </button>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* View Details hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 bg-white text-stone-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              View Details <FiArrowRight className="text-amber-600" />
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Rating & Elevation */}
        <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
          <div className="flex items-center gap-1">
            <FiStar className="text-amber-400 fill-amber-400 text-xs" />
            <span className="font-bold text-stone-700">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <FiMapPin className="text-amber-600 text-[10px]" />
            <span>{product.elevation}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-bold text-stone-900 hover:text-amber-700 transition-colors leading-snug line-clamp-1 mb-0.5">
            {product.name}
          </h3>
        </Link>

        {/* Subtitle */}
        <p className="text-xs text-stone-400 mb-3 line-clamp-1">{product.subtitle}</p>

        {/* Sensory Mini Indicators */}
        <div className="bg-stone-50 rounded-xl p-2.5 mb-3 border border-stone-100 text-[11px] flex flex-col gap-1.5">
          {[
            { label: "Sweetness", val: product.sensoryRadar.sweetness, color: "bg-amber-400" },
            { label: "Floral Aroma", val: product.sensoryRadar.floral, color: "bg-emerald-500" },
            { label: "Tannic Depth", val: product.sensoryRadar.tannicDepth, color: "bg-stone-600" },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex items-center justify-between text-stone-500">
              <span>{label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full ${dot <= val ? color : "bg-stone-200"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NMR badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <FiShield className="text-emerald-600 text-xs flex-shrink-0" />
          <span className="text-[10px] font-bold text-emerald-700">NMR Certified · 0.00% Adulteration</span>
        </div>

        {/* Variant Selector */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-3">
            {product.variants.map((v, i) => (
              <button
                key={v.sku || i}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIndex(i);
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedVariantIndex === i
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
              Direct Apiary
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-bold text-stone-900">
                ₹{selectedVariant.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-stone-400">/ {selectedVariant.size}</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm ${
              addedAnimation
                ? "bg-emerald-600 text-white"
                : "bg-stone-900 text-white hover:bg-amber-600"
            }`}
          >
            {addedAnimation ? (
              <>
                <FiCheck className="text-sm" />
                <span>Added</span>
              </>
            ) : (
              <>
                <FiShoppingBag className="text-amber-400 text-sm" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
