"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import {
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiPackage,
  FiHelpCircle,
  FiMessageCircle,
  FiArrowRight,
} from "react-icons/fi";

const FAQS = {
  "About the Honey": [
    {
      q: "What makes Bee Desi honey different from supermarket honey?",
      a: "Commercial honey is typically heat-pasteurized (which destroys live enzymes), blended from multiple farms and regions (destroying single-flora purity), and often adulterated with corn syrup or invert sugar. Bee Desi honey is raw and unheated (below 35°C always), sourced from a single forest/flora per batch, and tested by German Bruker 400MHz NMR spectroscopy to confirm zero adulteration. Every batch report is published openly.",
    },
    {
      q: "What does 'Single-Flora' mean?",
      a: "Single-flora honey means the nectar comes from a dominant single flower species — like Jamun (Syzygium cumini) or Acacia (Robinia pseudoacacia). When bees forage on a single bloom in a single forest, the resulting honey has a unique flavour, colour, and chemical fingerprint. Commercial honey blends hundreds of floral sources into a generic, undifferentiated product. Our single-flora honeys each have their own personality — like wines from different vineyards.",
    },
    {
      q: "What is 'Terroir' and why does it matter in honey?",
      a: "Terroir (French: 'sense of place') is the idea that the soil, altitude, climate, and ecosystem of a location gives its produce a unique flavour profile. A Kashmir acacia at 1,850m MSL gives a water-clear, vanilla-floral honey. Sunderbans mangrove at sea level gives a dark, savoury, high-antioxidant honey. These are genuinely different products, not just marketing labels.",
    },
    {
      q: "Will my honey crystallize?",
      a: "Natural honey crystallizes — this is a sign of purity, not spoilage. Adulterated or heated honey often won't crystallize because the natural glucose has been altered. Different florals crystallize at different rates: Kashmiri Acacia crystallizes very slowly; Mustard and Sidr crystallize faster. To re-liquefy crystallized honey, warm the jar gently in a bowl of warm water (never above 40°C). Never microwave it.",
    },
    {
      q: "Is your honey safe for diabetics?",
      a: "Raw single-flora honey has a lower Glycemic Index than commercial honey, particularly our Wild Jamun variety (low-GI due to high fructose/glucose ratio of 1.38). However, honey is still a sugar and should be consumed in moderation. Please consult your physician before consuming if you are managing diabetes.",
    },
    {
      q: "Can I give Bee Desi honey to children?",
      a: "Raw honey should NOT be given to children under 12 months of age due to risk of infant botulism (a rare but serious condition). For children above 1 year, raw honey is generally safe and nutritionally superior to processed honey.",
    },
  ],
  "Purity & Testing": [
    {
      q: "What is NMR testing and why is it the gold standard?",
      a: "NMR (Nuclear Magnetic Resonance) spectroscopy is a molecular-level analytical technique that produces a detailed 'fingerprint' of every compound in honey. A 400MHz Bruker NMR can detect adulteration at concentrations below 0.1% — far beyond any standard FSSAI test. We use the same laboratory (Bruker BioSpin, Rheinstetten, Germany) that certifies honey for European export markets. No other Indian consumer honey brand publishes these results.",
    },
    {
      q: "Where can I see the lab reports for my batch?",
      a: "Every Bee Desi jar has a batch code printed on the label (e.g., BD-JAMUN-2026). Enter this code in our NMR Lab Lookup tool on our website homepage to view the full spectrogram, diastase activity, moisture content, HMF score, and C4/C3 adulteration results.",
    },
    {
      q: "What does 'C4 Negative' mean on the report?",
      a: "C4 refers to 'C4 photosynthesis pathway' sugars — primarily corn syrup and sugarcane syrup — which are the most common honey adulterants globally. 'C4 Negative' means zero corn syrup or cane sugar was detected. Similarly, C3 refers to invert rice sugar and beet sugar. Our honey tests negative for both.",
    },
    {
      q: "What is Diastase Activity and why does it matter?",
      a: "Diastase is a live enzyme naturally present in raw honey produced by bees. When honey is heated, diastase is destroyed. A Diastase Number (DN) above 8 indicates the honey is raw and unheated. Our honey consistently tests at 18–24 DN — far exceeding both Indian FSSAI standards (minimum 8 DN) and European standards (minimum 8 DN).",
    },
  ],
  "Shipping & Delivery": [
    {
      q: "Do you deliver across all of India?",
      a: "Yes, we deliver to all PIN codes across India. Use the PIN code checker on any product page to confirm serviceability and estimated delivery time for your specific address.",
    },
    {
      q: "What is Cold-Chain delivery and why is it important?",
      a: "Raw honey should be stored below 35°C. Exposure to heat during transit can degrade enzymes and begin fermentation. We dispatch all orders in insulated packaging with temperature monitoring, partnering with cold-chain logistics providers. This adds slightly to shipping costs but is non-negotiable for us.",
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery: 4–6 business days across India. Express delivery: 2–3 business days (major metros). If you order before 2 PM on a working day, dispatch happens the same day.",
    },
    {
      q: "Is shipping free?",
      a: "Free shipping is available on all orders above ₹999. For orders below ₹999, a flat shipping charge of ₹80 applies.",
    },
    {
      q: "How is the honey packaged for delivery?",
      a: "Each jar is bubble-wrapped individually, placed in an insulated box with food-grade foam lining, and sealed with tamper-evident security tape. We use 100% recyclable packaging. No styrofoam, no single-use plastics in our boxes.",
    },
  ],
  "Orders & Returns": [
    {
      q: "Can I return or exchange my order?",
      a: "We accept returns within 7 days of delivery if the product is damaged, leaking, or significantly different from what was described. Since honey is a food product, we cannot accept returns for change of mind. To initiate a return, WhatsApp us at 7071101119 or 9307777500 with your order ID and a photo of the issue.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards, net banking, and EMI options via Razorpay. All transactions are 256-bit encrypted. We do not store any card details.",
    },
    {
      q: "Can I cancel my order?",
      a: "Yes, orders can be cancelled within 2 hours of placing them. After 2 hours, the order enters dispatch preparation and cannot be cancelled. Contact us immediately on WhatsApp for cancellation requests.",
    },
    {
      q: "Do you offer bulk or wholesale pricing?",
      a: "Yes! We offer corporate gifting packages, bulk orders for restaurants and cafes, and B2B wholesale arrangements. Reach out on WhatsApp or email hello@beedesi.in for a custom quote.",
    },
    {
      q: "Is a GST invoice provided?",
      a: "Yes, a complete GST invoice (with GSTIN) is included with every order. Digital copies are also emailed automatically after purchase.",
    },
  ],
};

function FAQAccordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? "border-amber-300 shadow-sm" : "border-stone-200"}`}>
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-amber-50/30 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-stone-800 leading-relaxed">{q}</span>
        {open
          ? <FiChevronUp className="text-amber-600 flex-shrink-0 text-lg" />
          : <FiChevronDown className="text-stone-400 flex-shrink-0 text-lg" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white border-t border-stone-100">
          <p className="text-sm text-stone-600 leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

const CATEGORY_ICONS = {
  "About the Honey": FiShoppingBag,
  "Purity & Testing": FiShield,
  "Shipping & Delivery": FiTruck,
  "Orders & Returns": FiPackage,
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("About the Honey");
  const categories = Object.keys(FAQS);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        {/* Hero */}
        <section className="bg-gradient-to-br from-stone-50 to-amber-50 py-16 lg:py-20 border-b border-amber-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-5">
              <FiHelpCircle className="text-amber-700 text-2xl" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
              Honest answers to every question you might have about our honey, our testing process, and how we operate.
            </p>
          </div>
        </section>

        {/* FAQ Body */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* Sidebar Category Nav */}
              <div className="lg:w-56 flex-shrink-0">
                <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                  {categories.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat];
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left text-sm font-semibold whitespace-nowrap lg:whitespace-normal transition-all ${
                          activeCategory === cat
                            ? "bg-amber-600 text-white shadow-sm"
                            : "bg-stone-100 text-stone-600 hover:bg-amber-50 hover:text-amber-700"
                        }`}
                      >
                        <Icon className="text-base flex-shrink-0" />
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold text-stone-900">{activeCategory}</h2>
                  <p className="text-sm text-stone-400 mt-1">
                    {FAQS[activeCategory].length} questions
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {FAQS[activeCategory].map((faq, i) => (
                    <FAQAccordion key={i} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-14 bg-stone-50 border-t border-stone-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-3">
              Still Have Questions?
            </h2>
            <p className="text-stone-500 mb-8">
              Our team responds within 2 hours on business days. Reach us on WhatsApp for the fastest response.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/917071101119?text=Hi%20Bee%20Desi,%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-200 group"
              >
                <FiMessageCircle className="text-lg" />
                Chat on WhatsApp (7071101119)
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:hello@beedesi.in"
                className="flex items-center gap-2.5 bg-white border border-stone-200 hover:border-amber-300 text-stone-700 px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm"
              >
                Email Us
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2.5 bg-white border border-stone-200 hover:border-amber-300 text-stone-700 px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm"
              >
                Contact Page
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
