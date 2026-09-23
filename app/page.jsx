"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import TerroirQuizModal from "@/components/TerroirQuizModal";
import Toast from "@/components/Toast";
import ProductCatalog from "@/components/ProductCatalog";
import HomeHero from "@/components/HomeHero";
import WhyUsStrip from "@/components/WhyUsStrip";
import NMRBatchLookup from "@/components/NMRBatchLookup";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-amber-200 selection:text-stone-900">
      <Header />

      <main className="flex-1 w-full">
        {/* Clean Hero */}
        <HomeHero />

        {/* Why Us — 4 trust icons strip */}
        <WhyUsStrip />

        {/* Product Catalog Grid */}
        <ProductCatalog />
      </main>

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
