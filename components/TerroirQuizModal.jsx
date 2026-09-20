"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import {
  FiX,
  FiCheck,
  FiCompass,
  FiArrowRight,
  FiShoppingBag,
  FiRotateCcw,
  FiAward
} from "react-icons/fi";

export default function TerroirQuizModal() {
  const { isQuizOpen, closeQuiz, addToCart, applyPromoCode, showToast } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    intention: "",
    flavor: "",
    texture: "",
  });

  if (!isQuizOpen) return null;

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ intention: "", flavor: "", texture: "" });
  };

  const handleSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Results
    }
  };

  // Determine Recommendation based on answers
  const getRecommendation = () => {
    if (answers.texture === "flight" || answers.intention === "culinary") {
      return PRODUCTS.find((p) => p.id === "connoisseurs-terroir-flight") || PRODUCTS[0];
    }
    if (answers.intention === "diabetes" || answers.flavor === "tart-berry") {
      return PRODUCTS.find((p) => p.id === "wild-raw-jamun") || PRODUCTS[0];
    }
    if (answers.intention === "sleep" || answers.flavor === "delicate-vanilla") {
      return PRODUCTS.find((p) => p.id === "kashmiri-white-acacia") || PRODUCTS[1];
    }
    if (answers.texture === "creamed" || answers.flavor === "creamy-butter") {
      return PRODUCTS.find((p) => p.id === "naturally-creamed-mustard") || PRODUCTS[3];
    }
    if (answers.flavor === "smoky-caramel") {
      return PRODUCTS.find((p) => p.id === "sunderbans-wild-mangrove") || PRODUCTS[2];
    }
    return PRODUCTS[0];
  };

  const recommendedProduct = getRecommendation();

  const handleAddRecommendation = () => {
    addToCart(recommendedProduct, recommendedProduct.variants[0], 1);
    applyPromoCode("BEEFIRST10");
    closeQuiz();
    showToast(`Added ${recommendedProduct.name} + applied 10% discount!`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] overflow-y-auto bg-propolis-charcoal/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuiz}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-honey-lg border border-primary/20 overflow-hidden z-10 my-auto p-6 sm:p-8 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-radiance/20 text-primary flex items-center justify-center">
                <FiCompass className="text-lg" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-propolis-charcoal leading-tight">
                  Honey Sommelier &amp; Terroir Matcher
                </h3>
                <span className="text-[11px] text-outline">
                  {step <= 3 ? `Question ${step} of 3` : "Your Personalized Match"}
                </span>
              </div>
            </div>

            <button
              onClick={closeQuiz}
              className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors btn-tactile"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          {step <= 3 && (
            <div className="w-full bg-outline-variant/20 h-1.5 rounded-full my-6 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          {/* Question 1 */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  Step 1: Daily Ritual &amp; Intention
                </span>
                <h4 className="font-serif text-2xl font-semibold text-propolis-charcoal mt-1">
                  How do you plan to enjoy your honey?
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleSelect("intention", "diabetes")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Morning Detox &amp; Low Glycemic</strong>
                  <span className="text-xs text-on-surface-variant">
                    Lukewarm water with lemon, gentle on blood sugar
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("intention", "sleep")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Deep Rest &amp; Ojas Rejuvenation</strong>
                  <span className="text-xs text-on-surface-variant">
                    Evening chamomile infusion or raw milk ritual
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("intention", "culinary")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Gourmet Artisan Culinary</strong>
                  <span className="text-xs text-on-surface-variant">
                    Pairing with aged chèvre, sourdough, and charcuterie
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("intention", "sweetener")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Daily Whole-Food Nutrition</strong>
                  <span className="text-xs text-on-surface-variant">
                    Drizzled over warm oatmeal, fruits, or Greek yogurt
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  Step 2: Flavor Complexity
                </span>
                <h4 className="font-serif text-2xl font-semibold text-propolis-charcoal mt-1">
                  Which flavor profile appeals most to your palate?
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleSelect("flavor", "delicate-vanilla")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Delicate &amp; Floral</strong>
                  <span className="text-xs text-on-surface-variant">
                    White jasmine, whisper-soft vanilla, zero harshness
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("flavor", "tart-berry")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Wild Plum &amp; Woody Tannin</strong>
                  <span className="text-xs text-on-surface-variant">
                    Tart dark berry notes, deep forest canopy finish
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("flavor", "smoky-caramel")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Bold Smoky Caramel &amp; Salted Tamarind</strong>
                  <span className="text-xs text-on-surface-variant">
                    Untamed wild mangrove nectar with maritime minerals
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("flavor", "creamy-butter")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Silken Butterscotch</strong>
                  <span className="text-xs text-on-surface-variant">
                    Naturally creamed texture with warm comforting floral sweetness
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  Step 3: Texture &amp; Experience
                </span>
                <h4 className="font-serif text-2xl font-semibold text-propolis-charcoal mt-1">
                  What texture do you prefer in raw honey?
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleSelect("texture", "liquid")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Fluid Liquid Amber</strong>
                  <span className="text-xs text-on-surface-variant">
                    Smooth, flowing translucent nectar for easy stirring
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("texture", "creamed")}
                  className="p-4 rounded-xl border border-outline-variant/30 hover:border-primary bg-surface-container-low/60 hover:bg-surface text-left transition-all btn-tactile flex flex-col gap-1"
                >
                  <strong className="text-sm text-propolis-charcoal">Velvety Spreadable Cream</strong>
                  <span className="text-xs text-on-surface-variant">
                    Natural fine micro-crystals that spread like butter
                  </span>
                </button>

                <button
                  onClick={() => handleSelect("texture", "flight")}
                  className="sm:col-span-2 p-4 rounded-xl border-2 border-amber-radiance/50 bg-amber-50/60 hover:bg-amber-50 text-left transition-all btn-tactile flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-0.5">
                    <strong className="text-sm text-propolis-charcoal flex items-center gap-1.5">
                      <FiAward className="text-primary" />
                      The Connoisseur's Terroir Flight (3 Varietals)
                    </strong>
                    <span className="text-xs text-on-surface-variant">
                      I want to taste the contrast between Himalayan Acacia, Balaghat Jamun, and Sunderbans Mangrove
                    </span>
                  </div>
                  <FiArrowRight className="text-primary text-xl flex-shrink-0" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Results Step */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-5 pt-2"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full w-fit">
                <FiCheck />
                <span>99.4% Sommelier Match Found</span>
              </div>

              <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl border border-amber-radiance/30 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-surface flex-shrink-0 shadow-sm">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col text-center sm:text-left gap-1">
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">
                    {recommendedProduct.terroir} • {recommendedProduct.elevation}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-propolis-charcoal">
                    {recommendedProduct.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-2">
                    {recommendedProduct.description}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                    <span className="font-serif text-xl font-bold text-propolis-charcoal">
                      ₹{recommendedProduct.basePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                      10% Welcome Discount Unlocked
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddRecommendation}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-propolis-charcoal text-honeycomb-cream font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile"
                >
                  <FiShoppingBag className="text-golden-nectar text-base" />
                  <span>Add Recommended Jar (10% Off)</span>
                </button>

                <button
                  onClick={resetQuiz}
                  className="py-3.5 px-4 rounded-xl bg-surface border border-outline-variant/30 text-on-surface text-xs font-semibold hover:bg-surface-container flex items-center justify-center gap-1.5 btn-tactile"
                >
                  <FiRotateCcw />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
