"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FiCheckCircle, FiInfo, FiAlertCircle } from "react-icons/fi";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-[90] pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-propolis-charcoal text-honeycomb-cream shadow-honey-lg border border-amber-radiance/20 text-sm font-medium backdrop-blur-md max-w-sm"
          >
            {toast.type === "success" && (
              <FiCheckCircle className="text-golden-nectar text-lg flex-shrink-0" />
            )}
            {toast.type === "info" && (
              <FiInfo className="text-amber-radiance text-lg flex-shrink-0" />
            )}
            {toast.type === "error" && (
              <FiAlertCircle className="text-red-400 text-lg flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
