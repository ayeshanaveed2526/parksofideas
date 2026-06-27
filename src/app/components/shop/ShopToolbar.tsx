"use client";

import React, { useState, useRef, useEffect } from "react";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "alpha-asc"
  | "alpha-desc"
  | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  "alpha-asc": "Alphabetical: A – Z",
  "alpha-desc": "Alphabetical: Z – A",
  newest: "Newest First",
};

const SORT_OPTIONS: SortOption[] = [
  "featured",
  "price-asc",
  "price-desc",
  "alpha-asc",
  "alpha-desc",
  "newest",
];

export type LayoutMode = "cinematic" | "grid" | "list";

interface ShopToolbarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
  layoutMode: LayoutMode;
  onLayoutModeChange: (mode: LayoutMode) => void;
}

export default function ShopToolbar({
  sortBy,
  onSortChange,
  productCount,
  layoutMode,
  onLayoutModeChange,
}: ShopToolbarProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: SortOption) => {
    onSortChange(option);
    setOpen(false);
  };

  return (
    <div className="st-bar">
      {/* Left: product count */}
      <span className="st-count">
        Showing&nbsp;<strong>{productCount}</strong>&nbsp;fragrances
      </span>

      {/* Right: controls group */}
      <div className="st-controls-group">
        {/* Layout switcher */}
        <div className="st-layout-switcher" role="radiogroup" aria-label="Layout mode selection">
          <button
            type="button"
            className={`st-layout-btn${layoutMode === "cinematic" ? " st-layout-btn--active" : ""}`}
            onClick={() => onLayoutModeChange("cinematic")}
            title="Cinematic Duo View"
            aria-label="Cinematic Duo View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="18" rx="1" />
              <rect x="14" y="3" width="7" height="18" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            className={`st-layout-btn${layoutMode === "grid" ? " st-layout-btn--active" : ""}`}
            onClick={() => onLayoutModeChange("grid")}
            title="Standard Grid View"
            aria-label="Standard Grid View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            className={`st-layout-btn${layoutMode === "list" ? " st-layout-btn--active" : ""}`}
            onClick={() => onLayoutModeChange("list")}
            title="Detailed List View"
            aria-label="Detailed List View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* sort dropdown */}
        <div className="st-sort-wrap" ref={wrapRef}>
          <button
          className="st-sort-btn"
          onClick={() => setOpen((o) => !o)}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          id="shop-sort-trigger"
        >
          <span className="st-sort-label">Sort by:</span>
          <span className="st-sort-value">{SORT_LABELS[sortBy]}</span>
          <svg
            className={`st-chevron${open ? " st-chevron--open" : ""}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Dropdown menu */}
        <div
          className={`st-dropdown${open ? " st-dropdown--open" : ""}`}
          role="listbox"
          aria-labelledby="shop-sort-trigger"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              className={`st-dropdown-item${
                sortBy === option ? " st-dropdown-item--active" : ""
              }`}
              onClick={() => handleSelect(option)}
              type="button"
              role="option"
              aria-selected={sortBy === option}
            >
              <span>{SORT_LABELS[option]}</span>
              {sortBy === option && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>

      <style jsx>{`
        .st-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 0 0 28px;
          font-family: var(--font-inter), "Inter", sans-serif;
          position: relative;
          z-index: 10;
        }

        /* ── Product count ── */
        .st-count {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.4);
          letter-spacing: 0.02em;
        }

        .st-count strong {
          color: #0a0a0a;
          font-weight: 600;
        }

        /* ── Sort dropdown wrapper ── */
        .st-sort-wrap {
          position: relative;
        }

        /* ── Trigger button ── */
        .st-sort-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid rgba(0, 8, 157, 0.12);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: inherit;
        }

        .st-sort-btn:hover {
          border-color: rgba(0, 8, 157, 0.3);
          box-shadow: 0 4px 16px rgba(0, 8, 157, 0.1);
          transform: translateY(-1px);
        }

        .st-sort-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.4);
          letter-spacing: 0.04em;
        }

        .st-sort-value {
          font-size: 12px;
          font-weight: 600;
          color: #0a0a0a;
          letter-spacing: 0.02em;
        }

        .st-chevron {
          color: rgba(0, 0, 0, 0.4);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            color 0.3s ease;
          flex-shrink: 0;
        }

        .st-chevron--open {
          transform: rotate(180deg);
          color: #00089d;
        }

        /* ── Dropdown menu ── */
        .st-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 240px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 8, 157, 0.1);
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0, 8, 157, 0.14),
            0 4px 12px rgba(0, 0, 0, 0.06);
          padding: 6px;
          display: flex;
          flex-direction: column;
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px) scale(0.97);
          transition: opacity 0.25s ease,
            visibility 0.25s ease,
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .st-dropdown--open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        /* ── Dropdown items ── */
        .st-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding: 10px 14px;
          border: none;
          border-radius: 10px;
          background: transparent;
          cursor: pointer;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          letter-spacing: 0.01em;
          text-align: left;
          transition: background-color 0.2s ease,
            color 0.2s ease,
            transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .st-dropdown-item:hover {
          background: rgba(0, 8, 157, 0.06);
          color: #00089d;
          transform: translateX(2px);
        }

        .st-dropdown-item--active {
          background: rgba(0, 8, 157, 0.08);
          color: #00089d;
          font-weight: 600;
        }

        .st-dropdown-item--active:hover {
          background: rgba(0, 8, 157, 0.12);
        }

        .st-dropdown-item svg {
          color: #00089d;
          flex-shrink: 0;
        }

        /* ── Controls group ── */
        .st-controls-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* ── Layout Switcher ── */
        .st-layout-switcher {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 8, 157, 0.1);
          border-radius: 10px;
          padding: 3px;
          gap: 2px;
        }

        .st-layout-btn {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          border-radius: 8px;
          color: rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }

        .st-layout-btn:hover {
          color: #00089d;
          background: rgba(0, 8, 157, 0.04);
        }

        .st-layout-btn--active {
          background: rgba(0, 8, 157, 0.08);
          color: #00089d;
        }

        .st-layout-btn:active {
          transform: scale(0.95);
        }

        /* ── Responsive ── */
        @media (max-width: 479px) {
          .st-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding-bottom: 20px;
          }

          .st-count {
            text-align: center;
          }

          .st-controls-group {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .st-layout-switcher {
            justify-content: center;
          }

          .st-sort-wrap {
            width: 100%;
          }

          .st-sort-btn {
            width: 100%;
            justify-content: center;
          }

          .st-dropdown {
            right: auto;
            left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
