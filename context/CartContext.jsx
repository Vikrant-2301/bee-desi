"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 120;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePromo, setActivePromo] = useState(null);
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState("INR");

  // Modals state
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isNMRLookupOpen, setIsNMRLookupOpen] = useState(false);
  const [selectedNMRBatch, setSelectedNMRBatch] = useState("BD-JAMUN-2026");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [toast, setToast] = useState(null);
  const [liveProducts, setLiveProducts] = useState([]);

  const refreshLiveProducts = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.products && data.products.length > 0) {
        setLiveProducts(data.products);
      }
    } catch (e) {
      console.error("Failed to load live products in CartContext", e);
    }
  };

  useEffect(() => {
    refreshLiveProducts();
  }, []);

  // Load from localStorage on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("bee_desi_cart");
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem("bee_desi_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedUser = localStorage.getItem("bee_desi_user");
      if (savedUser) setUser(JSON.parse(savedUser));
      const savedPromo = localStorage.getItem("bee_desi_promo");
      if (savedPromo) setActivePromo(JSON.parse(savedPromo));
    } catch (e) {
      console.error("Failed to load local storage", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bee_desi_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("bee_desi_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("bee_desi_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("bee_desi_user");
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      if (activePromo) {
        localStorage.setItem("bee_desi_promo", JSON.stringify(activePromo));
      } else {
        localStorage.removeItem("bee_desi_promo");
      }
    } catch (e) {}
  }, [activePromo]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const login = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    showToast("Signed out successfully", "info");
  };

  const addToCart = (product, variant = null, quantity = 1) => {
    // Check if product is out of stock in product object or live products
    const matchingLive = liveProducts.find((p) => p.id === product.id || p.slug === product.slug);
    const target = matchingLive || product;
    const isOutOfStock = target.inStock === false || (target.stockCount !== undefined && target.stockCount !== null && Number(target.stockCount) <= 0);

    if (isOutOfStock) {
      showToast(`${target.name} is currently sold out`, "error");
      return;
    }

    const selectedVariant = variant || (target.variants && target.variants[0]) || { price: target.basePrice || 690, size: "350g" };
    const sku = selectedVariant.sku || `${target.id}-${selectedVariant.size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.sku === sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: target.id,
            sku: sku,
            name: target.name,
            subtitle: target.subtitle,
            image: target.image,
            size: selectedVariant.size,
            variantLabel: selectedVariant.label,
            price: selectedVariant.price,
            batchCode: target.batchCode,
            quantity: quantity,
          },
        ];
      }
    });

    showToast(`Added ${target.name} (${selectedVariant.size}) to cart`);
  };

  const updateQuantity = (sku, newQty) => {
    if (newQty <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (sku) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productOrId) => {
    // Accept both full product object and just product id string
    const productId = typeof productOrId === "string" ? productOrId : productOrId?.id;
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from tasting wishlist", "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your tasting wishlist", "success");
        return [...prev, productId];
      }
    });
  };


  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "BEEFIRST10") {
      const promo = { code: "BEEFIRST10", percent: 10, label: "10% First Order Welcome Discount" };
      setActivePromo(promo);
      showToast("Coupon BEEFIRST10 applied! 10% off saved.");
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.85 } });
      } catch (e) {}
      return { success: true };
    } else if (clean === "FREESHIP") {
      const promo = { code: "FREESHIP", freeShipping: true, label: "Complimentary Express Delivery" };
      setActivePromo(promo);
      showToast("Coupon FREESHIP applied! Free shipping unlocked.");
      return { success: true };
    } else if (clean === "PUREDESI" || clean === "HARVEST15") {
      const promo = { code: clean, percent: 15, label: "15% Pure Desi Celebration Discount" };
      setActivePromo(promo);
      showToast(`Coupon ${clean} applied! 15% discount applied.`);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.85 } });
      } catch (e) {}
      return { success: true };
    } else {
      showToast("Invalid promo code. Try BEEFIRST10 or FREESHIP", "error");
      return { success: false, error: "Invalid coupon" };
    }
  };

  const removePromoCode = () => {
    setActivePromo(null);
    showToast("Promo code removed", "info");
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (activePromo?.percent) {
    discountAmount = Math.round((subtotal * activePromo.percent) / 100);
  }

  const isFreeShippingByValue = subtotal >= FREE_SHIPPING_THRESHOLD;
  const isFreeShippingByPromo = activePromo?.freeShipping === true;
  const isFreeShipping = (isFreeShippingByValue || isFreeShippingByPromo) && subtotal > 0;

  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const openNMRLookupWithBatch = (batchCode) => {
    if (batchCode) setSelectedNMRBatch(batchCode);
    setIsNMRLookupOpen(true);
  };

  const triggerOrderPlaced = (orderData) => {
    const orderId = orderData.orderId || `BD-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullOrder = {
      ...orderData,
      orderId,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      items: [...cart],
      total: finalTotal,
      subtotal,
      discountAmount,
      shippingFee,
    };
    setOrderConfirmed(fullOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#d97706", "#f59e0b", "#0d0b09", "#1e4532", "#ffffff"],
      });
    } catch (e) {}
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        activePromo,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        isFreeShipping,
        freeShippingRemaining,
        freeShippingProgress,
        FREE_SHIPPING_THRESHOLD,
        STANDARD_SHIPPING_FEE,
        user,
        login,
        logout,
        currency,
        setCurrency,
        // Modals
        selectedProductForModal,
        openProductModal: (p) => setSelectedProductForModal(p),
        closeProductModal: () => setSelectedProductForModal(null),
        isQuizOpen,
        openQuiz: () => setIsQuizOpen(true),
        closeQuiz: () => setIsQuizOpen(false),
        isNMRLookupOpen,
        selectedNMRBatch,
        setSelectedNMRBatch,
        openNMRLookup: openNMRLookupWithBatch,
        closeNMRLookup: () => setIsNMRLookupOpen(false),
        isCheckoutOpen,
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
        orderConfirmed,
        setOrderConfirmed,
        triggerOrderPlaced,
        toast,
        showToast,
        liveProducts,
        refreshLiveProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
