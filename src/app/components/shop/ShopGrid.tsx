"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopToolbar, { type SortOption, type LayoutMode } from "./ShopToolbar";
import ShopProductCard from "./ShopProductCard";
import ShopQuickView from "./ShopQuickView";
import { PERFUME_CATALOG, type PerfumeProduct } from "../../data/perfumeCatalog";

const PER_PAGE = 20;

export default function ShopGrid() {
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("grid");
  const [animKey, setAnimKey] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<PerfumeProduct | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* Filter by search query (brand, description, notes) */
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PERFUME_CATALOG;
    return PERFUME_CATALOG.filter(
      (p) =>
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q)
    );
  }, [search]);

  /* Sorted products */
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return products.sort((a, b) => a.price - b.price);
      case "price-desc":
        return products.sort((a, b) => b.price - a.price);
      case "alpha-asc":
        return products.sort((a, b) => a.brand.localeCompare(b.brand));
      case "alpha-desc":
        return products.sort((a, b) => b.brand.localeCompare(a.brand));
      case "newest":
        return products.sort((a, b) => b.id - a.id);
      case "featured":
      default:
        return products;
    }
  }, [sortBy, filteredProducts]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PER_PAGE));

  /* Keep page in range when filters change */
  useEffect(() => {
    setPage(1);
  }, [search, sortBy]);

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return sortedProducts.slice(start, start + PER_PAGE);
  }, [sortedProducts, page]);

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setAnimKey((k) => k + 1);
  };

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    setAnimKey((k) => k + 1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="sg-wrapper">
      <ShopToolbar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        productCount={sortedProducts.length}
        layoutMode={layoutMode}
        onLayoutModeChange={setLayoutMode}
        search={search}
        onSearchChange={setSearch}
      />

      {pageProducts.length === 0 ? (
        <div className="sg-empty">
          <p className="sg-empty-title">No fragrances found</p>
          <p className="sg-empty-sub">Try a different search term.</p>
        </div>
      ) : (
        <div
          className={`sg-grid sg-grid--${layoutMode}`}
          key={`${layoutMode}-${animKey}`}
        >
          <AnimatePresence mode="popLayout">
            {pageProducts.map((product, idx) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ width: "100%" }}
              >
                <ShopProductCard
                  product={product}
                  index={idx}
                  onQuickView={setQuickViewProduct}
                  layoutMode={layoutMode}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="sg-pagination">
          <button
            type="button"
            className="sg-page-arrow"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                type="button"
                className={`sg-page-btn${p === page ? " sg-page-btn--active" : ""}`}
                onClick={() => goToPage(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            );
          })}

          <button
            type="button"
            className="sg-page-arrow"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      <ShopQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <style jsx>{`
        .sg-wrapper {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 40px 16px 60px;
          font-family: var(--font-inter), "Inter", sans-serif;
        }

        /* ── Empty state ── */
        .sg-empty {
          text-align: center;
          padding: 80px 20px;
        }

        .sg-empty-title {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-size: 22px;
          letter-spacing: 0.08em;
          color: #1a1a1a;
          margin: 0 0 8px;
        }

        .sg-empty-sub {
          font-size: 14px;
          color: #8b93a5;
          margin: 0;
        }

        :global(.sg-grid) {
          display: grid;
          width: 100%;
          justify-items: center;
        }

        /* ── Cinematic Duo View ── */
        :global(.sg-grid--cinematic) {
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          :global(.sg-grid--cinematic) {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (min-width: 1024px) {
          :global(.sg-grid--cinematic) {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            max-width: 1000px;
          }
        }

        /* ── Standard Grid View (max 5 per line) ── */
        :global(.sg-grid--grid) {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 480px) {
          :global(.sg-grid--grid) {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }

        @media (min-width: 768px) {
          :global(.sg-grid--grid) {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 1024px) {
          :global(.sg-grid--grid) {
            grid-template-columns: repeat(5, 1fr);
            gap: 18px;
          }
        }

        /* ── Detailed List View ── */
        :global(.sg-grid--list) {
          grid-template-columns: 1fr;
          gap: 20px;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── Pagination ── */
        .sg-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 50px;
          flex-wrap: wrap;
        }

        .sg-page-btn,
        .sg-page-arrow {
          min-width: 42px;
          height: 42px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 8, 157, 0.12);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          color: #2c3650;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .sg-page-btn:hover,
        .sg-page-arrow:hover:not(:disabled) {
          border-color: rgba(0, 8, 157, 0.35);
          color: #00089d;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 8, 157, 0.12);
        }

        .sg-page-btn--active {
          background: linear-gradient(135deg, #00089d 0%, #000672 100%);
          border-color: #00089d;
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(0, 8, 157, 0.3);
        }

        .sg-page-btn--active:hover {
          color: #ffffff;
        }

        .sg-page-arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ── Responsive Padding ── */
        @media (min-width: 640px) {
          .sg-wrapper {
            padding: 50px 24px 80px;
          }
        }

        @media (min-width: 1024px) {
          .sg-wrapper {
            padding: 60px 40px 100px;
          }
        }

        @media (min-width: 1400px) {
          .sg-wrapper {
            padding: 70px 60px 100px;
          }
        }
      `}</style>
    </div>
  );
}
