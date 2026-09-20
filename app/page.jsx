"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import PanIndiaHeritagePartition from "@/components/PanIndiaHeritagePartition";
import FeaturedJamunSpotlight from "@/components/FeaturedJamunSpotlight";
import NMRBatchLookup from "@/components/NMRBatchLookup";
import TerroirFlightSection from "@/components/TerroirFlightSection";
import HeritageStory from "@/components/HeritageStory";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import TerroirQuizModal from "@/components/TerroirQuizModal";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* Top Hero with Staged Jar Showcase */}
        <Hero />

        {/* Botanical Single-Flora Spectrum (Shop All Honey) */}
        <ProductCatalog />

        {/* Pan-India Multilingual Heritage Partition & Scroll Artwork */}
        <PanIndiaHeritagePartition />

        {/* Terroir Spotlight: Wild Raw Jamun Honey */}
        <FeaturedJamunSpotlight />

        {/* Bruker 400MHz 1H-NMR Batch Purity Lookup Tool */}
        <NMRBatchLookup />

        {/* The Connoisseur's Terroir Flight (Sommelier 3-Jar Tasting Box) */}
        <TerroirFlightSection />

        {/* Sacred Apiculture, Tribal Stewardship & Crystallization Truth */}
        <HeritageStory />

        {/* Connoisseur & Physician Reviews */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <TerroirQuizModal />
      <NMRBatchLookup isModal={true} />
      <Toast />
    </div>
  );
}
