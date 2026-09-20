"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BATCH_DATABASE } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  FiShield,
  FiSearch,
  FiCheckCircle,
  FiDownload,
  FiActivity,
  FiMapPin,
  FiAward,
  FiX,
  FiFileText
} from "react-icons/fi";

export default function NMRBatchLookup({ isModal = false }) {
  const { isNMRLookupOpen, closeNMRLookup, selectedNMRBatch, setSelectedNMRBatch, showToast } = useCart();
  const [searchInput, setSearchInput] = useState(selectedNMRBatch || "BD-JAMUN-2026");
  const [currentBatchCode, setCurrentBatchCode] = useState(selectedNMRBatch || "BD-JAMUN-2026");

  const batchData = BATCH_DATABASE[currentBatchCode] || BATCH_DATABASE["BD-JAMUN-2026"];

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (BATCH_DATABASE[clean]) {
      setCurrentBatchCode(clean);
      setSelectedNMRBatch(clean);
      showToast(`Batch ${clean} spectrogram loaded`);
    } else {
      showToast(`Batch not found. Showing ${currentBatchCode}`, "info");
    }
  };

  const selectPreset = (code) => {
    setSearchInput(code);
    setCurrentBatchCode(code);
    setSelectedNMRBatch(code);
  };

  const handleDownloadCertificate = () => {
    showToast(`Laboratory Certificate for ${batchData.batchCode} generated`);
    const certText = `BEE DESI ARTISANAL APIARIES — OFFICIAL NMR CERTIFICATE
======================================================
Batch Code: ${batchData.batchCode}
Harvest Flora: ${batchData.productName}
Harvest Terroir: ${batchData.origin} (${batchData.elevation})
Harvest Date: ${batchData.harvestDate}
Laboratory: ${batchData.laboratory}
Accreditation: ${batchData.accreditation}

LABORATORY PARAMETERS:
- 1H-NMR Spectrogram Analysis: 100% PURE FLORAL NECTAR (PASSED)
- C4 Synthetic Corn/Cane Sugar: 0.00% (Negative)
- C3 Inverted Rice Syrup: 0.00% (Negative)
- Diastase Enzyme Activity: ${batchData.diastaseActivity}
- Moisture Content: ${batchData.moistureContent}
- HMF Thermal Degradation: ${batchData.hmfScore}
- Carbon Isotope Delta: ${batchData.carbonIsotopeDelta}
- Bee Species: ${batchData.beeSpecies}
- Tribal Forager Fair Payout: ${batchData.fairWage}

STATUS: PASSED WITH HIGHEST DISTINCTION. NO ADULTERATION DETECTED.
`;
    const blob = new Blob([certText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NMR_Certificate_${batchData.batchCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const content = (
    <div className="w-full">
      {/* Search Header */}
      <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <FiShield className="text-base text-emerald-700" />
              <span>Bruker 400MHz 1H-NMR Spectroscopy Lab</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
              Molecular Batch Verification Engine
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl">
              Every jar of Bee Desi comes stamped with a harvest lot number. Enter your jar's batch code to inspect raw laboratory spectrograms and live enzyme readouts.
            </p>
          </div>

          {/* Quick Select Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-outline font-semibold">Try sample batch:</span>
            {Object.keys(BATCH_DATABASE).map((code) => (
              <button
                key={code}
                onClick={() => selectPreset(code)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all btn-tactile ${
                  currentBatchCode === code
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container border border-outline-variant/40"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearch} className="flex gap-2.5 max-w-lg">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-sm" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. BD-JAMUN-2026"
              className="w-full pl-9 pr-4 py-3 text-sm font-mono uppercase rounded-xl bg-surface border border-outline-variant/40 focus:outline-none focus:border-primary text-propolis-charcoal font-semibold shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-propolis-charcoal text-honeycomb-cream text-xs font-bold uppercase tracking-wider hover:bg-primary transition-colors flex items-center gap-2 btn-tactile flex-shrink-0"
          >
            <span>Verify Batch</span>
          </button>
        </form>
      </div>

      {/* Laboratory Certificate Display Dossier */}
      <motion.div
        key={batchData.batchCode}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-surface rounded-2xl border-2 border-amber-radiance/20 shadow-honey-lg overflow-hidden"
      >
        {/* Dossier Header */}
        <div className="bg-propolis-charcoal text-honeycomb-cream p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
          {/* Honey Swirl Accent in Dossier (asset 5.png) */}
          <div className="absolute right-0 top-0 w-32 h-32 opacity-10 pointer-events-none">
            <Image
              src="/images/assets/5.png"
              alt="Honey Droplet"
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-golden-nectar/20 border border-golden-nectar/40 flex items-center justify-center text-golden-nectar text-2xl">
              <FiAward />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-golden-nectar text-propolis-charcoal font-bold">
                  {batchData.batchCode}
                </span>
                <span className="text-xs text-golden-nectar font-semibold uppercase tracking-wider">
                  {batchData.harvestDate}
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-honeycomb-cream mt-0.5">
                {batchData.productName}
              </h4>
              <span className="text-xs text-surface-variant flex items-center gap-1 mt-0.5">
                <FiMapPin className="text-golden-nectar" />
                {batchData.origin} • {batchData.elevation}
              </span>
            </div>
          </div>

          {/* Test Status Badge */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <FiCheckCircle className="text-emerald-400" />
              <span>{batchData.nmrTestStatus}</span>
            </div>
            <button
              onClick={handleDownloadCertificate}
              className="px-4 py-1.5 rounded-lg bg-honeycomb-cream/15 hover:bg-honeycomb-cream/25 text-honeycomb-cream text-xs font-semibold flex items-center gap-1.5 transition-colors btn-tactile"
            >
              <FiDownload />
              <span>Download Lab Certificate (.txt)</span>
            </button>
          </div>
        </div>

        {/* Metrology Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-outline-variant/20 bg-surface-container-low/40">
          <div className="p-3 bg-surface rounded-xl border border-outline-variant/20">
            <span className="text-[10px] text-outline uppercase tracking-wider block font-medium">
              Diastase Activity (Live Enzymes)
            </span>
            <strong className="font-serif text-lg text-propolis-charcoal">
              {batchData.diastaseActivity}
            </strong>
            <span className="text-[10px] text-emerald-700 block font-semibold">Exceeds Codex Standard (&gt;8 DN)</span>
          </div>

          <div className="p-3 bg-surface rounded-xl border border-outline-variant/20">
            <span className="text-[10px] text-outline uppercase tracking-wider block font-medium">
              Natural Low Moisture
            </span>
            <strong className="font-serif text-lg text-propolis-charcoal">
              {batchData.moistureContent}
            </strong>
            <span className="text-[10px] text-emerald-700 block font-semibold">No fermentation risk</span>
          </div>

          <div className="p-3 bg-surface rounded-xl border border-outline-variant/20">
            <span className="text-[10px] text-outline uppercase tracking-wider block font-medium">
              HMF Freshness Index
            </span>
            <strong className="font-serif text-lg text-propolis-charcoal">
              {batchData.hmfScore}
            </strong>
            <span className="text-[10px] text-emerald-700 block font-semibold">Zero thermal breakdown (&lt;40mg)</span>
          </div>

          <div className="p-3 bg-surface rounded-xl border border-outline-variant/20">
            <span className="text-[10px] text-outline uppercase tracking-wider block font-medium">
              C4/C3 Added Syrups
            </span>
            <strong className="font-serif text-lg text-emerald-700">
              0.00% NEGATIVE
            </strong>
            <span className="text-[10px] text-emerald-700 block font-semibold">Zero corn, rice or beet syrup</span>
          </div>
        </div>

        {/* Simulated Bruker 400MHz 1H-NMR Spectrogram Visualization */}
        <div className="p-6 sm:p-8 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FiActivity className="text-primary text-base" />
              <h5 className="text-sm font-bold text-propolis-charcoal uppercase tracking-wider">
                Bruker 400MHz Proton (1H-NMR) Resonance Spectrum
              </h5>
            </div>
            <span className="text-xs text-outline font-mono">
              Chemical Shift Reference: TSP-d4 (0.00 ppm)
            </span>
          </div>

          {/* Interactive SVG Spectrogram Chart */}
          <div className="relative w-full h-44 sm:h-52 bg-propolis-charcoal rounded-xl p-4 overflow-hidden border border-amber-radiance/20 shadow-inner flex flex-col justify-between">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 pointer-events-none opacity-10">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="border-r border-b border-golden-nectar"></div>
              ))}
            </div>

            {/* Simulated Live Resonance Curve */}
            <svg className="w-full h-full" viewBox="0 0 800 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5BD47" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C17D2A" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Baseline */}
              <line x1="0" y1="140" x2="800" y2="140" stroke="#71594f" strokeWidth="1" strokeDasharray="3 3" />

              {/* Resonance Peaks: Natural sugars + zero adulteration markers */}
              <path
                d="M 0 140
                   L 80 140
                   Q 110 140 120 70
                   Q 130 140 160 140
                   L 220 140
                   Q 250 140 265 30
                   Q 280 140 310 140
                   L 370 140
                   Q 390 140 400 95
                   Q 410 140 440 140
                   L 500 140
                   Q 515 140 525 45
                   Q 535 140 560 140
                   L 650 140
                   Q 670 140 680 110
                   Q 690 140 720 140
                   L 800 140"
                fill="url(#spectrumGradient)"
                stroke="#F5BD47"
                strokeWidth="2"
              />

              {/* Peak Annotations */}
              <circle cx="265" cy="30" r="4" fill="#F5BD47" />
              <text x="265" y="20" fill="#F5BD47" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Alpha-Glucopyranose (5.22 ppm)
              </text>

              <circle cx="525" cy="45" r="4" fill="#F5BD47" />
              <text x="525" y="35" fill="#F5BD47" fontSize="10" textAnchor="middle" fontFamily="monospace">
                Beta-Fructofuranose (4.10 ppm)
              </text>

              {/* Zero Adulteration Zone */}
              <rect x="340" y="125" width="120" height="20" fill="rgba(34, 197, 94, 0.15)" stroke="rgba(34, 197, 94, 0.5)" rx="4" />
              <text x="400" y="139" fill="#86efac" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                Synthetic Syrup Region: FLAT (0.00%)
              </text>
            </svg>

            {/* X Axis PPM Markers */}
            <div className="flex justify-between text-[10px] text-surface-variant font-mono border-t border-outline-variant/30 pt-1 z-10">
              <span>9.0 ppm</span>
              <span>7.5 ppm</span>
              <span>6.0 ppm</span>
              <span>4.5 ppm</span>
              <span>3.0 ppm</span>
              <span>1.5 ppm</span>
              <span>0.0 ppm</span>
            </div>
          </div>

          {/* Detailed Peak Readouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
            {batchData.spectrogramPeaks.map((peak, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col">
                <span className="text-[10px] text-outline font-semibold">{peak.label}</span>
                <span className="font-mono text-xs font-bold text-propolis-charcoal">Shift: {peak.ppm}</span>
                <span className="text-[11px] text-emerald-700 font-medium">{peak.status}</span>
              </div>
            ))}
          </div>

          {/* Provenance & Tribal Collective Row */}
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-outline">Bee Species:</span>
              <strong className="text-propolis-charcoal">{batchData.beeSpecies}</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-outline">Forager Collective:</span>
              <strong className="text-propolis-charcoal">{batchData.foragerTribe}</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-outline">Direct Fair Pay:</span>
              <strong className="text-emerald-700">{batchData.fairWage}</strong>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-outline">Certified Lab:</span>
              <strong className="text-propolis-charcoal">{batchData.laboratory}</strong>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  if (isModal) {
    if (!isNMRLookupOpen) return null;
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[85] overflow-y-auto bg-propolis-charcoal/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNMRLookup}
            className="fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-surface rounded-2xl shadow-honey-lg border border-primary/20 overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col p-6 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <FiShield className="text-primary text-xl" />
                <span className="font-serif text-xl font-bold text-propolis-charcoal">
                  Official Bruker NMR Spectrogram Lookup
                </span>
              </div>
              <button
                onClick={closeNMRLookup}
                className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors btn-tactile"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 flex-1">
              {content}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <section id="nmr-lab" className="w-full py-20 bg-surface-container-high relative overflow-hidden scroll-mt-24">
      {/* Decorative Honeycomb Grid Backdrop (asset 6.png & 7.png) */}
      <div className="absolute -top-10 -right-10 w-44 h-56 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/assets/6.png"
          alt="Honeycomb Molecular Motif"
          width={180}
          height={230}
          className="object-contain"
        />
      </div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/assets/7.png"
          alt="Honeycomb Comb"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Molecular Transparency • 0.00% Syrups
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-propolis-charcoal mt-2 mb-4">
            German Bruker NMR Lab Transparency
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Most commercial honey brands pass basic adulteration tests while using sophisticated inverted rice and C4 cane syrups. Bee Desi subjects every single harvest to high-resolution 400MHz proton NMR testing.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
}
