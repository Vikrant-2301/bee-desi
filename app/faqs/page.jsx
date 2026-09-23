"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiPackage,
  FiMessageCircle,
  FiArrowRight,
  FiSearch,
  FiPhone,
} from "react-icons/fi";

const FAQS = {
  "About the Honey": [
    {
      q: "What makes Bee Desi honey different from supermarket honey?",
      a: "Commercial honey is typically heat-pasteurized at 75°C (which destroys live enzymes), blended from multiple unknown farms, and often adulterated with corn syrup or inverted sugar. Bee Desi honey is raw, single-origin, and strictly unheated (below 35°C hive temperature). Every batch is independently fingerprinted by German Bruker 400MHz NMR spectroscopy to confirm 0.00% synthetic adulterants.",
    },
    {
      q: "What does 'Single-Flora' mean?",
      a: "Single-flora honey means the nectar is collected by bees during a specific seasonal bloom of one dominant wild flower—such as Jamun (Syzygium cumini), White Acacia (Robinia pseudoacacia), or Sidr (Ziziphus). Unlike supermarket honey which blends hundreds of bulk batches together, our single-flora honeys each have their own distinct botanical flavor, natural color, and medicinal profile.",
    },
    {
      q: "What is 'Terroir' in honey?",
      a: "Terroir (the unique soil, altitude, microclimate, and botanical ecosystem of a geographic region) gives raw honey its soul. Kashmiri Acacia from 1,850m MSL is crystal-clear and whisper-sweet; Sunderbans Mangrove from coastal tidal creeks is rich, dark, and deeply antioxidant. Every harvest tells the story of its landscape.",
    },
    {
      q: "Why does real raw honey crystallize, and what should I do?",
      a: "Crystallization is living proof that honey is raw and unpasteurized. Pure honey contains natural glucose and wild micro-pollen that naturally form crystals in cool weather. Commercial syrups stay unnaturally clear forever because they are boiled and stripped of pollen. If you prefer a fluid texture, gently warm the glass jar in a bowl of warm water (under 40°C). Never microwave.",
    },
    {
      q: "Is your honey safe for diabetics?",
      a: "Raw single-flora honey—particularly our Wild Raw Jamun Honey—has a naturally low Glycemic Index due to a higher natural fructose-to-glucose ratio (1.38). However, honey is still a concentrated carbohydrate. We advise consulting your physician before incorporating raw honey into a diabetes management routine.",
    },
    {
      q: "Can I give Bee Desi honey to infants?",
      a: "Raw unpasteurized honey should NEVER be given to infants under 12 months of age due to the biological risk of infant botulism. For children over 1 year and adults, raw honey is a wholesome, nutrient-dense natural food.",
    },
  ],
  "Purity & Science": [
    {
      q: "What is German Bruker 400MHz NMR spectroscopy?",
      a: "Nuclear Magnetic Resonance (NMR) spectroscopy is the world's most advanced molecular testing method for honey purity. Conducted at Bruker BioSpin NMR Laboratories in Germany, it generates a high-resolution molecular fingerprint that detects even 0.01% synthetic C3/C4 sugar syrups (inverted rice, corn, or beet syrups). We publish full batch reports openly on our website.",
    },
    {
      q: "How do I check the lab report for my jar?",
      a: "Every Bee Desi jar carries a specific harvest batch code on the label (e.g. BD-JAMUN-2026). Simply enter this code in the NMR Batch Lookup tool on our homepage to view the live laboratory spectrogram, diastase enzyme rating, moisture score, and 0.00% adulteration status.",
    },
    {
      q: "What does 'Diastase Activity' measure?",
      a: "Diastase is a vital digestive enzyme secreted by bees during nectar ripening. When honey is heated by industrial factories, diastase is completely destroyed. FSSAI requires a minimum Diastase Number (DN) of 8. Bee Desi batches consistently test between 18.0 and 24.6 DN—proving our honey is living, cold-extracted, and unheated.",
    },
  ],
  "Shipping & Cold Chain": [
    {
      q: "Do you deliver across all PIN codes in India?",
      a: "Yes. We deliver across all servicable PIN codes in India through express courier networks. Enter your PIN code on any product page for real-time delivery estimates.",
    },
    {
      q: "How do you protect raw honey from transit heat?",
      a: "Raw honey should not be subjected to temperatures above 35°C. Every jar is shipped in eco-friendly shock-cushioned insulated packaging with temperature monitoring, ensuring the living enzymes arrive in the exact state they left the forest.",
    },
    {
      q: "What are your shipping rates and timelines?",
      a: "We offer Free Shipping on all orders above ₹999. For smaller orders, a flat ₹80 delivery fee applies. Standard delivery takes 2–4 business days in major metros and 3–5 days in other regions. Orders placed before 2:00 PM IST dispatch the same business day.",
    },
  ],
  "Orders & Guarantees": [
    {
      q: "What is your return policy?",
      a: "If your jar arrives damaged, broken, or leaking during transit, we provide an immediate 100% replacement or refund. Simply share your order ID and a photo on WhatsApp at 7071101119 or 9307777500 within 48 hours of delivery.",
    },
    {
      q: "What payment options are supported?",
      a: "We support UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit cards, and EMI via 256-bit secure Razorpay encryption.",
    },
    {
      q: "Do you offer corporate or wedding gifting?",
      a: "Yes. We curate custom wooden gift flight boxes with custom wax seals and personalized handwritten scrolls for weddings, festive gifts, and corporate connoisseurs. Reach out directly on WhatsApp or email hello@beedesi.in.",
    },
  ],
};

const CATEGORIES = [
  { id: "About the Honey", icon: FiShoppingBag },
  { id: "Purity & Science", icon: FiShield },
  { id: "Shipping & Cold Chain", icon: FiTruck },
  { id: "Orders & Guarantees", icon: FiPackage },
];

export default function FAQsPage() {
  const { getFaqsData } = useLanguage();
  const f = getFaqsData();
  const [activeCategory, setActiveCategory] = useState("About the Honey");
  const [searchFilter, setSearchFilter] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const activeFaqs = FAQS[activeCategory] || [];
  const filteredFaqs = searchFilter.trim()
    ? Object.values(FAQS)
        .flat()
        .filter(
          (item) =>
            item.q.toLowerCase().includes(searchFilter.toLowerCase()) ||
            item.a.toLowerCase().includes(searchFilter.toLowerCase())
        )
    : activeFaqs;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181512] selection:bg-amber-200 selection:text-stone-900">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        
        {/* ── EDITORIAL HEADER ── */}
        <section className="relative border-b border-[#E7E2D8] bg-[#F4EFE6] pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold block mb-4">
              {f.hero_tag || "Knowledge Archive · Bee Desi"}
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#181512] leading-[1.1] mb-6">
              {f.hero_h1 || "Frequently Asked Questions"}
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {f.hero_p}
            </p>


            {/* Quick Search */}
            <div className="relative max-w-xl mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-base" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search any query (e.g. crystallization, NMR test, diabetes, delivery)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#D5CDBD] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8C4A00] shadow-xs"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-800"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        </section>

        {/* ── MAIN CONTENT SECTION ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              
              {/* Category Nav Sidebar */}
              {!searchFilter && (
                <div className="lg:w-64 flex-shrink-0 lg:sticky lg:top-28 w-full">
                  <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                    {CATEGORIES.map(({ id, icon: Icon }) => {
                      const isSelected = activeCategory === id;
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setActiveCategory(id);
                            setOpenIndex(0);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap lg:whitespace-normal ${
                            isSelected
                              ? "bg-[#181512] text-white shadow-xs"
                              : "bg-[#FAF7F2] text-stone-700 hover:bg-[#EFE8DC] border border-[#E0D8CB]"
                          }`}
                        >
                          <Icon className={`text-base flex-shrink-0 ${isSelected ? "text-amber-400" : "text-[#8C4A00]"}`} />
                          <span>{id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Accordion Questions */}
              <div className="flex-1 w-full">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181512]">
                    {searchFilter ? `Search Results (${filteredFaqs.length})` : activeCategory}
                  </h2>
                  <span className="font-mono text-xs text-stone-500">
                    {filteredFaqs.length} questions
                  </span>
                </div>

                <div className="flex flex-col gap-3.5">
                  {filteredFaqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div
                        key={faq.q}
                        className={`border rounded-2xl transition-all ${
                          isOpen ? "border-[#8C4A00] bg-[#FAF7F2]/40" : "border-[#E5DFD5] bg-white hover:border-[#D0C7B8]"
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? -1 : i)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left text-[#181512]"
                        >
                          <span className="font-serif text-lg font-bold leading-snug">
                            {faq.q}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center flex-shrink-0">
                            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-sm sm:text-base text-stone-600 leading-relaxed font-sans border-t border-[#EAE3D5] pt-4">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STILL HAVE QUESTIONS? ── */}
        <section className="py-16 bg-[#F4EFE6] border-t border-[#E7E2D8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold block mb-3">
              {f.hero_tag || "Direct Farmer Support"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181512] mb-3">
              {f.still_questions || "Still Have a Question?"}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {f.still_p || "We are an open collective. Call our apiary desk directly or talk to us on WhatsApp."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/917071101119?text=Namaste%20Bee%20Desi,%20I%20have%20a%20question%20about%20your%20honey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                <FiMessageCircle className="text-base" />
                <span>WhatsApp: 7071101119</span>
              </a>

              <a
                href="tel:9307777500"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#EFE8DC] border border-[#D5CDBD] text-[#181512] font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <FiPhone className="text-[#8C4A00]" />
                <span>Call: 9307777500</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#EFE8DC] border border-[#D5CDBD] text-[#181512] font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Contact Desk &amp; Map</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
