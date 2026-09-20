import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

export const metadata = {
  title: "Bee Desi — Artisanal Raw Single-Flora Honey & Indigenous Apiculture",
  description:
    "100% Raw, Unheated, Single-Flora Nectar from India's Ancient Terroirs. Bruker 400MHz 1H-NMR Certified for 0.00% added sugars. Ethical Apis Cerana Indica tribal beekeeping.",
  keywords: [
    "Bee Desi",
    "raw honey India",
    "single flora honey",
    "wild jamun honey",
    "kashmiri acacia honey",
    "sunderbans mangrove honey",
    "sidr honey rajasthan",
    "Bruker NMR certified honey",
    "unpasteurized raw honey",
    "ethical beekeeping India",
    "ayurvedic honey",
  ],
  authors: [{ name: "Bee Desi Artisanal Apiaries" }],
  openGraph: {
    title: "Bee Desi — 100% Raw Single-Flora Honey from India's Ancient Terroirs",
    description:
      "Direct from indigenous forest apiaries. Unheated, unpasteurized, and certified by German Bruker NMR for molecular purity.",
    url: "https://beedesi.in",
    siteName: "Bee Desi",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d0b09",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-surface text-on-surface antialiased min-h-screen selection:bg-golden-nectar selection:text-propolis-charcoal">
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
