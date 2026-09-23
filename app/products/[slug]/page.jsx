"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { PRODUCTS, BATCH_DATABASE } from "@/data/products";
import {
  FiShoppingBag,
  FiHeart,
  FiShield,
  FiAward,
  FiTruck,
  FiCheck,
  FiStar,
  FiCheckCircle,
  FiMap,
  FiDroplet,
  FiZap,
  FiClock,
  FiPackage,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiCamera,
  FiThumbsUp,
  FiX,
} from "react-icons/fi";

/* ── Helpers ── */
const SensoryDot = ({ value, max = 5 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all ${
          i < value
            ? "bg-amber-500 scale-100"
            : "bg-stone-200 scale-90"
        }`}
      />
    ))}
  </div>
);

const AccordionSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-3 font-serif text-lg font-bold text-stone-900">
          {Icon && <Icon className="text-amber-600 text-xl" />}
          {title}
        </span>
        {open ? (
          <FiChevronUp className="text-amber-600 flex-shrink-0" />
        ) : (
          <FiChevronDown className="text-stone-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

/* ── Pincode Checker ── */
const SERVICEABLE_PINCODES = [
  "110001","110002","110003","110004","110005","110006","110007","110008","110009","110010",
  "400001","400002","400003","400004","400050","400051","400052","400053","400054","400055",
  "560001","560002","560003","560004","560010","560011","560012","560013","560014","560015",
  "500001","500002","500003","500004","500005","500006","500007","500016","500017","500018",
  "600001","600002","600003","600004","600005","600006","600010","600011","600012","600013",
  "700001","700002","700003","700004","700005","700010","700011","700012","700013","700014",
  "411001","411002","411003","411004","411005","411006","302001","302002","302003","302004",
  "380001","380002","380004","380006","380007","380008","380009","380013","380014","380015",
];

function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkPincode = () => {
    if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const isServiceable = SERVICEABLE_PINCODES.includes(pincode) || pincode.startsWith("1") || pincode.startsWith("4") || pincode.startsWith("5") || pincode.startsWith("6") || pincode.startsWith("7") || pincode.startsWith("3");
      setResult({
        serviceable: isServiceable,
        days: isServiceable ? (["110","400","560","500","600","700"].some(p => pincode.startsWith(p)) ? "2–3" : "4–6") : null,
        coldChain: isServiceable,
      });
      setChecking(false);
    }, 800);
  };

  return (
    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
      <div className="flex items-center gap-2 mb-3">
        <FiMapPin className="text-amber-600" />
        <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">Check Delivery</p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            setResult(null);
          }}
          placeholder="Enter pincode"
          className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-400 bg-white transition-colors"
        />
        <button
          onClick={checkPincode}
          disabled={pincode.length !== 6 || checking}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {checking ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <div className={`mt-3 p-3 rounded-xl flex items-start gap-2.5 ${
          result.serviceable ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"
        }`}>
          {result.serviceable ? (
            <>
              <FiCheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-800">Delivery available!</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Estimated {result.days} business days
                  {result.coldChain && " • Cold-chain packaging"}
                </p>
              </div>
            </>
          ) : (
            <>
              <FiX className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700">Pincode not serviceable yet</p>
                <p className="text-[11px] text-red-600 mt-0.5">We're expanding coverage. Contact us for alternatives.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Product Customer Photo Reviews ── */
const PRODUCT_REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    location: "New Delhi",
    rating: 5,
    date: "Aug 2026",
    text: "Absolutely stunning. The aroma tells you everything — this is the real thing. Verified the NMR report myself as a physician. Unimpeachable.",
    photo: "/images/assets/1.png",
    avatar: "PS",
    avatarColor: "#7c3aed",
    verified: true,
  },
  {
    id: 2,
    name: "Rohan M.",
    location: "Mumbai",
    rating: 5,
    date: "Sep 2026",
    text: "Using this in my sourdough bakery. Customers immediately noticed the difference in flavour depth. The vanilla-orchid notes come through even after baking.",
    photo: "/images/assets/3.png",
    avatar: "RM",
    avatarColor: "#0891b2",
    verified: true,
  },
  {
    id: 3,
    name: "Arjun N.",
    location: "Kochi",
    rating: 5,
    date: "Aug 2026",
    text: "Ordered on a whim and immediately ordered 3 more jars. The butterscotch depth and viscosity is unlike anything I've tasted. Gorgeous packaging too.",
    photo: null,
    avatar: "AN",
    avatarColor: "#b45309",
    verified: true,
  },
  {
    id: 4,
    name: "Meena I.",
    location: "Bengaluru",
    rating: 5,
    date: "Sep 2026",
    text: "First brand I've trusted completely in years. You can taste the medicinal complexity. My wellness clients are hooked.",
    photo: "/images/assets/7.png",
    avatar: "MI",
    avatarColor: "#059669",
    verified: true,
  },
];

function StarRow({ filled }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          className={`text-sm ${i < filled ? "fill-amber-400 text-amber-400" : "text-stone-200"}`}
        />
      ))}
    </div>
  );
}

function ProductReviewSection() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [helpful, setHelpful] = useState({});
  const photos = PRODUCT_REVIEWS.filter((r) => r.photo);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="border-t border-stone-200 pt-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-stone-900">Customer Reviews</h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <FiStar key={s} className="text-amber-400 fill-amber-400 text-sm" />
                ))}
              </div>
              <span className="font-bold text-stone-800">4.9</span>
              <span className="text-stone-400 text-sm">(352 verified buyers)</span>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <FiCheck className="text-xs" /> All Reviews Verified
          </span>
        </div>

        {/* Customer Photos */}
        {photos.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <FiCamera className="text-amber-600 text-sm" />
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Customer Photos</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {photos.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setLightboxPhoto(r.photo)}
                  className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 border-stone-200 hover:border-amber-400 transition-all shadow-sm group"
                >
                  <img
                    src={r.photo}
                    alt={`${r.name} photo`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxPhoto(null)}
          >
            <div className="relative max-w-sm w-full bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxPhoto} alt="Customer review photo" className="w-full aspect-square object-cover" />
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-stone-700 font-bold shadow-sm"
              >
                <FiX />
              </button>
            </div>
          </div>
        )}

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCT_REVIEWS.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md hover:border-amber-200 transition-all"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: r.avatarColor }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-800">{r.name}</p>
                  <p className="text-[11px] text-stone-400">{r.location}</p>
                </div>
                {r.verified && (
                  <span className="ml-auto flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full flex-shrink-0">
                    <FiCheck className="text-[8px]" /> Verified
                  </span>
                )}
              </div>

              {/* Stars */}
              <StarRow filled={r.rating} />

              {/* Photo */}
              {r.photo && (
                <button
                  onClick={() => setLightboxPhoto(r.photo)}
                  className="rounded-xl overflow-hidden h-24 w-full border border-stone-100"
                >
                  <img src={r.photo} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </button>
              )}

              {/* Text */}
              <p className="text-xs text-stone-600 leading-relaxed flex-1">"{r.text}"</p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-stone-100 pt-2">
                <span className="text-[10px] text-stone-400">{r.date}</span>
                <button
                  onClick={() => setHelpful((prev) => ({ ...prev, [r.id]: true }))}
                  disabled={helpful[r.id]}
                  className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${helpful[r.id] ? "text-amber-600" : "text-stone-400 hover:text-stone-600"}`}
                >
                  <FiThumbsUp className="text-[10px]" />
                  {helpful[r.id] ? "Helpful!" : "Helpful"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main Product Page ── */
export default function ProductPage({ params }) {
  const slug = params?.slug;

  const router = useRouter();
  const { addToCart, openNMRLookup, wishlist, toggleWishlist, showToast, liveProducts } =
    useCart();

  const staticProduct = PRODUCTS.find((p) => p.slug === slug);
  const [product, setProduct] = useState(staticProduct);

  const [selectedVariant, setSelectedVariant] = useState(
    staticProduct?.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  // Sync with liveProducts
  useEffect(() => {
    if (liveProducts && liveProducts.length > 0) {
      const match = liveProducts.find((p) => p.slug === slug || p.id === slug);
      if (match) {
        setProduct((prev) => ({ ...(prev || {}), ...match }));
        if (!selectedVariant && match.variants?.[0]) {
          setSelectedVariant(match.variants[0]);
        }
      }
    }
  }, [liveProducts, slug]);

  // Immediate fresh fetch from API
  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        if (isMounted && data.success && data.products) {
          const match = data.products.find((p) => p.slug === slug || p.id === slug);
          if (match) {
            setProduct((prev) => ({ ...(prev || {}), ...match }));
          }
        }
      } catch (err) {
        console.error("Error fetching live product page:", err);
      }
    };
    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!product && !staticProduct) {
      router.push("/#catalog");
    }
  }, [product, staticProduct, router]);

  if (!product) return null;

  const isOutOfStock =
    product.inStock === false ||
    (product.stockCount !== undefined &&
      product.stockCount !== null &&
      Number(product.stockCount) <= 0);

  const isWishlisted = wishlist.some((w) => w.id === product.id);
  const batchData = BATCH_DATABASE[product.batchCode];
  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      showToast(`${product.name} is sold out`, "error");
      return;
    }
    setAddingToCart(true);
    addToCart(product, selectedVariant, quantity);
    showToast(`${product.name} (${selectedVariant?.size || "Jar"}) added to basket!`);
    await new Promise((r) => setTimeout(r, 600));
    setAddingToCart(false);
  };

  const galleryImages = [
    product.image,
    ...(product.gallery || []).slice(1),
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-stone-900 selection:bg-amber-200 selection:text-stone-900">
      <Header />
      <Toast />

      <main className="flex-1 pb-20" style={{ paddingTop: "var(--header-h, 88px)" }}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-amber-600 transition-colors">Honey Collection</Link>
            <span>/</span>
            <span className="text-stone-700 font-semibold truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* ── Product Hero ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-200 shadow-lg group">
                <img
                  src={galleryImages[activeImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {isOutOfStock ? (
                    <span className="px-3 py-1 bg-stone-900 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm shadow-md">
                      Sold Out • Vintage Depleted
                    </span>
                  ) : product.tag ? (
                    <span className="px-3 py-1 bg-stone-900/90 text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                      {product.tag}
                    </span>
                  ) : null}
                  {product.isBundle && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Gift Bundle
                    </span>
                  )}
                </div>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-stone-200 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                  aria-label="Toggle wishlist"
                >
                  <FiHeart className={isWishlisted ? "fill-red-500 text-red-500" : "text-stone-400"} />
                </button>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i
                          ? "border-amber-500 shadow-md"
                          : "border-stone-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* NMR Trust Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-emerald-700 text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Bruker 400MHz 1H-NMR Certified
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Batch {product.batchCode} • 0.00% Synthetic Syrups Detected
                  </p>
                </div>
                <button
                  onClick={() => openNMRLookup(product.batchCode)}
                  className="text-[10px] font-bold text-emerald-700 hover:underline whitespace-nowrap flex-shrink-0"
                >
                  View Lab →
                </button>
              </div>
            </div>

            {/* Right: Purchase Info */}
            <div className="flex flex-col gap-5">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  {product.biome}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  {product.vintage}
                </span>
              </div>

              {/* Name + Rating */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl font-bold text-stone-900 leading-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-base text-stone-500 font-sans">{product.subtitle}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-sm ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-stone-800">{product.rating}</span>
                  <span className="text-sm text-stone-400">({product.reviewsCount} verified buyers)</span>
                </div>
              </div>

              {/* Sensory Profile */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">
                  Sensory Profile
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-500">Sweetness</span>
                    <SensoryDot value={product.sensoryRadar.sweetness} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-500">Viscosity</span>
                    <SensoryDot value={product.sensoryRadar.viscosity} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-500">Floral Aroma</span>
                    <SensoryDot value={product.sensoryRadar.floral} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-stone-500">Tannic Depth</span>
                    <SensoryDot value={product.sensoryRadar.tannicDepth} />
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 italic mt-3 pt-3 border-t border-stone-100">
                  "{product.sensoryNotes}"
                </p>
              </div>

              {/* Variant Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Select Size</h3>
                  <span className="text-xs text-amber-700 font-semibold">
                    From ₹{product.basePrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.sku}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex flex-col items-center px-4 py-2.5 rounded-xl border-2 transition-all text-xs font-bold ${
                        selectedVariant?.sku === v.sku
                          ? "border-amber-500 bg-amber-50 text-stone-900 shadow-sm"
                          : "border-stone-200 text-stone-400 hover:border-amber-300"
                      }`}
                    >
                      <span className="font-serif text-base font-bold">{v.size}</span>
                      <span className="font-mono text-[11px] mt-0.5">₹{v.price.toLocaleString("en-IN")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Price */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 w-20">Quantity</span>
                <div className="flex items-center border border-stone-200 bg-white rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-base font-bold text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-sm font-bold font-mono min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-base font-bold text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                {selectedVariant && (
                  <span className="text-xl font-serif font-bold text-stone-900">
                    ₹{(selectedVariant.price * quantity).toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || isOutOfStock}
                  className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${
                    isOutOfStock
                      ? "bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-400/30 shadow-none"
                      : "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200 disabled:opacity-60"
                  }`}
                >
                  {isOutOfStock ? (
                    <span>Sold Out • Vintage Depleted</span>
                  ) : addingToCart ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Adding to Basket...</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="text-lg" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>
                {!isOutOfStock && (
                  <button
                    onClick={() => {
                      addToCart(product, selectedVariant, quantity);
                      router.push("/checkout");
                    }}
                    className="w-full flex items-center justify-center gap-2.5 bg-stone-900 text-white py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-stone-800 transition-all"
                  >
                    <FiZap className="text-amber-400" />
                    <span>Buy Now — Secure Checkout</span>
                  </button>
                )}
              </div>

              {/* Pincode Checker */}
              <PincodeChecker />

              {/* Trust Seals */}
              <div className="grid grid-cols-3 gap-3 text-[11px] text-stone-500">
                {[
                  { icon: FiTruck, label: "Free Delivery", sub: "on ₹999+" },
                  { icon: FiShield, label: "NMR Certified", sub: "0% Adulterants" },
                  { icon: FiPackage, label: "Cold-Chain", sub: "Delivery" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center gap-1 text-center p-3 rounded-xl bg-white border border-stone-200 shadow-sm">
                    <Icon className="text-amber-600 text-lg" />
                    <span className="font-semibold text-stone-700">{label}</span>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Note */}
              <div className="p-4 rounded-2xl bg-stone-900 text-white flex items-start gap-3">
                <FiClock className="text-amber-400 text-xl flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-white">Order before 2 PM for same-day dispatch.</p>
                  <p className="text-stone-400 mt-1">
                    Express delivery 2–4 business days across India. GST invoice included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product Detail Accordions ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccordionSection title="Origin & Terroir" icon={FiMap} defaultOpen={true}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-600 mb-0.5">Terroir</p>
                  <p>{product.terroir}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-600 mb-0.5">Elevation</p>
                  <p>{product.elevation}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-600 mb-0.5">Biome</p>
                  <p>{product.biome}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-600 mb-0.5">Vintage</p>
                  <p>{product.vintage}</p>
                </div>
                {batchData && (
                  <>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase font-bold text-amber-600 mb-0.5">Forager Community</p>
                      <p>{batchData.foragerTribe}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase font-bold text-amber-600 mb-0.5">Native Bee Species</p>
                      <p>{batchData.beeSpecies}</p>
                    </div>
                  </>
                )}
              </div>
              <p className="mt-4 pt-4 border-t border-stone-100 text-sm">{product.description}</p>
            </AccordionSection>

            <AccordionSection title="NMR Purity Analysis" icon={FiShield} defaultOpen={true}>
              {batchData ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <FiCheckCircle className="text-emerald-600 text-xl flex-shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-900 text-xs">{batchData.nmrTestStatus}</p>
                      <p className="text-[10px] text-emerald-800">{batchData.laboratory}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase">Diastase Activity</p>
                      <p className="font-semibold">{batchData.diastaseActivity}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase">Moisture</p>
                      <p className="font-semibold">{batchData.moistureContent}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase">C4 Adulteration</p>
                      <p className="font-bold text-emerald-700">{batchData.c4Adulteration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase">HMF Score</p>
                      <p className="font-semibold">{batchData.hmfScore}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openNMRLookup(product.batchCode)}
                    className="text-xs text-amber-700 font-bold hover:underline text-left"
                  >
                    → View Full Spectrogram — Batch #{product.batchCode}
                  </button>
                </div>
              ) : (
                <p className="text-sm">Batch code: {product.batchCode}</p>
              )}
            </AccordionSection>

            <AccordionSection title="Ayurvedic Ritual & Usage" icon={FiDroplet}>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Recommended Benefit</p>
                  <p className="font-semibold text-stone-900">{product.ayurvedicBenefit}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Ritual Instructions</p>
                  <p>{product.ayurvedicRitual}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-[10px] font-bold text-amber-700 uppercase mb-1">⚠ Important</p>
                  <p className="text-xs">Never expose raw honey to temperatures above 40°C. Always use wooden or ceramic spoon — metal oxidises delicate enzymes.</p>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection title="Ethical Sourcing & Impact" icon={FiAward}>
              <div className="space-y-3 text-sm">
                <p>{product.ethicalNote}</p>
                {batchData && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-[10px] font-bold text-amber-700 uppercase mb-1">Direct Fair Wage</p>
                    <p className="font-bold text-stone-900">{batchData.fairWage}</p>
                    <p className="text-[11px] mt-1 text-stone-500">1.8× standard mandi rates. No middlemen. Direct digital transfer to tribal communities.</p>
                  </div>
                )}
                <div className="flex flex-col gap-2 text-[11px]">
                  <div className="flex items-center gap-2"><FiCheck className="text-emerald-600 flex-shrink-0" /><span>40% hive comb preserved for colony health</span></div>
                  <div className="flex items-center gap-2"><FiCheck className="text-emerald-600 flex-shrink-0" /><span>Non-migratory, forest-native apiculture only</span></div>
                  <div className="flex items-center gap-2"><FiCheck className="text-emerald-600 flex-shrink-0" /><span>ISO/IEC 17025 certified laboratory testing</span></div>
                </div>
              </div>
            </AccordionSection>
          </div>
        </section>

        {/* ── Customer Photo Reviews ── */}
        <ProductReviewSection />

        {/* ── Recommended Products ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="border-t border-stone-200 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                You May Also Love
              </h2>
              <Link
                href="/#catalog"
                className="text-xs font-bold text-amber-700 hover:underline uppercase tracking-wider"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherProducts.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col"
                >
                  <Link href={`/products/${p.slug}`} className="block">
                    <div className="aspect-video overflow-hidden bg-amber-50">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">{p.biome}</span>
                    <Link href={`/products/${p.slug}`}>
                      <h3 className="font-serif text-base font-bold text-stone-900 hover:text-amber-700 transition-colors">{p.name}</h3>
                    </Link>
                    <p className="text-xs text-stone-400 mt-0.5 flex-1">{p.subtitle}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <span className="font-serif font-bold text-stone-900">
                        ₹{p.basePrice.toLocaleString("en-IN")}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(p, p.variants[0], 1);
                          showToast(`${p.name} added to basket!`);
                        }}
                        className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                      >
                        <FiShoppingBag className="text-xs" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}