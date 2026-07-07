"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProfileLayout from "../components/profile/ProfileLayout";
import styles from "../components/profile/profile.module.css";
import { Package, ExternalLink, Search, Loader2, Calendar, Eye, Box, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllProducts, type ApiProduct } from "../lib/api";
import Image from "next/image";

type OrderItem = {
  productId: number;
  qty: number;
};

type OrderType = {
  id: string;
  date: string;
  total: string;
  status: string;
  items: OrderItem[];
};

const mockOrders: OrderType[] = [
  {
    id: "ORD-8943-7721",
    date: "May 12, 2026, 2:32:52 PM",
    total: "$250.00",
    status: "Delivered",
    items: [{ productId: 1, qty: 1 }, { productId: 2, qty: 1 }],
  },
  {
    id: "ORD-8943-7722",
    date: "April 28, 2026, 1:19:59 AM",
    total: "$145.00",
    status: "Processing",
    items: [{ productId: 3, qty: 1 }],
  },
  {
    id: "ORD-8943-7723",
    date: "January 14, 2026, 10:05:00 AM",
    total: "$415.00",
    status: "Delivered",
    items: [{ productId: 1, qty: 2 }, { productId: 4, qty: 1 }],
  },
];

const initialOrders = mockOrders;

type AlertState = {
  title: string;
  message: string;
  type: 'alert' | 'confirm';
  onConfirm?: () => void;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setAllProducts);
  }, []);

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Compute stats
  const totalOrders = orders.length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter(
    (o) => o.status === "Processing" || o.status === "Pending"
  ).length;
  const totalSpent = orders.reduce((sum, order) => {
    return sum + parseFloat(order.total.replace(/[^0-9.-]+/g, ""));
  }, 0);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.id
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleCancelOrder = (orderId: string, status: string) => {
    if (status === "Shipped" || status === "Delivered") {
      setAlertState({
        title: "Cancellation Failed",
        message: `This order has already been ${status.toLowerCase()}, so it cannot be cancelled.`,
        type: 'alert'
      });
      return;
    }
    if (status === "Cancelled") {
      setAlertState({
        title: "Already Cancelled",
        message: "This order is already cancelled.",
        type: 'alert'
      });
      return;
    }

    setAlertState({
      title: "Cancel Order",
      message: "Are you sure you want to cancel this order? This action cannot be undone.",
      type: 'confirm',
      onConfirm: () => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
        setSelectedOrder((prev) =>
          prev?.id === orderId ? { ...prev, status: "Cancelled" } : prev
        );
        setAlertState(null);
      }
    });
  };

  return (
    <ProfileLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className={styles.sectionTitle}>My Orders</h1>
        <p className={styles.sectionDesc}>
          Track, review and manage your purchases.
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{delivered}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by order number..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent outline-none min-w-[170px] appearance-none cursor-pointer"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="flex flex-col gap-4 min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
              <span className="text-gray-500">Loading your orders...</span>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Order</p>
                        <p className="font-bold text-[#1a1a1a]">{order.id}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                            order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {order.status === 'Pending' ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : order.status === 'Processing' ? (
                          <Box size={12} />
                        ) : null}
                        {order.status}
                      </div>
                    </div>

                    {/* Middle Info */}
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center mb-4">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Total</p>
                        <p className="font-bold text-[#1a1a1a]">{order.total}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Payment</p>
                        <p className="font-bold text-[#1a1a1a]">Cash on Delivery</p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-5">
                      <Calendar size={14} />
                      {order.date}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        className="poi-btn flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
                        onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                      >
                        <Eye size={16} /> View Details
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCancelOrder(order.id, order.status); }}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${order.status === 'Cancelled'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                          }`}>
                        {order.status === 'Cancelled' ? 'Cancelled' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <select className="border border-gray-200 bg-white rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-[#1a1a1a]">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <span className="text-sm text-gray-600">Showing 1 to {filteredOrders.length} of {filteredOrders.length} results</span>
                </div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed">
                    &lt;
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1a1a1a] text-white">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Package
                size={48}
                className="mx-auto text-gray-300 mb-4"
                strokeWidth={1}
              />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any orders matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("");
                }}
                className="poi-btn inline-flex items-center gap-2 mt-2"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#f8f9fa] rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="flex items-center justify-between p-5 bg-white border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Order</p>
                    <p className="font-bold text-lg text-[#1a1a1a]">{selectedOrder.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${selectedOrder.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                        selectedOrder.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                          selectedOrder.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {selectedOrder.status}
                    </div>
                    <span className="text-sm text-gray-500">{selectedOrder.date}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-4">Items</h3>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {selectedOrder.items.map((item, idx) => {
                      const product = allProducts.find((p) => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <div key={idx}>
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                <Image src={product.image} alt={product.brand} fill className="object-cover p-1" />
                              </div>
                              <div>
                                <p className="font-semibold text-[#1a1a1a]">{product.brand}</p>
                                <p className="text-sm text-gray-500 mt-0.5">Qty: {item.qty} • ${product.new_price.toFixed(2)} each</p>
                              </div>
                            </div>
                            <p className="font-semibold text-[#1a1a1a]">
                              ${(product.new_price * item.qty).toFixed(2)}
                            </p>
                          </div>
                          {idx < selectedOrder.items.length - 1 && (
                            <hr className="border-gray-100 mx-4" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-[#1a1a1a] mb-3">Shipping</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Ayesha Naveed</p>
                      <p>123 Fragrance Lane</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                      <p className="pt-2">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-[#1a1a1a] mb-3">Payment</h3>
                    <div className="text-sm space-y-2 mb-4 text-gray-600">
                      <p>Method: Cash on Delivery</p>
                      <p>Status: <span className="capitalize">{selectedOrder.status.toLowerCase()}</span></p>
                    </div>

                    <div className="space-y-2 text-sm pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{selectedOrder.total}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#1a1a1a] pt-2 text-base">
                        <span>Total</span>
                        <span>{selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Alert/Confirm Modal */}
      <AnimatePresence>
        {alertState && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlertState(null)}
            />
            <motion.div
              className="relative w-full max-w-sm flex flex-col bg-white rounded-2xl shadow-2xl p-6 overflow-hidden text-center"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
            >
              <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-800 mb-4">
                {alertState.type === 'confirm' ? <Box size={24} /> : <Eye size={24} />}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{alertState.title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{alertState.message}</p>

              <div className="flex gap-3 justify-center">
                {alertState.type === 'confirm' && (
                  <button
                    onClick={() => setAlertState(null)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Keep Order
                  </button>
                )}
                <button
                  onClick={() => {
                    if (alertState.type === 'confirm' && alertState.onConfirm) {
                      alertState.onConfirm();
                    } else {
                      setAlertState(null);
                    }
                  }}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${alertState.type === 'confirm' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#1a1a1a] hover:bg-black'
                    }`}
                >
                  {alertState.type === 'confirm' ? 'Yes, Cancel It' : 'Okay'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ProfileLayout>
  );
}
