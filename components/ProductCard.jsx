"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  FiShoppingBag,
  FiEye,
  FiHeart,
  FiCheck,
  FiMapPin,
  FiStar,
  FiActivity,
  FiArrowRight
} from "react-icons/fi";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, openProductModal, openNMRLookup } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/30 hover:border-amber-radiance/40 transition-all duration-300 shadow-sm hover:shadow-honey flex flex-col justify-between relative"
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-[4/4.2] rounded-xl overflow-hidden bg-surface-container-low mb-4 flex items-center justify-center">
        {/* Floating Top Left Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          <span className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-bold text-primary shadow-sm">
            {product.terroir}
          </span>
          {product.tag && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-propolis-charcoal text-golden-nectar">
              {product.tag}
            </span>
          )}
        </div>

        {/* Floating Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle Wishlist"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors shadow-sm btn-tactile"
        >
          <FiHeart
            className={`text-sm ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>

        {/* Product Image with Hover Zoom */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
          onClick={() => openProductModal(product)}
        />

        {/* Floating Quick View Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={() => openProductModal(product)}
            className="flex-1 py-2 px-3 rounded-lg bg-surface/90 backdrop-blur-md text-propolis-charcoal text-xs font-semibold hover:bg-surface transition-colors flex items-center justify-center gap-1.5 shadow-sm btn-tactile"
          >
            <FiEye className="text-primary" />
            <span>Quick View</span>
          </button>
          {product.slug && (
            <Link
              href={`/products/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="py-2 px-3 rounded-lg bg-amber-deep text-honeycomb-cream text-xs font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-1 shadow-sm btn-tactile"
              title="View Full Product Details"
            >
              <FiArrowRight className="text-golden-nectar" />
              <span>Details</span>
            </Link>
          )}
          {product.batchCode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openNMRLookup(product.batchCode);
              }}
              className="py-2 px-3 rounded-lg bg-propolis-charcoal/90 backdrop-blur-md text-honeycomb-cream text-xs font-semibold hover:bg-propolis-charcoal transition-colors flex items-center justify-center gap-1 shadow-sm btn-tactile"
              title="View Batch NMR Spectrogram"
            >
              <FiActivity className="text-golden-nectar" />
              <span>NMR</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        {/* Rating & Elevation */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1.5">
          <div className="flex items-center gap-1">
            <FiStar className="text-golden-nectar fill-golden-nectar text-xs" />
            <span className="font-bold text-propolis-charcoal">{product.rating}</span>
            <span className="text-outline">({product.reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-outline font-medium">
            <FiMapPin className="text-primary text-[10px]" />
            <span>{product.elevation}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => openProductModal(product)}
          className="font-serif text-lg font-semibold text-propolis-charcoal group-hover:text-primary transition-colors cursor-pointer leading-snug line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-on-surface-variant mb-3 line-clamp-1">
          {product.subtitle}
        </p>

        {/* Sensory Mini Indicators */}
        <div className="bg-surface-container-low/70 rounded-xl p-2.5 mb-3 border border-outline-variant/15 text-[11px] flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>Sweetness</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full ${
                    dot <= product.sensoryRadar.sweetness
                      ? "bg-amber-radiance"
                      : "bg-outline-variant/40"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>Floral Aroma</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full ${
                    dot <= product.sensoryRadar.floral
                      ? "bg-emerald-700"
                      : "bg-outline-variant/40"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>Tannic Depth</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  className={`w-1.5 h-1.5 rounded-full ${
                    dot <= product.sensoryRadar.tannicDepth
                      ? "bg-primary-dark"
                      : "bg-outline-variant/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Vessel Variant Selector */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-4">
            {product.variants.map((v, i) => (
              <button
                key={v.sku || i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariantIndex(i);
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-all btn-tactile ${
                  selectedVariantIndex === i
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-outline font-medium">
              Direct Apiary Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-bold text-propolis-charcoal">
                ₹{selectedVariant.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                / {selectedVariant.size}
              </span>
            </div>
          </div>

          {/* Add to Basket Button */}
          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm btn-tactile ${
              addedAnimation
                ? "bg-emerald-700 text-white"
                : "bg-propolis-charcoal text-honeycomb-cream hover:bg-primary"
            }`}
          >
            {addedAnimation ? (
              <>
                <FiCheck className="text-sm" />
                <span>Added</span>
              </>
            ) : (
              <>
                <FiShoppingBag className="text-golden-nectar text-sm" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
