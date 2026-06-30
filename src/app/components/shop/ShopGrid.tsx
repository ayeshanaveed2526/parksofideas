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
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

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

  /* Reset visible products when filters change */
  useEffect(() => {
    setVisibleCount(PER_PAGE);
  }, [search, sortBy]);

  const visibleProducts = useMemo(
    () => sortedProducts.slice(0, visibleCount),
    [sortedProducts, visibleCount]
  );

  const hasMore = visibleCount < sortedProducts.length;

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setAnimKey((k) => k + 1);
  };

  const loadMore = () => {
    setVisibleCount((count) =>
      Math.min(count + PER_PAGE, sortedProducts.length)
    );
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

      {visibleProducts.length === 0 ? (
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
            {visibleProducts.map((product, idx) => (
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

      {hasMore && (
        <div className="sg-load-more-wrap">
          <button type="button" className="sg-load-more" onClick={loadMore}>
            Load More
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

        /* ── Load more ── */
        .sg-load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 50px;
        }

        .sg-load-more {
          min-width: 200px;
          padding: 14px 36px;
          border: 1px solid var(--poi-btn-border);
          border-radius: 999px;
          background: var(--poi-btn-bg);
          color: #ffffff;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: var(--poi-btn-shadow);
          transition: var(--poi-btn-transition);
        }

        .sg-load-more:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: var(--poi-btn-shadow-hover);
        }

        .sg-load-more:active {
          transform: translateY(0);
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
