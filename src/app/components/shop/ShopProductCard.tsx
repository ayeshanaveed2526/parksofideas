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
      <div className={`sp-card-info sp-card-info--${layoutMode}`}>
        <div className="sp-info-header">
          <h3 className="sp-info-price">{formattedPrice}</h3>
          <button
            className="sp-info-wishlist"
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>

        <p className="sp-info-title">{product.brand} - {product.description}</p>
        
        <div className="sp-info-meta">
          Available Online • Ships in 24 hours
        </div>

        <div className="sp-info-actions">
          <button
            className="sp-info-btn sp-info-btn-outline"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick View
          </button>
          <button
            className="sp-info-btn sp-info-btn-solid"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product.id);
              router.push("/cart");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            Add to Cart
          </button>
        </div>
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
          aspect-ratio: 360 / 500;
          background: linear-gradient(
            165deg,
            #f8f9fd 0%,
            #ffffff 55%,
            #f3f5fb 100%
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

        .sp-card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
          text-align: left;
          padding: 16px 12px;
          min-height: 180px;
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
        .sp-info-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 8px;
        }

        .sp-info-price {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #111;
          margin: 0;
        }

        .sp-info-wishlist {
          background: none;
          border: none;
          padding: 2px;
          cursor: pointer;
          color: #111;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .sp-info-wishlist:hover {
          color: #00089d;
          transform: scale(1.1);
        }

        .sp-info-wishlist svg {
          width: 18px;
          height: 18px;
        }

        .sp-info-title {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #333;
          margin: 0 0 12px;
          line-height: 1.4;
        }

        .sp-info-meta {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-size: 11px;
          color: #666;
          margin-top: auto;
          margin-bottom: 10px;
        }

        .sp-info-actions {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: space-between;
        }

        .sp-info-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px 6px;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-size: 11px;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sp-info-btn svg {
          width: 12px;
          height: 12px;
        }

        .sp-info-btn-outline {
          background: transparent;
          border: 1px solid #111;
          color: #111;
        }

        .sp-info-btn-outline:hover {
          background: rgba(0,0,0,0.03);
        }

        .sp-info-btn-solid {
          background: #002f34;
          border: 1px solid #002f34;
          color: #fff;
        }

        .sp-info-btn-solid:hover {
          background: #004b53;
          border-color: #004b53;
        }

        /* ── Layout Overrides ── */
        .sp-card--cinematic .sp-card-img-wrap {
          aspect-ratio: 4 / 5;
        }

        .sp-card--list {
          flex-direction: row;
          align-items: stretch;
          justify-content: flex-start;
          width: 100%;
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
          padding: 24px;
        }

        .sp-card--list .sp-info-price {
          font-size: 22px;
        }
        
        .sp-card--list .sp-info-wishlist svg {
          width: 22px;
          height: 22px;
        }
        
        .sp-card--list .sp-info-title {
          font-size: 15px;
          margin-bottom: 16px;
        }

        .sp-card--list .sp-info-meta {
          font-size: 13px;
          margin-bottom: 12px;
        }

        .sp-card--list .sp-info-actions {
          gap: 12px;
          justify-content: flex-start;
        }

        .sp-card--list .sp-info-btn {
          flex: none;
          padding: 10px 24px;
          font-size: 14px;
        }
        
        .sp-card--list .sp-info-btn svg {
          width: 16px;
          height: 16px;
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

          .sp-card--list .sp-card-info {
            padding: 16px;
          }

          .sp-card--list .sp-list-actions {
            justify-content: center;
          }

          .sp-card--list .sp-card-desc {
            max-width: 90%;
          }
        }

        @media (min-width: 640px) {
          .sp-card-img-wrap {
            aspect-ratio: 360 / 500;
          }

          .sp-card-info {
            padding: 3px 24px 20px;
          }

          .sp-card-name {
            font-size: 22px;
            letter-spacing: 0.2em;
            margin: 0;
            padding-bottom: 5px;
          }

          .sp-card-desc {
            font-size: 14.5px;
            line-height: 1.6;
            margin: 0 0 5px;
          }

          .sp-card-rating {
            gap: 4px;
            margin-bottom: 5px;
          }

          .sp-star {
            font-size: 16px;
          }

          .sp-card-price {
            font-size: 17px;
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
