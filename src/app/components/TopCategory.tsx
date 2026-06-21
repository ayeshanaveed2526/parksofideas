"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  badges: { text: string; color: string }[];
  outOfStock?: boolean;
  isExternal?: boolean;
}

const newestProducts: Product[] = [
  {
    id: 1,
    name: "HAIR COLORING",
    description: "A semi-permanent hair color in a deep conditioning.",
    price: "$80.00",
    image: "/images/luchiana-3056568558.jpg",
    badges: [
      { text: "NEW", color: "#000000" },
      { text: "-10%", color: "#000000" },
    ],
  },
  {
    id: 2,
    name: "MIDNIGHT MUSK",
    description: "Earthy & Woody.",
    price: "$150.00",
    image: "/images/luchiana-3032395463.jpg",
    badges: [
      { text: "NEW", color: "#000000" },
      { text: "FEATURED", color: "#e4c1b1" },
    ],
  },
  {
    id: 3,
    name: "BRIGHTENING CORRECTOR",
    description: "A full-coverage color corrector.",
    price: "$60.00",
    image: "/images/luchiana-3022718468-520x460.jpg",
    badges: [{ text: "NEW", color: "#000000" }],
  },
  {
    id: 4,
    name: "BODIFYING SHAMPOO",
    description: "A gentle but thorough cleanser that leaves hair.",
    price: "$50.00",
    image: "/images/luchiana-3015865450-520x460.jpg",
    badges: [{ text: "NEW", color: "#000000" }],
  },
  {
    id: 5,
    name: "OIL-INFUSED LIP TINT",
    description:
      "A hydrating lip oil with a hint of the universally flattering.",
    price: "$45.00",
    image: "/images/luchiana-3002880645-520x460.jpg",
    badges: [{ text: "NEW", color: "#000000" }],
  },
  {
    id: 6,
    name: "OIL-FREE FOUNDATION",
    description: "Oil-free foundation that delivers buildable.",
    price: "$80.00",
    image: "/images/luchiana-3050518087-520x460.jpg",
    badges: [],
  },
  {
    id: 7,
    name: "LONG LASH SERUM",
    description: "This is an external product.",
    price: "$25.00",
    image: "/images/luchiana-3037998670-520x460.jpg",
    badges: [],
    isExternal: true,
  },
  {
    id: 8,
    name: "PURITY MADE CLEANSER",
    description: "Top-selling facial cleanser.",
    price: "$60.00",
    image: "/images/luchiana-3025788510-520x460.jpg",
    badges: [{ text: "FEATURED", color: "#e4c1b1" }],
  },
  {
    id: 9,
    name: "PRIMING FILTER FACE",
    description: "A primer that uses backlight technology.",
    price: "$50.00",
    image: "/images/luchiana-3016001322-520x460.jpg",
    badges: [],
  },
  {
    id: 10,
    name: "INSTANT RETOUCH PRIMER",
    description: "Longer wear with an instant retouch effect.",
    price: "$45.00",
    image: "/images/luchiana-3006105529-520x460.jpg",
    badges: [],
    outOfStock: true,
  },
  {
    id: 11,
    name: "FLOWERBOMB",
    description: "Vert de Bergamot, Coco de Mer Accord.",
    price: "$200.00",
    image: "/images/flowerbomb.jpg",
    badges: [],
  },
  {
    id: 12,
    name: "VOCE VIVA EAU DE PARFUM",
    description: "Italian Bergamot, Orange Blossom Absolute.",
    price: "$150.00",
    image: "/images/voce-viva.jpg",
    badges: [{ text: "FEATURED", color: "#e4c1b1" }],
  },
];

const products: Record<string, Product[]> = {
  NEWEST: newestProducts,
  POPULAR: [newestProducts[1], newestProducts[3], newestProducts[5], newestProducts[7], newestProducts[9], newestProducts[11]],
  CATEGORY: [newestProducts[0], newestProducts[2], newestProducts[4], newestProducts[6], newestProducts[8], newestProducts[10]],
  BRAND: [newestProducts[1], newestProducts[2], newestProducts[4], newestProducts[7], newestProducts[8], newestProducts[11]],
};

const tabs = ["NEWEST", "POPULAR", "CATEGORY", "BRAND"];

export default function TopCategory() {
  const [activeTab, setActiveTab] = useState("NEWEST");
  const currentProducts = products[activeTab] || [];

  return (
    <section className="tp-section">
      {/* ── Title ── */}
      <h2 className="tp-title">TOP PRODUCTS</h2>

      {/* ── Tabs ── */}
      <div className="tp-tabs-wrap">
        <nav className="tp-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tp-tab${activeTab === tab ? " tp-tab--on" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </nav>
        <span className="tp-tabs-rule" />
      </div>

      {/* ── Grid ── */}
      <div className="tp-container">
        <div className="tp-grid">
          {currentProducts.map((product) => {
            const leftBadges = product.badges.filter((b) => b.text !== "FEATURED");
            const rightBadges = product.badges.filter((b) => b.text === "FEATURED");

            return (
              <article key={product.id} className="tp-card">
                {/* ▸ Image area (Top box) */}
                <div className="tp-card-img-wrap" style={{ position: 'relative', aspectRatio: '260/230', overflow: 'hidden' }}>
                  {/* Left Badges */}
                  {leftBadges.length > 0 && (
                    <div className="tp-badges-left">
                      {leftBadges.map((b, i) => (
                        <span
                          key={i}
                          className="tp-badge"
                          style={{ backgroundColor: b.color }}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Right Badges */}
                  {rightBadges.length > 0 && (
                    <div className="tp-badges-right">
                      {rightBadges.map((b, i) => (
                        <span
                          key={i}
                          className="tp-badge"
                          style={{ backgroundColor: b.color }}
                        >
                          {b.text}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Out‑of‑stock pill */}
                  {product.outOfStock && (
                    <span className="tp-oos">OUT OF STOCK</span>
                  )}

                  {/* Product image */}
                  <div className="tp-card-img">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 559px) 45vw, (max-width: 1189px) 30vw, 260px"
                    />
                  </div>

                  {/* Hover white overlay background */}
                  <div className="tp-card-hover-bg" />

                  {/* Center Eye / Heart Action buttons */}
                  <div className="tp-hover-actions">
                    <button className="tp-action-btn" type="button" aria-label="Quick View">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <div className="tp-action-divider" />
                    <button className="tp-action-btn" type="button" aria-label="Add to Wishlist">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Add to Cart / External Button */}
                  {product.outOfStock ? (
                    <button className="tp-atc-btn tp-btn-disabled" type="button" disabled>
                      OUT OF STOCK
                    </button>
                  ) : product.isExternal ? (
                    <a href="#" className="tp-atc-btn">
                      BUY ON AMAZON
                    </a>
                  ) : (
                    <button className="tp-atc-btn" type="button">
                      + ADD TO CART
                    </button>
                  )}
                </div>

                {/* ▸ Info area (Bottom box) */}
                <div className="tp-card-info">
                  <h3 className="tp-card-name">{product.name}</h3>
                  <p className="tp-card-desc">{product.description}</p>
                  <span className="tp-card-price">{product.price}</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="tp-view-all-wrap">
          <a href="#" className="tp-view-all-btn">
            VIEW ALL
          </a>
        </div>
      </div>

      {/* ═══════════════════ STYLES ═══════════════════ */}
      <style jsx>{`
        /* ── Section ── */
        .tp-section {
          width: 100%;
          background-color: #f3f3f3;
          padding: 75px 0 85px;
        font-family: var(--font-inter), "Inter", sans-serif;
        }

        /* ── Title ── */
        .tp-title {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 36px;
          line-height: 1.28;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #000;
          text-align: center;
          margin: 0 0 28px;
          padding-left: 0.25em;
        }

        /* ── Tabs ── */
        .tp-tabs-wrap {
          position: relative;
          margin-bottom: 48px;
        }

        .tp-tabs {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
        }

        .tp-tabs-rule {
          display: block;
          width: 380px;
          max-width: 90%;
          height: 1px;
          background: rgba(0, 0, 0, 0.12);
          margin: 10px auto 0;
        }

        .tp-tab {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 1;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.3);
          background: none;
          border: none;
          padding: 6px 0 10px;
          cursor: pointer;
          position: relative;
          transition: color 0.15s linear;
        }

        .tp-tab:hover {
          color: #000;
        }

        .tp-tab--on {
          color: #000;
        }

        .tp-tab--on::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: #000;
        }

        /* ── Container ── */
        .tp-container {
          max-width: 1560px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .tp-view-all-wrap {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }

        .tp-view-all-btn {
          display: inline-block;
          outline: none;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.2;
          text-align: center;
          letter-spacing: 0.265em;
          text-indent: 0.265em;
          text-transform: uppercase;
          padding: 17px 30px 17px 30px;
          width: 146px;
          height: 50px;
          border: 1px solid #000;
          background-color: transparent;
          color: #000;
          font-family: var(--font-inter), "Inter", sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          box-sizing: border-box;
          white-space: nowrap;
        }

        .tp-view-all-btn:hover {
          background-color: #000;
          color: #fff;
        }

        /* ── Grid ── */
        .tp-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        /* ── Card ── */
        .tp-card {
          flex: 0 0 260px;
          max-width: 260px;
          background: #fff;
          display: flex;
          flex-direction: column;
          cursor: pointer;

          /* Dimension Variables */
          --btn-size: 52px;
          --btn-icon: 20px;
          --atc-h: 54px;
          --atc-fs: 13px;
          
          --name-fs: 20px;
          --desc-fs: 13px;
          --price-fs: 16px;
          
          --info-pt: 50px;
          --info-pb: 45px;
        }

        /* ── Image wrapper (Top box: 260x230px at desktop) ── */
        .tp-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 260 / 230;
          background: #fff;
          overflow: hidden;
        }

        .tp-card-img {
          position: absolute;
          inset: 12px;
        }

        /* ── Badges ── */
        .tp-badges-left {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .tp-badges-right {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .tp-badge {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          padding: 5px 10px;
        }

        /* ── Out of stock pill ── */
        .tp-oos {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          background: #5bab6d;
          padding: 6px 12px;
          z-index: 6;
        }

        /* ── Hover Overlay Bg ── */
        .tp-card-hover-bg {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.4);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 4;
        }

        .tp-card:hover .tp-card-hover-bg {
          opacity: 1;
          visibility: visible;
        }

        /* ── Center Eye / Heart Action buttons ── */
        .tp-hover-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          background: #fff;
          border: 1px solid #000;
          z-index: 5;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          width: calc(var(--btn-size) * 2 + 1px);
          height: var(--btn-size);
          box-sizing: border-box;
        }

        .tp-card:hover .tp-hover-actions {
          opacity: 1;
          visibility: visible;
        }

        .tp-action-btn {
          width: var(--btn-size);
          height: calc(var(--btn-size) - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: none;
          color: #000;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
          padding: 0;
        }

        .tp-action-btn svg {
          width: var(--btn-icon);
          height: var(--btn-icon);
        }

        .tp-action-btn:hover {
          background: #000;
          color: #fff;
        }

        .tp-action-divider {
          width: 1px;
          height: calc(var(--btn-size) - 2px);
          background: #000;
        }

        /* ── Add-to-cart & External buttons ── */
        .tp-atc-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: var(--atc-h);
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: var(--atc-fs);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: #000;
          background: #fff;
          border: 1px solid #000;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease,
            background-color 0.15s linear, color 0.15s linear;
          z-index: 5;
          padding: 0 10px;
        }

        .tp-card:hover .tp-atc-btn {
          transform: translateY(0);
          opacity: 1;
        }

        .tp-atc-btn:hover {
          background: #000;
          color: #fff;
        }

        .tp-btn-disabled {
          cursor: not-allowed;
          opacity: 0.5 !important;
          background: #f3f3f3;
          color: #999;
          border-color: #ccc;
        }

        .tp-btn-disabled:hover {
          background: #f3f3f3;
          color: #999;
          border-color: #ccc;
        }

        /* ── Card info (Bottom box: 260x312px at desktop) ── */
        .tp-card-info {
          width: 100%;
          aspect-ratio: 260 / 312;
          box-sizing: border-box;
          padding: var(--info-pt) 20px var(--info-pb);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: #fff;
          text-align: center;
        }

        .tp-card-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: var(--name-fs);
          line-height: 1.26;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #000;
          margin: 0 0 12px;
          padding-left: 0.25em;
          transition: color 0.15s linear;
        }

        /* Hover: name turns peach */
        .tp-card:hover .tp-card-name {
          color: var(--top-color-hr, rgb(205, 174, 159));
        }

        .tp-card-desc {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: var(--desc-fs);
          line-height: 1.5;
          color: rgb(97, 97, 97);
          margin: 0;
        }

        .tp-card-price {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: var(--price-fs);
          line-height: 1;
          color: #000;
          letter-spacing: 0.02em;
          margin-top: auto;
        }

        /* ════════════════ RESPONSIVE ════════════════ */

        /* ≤ 559px  – Fluid mobile scaling */
        @media (max-width: 559px) {
          .tp-section {
            padding: 45px 0 55px;
          }

          .tp-title {
            font-size: 24px;
            letter-spacing: 0.2em;
            margin-bottom: 22px;
          }

          .tp-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .tp-tabs {
            gap: 16px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .tp-tab {
            font-size: 12px;
            letter-spacing: 0.15em;
          }

          .tp-tabs-wrap {
            margin-bottom: 28px;
          }

          .tp-container {
            padding: 0 12px;
          }

          .tp-view-all-wrap {
            margin-top: 32px;
          }

          /* Scale down card elements proportionally using variables */
          .tp-card {
            flex: 1 1 auto;
            max-width: none;
            --btn-size: 34px;
            --btn-icon: 14px;
            --atc-h: 36px;
            --atc-fs: 10px;
            
            --name-fs: 14px;
            --desc-fs: 11px;
            --price-fs: 13px;
            
            --info-pt: 30px;
            --info-pb: 25px;
          }

          .tp-badge {
            font-size: 8px;
            padding: 3px 6px;
          }
          
          .tp-oos {
            font-size: 8px;
            padding: 4px 8px;
            bottom: 6px;
            right: 6px;
          }

          .tp-badges-left {
            top: 6px;
            left: 6px;
          }

          .tp-badges-right {
            top: 6px;
            right: 6px;
          }

          .tp-card-img {
            inset: 8px;
          }
        }
      `}</style>
    </section>
  );
}
