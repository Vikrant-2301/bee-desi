"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
  FiExternalLink,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
} from "react-icons/fi";

const QUICK_FAQS = [
  {
    q: "Why does raw honey crystallize, and how do I reliquefy it?",
    a: "Crystallization is biological proof of raw, unpasteurized honey. Live enzymes and raw glucose form natural crystal lattices in cooler temperatures. Simply place the glass jar in a bowl of warm water (under 40°C) for 10 minutes. Never microwave.",
  },
  {
    q: "How do I verify the German NMR test report for my jar?",
    a: "Every Bee Desi jar has a batch code printed on the label. Enter this code into our NMR Batch Lookup tool on the homepage to inspect the live spectrogram, diastase score, and 0.00% synthetic syrup results.",
  },
  {
    q: "What is your return & replacement policy?",
    a: "If your jar arrives broken, damaged, or leaking during transit, we dispatch an immediate replacement or process a 100% refund. Simply message us on WhatsApp with a photo within 48 hours of delivery.",
  },
];

export default function ContactPage() {
  const { showToast } = useCart();
  const { getContactData } = useLanguage();
  const c = getContactData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "order_inquiry",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        if (showToast) showToast("Your inquiry has been sent to our team!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiryType: "order_inquiry",
          subject: "",
          message: "",
        });
      } else {
        setErrorMessage(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error submitting form. Please reach us directly via WhatsApp or phone.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181512] selection:bg-amber-200 selection:text-stone-900">
      <Header />
      <Toast />

      <main className="flex-1" style={{ paddingTop: "var(--header-h, 88px)" }}>
        
        {/* ── EDITORIAL HEADER ── */}
        <section className="relative border-b border-[#E7E2D8] bg-[#F4EFE6] pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8C4A00] font-bold block mb-4">
                {c.hero_tag || "Direct Communication · Bee Desi"}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#181512] leading-[1.08] mb-6">
                {c.hero_h1_part1 || "Speak Directly with"}{" "}
                <span className="italic font-normal text-[#8C4A00]">
                  {c.hero_h1_part2 || "Bee Desi."}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
                {c.hero_p}
              </p>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTACT SECTION: 2-COLUMN LUXURY SPLIT ── */}
        <section className="py-16 lg:py-24 bg-white border-b border-[#E7E2D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Modern Minimal Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-[#FAF7F2] rounded-3xl p-7 sm:p-10 border border-[#DCD5C8] shadow-xs">
                  {submitted ? (
                    <div className="py-12 text-center flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center">
                        <FiCheckCircle />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-[#181512]">
                        Message Received
                      </h3>
                      <p className="text-sm text-stone-600 max-w-md leading-relaxed">
                        Thank you for reaching out. Your note has been routed to our apiary team. We typically respond within 2 to 4 business hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-6 py-3 rounded-xl bg-[#181512] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#8C4A00] transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4 mb-1">
                        <h2 className="font-serif text-2xl font-bold text-[#181512]">
                          Send a Direct Inquiry
                        </h2>
                        <span className="text-xs font-mono text-[#8C4A00] flex items-center gap-1.5 font-semibold">
                          <FiClock /> Fast Replies
                        </span>
                      </div>

                      {errorMessage && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                          <FiAlertCircle className="text-base flex-shrink-0 text-red-600" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8C4A00]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8C4A00]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8C4A00]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Inquiry Type
                          </label>
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] bg-white text-sm text-stone-900 focus:outline-none focus:border-[#8C4A00] cursor-pointer"
                          >
                            <option value="order_inquiry">Order Status &amp; Dispatch</option>
                            <option value="sommelier_guidance">Honey Sommelier &amp; Pairings</option>
                            <option value="nmr_certificate">Bruker NMR Lab Certification</option>
                            <option value="bulk_gifting">Wedding &amp; Corporate Gifting</option>
                            <option value="general">General Question</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Subject
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Brief summary of your inquiry"
                            className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8C4A00]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Write your message here..."
                            className="w-full px-4 py-3 rounded-xl border border-[#D5CDBD] bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#8C4A00] leading-relaxed"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-4 rounded-xl bg-[#181512] hover:bg-[#8C4A00] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <FiSend />
                        <span>{loading ? "Sending..." : "Transmit Inquiry"}</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column: Direct Verified Channels & Quick FAQs (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Direct Verified Phone & WhatsApp Box */}
                <div className="bg-[#FAF7F2] rounded-3xl p-7 border border-[#DCD5C8] shadow-xs flex flex-col gap-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8C4A00] font-bold block mb-1">
                      Direct Contact
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#181512]">
                      Farmer Helplines
                    </h3>
                  </div>

                  {/* Phone Direct */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg flex-shrink-0">
                      <FiPhone />
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-[#181512]">
                        Call the Desk Directly
                      </strong>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-mono font-bold text-[#8C4A00]">
                        <a href="tel:7071101119" className="hover:underline">7071101119</a>
                        <span className="text-stone-300">/</span>
                        <a href="tel:9307777500" className="hover:underline">9307777500</a>
                      </div>
                      <span className="text-xs text-stone-500 font-mono block mt-0.5">
                        Monday – Saturday, 9:00 AM – 7:00 PM IST
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Direct */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg flex-shrink-0">
                      <FiMessageSquare />
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-[#181512]">
                        Instant WhatsApp Desk
                      </strong>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Ask about batch codes, jar recommendations, or track an active dispatch.
                      </p>
                      <a
                        href="https://wa.me/917071101119?text=Hi%20Bee%20Desi,%20I%20have%20an%20inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-800 hover:underline font-mono"
                      >
                        <span>Start WhatsApp Chat (7071101119) &rarr;</span>
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg flex-shrink-0">
                      <FiMail />
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-[#181512]">
                        Official Email
                      </strong>
                      <a href="mailto:hello@beedesi.in" className="text-xs font-mono text-[#8C4A00] hover:underline block mt-0.5">
                        hello@beedesi.in
                      </a>
                    </div>
                  </div>

                  {/* Origin & Location */}
                  <div className="flex items-start gap-4 pt-4 border-t border-[#EAE3D5]">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E4] text-[#8C4A00] flex items-center justify-center text-lg flex-shrink-0">
                      <FiMapPin />
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-[#181512]">
                        Founder Origin &amp; Processing Center
                      </strong>
                      <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                        Founder Suresh Yadav &middot; Kanpur, Uttar Pradesh. Central extraction &amp; testing apiary in Balaghat.
                      </p>
                      <a
                        href="https://maps.app.goo.gl/XLW9mfgrwBQk5NcD7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8C4A00] hover:underline mt-2 font-mono"
                      >
                        <span>Open Location in Google Maps</span>
                        <FiExternalLink className="text-[10px]" />
                      </a>
                    </div>
                  </div>

                </div>

                {/* Quick Accordion for Common Queries */}
                <div className="bg-[#FAF7F2] rounded-3xl p-7 border border-[#DCD5C8] shadow-xs flex flex-col gap-4">
                  <h3 className="font-serif text-xl font-bold text-[#181512] pb-2 border-b border-[#EAE3D5]">
                    Instant Answers
                  </h3>

                  <div className="flex flex-col gap-2.5">
                    {QUICK_FAQS.map((faq, i) => {
                      const isOpen = activeFaq === i;
                      return (
                        <div key={faq.q} className="border border-[#E0D8CB] rounded-xl bg-white overflow-hidden">
                          <button
                            onClick={() => setActiveFaq(isOpen ? -1 : i)}
                            className="w-full p-3.5 text-left flex items-center justify-between gap-2 text-xs font-bold text-[#181512]"
                          >
                            <span className="font-serif text-sm">{faq.q}</span>
                            {isOpen ? <FiChevronUp className="text-[#8C4A00]" /> : <FiChevronDown className="text-stone-400" />}
                          </button>
                          {isOpen && (
                            <div className="px-3.5 pb-3.5 pt-1 text-xs text-stone-600 font-sans leading-relaxed border-t border-stone-100">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="/faqs"
                    className="text-xs font-mono font-bold text-[#8C4A00] hover:underline pt-2 block"
                  >
                    View all frequently asked questions &rarr;
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
