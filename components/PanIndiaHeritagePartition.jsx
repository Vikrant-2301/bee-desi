"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function PanIndiaHeritagePartition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Smooth scroll scale and subtle vertical parallax
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.88, 1.04, 0.92]);
  const y = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 md:py-16 flex items-center justify-center bg-transparent"
    >
      {/* Decorative Honeycomb Corner Lattice (asset 6.png) */}
      <div className="absolute top-2 left-6 w-32 h-44 opacity-[0.15] pointer-events-none select-none hidden md:block">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Ornament"
          width={130}
          height={170}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-2 right-6 w-32 h-44 opacity-[0.15] pointer-events-none select-none hidden md:block transform rotate-180">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Ornament"
          width={130}
          height={170}
          className="object-contain"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ scale, y, opacity }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center"
        >
          <Image
            src="/images/pan_india_heritage.png"
            alt="Bee Desi Pure & Natural Honey & Ghee"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
