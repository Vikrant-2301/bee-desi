"use client";

import React from "react";
import Image from "next/image";
import { FiStar, FiCheckCircle, FiShield, FiHeart } from "react-icons/fi";

const REVIEWS = [
  {
    id: 1,
    name: "Dr. Arvind Mehra",
    title: "Ayurvedic Physician, New Delhi",
    rating: 5,
    date: "August 2026",
    product: "Wild Raw Jamun Honey",
    text: "As a practitioner, I have tested dozens of commercial honeys that failed basic polarimetry tests or caused sugar spikes in my patients. Bee Desi's Balaghat Jamun honey has genuine diastase activity and an authentic low glycemic profile. The batch NMR certificate on the jar is groundbreaking transparency for India.",
    verified: true,
  },
  {
    id: 2,
    name: "Chef Vikram Adiga",
    title: "Artisanal Sourdough Baker, Mumbai",
    rating: 5,
    date: "September 2026",
    product: "The Connoisseur’s Terroir Flight",
    text: "The difference between blended supermarket honey and Bee Desi's single-flora harvests is night and day. The Kashmiri Acacia has a whisper of white vanilla that elevates triple-cream goat cheese, while the Sunderbans Mangrove honey has an extraordinary smoky, salted caramel resonance. World-class apiculture.",
    verified: true,
  },
  {
    id: 3,
    name: "Anandita Sen",
    title: "Mindful Wellness Practitioner, Bengaluru",
    rating: 5,
    date: "July 2026",
    product: "Naturally Creamed Mustard Honey",
    text: "I was skeptical about creamed honey until I tasted this. The natural fine silk crystallization feels like whipped honey butter on warm toast. Zero heating, zero artificial churning—just natural glucose crystal perfection. Love the mission supporting Baiga tribal gatherers.",
    verified: true,
  }
];

export default function CustomerReviews() {
  return (
    <section className="w-full py-20 bg-surface-container-low border-t border-outline-variant/20 relative overflow-hidden">
      {/* Decorative Gold Honeycomb Corner Motif (asset 6.png) */}
      <div className="absolute top-4 right-4 w-36 h-48 opacity-10 pointer-events-none select-none hidden lg:block">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Ornament"
          width={150}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Connoisseur &amp; Physician Proof
            </span>
            <div className="w-8 h-8 relative">
              <Image
                src="/images/assets/10.png"
                alt="Honeybee"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-propolis-charcoal mt-1 mb-2">
            Loved by Sommelier Chefs &amp; Ayurvedic Doctors
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Independent testimonials from verified culinary artisans and wellness seekers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-surface rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:border-amber-radiance/40 transition-colors relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar key={s} className="text-golden-nectar fill-golden-nectar text-xs" />
                    ))}
                  </div>
                  <span className="text-[11px] text-outline">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5">
                  <strong className="text-xs text-propolis-charcoal font-bold">{rev.name}</strong>
                  {rev.verified && (
                    <FiCheckCircle className="text-emerald-700 text-xs flex-shrink-0" title="Verified Harvest Purchase" />
                  )}
                </div>
                <span className="text-[11px] text-outline">{rev.title}</span>
                <span className="text-[10px] text-primary font-semibold mt-1">
                  Purchased: {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
