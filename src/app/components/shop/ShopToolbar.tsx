"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./ShopToolbar.module.css";

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
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ShopToolbar({
  sortBy,
  onSortChange,
  productCount,
  layoutMode,
  onLayoutModeChange,
  search,
  onSearchChange,
}: ShopToolbarProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.count}>
          Showing&nbsp;<strong>{productCount}</strong>&nbsp;fragrances
        </span>

        <div className={styles.search}>
          <svg
            className={styles.searchIcon}
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search perfumes by name, notes or scent…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search perfumes"
          />
          {search && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={styles.controlsGroup}>
        <div className={styles.layoutSwitcher} role="radiogroup" aria-label="Layout mode selection">
          <button
            type="button"
            className={`${styles.layoutBtn}${layoutMode === "cinematic" ? ` ${styles.layoutBtnActive}` : ""}`}
            onClick={() => onLayoutModeChange("cinematic")}
            title="Cinematic View"
            aria-label="Cinematic View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2.5" y="4" width="4.5" height="16" rx="1" />
              <rect x="9.75" y="4" width="4.5" height="16" rx="1" />
              <rect x="17" y="4" width="4.5" height="16" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.layoutBtn}${layoutMode === "grid" ? ` ${styles.layoutBtnActive}` : ""}`}
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
            className={`${styles.layoutBtn}${layoutMode === "list" ? ` ${styles.layoutBtnActive}` : ""}`}
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

        <div className={styles.sortWrap} ref={wrapRef}>
          <button
            className={styles.sortBtn}
            onClick={() => setOpen((o) => !o)}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            id="shop-sort-trigger"
          >
            <span className={styles.sortLabel}>Sort by:</span>
            <span className={styles.sortValue}>{SORT_LABELS[sortBy]}</span>
            <svg
              className={`${styles.chevron}${open ? ` ${styles.chevronOpen}` : ""}`}
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

          <div
            className={`${styles.dropdown}${open ? ` ${styles.dropdownOpen}` : ""}`}
            role="listbox"
            aria-labelledby="shop-sort-trigger"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                className={`${styles.dropdownItem}${
                  sortBy === option ? ` ${styles.dropdownItemActive}` : ""
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
    </div>
  );
}
