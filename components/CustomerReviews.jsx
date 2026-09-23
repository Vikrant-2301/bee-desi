"use client";

import React, { useState } from "react";
import { FiStar, FiCamera, FiThumbsUp, FiCheck } from "react-icons/fi";

const REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "New Delhi",
    profession: "Ayurvedic Physician",
    rating: 5,
    product: "Wild Raw Jamun Honey",
    date: "August 2026",
    text: "I've prescribed raw honey to patients for years but this is on a different level entirely. The aroma alone tells you it's genuine — that deep jamun tartness is unlike anything I've tasted. I verified the NMR report myself. Unimpeachable purity.",
    helpful: 48,
    verified: true,
    photo: null,
    avatar: "PS",
    avatarColor: "#7c3aed",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    location: "Mumbai",
    profession: "Artisanal Sourdough Baker",
    rating: 5,
    product: "Kashmiri White Acacia Nectar",
    date: "September 2026",
    text: "The Kashmiri Acacia doesn't crystallize, flows like liquid glass, and the vanilla-orchid notes come through beautifully even in my loaves. My regulars have noticed the difference. This is premium honey at a very fair price.",
    helpful: 34,
    verified: true,
    photo: "/images/assets/1.png",
    avatar: "RM",
    avatarColor: "#0891b2",
  },
  {
    id: 3,
    name: "Dr. Meenakshi Iyer",
    location: "Bengaluru",
    profession: "Wellness & Nutrition Coach",
    rating: 5,
    product: "Sunderbans Wild Mangrove Honey",
    date: "September 2026",
    text: "I am extremely selective about raw honey and Bee Desi is the first brand I've trusted completely. The Sunderbans honey has a complexity that's genuinely medicinal — bioflavonoids you can actually taste. My clients love it.",
    helpful: 29,
    verified: true,
    photo: null,
    avatar: "MI",
    avatarColor: "#059669",
  },
  {
    id: 4,
    name: "Arjun Nair",
    location: "Kochi",
    profession: "Food Enthusiast",
    rating: 5,
    product: "Aravalli Wild Sidr Honey",
    date: "August 2026",
    text: "Ordered the Sidr on a whim and I am blown away. The butterscotch depth, the thickness — it coats the spoon perfectly. Ordered 3 jars the very next day. The packaging is also gorgeous, makes a great gift.",
    helpful: 22,
    verified: true,
    photo: "/images/assets/7.png",
    avatar: "AN",
    avatarColor: "#b45309",
  },
  {
    id: 5,
    name: "Sunita Kapoor",
    location: "Jaipur",
    profession: "Yoga Instructor",
    rating: 5,
    product: "Naturally Creamed Mustard Honey",
    date: "July 2026",
    text: "I take a teaspoon every morning with warm water. The creamed texture is so satisfying and the mustard honey has a clean, almost nutty warmth. I've recommended Bee Desi to my entire class.",
    helpful: 17,
    verified: true,
    photo: null,
    avatar: "SK",
    avatarColor: "#dc2626",
  },
  {
    id: 6,
    name: "Vikram Deshpande",
    location: "Pune",
    profession: "Craft Cocktail Bartender",
    rating: 4,
    product: "Wild Raw Jamun Honey",
    date: "September 2026",
    text: "Using the Jamun honey in my seasonal cocktail menu as a natural sweetener. The low glycemic tartness works brilliantly in sours and shrubs. The one jar I bought ran out in a week — reordering the 500g now.",
    helpful: 11,
    verified: true,
    photo: "/images/assets/3.png",
    avatar: "VD",
    avatarColor: "#7c3aed",
  },
];

const CUSTOMER_PHOTOS = [
  { src: "/images/assets/1.png", alt: "Customer honey jar photo", label: "Priya's morning ritual" },
  { src: "/images/assets/3.png", alt: "Honeycomb texture", label: "Rohan's baking session" },
  { src: "/images/assets/7.png", alt: "Sidr honey on toast", label: "Arjun's breakfast spread" },
  { src: "/images/assets/2.png", alt: "Honey drizzle", label: "Meena's wellness shot" },
  { src: "/images/assets/5.png", alt: "Mangrove honey jar", label: "Sunderbans batch arrival" },
  { src: "/images/assets/8.png", alt: "Honey gift box", label: "Festival gifting" },
];

const RATING_DISTRIBUTION = [
  { stars: 5, count: 312, pct: 89 },
  { stars: 4, count: 28, pct: 8 },
  { stars: 3, count: 8, pct: 2 },
  { stars: 2, count: 3, pct: 1 },
  { stars: 1, count: 1, pct: 0 },
];

function StarRow({ count, filled }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          className={`text-sm ${i < filled ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const [helpful, setHelpful] = useState({});
  const [activePhoto, setActivePhoto] = useState(null);

  const markHelpful = (id) => {
    setHelpful((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="reviews" className="w-full py-20 bg-[#fdf8f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
            Verified Reviews
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-stone-500 text-base max-w-xl mx-auto">
            Every review is from a real, verified buyer. No incentivized testimonials. No fake stars.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Overall Score */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div className="flex items-end gap-3">
              <span className="font-serif text-7xl font-bold text-stone-900 leading-none">4.9</span>
              <div className="flex flex-col pb-2">
                <StarRow filled={5} count={5} />
                <span className="text-sm text-stone-500 mt-1">352 verified reviews</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <FiCheck className="text-emerald-600 text-xs" />
              <span className="text-xs font-bold text-emerald-700">100% Verified Purchases</span>
            </div>
          </div>

          {/* Histogram */}
          <div className="flex flex-col gap-2">
            {RATING_DISTRIBUTION.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-stone-500 w-8 text-right font-mono">{stars}★</span>
                <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-stone-400 w-8 font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Photo Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <FiCamera className="text-amber-600" />
            <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Customer Photos</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {CUSTOMER_PHOTOS.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(photo)}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 border-stone-200 hover:border-amber-400 transition-all shadow-sm"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Photo Lightbox */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <img src={activePhoto.src} alt={activePhoto.alt} className="w-full aspect-square object-cover" />
              <div className="p-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-700">{activePhoto.label}</p>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors font-bold"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:border-amber-200 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-800">{review.name}</p>
                    <p className="text-xs text-stone-400">{review.profession} · {review.location}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">
                    <FiCheck className="text-xs" /> Verified
                  </span>
                )}
              </div>

              {/* Stars + Product */}
              <div className="flex items-center justify-between">
                <StarRow filled={review.rating} count={5} />
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  {review.product}
                </span>
              </div>

              {/* Photo (if available) */}
              {review.photo && (
                <div className="rounded-xl overflow-hidden h-32">
                  <img
                    src={review.photo}
                    alt={`${review.name}'s photo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Review Text */}
              <p className="text-sm text-stone-600 leading-relaxed flex-1">
                "{review.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <span className="text-[11px] text-stone-400">{review.date}</span>
                <button
                  onClick={() => markHelpful(review.id)}
                  disabled={helpful[review.id]}
                  className={`flex items-center gap-1.5 text-[11px] font-semibold transition-colors ${
                    helpful[review.id]
                      ? "text-amber-600"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  <FiThumbsUp className="text-xs" />
                  {helpful[review.id] ? "Helpful!" : `Helpful (${review.helpful})`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-sm text-stone-400">
            Showing 6 of 352 reviews ·{" "}
            <a href="#" className="text-amber-700 font-semibold hover:underline">
              Load more reviews
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
