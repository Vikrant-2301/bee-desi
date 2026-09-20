"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useCart } from "@/context/CartContext";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiMessageSquare,
  FiDollarSign,
  FiTruck,
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiArrowUpRight,
  FiLock,
  FiEye,
  FiAlertCircle,
  FiSave,
  FiX,
  FiSliders,
} from "react-icons/fi";

export default function AdminDashboard() {
  const { showToast } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders"); // "overview", "orders", "products", "inquiries"

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeShipments: 0,
    deliveredCount: 0,
    userCount: 0,
    unreadMessages: 0,
    subscriberCount: 0,
  });

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Status update modal
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderStatusInput, setOrderStatusInput] = useState("");
  const [carrierInput, setCarrierInput] = useState("");
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [dispatchNotesInput, setDispatchNotesInput] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);

  // New product modal
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    subtitle: "",
    tag: "Rare Micro-Harvest",
    vintage: "Spring 2026 Harvest",
    batchCode: "BD-2026-NEW",
    biome: "High-Altitude Alpine",
    terroir: "Kashmir Reserve",
    elevation: "1,850m MSL",
    basePrice: 750,
    stockCount: 100,
    ayurvedicBenefit: "Deep Sleep & Ojas",
    image: "/images/bee_desi_hero_custom.png",
  });
  const [savingProduct, setSavingProduct] = useState(false);

  // Quick price editing
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [newPriceValue, setNewPriceValue] = useState("");

  const [isAdminAuthed, setIsAdminAuthed] = useState(false);

  useEffect(() => {
    // Admin session guard — redirect to hidden gate if not authenticated
    try {
      const session = localStorage.getItem("bee_desi_admin_session");
      if (session !== "authenticated") {
        router.push("/bee-desi-admin-gate");
        return;
      }
      setIsAdminAuthed(true);
    } catch (e) {
      router.push("/bee-desi-admin-gate");
    }
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/orders"),
        fetch("/api/admin/products"),
      ]);

      const statsData = await statsRes.json();
      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (ordersData.success) setOrders(ordersData.orders || []);
      if (productsData.success) setProducts(productsData.products || []);
    } catch (err) {
      console.error("Admin data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Order Update Handler
  const handleOpenOrderModal = (order) => {
    setEditingOrder(order);
    setOrderStatusInput(order.orderStatus || "placed");
    setCarrierInput(order.carrier || "BlueDart Apiary Cold-Chain");
    setTrackingNumberInput(order.trackingNumber || "");
    setDispatchNotesInput(order.dispatchNotes || "");
  };

  const handleSaveOrderStatus = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    setSavingOrder(true);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: editingOrder.orderId,
          orderStatus: orderStatusInput,
          carrier: carrierInput,
          trackingNumber: trackingNumberInput,
          dispatchNotes: dispatchNotesInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Order #${editingOrder.orderId} updated to ${orderStatusInput}`);
        setEditingOrder(null);
        loadAllData();
      } else {
        showToast(data.error || "Failed to update order", "error");
      }
    } catch (err) {
      showToast("Network error updating order", "error");
    } finally {
      setSavingOrder(false);
    }
  };

  // Product Stock Toggle Handler
  const handleToggleProductStock = async (product) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          inStock: !product.inStock,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`${product.name} marked ${!product.inStock ? "In Stock" : "Sold Out"}`);
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: !p.inStock } : p))
        );
      }
    } catch (err) {
      showToast("Failed to toggle stock", "error");
    }
  };

  // Product Price Edit Handler
  const handleSavePrice = async (productId) => {
    if (!newPriceValue || isNaN(newPriceValue)) return;
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: productId,
          basePrice: Number(newPriceValue),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Price updated successfully!");
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, basePrice: Number(newPriceValue) } : p))
        );
        setEditingPriceId(null);
        setNewPriceValue("");
      }
    } catch (err) {
      showToast("Failed to update price", "error");
    }
  };

  // Add Product Handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSavingProduct(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("New single-flora harvest added to inventory!");
        setShowAddProductModal(false);
        loadAllData();
      } else {
        showToast(data.error || "Failed to add harvest vintage", "error");
      }
    } catch (err) {
      showToast("Network error creating harvest vintage", "error");
    } finally {
      setSavingProduct(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus =
      selectedStatusFilter === "all" || o.orderStatus === selectedStatusFilter;
    const matchSearch =
      searchQuery.trim() === "" ||
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer?.phone.includes(searchQuery);

    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-honeycomb-pattern text-on-surface selection:bg-golden-nectar selection:text-propolis-charcoal">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Top Command Banner */}
        <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/30 shadow-honey mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-deep text-white text-xs font-bold uppercase tracking-wider mb-2">
              <FiLock className="text-xs" />
              <span>Bee Desi Executive Apiculture Command Center</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-propolis-charcoal">
              Merchant &amp; Parcel Operations Portal
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant font-sans mt-0.5">
              Real-time synchronization between live customer parcels, Bruker NMR batching, and inventory pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface hover:bg-surface-container font-bold text-xs uppercase tracking-wider text-propolis-charcoal flex items-center gap-2 btn-tactile shadow-sm"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
              <span>Refresh Metrics</span>
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-xl border border-amber-radiance/30 bg-amber-radiance/10 hover:bg-amber-radiance/20 font-bold text-xs uppercase tracking-wider text-amber-deep flex items-center gap-1.5 btn-tactile"
            >
              <FiEye />
              <span>Customer View</span>
            </Link>
            <button
              onClick={() => {
                try { localStorage.removeItem("bee_desi_admin_session"); } catch(e) {}
                router.push("/bee-desi-admin-gate");
              }}
              className="px-4 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 border border-red-300 font-bold text-xs uppercase tracking-wider text-red-800 flex items-center gap-1.5 btn-tactile"
            >
              <FiLock />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>


        {/* 4 KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="gold-glass p-5 rounded-2xl border border-amber-radiance/20 shadow-sm flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <FiDollarSign className="text-amber-radiance text-sm" /> Gross Harvest Revenue
            </span>
            <strong className="font-serif text-2xl sm:text-3xl font-bold text-amber-deep">
              ₹{stats.totalRevenue?.toLocaleString("en-IN") || 0}
            </strong>
            <span className="text-[11px] text-emerald-800 font-semibold">100% Razorpay &amp; COD Synced</span>
          </div>

          <div className="gold-glass p-5 rounded-2xl border border-amber-radiance/20 shadow-sm flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <FiPackage className="text-amber-radiance text-sm" /> Total Orders
            </span>
            <strong className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
              {stats.totalOrders || 0}
            </strong>
            <span className="text-[11px] text-on-surface-variant font-sans">
              {stats.deliveredCount || 0} successfully delivered
            </span>
          </div>

          <div className="gold-glass p-5 rounded-2xl border border-amber-radiance/20 shadow-sm flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <FiTruck className="text-amber-radiance text-sm" /> Active Transit Shipments
            </span>
            <strong className="font-serif text-2xl sm:text-3xl font-bold text-blue-900">
              {stats.activeShipments || 0}
            </strong>
            <span className="text-[11px] text-blue-800 font-semibold">In Cold-Chain Dispatch</span>
          </div>

          <div className="gold-glass p-5 rounded-2xl border border-amber-radiance/20 shadow-sm flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <FiUsers className="text-amber-radiance text-sm" /> Guild Members &amp; Subs
            </span>
            <strong className="font-serif text-2xl sm:text-3xl font-bold text-propolis-charcoal">
              {(stats.userCount || 0) + (stats.subscriberCount || 0)}
            </strong>
            <span className="text-[11px] text-amber-deep font-semibold">
              {stats.unreadMessages || 0} unread concierge notes
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-surface-container p-1.5 border border-outline-variant/30 mb-8 max-w-xl">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === "orders"
                ? "bg-propolis-charcoal text-honeycomb-cream shadow-md"
                : "text-on-surface-variant hover:text-propolis-charcoal"
            }`}
          >
            <FiPackage />
            <span>Order Dispatch ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === "products"
                ? "bg-propolis-charcoal text-honeycomb-cream shadow-md"
                : "text-on-surface-variant hover:text-propolis-charcoal"
            }`}
          >
            <FiShoppingBag />
            <span>Harvest Catalog ({products.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDER DISPATCH & STATUS MANAGER (Amazon / Flipkart Merchant Style) */}
        {activeTab === "orders" && (
          <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/25 shadow-honey flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-propolis-charcoal">
                  Consignment &amp; Cold-Chain Dispatch Manager
                </h2>
                <p className="text-xs text-on-surface-variant font-sans">
                  Advancing an order’s status here updates the customer's dashboard and tracking journey in real time.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface text-xs font-semibold text-propolis-charcoal focus:outline-none focus:border-amber-radiance"
                >
                  <option value="all">All Consignments</option>
                  <option value="placed">Placed / Consecrated</option>
                  <option value="harvest_allocated">Harvest Allocated</option>
                  <option value="inspected">NMR Inspected</option>
                  <option value="dispatched">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-surface-container border-b border-outline-variant/20 text-on-surface-variant uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Order ID &amp; Date</th>
                    <th className="p-4">Customer &amp; Address</th>
                    <th className="p-4">Items / Terroir</th>
                    <th className="p-4">Total &amp; Payment</th>
                    <th className="p-4">Live Parcel Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                        No matching orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id || order.orderId} className="hover:bg-surface-container-low/60 transition-colors">
                        <td className="p-4">
                          <strong className="font-mono text-sm text-propolis-charcoal block font-bold">
                            #{order.orderId}
                          </strong>
                          <span className="text-[10px] text-on-surface-variant font-mono">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </td>

                        <td className="p-4">
                          <strong className="text-propolis-charcoal block">{order.customer?.name}</strong>
                          <span className="text-[11px] text-on-surface-variant block">
                            {order.customer?.city}, {order.customer?.pincode}
                          </span>
                          <span className="text-[10px] text-on-surface-variant/80 font-mono">
                            {order.customer?.phone}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-col gap-1 max-w-xs">
                            {order.items?.map((item, idx) => (
                              <span key={idx} className="truncate text-[11px] text-propolis-charcoal">
                                • {item.name} ({item.size}) × {item.quantity}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-4">
                          <strong className="font-serif text-sm text-amber-deep block font-bold">
                            ₹{order.total}
                          </strong>
                          <span className="text-[10px] font-semibold text-emerald-800 uppercase">
                            {order.paymentMethod === "razorpay" ? "Razorpay Paid" : "Cash On Delivery"}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              order.orderStatus === "delivered"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : order.orderStatus === "dispatched"
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : "bg-amber-100 text-amber-800 border-amber-300"
                            }`}
                          >
                            {order.orderStatus?.replace("_", " ") || "Placed"}
                          </span>
                          {order.trackingNumber && (
                            <span className="block text-[10px] text-on-surface-variant font-mono mt-0.5">
                              {order.trackingNumber}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleOpenOrderModal(order)}
                            className="px-3.5 py-1.5 rounded-lg bg-propolis-charcoal text-honeycomb-cream hover:bg-primary transition-colors text-[11px] font-bold uppercase tracking-wider btn-tactile shadow-sm inline-flex items-center gap-1"
                          >
                            <FiEdit2 /> Update Status
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT INVENTORY & PRICING MANAGER */}
        {activeTab === "products" && (
          <div className="gold-glass rounded-3xl p-6 sm:p-8 border border-amber-radiance/25 shadow-honey flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-propolis-charcoal">
                  Artisanal Harvest Vintages &amp; Dynamic Pricing
                </h2>
                <p className="text-xs text-on-surface-variant font-sans">
                  Direct control over jar inventory, base pricing, and adding new regional micro-harvests.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-honeycomb-cream font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-honey btn-tactile flex items-center gap-1.5 whitespace-nowrap"
              >
                <FiPlus className="text-base" />
                <span>Add Harvest Vintage</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-surface-container border-b border-outline-variant/20 text-on-surface-variant uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Harvest Vintage</th>
                    <th className="p-4">Terroir &amp; Biome</th>
                    <th className="p-4">Batch Provenance</th>
                    <th className="p-4">Base Price (350g)</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4 text-right">Inventory Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface border border-amber-radiance/20 flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <strong className="font-serif text-sm text-propolis-charcoal block font-bold">
                            {p.name}
                          </strong>
                          <span className="text-[11px] text-on-surface-variant">{p.subtitle}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <strong className="text-propolis-charcoal block">{p.terroir}</strong>
                        <span className="text-[10px] text-on-surface-variant">{p.elevation}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-mono text-xs text-amber-deep font-bold bg-amber-radiance/10 px-2 py-0.5 rounded border border-amber-radiance/20">
                          #{p.batchCode}
                        </span>
                      </td>

                      <td className="p-4">
                        {editingPriceId === p.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={newPriceValue}
                              onChange={(e) => setNewPriceValue(e.target.value)}
                              className="w-20 px-2 py-1 rounded border border-amber-radiance text-xs font-mono font-bold"
                            />
                            <button
                              onClick={() => handleSavePrice(p.id)}
                              className="p-1 rounded bg-amber-radiance text-white text-xs font-bold"
                            >
                              <FiSave />
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="p-1 rounded bg-surface-container text-xs"
                            >
                              <FiX />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-base font-bold text-propolis-charcoal">
                              ₹{p.basePrice}
                            </span>
                            <button
                              onClick={() => {
                                setEditingPriceId(p.id);
                                setNewPriceValue(p.basePrice);
                              }}
                              className="text-on-surface-variant hover:text-amber-deep text-xs"
                              title="Edit Price"
                            >
                              <FiEdit2 />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            p.inStock
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Sold Out"}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleProductStock(p)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors btn-tactile ${
                            p.inStock
                              ? "border border-red-200 text-red-700 hover:bg-red-50"
                              : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          }`}
                        >
                          {p.inStock ? "Mark Sold Out" : "Mark Available"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL 1: ORDER DISPATCH STATUS UPDATE MODAL */}
        {editingOrder && (
          <div className="fixed inset-0 z-[120] bg-propolis-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-surface rounded-3xl p-6 sm:p-8 border border-amber-radiance/30 shadow-2xl flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-deep block">
                    Update Live Shipment
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-propolis-charcoal">
                    Consignment #{editingOrder.orderId}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingOrder(null)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSaveOrderStatus} className="flex flex-col gap-4 text-xs font-sans">
                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    Order Status (Reflected on User Dashboard &amp; Tracking Stepper)
                  </label>
                  <select
                    value={orderStatusInput}
                    onChange={(e) => setOrderStatusInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm font-semibold"
                  >
                    <option value="placed">1. Placed (Order Consecrated)</option>
                    <option value="harvest_allocated">2. Harvest Batch Allocated &amp; Sealed</option>
                    <option value="inspected">3. German Bruker NMR Tested &amp; Passed</option>
                    <option value="dispatched">4. Dispatched (In Cold-Chain Transit)</option>
                    <option value="delivered">5. Delivered (Completed at Doorstep)</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    Cold-Chain Courier Carrier
                  </label>
                  <input
                    type="text"
                    value={carrierInput}
                    onChange={(e) => setCarrierInput(e.target.value)}
                    placeholder="e.g. BlueDart Apiary Cold-Chain / Delhivery Transit"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    Courier Tracking Number (Waybill ID)
                  </label>
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    placeholder="e.g. BD-DEL-98472910"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1.5">
                    Internal Dispatch Notes
                  </label>
                  <input
                    type="text"
                    value={dispatchNotesInput}
                    onChange={(e) => setDispatchNotesInput(e.target.value)}
                    placeholder="e.g. Packed in shockproof carton with neem honey dipper"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-amber-radiance text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingOrder}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 btn-tactile shadow-honey disabled:opacity-50"
                  >
                    {savingOrder ? "Saving..." : "Commit Status Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: ADD NEW HARVEST VINTAGE MODAL */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-[120] bg-propolis-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-surface rounded-3xl p-6 sm:p-8 border border-amber-radiance/30 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                <h3 className="font-serif text-2xl font-bold text-propolis-charcoal">
                  Add New Single-Flora Harvest
                </h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="flex flex-col gap-4 text-xs font-sans">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Honey Floral Name *</label>
                  <input
                    type="text"
                    required
                    value={newProductData.name}
                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                    placeholder="e.g. Nilgiri Rare Mountain Blossom"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Terroir Region *</label>
                    <input
                      type="text"
                      required
                      value={newProductData.terroir}
                      onChange={(e) => setNewProductData({ ...newProductData, terroir: e.target.value })}
                      placeholder="Nilgiri Biosphere"
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Elevation</label>
                    <input
                      type="text"
                      value={newProductData.elevation}
                      onChange={(e) => setNewProductData({ ...newProductData, elevation: e.target.value })}
                      placeholder="2,100m MSL"
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Base Price (350g) *</label>
                    <input
                      type="number"
                      required
                      value={newProductData.basePrice}
                      onChange={(e) => setNewProductData({ ...newProductData, basePrice: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-on-surface mb-1">Batch Code</label>
                    <input
                      type="text"
                      value={newProductData.batchCode}
                      onChange={(e) => setNewProductData({ ...newProductData, batchCode: e.target.value })}
                      placeholder="BD-NIL-2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Ayurvedic Benefit</label>
                  <input
                    type="text"
                    value={newProductData.ayurvedicBenefit}
                    onChange={(e) => setNewProductData({ ...newProductData, ayurvedicBenefit: e.target.value })}
                    placeholder="e.g. Deep Sleep & Ojas"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingProduct}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-deep via-primary to-amber-radiance text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 btn-tactile shadow-honey disabled:opacity-50"
                  >
                    {savingProduct ? "Consecrating..." : "Publish Harvest"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Toast />
    </div>
  );
}
