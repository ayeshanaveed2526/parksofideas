"use client";

import React from "react";
import ProfileLayout from "../components/profile/ProfileLayout";
import styles from "../components/profile/profile.module.css";
import { Package, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  {
    id: "ORD-8943-7721",
    date: "May 12, 2026",
    total: "$185.00",
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-8943-7722",
    date: "April 28, 2026",
    total: "$95.00",
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-8943-7723",
    date: "January 14, 2026",
    total: "$240.00",
    status: "Delivered",
    items: 3,
  },
];

export default function OrdersPage() {
  return (
    <ProfileLayout>
      <h1 className={styles.sectionTitle}>My Orders</h1>
      <p className={styles.sectionDesc}>View your past purchases and track current shipments.</p>

      <div className="flex flex-col gap-4">
        {mockOrders.length > 0 ? (
          <div className="overflow-hidden border border-gray-100 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="py-4 px-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f4f2f4] flex items-center justify-center text-[#1a1a1a]">
                          <Package size={14} />
                        </div>
                        <span className="font-medium text-gray-800 text-[14px]">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[14px] text-gray-600">{order.date}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[14px] font-medium text-gray-800">{order.total}</td>
                    <td className="py-4 px-6 text-right">
                      <Link href="#" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00089d] hover:text-[#0a1570] transition-colors">
                        View <ExternalLink size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Package size={48} className="mx-auto text-gray-300 mb-4" strokeWidth={1} />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't made any purchases.</p>
            <Link href="/shop" className="poi-btn inline-flex items-center gap-2 mt-2">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}
