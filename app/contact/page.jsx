"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
  FiShield,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
} from "react-icons/fi";

export default function ContactPage() {
  const { showToast } = useCart();
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

  const faqs = [
    {
      q: "Why does Bee Desi raw honey crystallize, and how do I soften it?",
      a: "Crystallization is the universal biological stamp of raw, unpasteurized honey. Industrial honey is flash-heated above 70°C and ultra-filtered to kill pollen and remain unnaturally liquid. Raw honey naturally forms silky crystals rich in live diastase enzymes. To soften, simply place the glass jar in a bowl of warm water (under 40°C) or near mild sunlight. Never microwave.",
    },
    {
      q: "What is German Bruker 400MHz 1H-NMR testing?",
      a: "Nuclear Magnetic Resonance (NMR) is the gold standard of molecular purity testing used by European pharmaceutical and export laboratories. Unlike basic lab tests that commercial brands bypass, NMR scans the proton magnetic fingerprint of the nectar to detect even 0.01% synthetic C4/C3 sugar syrups (inverted rice, beet, or corn syrups) and verifies botanical floral origin.",
    },
    {
      q: "What makes your tribal harvesting ethical and non-violent?",
      a: "Our Baiga and Mawali forest collectives follow ancient sacred guidelines: we harvest only the outer capped nectar cells, always leaving a mandatory 40% reserve for the bee colonies. We use mild cold herbal smoking instead of toxic fires, preserving wild native Apis Cerana Indica bees without hurting the queen or larvae.",
    },
    {
      q: "How fast is express dispatch across India?",
      a: "All orders placed before 2:00 PM IST are dispatched the same day from our temperature-monitored apiary warehouse in specialized eco-cushioned shockproof cartons. Metro deliveries take 2–3 business days; other regions take 3–5 business days.",
    },
  ];

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
        showToast("Your inquiry has been dispatched to our apiary sommelier team!");
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
      setErrorMessage("Network error submitting form. Please reach us directly via email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-6 font-sans">
          <Link href="/" className="hover:text-primary">
            Apiary Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-propolis-charcoal">Concierge &amp; Contact</span>
        </nav>

        {/* Hero Title */}
        <div className="border-b border-primary/15 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-radiance/10 text-amber-deep text-xs font-bold uppercase tracking-wider mb-3 border border-amber-radiance/20">
            <FiMessageSquare className="text-amber-radiance" />
            <span>Apiary Concierge &amp; Sommelier Guild</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-propolis-charcoal max-w-3xl leading-tight">
            We Welcome Your Questions, Bespoke Flights &amp; Terroir Inquiries
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant font-sans max-w-2xl mt-3 leading-relaxed">
            Whether you require assistance with NMR batch reports, sommelier pairings, wedding gifting, or orders, our master apiculturists are at your service.
          </p>
        </div>

        {/* Grid Split: Form (7 cols) & Info + FAQ (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="gold-glass rounded-3xl p-6 sm:p-9 border border-amber-radiance/30 shadow-honey">
              {submitted ? (
                <div className="py-12 px-4 text-center flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center">
                    <FiCheckCircle />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
                    Inquiry Consecrated &amp; Received
                  </h3>
                  <p className="text-sm text-on-surface-variant max-w-md">
                    Thank you. Your message has been routed to our harvest sommelier. A confirmation email has been dispatched to your inbox.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-amber-radiance text-xs font-bold uppercase tracking-wider text-amber-deep hover:bg-amber-radiance hover:text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs font-sans">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                    <h2 className="font-serif text-2xl font-bold text-propolis-charcoal">
                      Direct Concierge Inquiry
                    </h2>
                    <span className="text-[11px] text-amber-deep font-semibold flex items-center gap-1">
                      <FiClock /> Replies within 12h
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                      <FiAlertCircle className="text-base flex-shrink-0 text-red-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-on-surface mb-1.5">
                        Your Full Name <span className="text-amber-deep">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Maharani Gayatri"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-on-surface mb-1.5">
                        Email Address <span className="text-amber-deep">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. gayatri@palace.in"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-on-surface mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-on-surface mb-1.5">
                        Nature of Inquiry
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                      >
                        <option value="order_inquiry">Order Status &amp; Dispatch</option>
                        <option value="sommelier_guidance">Honey Sommelier &amp; Pairings</option>
                        <option value="nmr_certificate">Bruker NMR Lab Certification</option>
                        <option value="bulk_gifting">Wedding &amp; Corporate Bespoke Gifting</option>
                        <option value="apiculture_visit">Forest Apiary Educational Tour</option>
                        <option value="general">General Apiculture Question</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-on-surface mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Inquiry regarding Kashmiri White Acacia vintage"
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-on-surface mb-1.5">
                        Your Detailed Message <span className="text-amber-deep">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please write your questions or order notes here..."
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm leading-relaxed"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream py-4 rounded-xl font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-honey flex items-center justify-center gap-2 btn-tactile disabled:opacity-50"
                  >
                    <FiSend className="text-sm" />
                    <span>{loading ? "Transmitting Note..." : "Dispatch Message to Concierge"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & FAQ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Contact Badges */}
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/25 shadow-honey flex flex-col gap-5">
              <h3 className="font-serif text-xl font-bold text-propolis-charcoal border-b border-outline-variant/20 pb-3">
                Direct Apiary Channels
              </h3>

              <div className="flex flex-col gap-4 text-xs">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-amber-radiance flex-shrink-0 border border-amber-radiance/20">
                    <FiMail className="text-base" />
                  </div>
                  <div>
                    <strong className="block text-propolis-charcoal font-serif text-sm">
                      Official Dispatch Inquiries
                    </strong>
                    <a
                      href="mailto:kingsaksham90@gmail.com"
                      className="text-amber-deep hover:underline font-mono"
                    >
                      kingsaksham90@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 border border-emerald-200">
                    <FiMessageSquare className="text-base" />
                  </div>
                  <div>
                    <strong className="block text-propolis-charcoal font-serif text-sm">
                      Sommelier WhatsApp Hotline
                    </strong>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 hover:underline font-bold"
                    >
                      +91 98765 43210 (Direct Concierge Chat)
                    </a>
                  </div>
                </div>

                {/* Sanctuary Headquarters */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-amber-radiance flex-shrink-0 border border-amber-radiance/20">
                    <FiMapPin className="text-base" />
                  </div>
                  <div>
                    <strong className="block text-propolis-charcoal font-serif text-sm">
                      Central Indian Forest Apiary HQ
                    </strong>
                    <span className="text-on-surface-variant block mt-0.5 leading-relaxed">
                      Bee Desi Artisanal Apiaries, Balaghat Dense Deciduous Canopy Reserve, Madhya Pradesh 481001, India.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive FAQs */}
            <div className="gold-glass rounded-3xl p-6 sm:p-7 border border-amber-radiance/25 shadow-honey flex flex-col gap-4">
              <h3 className="font-serif text-xl font-bold text-propolis-charcoal border-b border-outline-variant/20 pb-3">
                Frequently Clarified Queries
              </h3>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-propolis-charcoal hover:bg-surface-container transition-colors"
                    >
                      <span className="font-serif text-sm">{faq.q}</span>
                      {activeFaq === idx ? (
                        <FiChevronUp className="text-amber-deep flex-shrink-0" />
                      ) : (
                        <FiChevronDown className="text-on-surface-variant flex-shrink-0" />
                      )}
                    </button>
                    {activeFaq === idx && (
                      <div className="p-3.5 pt-0 text-xs text-on-surface-variant font-sans leading-relaxed border-t border-outline-variant/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
