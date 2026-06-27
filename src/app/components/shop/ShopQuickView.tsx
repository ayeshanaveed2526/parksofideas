"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PerfumeProduct } from "../../data/perfumeCatalog";

interface ShopQuickViewProps {
  product: PerfumeProduct | null;
  onClose: () => void;
}

export default function ShopQuickView({ product, onClose }: ShopQuickViewProps) {
  const isOpen = product !== null;

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
    }
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <div
      className={`sq-overlay${isOpen ? " sq-overlay--open" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product ? `Quick view: ${product.brand}` : undefined}
    >
      <div className="sq-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          className="sq-close"
          onClick={onClose}
          type="button"
          aria-label="Close quick view"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {product && (
          <div className="sq-inner">
            {/* Image side */}
            <div className="sq-image-wrap">
              <div className="sq-image">
                <Image
                  src={product.image}
                  alt={product.brand}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 80vw, 360px"
                />
              </div>
            </div>

            {/* Info side */}
            <div className="sq-info">
              <span className="sq-label">EAU DE PARFUM</span>
              <h2 className="sq-name">{product.brand}</h2>

              <div className="sq-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="sq-star">★</span>
                ))}
                <span className="sq-rating-text">5.0</span>
              </div>

              <p className="sq-desc">{product.description}</p>

              <div className="sq-notes-block">
                <span className="sq-notes-label">NOTES</span>
                <p className="sq-notes">{product.notes}</p>
              </div>

              <div className="sq-price-row">
                <span className="sq-price">${product.price.toFixed(2)}</span>
                <span className="sq-size">100 ml</span>
              </div>

              <div className="sq-actions">
                <button className="sq-atc-btn" type="button">
                  + ADD TO CART
                </button>
                <Link
                  href={`/product/${product.id}`}
                  className="sq-details-btn"
                  onClick={onClose}
                >
                  VIEW FULL DETAILS
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* ── Overlay ── */
        .sq-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.35s ease, visibility 0.35s ease;
        }

        .sq-overlay--open {
          opacity: 1;
          visibility: visible;
        }

        /* ── Card ── */
        .sq-card {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0, 8, 157, 0.2),
            0 12px 32px rgba(0, 0, 0, 0.1);
          transform: scale(0.92) translateY(20px);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .sq-overlay--open .sq-card {
          transform: scale(1) translateY(0);
        }

        /* ── Close button ── */
        .sq-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: color 0.25s ease, transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .sq-close:hover {
          color: #00089d;
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 4px 16px rgba(0, 8, 157, 0.2);
        }

        /* ── Inner layout ── */
        .sq-inner {
          display: flex;
          flex-direction: column;
        }

        /* ── Image side ── */
        .sq-image-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: linear-gradient(
            165deg,
            #f4f5fa 0%,
            #ffffff 55%,
            #eef0f8 100%
          );
          position: relative;
          flex-shrink: 0;
        }

        .sq-image {
          position: absolute;
          inset: 30px;
        }

        /* ── Info side ── */
        .sq-info {
          padding: 28px 24px 32px;
          display: flex;
          flex-direction: column;
          font-family: var(--font-inter), "Inter", sans-serif;
        }

        .sq-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #00089d;
          margin-bottom: 8px;
        }

        .sq-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 28px;
          letter-spacing: 0.2em;
          color: #0a0a0a;
          margin: 0 0 12px;
          padding-left: 0.2em;
        }

        .sq-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-bottom: 16px;
        }

        .sq-star {
          color: #00089d;
          font-size: 14px;
        }

        .sq-rating-text {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          margin-left: 8px;
          font-weight: 500;
        }

        .sq-desc {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(0, 0, 0, 0.55);
          margin: 0 0 16px;
        }

        .sq-notes-block {
          padding: 14px 16px;
          background: rgba(0, 8, 157, 0.03);
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .sq-notes-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #00089d;
          margin-bottom: 6px;
        }

        .sq-notes {
          font-size: 12px;
          font-style: italic;
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.45);
          margin: 0;
        }

        .sq-price-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 24px;
        }

        .sq-price {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 700;
          font-size: 24px;
          color: #00089d;
          letter-spacing: 0.02em;
        }

        .sq-size {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.35);
          font-weight: 500;
        }

        /* ── Action buttons ── */
        .sq-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sq-atc-btn {
          width: 100%;
          padding: 15px 20px;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffffff;
          background: linear-gradient(135deg, #00089d 0%, #000672 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.35s ease;
        }

        .sq-atc-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 8, 157, 0.35);
        }

        .sq-details-btn {
          display: block;
          width: 100%;
          padding: 14px 20px;
          text-align: center;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: #00089d;
          background: transparent;
          border: 1.5px solid rgba(0, 8, 157, 0.2);
          border-radius: 12px;
          cursor: pointer;
          box-sizing: border-box;
          transition: background-color 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .sq-details-btn:hover {
          background: rgba(0, 8, 157, 0.06);
          border-color: rgba(0, 8, 157, 0.4);
          transform: translateY(-1px);
        }

        /* ── Responsive: tablet+ ── */
        @media (min-width: 640px) {
          .sq-inner {
            flex-direction: row;
          }

          .sq-image-wrap {
            width: 45%;
            aspect-ratio: auto;
            min-height: 420px;
          }

          .sq-info {
            width: 55%;
            padding: 36px 32px 36px;
            justify-content: center;
          }

          .sq-name {
            font-size: 32px;
          }

          .sq-price {
            font-size: 28px;
          }

          .sq-actions {
            flex-direction: row;
          }

          .sq-atc-btn,
          .sq-details-btn {
            flex: 1;
          }
        }

        /* ── Responsive: large ── */
        @media (min-width: 1024px) {
          .sq-card {
            max-width: 900px;
          }

          .sq-image-wrap {
            min-height: 480px;
          }

          .sq-info {
            padding: 48px 40px;
          }

          .sq-name {
            font-size: 36px;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}
