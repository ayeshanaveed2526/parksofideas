"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "ALL FRAGRANCES" },
  { id: "him", label: "HIM" },
  { id: "her", label: "HER" },
  { id: "unisex", label: "UNISEX" },
  { id: "best-sellers", label: "BEST SELLERS" },
  { id: "new-arrivals", label: "NEW ARRIVALS" },
];

export interface ShopSidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function ShopSidebar({ activeCategory, onSelectCategory }: ShopSidebarProps) {
  return (
    <div className="shop-sidebar">
      <div className="sidebar-box">
        <h3 className="sidebar-title">COLLECTIONS</h3>
        <ul className="sidebar-list">
          {CATEGORIES.map((cat, idx) => (
            <motion.li
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <button 
                type="button"
                className={`sidebar-link ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .shop-sidebar {
          width: 100%;
          font-family: var(--font-inter), "Inter", sans-serif;
        }

        .sidebar-box {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 10px 40px rgba(0, 8, 157, 0.05);
          position: sticky;
          top: 100px;
        }

        .sidebar-title {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-size: 16px;
          letter-spacing: 0.18em;
          color: #111;
          margin: 0 0 24px;
          position: relative;
          display: inline-block;
        }

        .sidebar-title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, rgba(0, 8, 157, 0.4), transparent);
        }

        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-link {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #444;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .sidebar-link::before {
          content: "";
          display: inline-block;
          width: 0;
          height: 1px;
          background: #00089d;
          transition: width 0.3s ease, margin 0.3s ease;
        }

        .sidebar-link:hover, .sidebar-link.active {
          color: #00089d;
          transform: translateX(4px);
        }

        .sidebar-link:hover::before, .sidebar-link.active::before {
          width: 12px;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}
