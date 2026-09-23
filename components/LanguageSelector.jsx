"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiGlobe, FiChevronDown, FiCheck } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSelector({ variant = "header" }) {
  const { language, changeLanguage, languages } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Clean up any lingering Google Translate cookies or artifacts to permanently remove the Google top bar
  useEffect(() => {
    // Delete googtrans cookies on root and current domain
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;

    // Remove any Google Translate iframes or banner bars if previously injected by browser
    const googleFrame = document.querySelector(".goog-te-banner-frame, iframe.skiptranslate");
    if (googleFrame) {
      googleFrame.remove();
    }
    if (document.body.style.top) {
      document.body.style.top = "0px";
    }

    // Click outside listener
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    changeLanguage(code);
    setDropdownOpen(false);
  };

  const activeLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative inline-block notranslate" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1.5 transition-all text-xs font-semibold rounded-lg ${
          variant === "topbar"
            ? "text-amber-300 hover:text-white px-2 py-0.5"
            : variant === "drawer"
            ? "w-full justify-between p-3 rounded-xl bg-white border border-[#E0D8CB] text-stone-800"
            : "px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F5F0E6] text-stone-800 border border-[#E0D8CB] shadow-xs"
        }`}
        aria-label="Select Language"
      >
        <div className="flex items-center gap-1.5">
          <FiGlobe className={variant === "topbar" ? "text-amber-400 text-xs" : "text-[#8C4A00] text-sm"} />
          <span className="font-sans">{activeLangObj.native}</span>
        </div>
        <FiChevronDown
          className={`text-xs transition-transform duration-200 ${
            dropdownOpen ? "rotate-180 text-[#8C4A00]" : "text-stone-400"
          }`}
        />
      </button>

      {/* Language Options Dropdown */}
      {dropdownOpen && (
        <div
          className={`absolute z-[999] mt-2 w-52 rounded-2xl bg-white p-2 shadow-2xl border border-[#E0D8CB] animate-fade-in-down ${
            variant === "topbar" ? "right-0 top-full" : "right-0 top-full"
          }`}
        >
          <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C4A00]">
              Select Language / भाषा
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-stone-50 scrollbar-none">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition-colors ${
                    isSelected
                      ? "bg-[#FAF0E4] text-[#8C4A00] font-bold"
                      : "text-stone-700 hover:bg-[#FAF7F2] hover:text-[#181512]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.native}</span>
                    <span className="text-[10px] text-stone-400">{lang.name}</span>
                  </div>
                  {isSelected && <FiCheck className="text-[#8C4A00] text-sm flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
