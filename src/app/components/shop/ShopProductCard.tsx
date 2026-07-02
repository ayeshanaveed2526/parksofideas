"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PERFUME_CATALOG, type PerfumeProduct } from "../../data/perfumeCatalog";
import type { LayoutMode } from "./ShopToolbar";
import { useWishlist } from "../wishlist/WishlistProvider";
import { useCart } from "../cart/CartProvider";

interface ShopProductCardProps {
  product: PerfumeProduct;
  index: number;
  onQuickView: (product: PerfumeProduct) => void;
  layoutMode: LayoutMode;
}

export default function ShopProductCard({
  product,
  index,
  onQuickView,
  layoutMode,
}: ShopProductCardProps) {
  const router = useRouter();
  const { toggle, has } = useWishlist();
  const { add: addToCart } = useCart();
  const inWishlist = has(product.id);

  /* Derive badges */
  const badges: { text: string; color: string }[] = [];
  if (product.id <= 6) badges.push({ text: "NEW", color: "#00089d" });
  if (product.id % 4 === 0) badges.push({ text: "FEATURED", color: "#00089d" });
  if (product.id === 5) badges.push({ text: "-10%", color: "#000000" });

  const leftBadges = badges.filter((b) => b.text !== "FEATURED");
  const rightBadges = badges.filter((b) => b.text === "FEATURED");

  const formattedPrice = `$${product.price.toFixed(2)}`;

  // Find the next product image in the catalog for the hover swap effect
  const hoverProduct = PERFUME_CATALOG[(index + 1) % PERFUME_CATALOG.length];
  const hoverImage = hoverProduct ? hoverProduct.image : product.image;

  // Programmatic navigation to prevent overlay blocking or invalid link nesting
  const handleCardClick = (e: React.MouseEvent) => {
    // If the click is inside a button or clickable icon, do not navigate
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(`/product/${product.id}`);
  };

  return (
    <motion.article
      layout
      className={`sp-card sp-card--${layoutMode}`}
      whileHover={{
        y: -5,
        boxShadow: "0 18px 36px rgba(0, 8, 157, 0.08), 0 6px 14px rgba(0, 8, 157, 0.04), 0 0 0 1px rgba(0, 8, 157, 0.03)",
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
    >
      {/* ── Image area ── */}
      <div className="sp-card-img-wrap">
        {/* Left badges */}
        {leftBadges.length > 0 && (
          <div className="sp-badges sp-badges--left">
            {leftBadges.map((b, i) => (
              <span
                key={i}
                className="sp-badge"
                style={{ backgroundColor: b.color }}
              >
                {b.text}
              </span>
            ))}
          </div>
        )}

        {/* Right badges */}
        {rightBadges.length > 0 && (
          <div className="sp-badges sp-badges--right">
            {rightBadges.map((b, i) => (
              <span
                key={i}
                className="sp-badge"
                style={{ backgroundColor: b.color }}
              >
                {b.text}
              </span>
            ))}
          </div>
        )}

        {/* Product image (Two images overlaying for hover transition, with smaller sized bottles) */}
        <div className="sp-card-img">
          {/* Primary/Default Image */}
          <div className="sp-img-layer sp-img-layer--primary">
            <Image
              src={product.image}
              alt={product.brand}
              fill
              style={{ objectFit: "cover" }}
              sizes={
                layoutMode === "list"
                  ? "(max-width: 559px) 90vw, 220px"
                  : layoutMode === "cinematic"
                  ? "(max-width: 559px) 45vw, 320px"
                  : "(max-width: 559px) 50vw, (max-width: 1023px) 25vw, 280px"
              }
              priority={index < 8}
            />
          </div>
          {/* Secondary/Hover Image */}
          <div className="sp-img-layer sp-img-layer--hover">
            <Image
              src={hoverImage}
              alt={`${product.brand} Alternate`}
              fill
              style={{ objectFit: "cover" }}
              sizes={
                layoutMode === "list"
                  ? "(max-width: 559px) 90vw, 220px"
                  : layoutMode === "cinematic"
                  ? "(max-width: 559px) 45vw, 320px"
                  : "(max-width: 559px) 50vw, (max-width: 1023px) 25vw, 280px"
              }
            />
          </div>
        </div>

        {/* Hover overlay shimmer */}
        <div className="sp-card-overlay" />
        <div className="sp-shimmer-effect" />

        {/* Center action buttons (Standard and Cinematic only) */}
        {layoutMode !== "list" && (
          <div className="sp-hover-actions">
            <button
              className="sp-action-btn"
              type="button"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <div className="sp-action-divider" />
            <button
              className="sp-action-btn"
              type="button"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(product.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={inWishlist ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── Info area ── */}
      <div className="sp-card-info">
        <h3 className="sp-card-name">{product.brand}</h3>
        <p className="sp-card-desc">{product.description}</p>

        {/* Notes peek */}
        <p className="sp-card-notes">{product.notes}</p>

        {/* Star rating */}
        <div className="sp-card-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="sp-star">
              ★
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="sp-card-price">{formattedPrice}</div>

        {/* Grid and Cinematic layout: Always visible Add to Cart button */}
        {layoutMode !== "list" && (
          <button
            className="sp-grid-atc-btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product.id);
              router.push("/cart");
            }}
          >
            ADD TO CART
          </button>
        )}

        {/* List layout action buttons */}
        {layoutMode === "list" && (
          <div className="sp-list-actions">
            <button
              className="sp-list-atc"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product.id);
                router.push("/cart");
              }}
            >
              + ADD TO CART
            </button>
            <button
              className="sp-list-icon-btn"
              type="button"
              aria-label="Quick view"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="15"
                height="15"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button
              className="sp-list-icon-btn"
              type="button"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(product.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={inWishlist ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="15"
                height="15"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        /* ── Keyframes ── */
        @keyframes spStarPop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.35);
          }
          100% {
            transform: scale(1);
          }
        }

        /* ── Card ── */
        .sp-card {
          width: 100%;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0, 8, 157, 0.05);
          box-shadow: 0 4px 16px rgba(0, 8, 157, 0.02);
          transition: border-color 0.4s ease;
          cursor: pointer;

          --btn-size: 36px;
          --btn-icon: 13px;
        }

        .sp-card:hover {
          border-color: rgba(0, 8, 157, 0.12);
        }

        /* ── Image wrapper ── */
        .sp-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.15;
          background: linear-gradient(
            165deg,
            #f9fafc 0%,
            #ffffff 60%,
            #f5f7fc 100%
          );
          overflow: hidden;
          cursor: pointer;
        }

        .sp-card-img,
        .sp-img-layer {
          cursor: pointer;
        }

        .sp-card-img-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 75%,
            rgba(0, 8, 157, 0.015) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ── Double-image hover swap structure ── */
        .sp-card-img {
          position: absolute;
          inset: 0; /* Lower padding makes the bottle image larger and bolder */
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sp-img-layer {
          position: absolute;
          inset: 0;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sp-img-layer--hover {
          opacity: 0;
          transform: scale(0.93) rotate(-2deg);
        }

        /* Hover actions on image */
        .sp-card:hover .sp-card-img {
          transform: scale(1.03);
        }

        .sp-card:hover .sp-img-layer--primary {
          opacity: 0;
          transform: scale(0.95) rotate(2deg);
        }

        .sp-card:hover .sp-img-layer--hover {
          opacity: 1;
          transform: scale(1.02) rotate(0deg);
        }

        /* ── Badges ── */
        .sp-badges {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .sp-badges--left {
          top: 10px;
          left: 10px;
        }

        .sp-badges--right {
          top: 10px;
          right: 10px;
        }

        .sp-badge {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 8px;
          line-height: 1;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ffffff;
          padding: 4px 7px;
          border-radius: 4px;
          box-shadow: 0 1px 4px rgba(0, 8, 157, 0.06);
        }

        /* ── Hover overlay ── */
        .sp-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.02) 0%,
            rgba(0, 8, 157, 0.02) 100%
          );
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.45s ease, visibility 0.45s ease;
          z-index: 3;
        }

        .sp-card:hover .sp-card-overlay {
          opacity: 1;
          visibility: visible;
        }

        /* ── Luxury Shimmer Effect ── */
        .sp-shimmer-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 35%,
            rgba(255, 255, 255, 0.3) 48%,
            rgba(0, 8, 157, 0.02) 50%,
            rgba(255, 255, 255, 0.3) 52%,
            transparent 65%
          );
          background-size: 200% 100%;
          background-position: -200% center;
          z-index: 3;
          pointer-events: none;
          transition: background-position 0.8s ease;
        }

        .sp-card:hover .sp-shimmer-effect {
          background-position: 200% center;
        }

        /* ── Center action buttons ── */
        .sp-hover-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -30%);
          display: flex;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid rgba(0, 8, 157, 0.06);
          box-shadow: 0 8px 24px rgba(0, 8, 157, 0.08);
          overflow: hidden;
          z-index: 5;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease,
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          width: calc(var(--btn-size) * 2 + 1px);
          height: var(--btn-size);
          box-sizing: border-box;
        }

        .sp-card:hover .sp-hover-actions {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%);
        }

        .sp-action-btn {
          width: var(--btn-size);
          height: calc(var(--btn-size) - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--poi-btn-bg);
          border: none;
          color: #ffffff;
          cursor: pointer;
          box-shadow: var(--poi-btn-shadow);
          transition: var(--poi-btn-transition);
          padding: 0;
        }

        .sp-action-btn svg {
          width: var(--btn-icon);
          height: var(--btn-icon);
        }

        .sp-action-btn:hover {
          background: var(--poi-btn-bg-hover);
          color: #ffffff;
          box-shadow: var(--poi-btn-shadow-hover);
        }

        .sp-action-divider {
          width: 1px;
          height: calc(var(--btn-size) - 2px);
          background: rgba(0, 8, 157, 0.06);
        }

        /* ── Info area ── */
        .sp-card-info {
          width: 100%;
          box-sizing: border-box;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          background: linear-gradient(180deg, #ffffff 0%, #fafbfd 100%);
          text-align: left;
          position: relative;
          flex-grow: 1;
        }

        .sp-card-info::before {
          content: "";
          position: absolute;
          top: 0;
          left: 10px;
          transform: none;
          width: 28px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(0, 8, 157, 0.12),
            transparent
          );
        }

        /* Name */
        .sp-card-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 12.5px;
          line-height: 1.25;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #111111;
          margin: 0 0 3px;
          padding-left: 0;
          text-align: left;
          width: 100%;
          transition: color 0.35s ease, letter-spacing 0.35s ease;
        }

        .sp-card:hover .sp-card-name {
          color: #00089d;
          letter-spacing: 0.16em;
        }

        /* Description */
        .sp-card-desc {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 10px;
          line-height: 1.35;
          color: rgb(145, 145, 145);
          margin: 0 0 3px;
          max-width: 95%;
          transition: color 0.3s ease;
        }

        .sp-card:hover .sp-card-desc {
          color: rgb(95, 95, 95);
        }

        /* Notes */
        .sp-card-notes {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 8.5px;
          font-style: italic;
          line-height: 1.25;
          color: rgba(0, 0, 0, 0.18);
          margin: 0 0 5px;
          max-width: 90%;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.35s ease,
            margin 0.35s ease;
        }

        .sp-card:hover .sp-card-notes {
          max-height: 32px;
          opacity: 1;
          margin: 0 0 6px;
          color: rgba(0, 0, 0, 0.32);
        }

        /* Rating */
        .sp-card-rating {
          display: flex;
          gap: 1.5px;
          margin-bottom: 6px;
        }

        .sp-star {
          color: #FFD700;
          font-size: 10px;
          transition: transform 0.3s ease;
        }

        .sp-card:hover .sp-star {
          animation: spStarPop 0.4s ease both;
        }

        .sp-card:hover .sp-star:nth-child(1) { animation-delay: 0s; }
        .sp-card:hover .sp-star:nth-child(2) { animation-delay: 0.04s; }
        .sp-card:hover .sp-star:nth-child(3) { animation-delay: 0.08s; }
        .sp-card:hover .sp-star:nth-child(4) { animation-delay: 0.12s; }
        .sp-card:hover .sp-star:nth-child(5) { animation-delay: 0.16s; }

        /* Price */
        .sp-card-price {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 13px;
          color: #00089d;
          letter-spacing: 0.01em;
          margin-top: auto;
          align-self: flex-end;
          transition: transform 0.35s ease;
        }

        .sp-card:hover .sp-card-price {
          transform: scale(1.03);
        }

        /* Grid Add to cart button always visible */
        .sp-grid-atc-btn {
          width: 100%;
          align-self: stretch;
          margin-top: 10px;
          height: 32px;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          background: var(--poi-btn-bg);
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          border-radius: 0;
          cursor: pointer;
          transition: var(--poi-btn-transition);
          position: relative;
          z-index: 5;
        }

        .sp-grid-atc-btn:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
          transform: translateY(-2px);
        }

        .sp-grid-atc-btn:active {
          transform: scale(0.96) translateY(0);
        }

        /* ── Cinematic Duo Layout modifiers ── */
        .sp-card--cinematic {
          border-radius: 16px;
        }

        .sp-card--cinematic .sp-card-img-wrap {
          background: linear-gradient(135deg, #fcfdfe 0%, #f5f7fd 100%);
        }

        .sp-card--cinematic .sp-card-img {
          inset: 38px;
        }

        .sp-card--cinematic .sp-card-info {
          padding: 20px 14px 16px;
        }

        .sp-card--cinematic .sp-card-name {
          font-size: 16px;
          letter-spacing: 0.16em;
          margin-bottom: 6px;
        }

        .sp-card--cinematic .sp-card-desc {
          font-size: 11.5px;
          line-height: 1.45;
          margin-bottom: 8px;
        }

        .sp-card--cinematic .sp-card-price {
          font-size: 15px;
        }

        .sp-card--cinematic .sp-grid-atc-btn {
          height: 36px;
          font-size: 10px;
          margin-top: 14px;
        }

        /* ── Detailed List Layout Modifiers (Landscape) ── */
        .sp-card--list {
          flex-direction: row;
          align-items: stretch;
          border-radius: 14px;
          min-height: 200px;
        }

        .sp-card--list .sp-card-link {
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        .sp-card--list .sp-card-img-wrap {
          flex: 0 0 200px;
          aspect-ratio: auto;
          height: auto;
          min-height: 200px;
          border-right: 1px solid rgba(0, 8, 157, 0.04);
        }

        .sp-card--list .sp-card-img {
          inset: 32px;
        }

        .sp-card--list .sp-card-info {
          flex: 1;
          align-items: flex-start;
          justify-content: center;
          text-align: left;
          padding: 20px 24px;
          min-height: auto;
        }

        .sp-card--list .sp-card-info::before {
          left: 24px;
          transform: none;
          width: 20px;
        }

        .sp-card--list .sp-card-name {
          font-size: 16px;
          margin-bottom: 4px;
          letter-spacing: 0.16em;
        }

        .sp-card--list:hover .sp-card-name {
          letter-spacing: 0.16em;
        }

        .sp-card--list .sp-card-desc {
          font-size: 11px;
          margin-bottom: 4px;
          max-width: 85%;
        }

        .sp-card--list .sp-card-notes {
          max-height: 45px;
          opacity: 1;
          margin: 4px 0 8px;
          font-size: 9.5px;
          color: rgba(0, 0, 0, 0.35);
        }

        .sp-card--list .sp-card-rating {
          margin-bottom: 8px;
        }

        .sp-card--list .sp-card-price {
          font-size: 15px;
          margin-top: 0;
          margin-bottom: 12px;
        }

        /* List layout bottom actions bar */
        .sp-list-actions {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          margin-top: auto;
        }

        .sp-list-atc {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 9.5px;
          letter-spacing: 0.08em;
          color: #ffffff;
          background: var(--poi-btn-bg);
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          border-radius: 16px;
          padding: 7px 15px;
          cursor: pointer;
          transition: var(--poi-btn-transition);
        }

        .sp-list-atc:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
          transform: translateY(-1px);
        }

        .sp-list-icon-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--poi-btn-border);
          background: var(--poi-btn-bg);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--poi-btn-shadow);
          transition: var(--poi-btn-transition);
        }

        .sp-list-icon-btn:hover {
          background: var(--poi-btn-bg-hover);
          color: #ffffff;
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
          transform: scale(1.05);
        }

        /* ── Responsive Styling ── */
        @media (max-width: 639px) {
          .sp-card-img {
            inset: 0;
          }
          
          .sp-card--list {
            flex-direction: column;
            min-height: auto;
          }

          .sp-card--list .sp-card-link {
            flex-direction: column;
          }

          .sp-card--list .sp-card-img-wrap {
            flex: none;
            width: 100%;
            height: 160px;
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(0, 8, 157, 0.04);
          }

          .sp-card--list .sp-card-info {
            align-items: flex-start;
            text-align: left;
            padding: 16px 12px;
          }

          .sp-card--list .sp-card-info::before {
            left: 12px;
            transform: none;
          }

          .sp-card--list .sp-card-desc {
            max-width: 90%;
          }

          .sp-card--list .sp-list-actions {
            justify-content: center;
          }
        }

        @media (min-width: 640px) {
          .sp-card-img {
            inset: 0;
          }

          .sp-card-info {
            padding: 16px 10px 12px;
          }

          .sp-card-name {
            font-size: 13px;
          }

          .sp-star {
            font-size: 10.5px;
          }

          .sp-card-price {
            font-size: 13.5px;
          }
        }

        @media (min-width: 1024px) {
          .sp-card-img {
            inset: 0;
          }

          .sp-card-info {
            padding: 18px 12px 14px;
          }

          .sp-card-name {
            font-size: 13.5px;
          }

          .sp-card-desc {
            font-size: 10.5px;
          }

          .sp-star {
            font-size: 11px;
          }

          .sp-card-price {
            font-size: 14px;
          }
        }
      `}</style>
    </motion.article>
  );
}
