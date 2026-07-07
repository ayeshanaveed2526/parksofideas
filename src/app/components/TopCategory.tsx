"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAllProducts, type ApiProduct } from "../lib/api";
import { useCart } from "./cart/CartProvider";
import { useWishlist } from "./wishlist/WishlistProvider";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  hoverImage?: string;
  badges: { text: string; color: string; textColor?: string }[];
  outOfStock?: boolean;
  isExternal?: boolean;
}

function mapApiProduct(p: ApiProduct): Product {
  const hasDiscount = p.old_price > p.new_price;
  return {
    id: p.id,
    name: p.brand || p.name,
    description: p.description,
    price: `$${p.new_price.toFixed(2)}`,
    originalPrice: hasDiscount ? `$${p.old_price.toFixed(2)}` : undefined,
    image: p.image,
    hoverImage: p.images?.[1],
    badges: [
      ...(hasDiscount ? [{ text: `-${Math.round(((p.old_price - p.new_price) / p.old_price) * 100)}%`, color: "#000000" }] : []),
      ...(p.id <= 6 ? [{ text: "NEW", color: "#ffd700", textColor: "#000" }] : []),
      ...(p.id % 4 === 0 ? [{ text: "FEATURED", color: "#c8a96e" }] : []),
    ],
    outOfStock: false,
  };
}

const tabs = ["NEWEST", "POPULAR", "CATEGORY", "BRAND"];

export default function TopCategory() {
  const [activeTab, setActiveTab] = useState("NEWEST");
  const [animKey, setAnimKey] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const router = useRouter();
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  useEffect(() => {
    fetchAllProducts().then((apiProducts) => {
      setAllProducts(apiProducts.slice(0, 12).map(mapApiProduct));
    });
  }, []);

  // Build tab views from the same product list, just reordered
  const productsByTab: Record<string, Product[]> = {
    NEWEST: allProducts,
    POPULAR: [...allProducts].sort((a, b) => b.id - a.id),
    CATEGORY: [...allProducts].filter((_, i) => i % 2 === 0).concat([...allProducts].filter((_, i) => i % 2 !== 0)),
    BRAND: [...allProducts].sort((a, b) => a.name.localeCompare(b.name)),
  };

  const handleQuickView = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    router.push(`/product/${id}`);
  };

  const handleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    addToWishlist(id);
    router.push("/wishlist");
  };

  const handleAddToCart = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    addToCart(id, 1);
    router.push("/cart");
  };

  const currentProducts = (productsByTab[activeTab] || []).slice(0, 10);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setAnimKey((k) => k + 1);
  };

  return (
    <section className="tp-section">
      {/* ── Efficient Geometric Background ── */}
      <div className="tp-bg-layer" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tp-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 8, 157, 0.07)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#tp-grid-pattern)" />

          {/* Slow panning mesh network nodes */}
          <g stroke="rgba(0, 8, 157, 0.06)" strokeWidth="1" fill="none">
            {/* Node Cluster 1 */}
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0; 30,-20; 0,0" dur="20s" repeatCount="indefinite" />
              <line x1="10%" y1="20%" x2="25%" y2="15%" />
              <line x1="25%" y1="15%" x2="30%" y2="35%" />
              <line x1="10%" y1="20%" x2="30%" y2="35%" />
              <circle cx="10%" cy="20%" r="3" fill="rgba(0, 8, 157, 0.08)" />
              <circle cx="25%" cy="15%" r="4" fill="rgba(0, 8, 157, 0.08)" />
              <circle cx="30%" cy="35%" r="3" fill="rgba(0, 8, 157, 0.08)" />
            </g>

            {/* Node Cluster 2 */}
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0; -40,15; 0,0" dur="25s" repeatCount="indefinite" />
              <line x1="75%" y1="65%" x2="85%" y2="50%" />
              <line x1="85%" y1="50%" x2="90%" y2="80%" />
              <line x1="75%" y1="65%" x2="90%" y2="80%" />
              <circle cx="75%" cy="65%" r="4" fill="rgba(0, 8, 157, 0.08)" />
              <circle cx="85%" cy="50%" r="3" fill="rgba(0, 8, 157, 0.08)" />
              <circle cx="90%" cy="80%" r="4" fill="rgba(0, 8, 157, 0.08)" />
            </g>
          </g>

          {/* Rotating Geometric Rings */}
          <g transform="translate(150, 150)">
            <circle r="90" fill="none" stroke="rgba(0, 8, 157, 0.05)" strokeWidth="1" strokeDasharray="10 5 2 5">
              <animateTransform attributeName="transform" type="rotate" values="0; 360" dur="40s" repeatCount="indefinite" />
            </circle>
            <circle r="70" fill="none" stroke="rgba(0, 8, 157, 0.04)" strokeWidth="1" strokeDasharray="5 15">
              <animateTransform attributeName="transform" type="rotate" values="360; 0" dur="30s" repeatCount="indefinite" />
            </circle>
          </g>

          <g transform="translate(1200, 600)">
            <circle r="120" fill="none" stroke="rgba(0, 8, 157, 0.05)" strokeWidth="1" strokeDasharray="1 8">
              <animateTransform attributeName="transform" type="rotate" values="0; 360" dur="45s" repeatCount="indefinite" />
            </circle>
            <rect x="-60" y="-60" width="120" height="120" fill="none" stroke="rgba(0, 8, 157, 0.04)" strokeWidth="1">
              <animateTransform attributeName="transform" type="rotate" values="0; -360" dur="35s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* Data Flow Lines */}
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(0, 8, 157, 0.06)" strokeWidth="1" strokeDasharray="50 300">
            <animate attributeName="stroke-dashoffset" values="350; 0" dur="15s" repeatCount="indefinite" />
          </line>

          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="rgba(0, 8, 157, 0.05)" strokeWidth="1" strokeDasharray="80 400">
            <animate attributeName="stroke-dashoffset" values="0; 480" dur="20s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>

      <div className="tp-content-wrapper">
        {/* ── Title ── */}
        <h2 className="tp-title">TOP PRODUCTS</h2>

        {/* ── Tabs ── */}
        <div className="tp-tabs-wrap">
          <nav className="tp-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tp-tab${activeTab === tab ? " tp-tab--on" : ""}`}
                onClick={() => handleTabChange(tab)}
                type="button"
              >
                {tab}
                <span className="tp-tab-indicator" />
              </button>
            ))}
          </nav>
          <span className="tp-tabs-rule" />
        </div>

        {/* ── Grid ── */}
        <div className="tp-container">
          <div className="tp-grid" key={animKey}>
            {currentProducts.map((product, idx) => {
              const leftBadges = product.badges.filter((b) => b.text !== "FEATURED");
              const rightBadges = product.badges.filter((b) => b.text === "FEATURED");

              return (
                <Link href={`/product/${product.id}`} key={product.id} style={{ display: 'contents', textDecoration: 'none' }}>
                  <article
                    className="tp-card cursor-pointer"
                    style={{ animationDelay: `${idx * 0.07}s` }}
                  >
                    {/* ▸ Image area (Top box) */}
                    <div className="tp-card-img-wrap">
                      {/* Left Badges */}
                      {leftBadges.length > 0 && (
                        <div className="tp-badges-left">
                          {leftBadges.map((b, i) => (
                            <span
                              key={i}
                              className="tp-badge"
                              style={{ backgroundColor: b.color, color: b.textColor || '#fff' }}
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
                              style={{ backgroundColor: b.color, color: b.textColor || '#fff' }}
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
                        <div className={`tp-img-layer tp-img-primary ${product.hoverImage ? 'has-hover' : ''}`}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 559px) 45vw, (max-width: 1189px) 30vw, 260px"
                          />
                        </div>
                        {product.hoverImage && (
                          <div className="tp-img-layer tp-img-hover">
                            <Image
                              src={product.hoverImage}
                              alt={`${product.name} Alternate`}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 559px) 45vw, (max-width: 1189px) 30vw, 260px"
                            />
                          </div>
                        )}
                      </div>

                      {/* Hover white overlay background */}
                      <div className="tp-card-hover-bg" />

                      {/* Center Eye / Heart Action buttons */}
                      <div className="tp-hover-actions">
                        <button className="tp-action-btn" type="button" aria-label="Quick View" onClick={(e) => handleQuickView(e, product.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button className="tp-action-btn" type="button" aria-label="Add to Wishlist" onClick={(e) => handleWishlist(e, product.id)}>
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
                        <button type="button" className="tp-atc-btn" onClick={(e) => e.preventDefault()}>
                          BUY ON AMAZON
                        </button>
                      ) : (
                        <button className="tp-atc-btn" type="button" onClick={(e) => handleAddToCart(e, product.id)}>
                          ADD TO CART
                        </button>
                      )}
                    </div>

                    {/* ▸ Info area (Bottom box) */}
                    <div className="tp-card-info">
                      <h3 className="tp-card-name">{product.name}</h3>
                      <div className="tp-card-stars" aria-label="Rated 5 out of 5">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <svg key={s} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="tp-card-desc">{product.description}</p>
                      <div className="tp-card-price-wrap">
                        {product.originalPrice && (
                          <span className="tp-card-original-price">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="tp-card-price">{product.price}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div className="tp-view-all-wrap">
            <button type="button" onClick={() => router.push('/shop')} className="tp-view-all-btn">
              LOAD MORE
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════ STYLES ═══════════════════ */}
      <style jsx>{`
        /* ── Keyframes ── */
        @keyframes cardFadeUp {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ── Section ── */
        .tp-section {
          width: 100%;
          background: linear-gradient(180deg, #f3f4f6 0%, #eceef1 42%, #f0f1f4 72%, #f6f7f9 100%);
          padding: 45px 0 55px;
          font-family: var(--font-inter), "Inter", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .tp-bg-layer {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .tp-content-wrapper {
          position: relative;
          z-index: 1;
        }

        /* ── Title ── */
        .tp-title {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 700;
          font-size: 24px;
          line-height: 1.28;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #000;
          text-align: center;
          margin: 0 0 22px;
          padding-left: 0.25em;
        }

        /* ── Tabs ── */
        .tp-tabs-wrap {
          position: relative;
          margin-bottom: 28px;
        }

        .tp-tabs {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tp-tabs-rule {
          display: block;
          width: 380px;
          max-width: 90%;
          height: 1px;
          background: rgba(0, 8, 157, 0.12);
          margin: 10px auto 0;
        }

        .tp-tab {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff;
          background: var(--poi-btn-bg);
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          border-radius: 0;
          padding: 12px 24px;
          cursor: pointer;
          position: relative;
          transition: var(--poi-btn-transition);
        }

        .tp-tab:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .tp-tab--on {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          color: #ffffff;
        }

        /* Animated underline indicator */
        .tp-tab-indicator {
          display: none;
        }

        /* ── Container ── */
        .tp-container {
          width: 100%;
          margin: 0 auto;
          padding: 0 12px;
        }

        .tp-view-all-wrap {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }

        .tp-view-all-btn {
          display: inline-block;
          outline: none;
          font-weight: 500;
          font-size: 12px;
          line-height: 1.2;
          text-align: center;
          letter-spacing: 0.265em;
          text-indent: 0.265em;
          text-transform: uppercase;
          padding: 17px 30px 17px 30px;
          width: 160px;
          height: 50px;
          border: 1px solid var(--poi-btn-border);
          background: var(--poi-btn-bg);
          color: #fff;
          font-family: var(--font-inter), "Inter", sans-serif;
          text-decoration: none;
          cursor: pointer;
          box-shadow: var(--poi-btn-shadow);
          transition: var(--poi-btn-transition);
          box-sizing: border-box;
          white-space: nowrap;
          border-radius: 0;
        }

        .tp-view-all-btn:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: var(--poi-btn-shadow-hover);
        }

        /* ── Grid ── */
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          justify-items: center;
        }

        /* ── Card ── */
        .tp-card {
          width: 100%;
          max-width: 260px;
          background: #fff;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.4s ease;
          animation: cardFadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
          border: 1px solid rgba(0, 8, 157, 0.08);

          /* Dimension Variables */
          --btn-size: 34px;
          --btn-icon: 14px;
          --atc-h: 36px;
          --atc-fs: 10px;
          
          --name-fs: 14px;
          --desc-fs: 11px;
          --price-fs: 13px;
          
          --info-pt: 16px;
          --info-pb: 16px;
        }

        .tp-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 8, 157, 0.35);
          box-shadow: 0 20px 50px rgba(0, 8, 157, 0.22),
                      0 8px 16px rgba(0, 8, 157, 0.1);
        }

        /* ── Image wrapper ── */
        .tp-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 260 / 380;
          overflow: hidden;
          background: linear-gradient(180deg, #f8f9fd 0%, #ffffff 50%, #f3f5fb 100%);
        }

        .tp-card-img {
          position: absolute;
          inset: 0;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .tp-img-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .tp-img-primary {
          opacity: 1;
          transition: opacity 0.5s ease;
        }

        .tp-card:hover .tp-img-primary.has-hover {
          opacity: 0;
        }

        .tp-img-hover {
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .tp-card:hover .tp-img-hover {
          opacity: 1;
        }

        .tp-card:hover .tp-card-img {
          transform: scale(1.08);
        }

        /* ── Badges ── */
        .tp-badges-left {
          position: absolute;
          top: 6px;
          left: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .tp-badges-right {
          position: absolute;
          top: 6px;
          right: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .tp-badge {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 8px;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
        }

        /* ── Out of stock pill ── */
        .tp-oos {
          position: absolute;
          bottom: 6px;
          right: 6px;
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 8px;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          background: #5bab6d;
          padding: 4px 8px;
          z-index: 6;
          border-radius: 4px;
        }

        /* ── Hover Overlay Bg ── */
        .tp-card-hover-bg {
          position: absolute;
          inset: 0;
          background: rgba(0, 8, 157, 0.0);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.45s ease, visibility 0.45s ease, background 0.45s ease;
          z-index: 4;
          pointer-events: none;
        }

        .tp-card:hover .tp-card-hover-bg {
          opacity: 1;
          visibility: visible;
          background: rgba(0, 8, 157, 0.03);
        }

        /* ── Center Eye / Heart Action buttons ── */
        .tp-hover-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          display: flex;
          gap: 12px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 10;
        }

        .tp-card:hover .tp-hover-actions {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%);
        }

        .tp-action-btn {
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
          border-radius: 0;
        }

        .tp-action-btn svg {
          width: var(--btn-icon);
          height: var(--btn-icon);
        }

        .tp-action-btn:hover {
          background: var(--poi-btn-bg-hover);
          color: #ffffff;
          transform: scale(1.05);
          box-shadow: var(--poi-btn-shadow-hover);
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
          color: #fff;
          background: var(--poi-btn-bg);
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.45s ease,
                      var(--poi-btn-transition);
          z-index: 5;
          padding: 0 10px;
        }

        .tp-card:hover .tp-atc-btn {
          transform: translateY(0);
          opacity: 1;
        }

        .tp-atc-btn:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
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

        /* ── Card info ── */
        .tp-card-info {
          width: 100%;
          box-sizing: border-box;
          padding: 3px 16px 8px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: linear-gradient(180deg, #ffffff 0%, #fafbfd 100%);
          position: relative;
          flex-grow: 1;
        }

        .tp-card-info::before {
          content: "";
          position: absolute;
          top: 0;
          left: 16px;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, rgba(0, 8, 157, 0.35), transparent);
          border-radius: 1px;
        }

        .tp-card-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 600;
          font-size: var(--name-fs);
          line-height: 1.26;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #000;
          margin: 0;
          padding-bottom: 5px;
          padding-left: 0;
          text-align: left;
          width: 100%;
          transition: color 0.35s ease, letter-spacing 0.35s ease;
        }

        /* Hover: name turns theme blue */
        .tp-card:hover .tp-card-name {
          color: #00089d;
          letter-spacing: 0.25em;
        }

        /* ── Rating stars ── */
        .tp-card-stars {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 3px;
          margin: 0 0 5px;
        }

        .tp-card-stars svg {
          width: 14px;
          height: 14px;
          color: #FFD700;
          filter: drop-shadow(0 1px 1px rgba(230, 180, 0, 0.25));
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .tp-card:hover .tp-card-stars svg {
          transform: scale(1.12);
        }

        .tp-card-desc {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: var(--desc-fs);
          line-height: 1.5;
          color: rgb(130, 130, 130);
          margin: 0 0 5px;
          transition: color 0.3s ease;
        }

        .tp-card:hover .tp-card-desc {
          color: rgb(97, 97, 97);
        }

        .tp-card-price-wrap {
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 2px;
          align-self: flex-end;
          width: 100%;
          transition: transform 0.35s ease;
          transform-origin: right bottom;
        }
        
        .tp-card:hover .tp-card-price-wrap {
          transform: scale(1.05);
        }

        .tp-card-original-price {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 1;
          color: #9CA3AF;
          text-decoration: line-through;
        }

        .tp-card-price {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 500;
          font-size: var(--price-fs);
          line-height: 1;
          color: #000;
          letter-spacing: 0.02em;
        }

        /* ════════════════ RESPONSIVE ════════════════ */

        /* < 400px – Very small mobile */
        @media (max-width: 399px) {
          .tp-grid {
            gap: 8px;
          }
          .tp-container {
            padding: 0 8px;
          }
          .tp-card {
            --btn-size: 30px;
            --btn-icon: 12px;
            --atc-h: 32px;
            --atc-fs: 9px;
            --name-fs: 11px;
            --desc-fs: 10px;
            --price-fs: 12px;
            --info-pt: 14px;
            --info-pb: 12px;
          }
          .tp-card-info {
            min-height: auto;
          }
          .tp-card-stars svg {
            width: 12px;
            height: 12px;
          }
        }

        /* ≥ 560px – Tablet: 3 columns */
        @media (min-width: 560px) {
          .tp-section {
            padding: 55px 0 65px;
          }

          .tp-title {
            font-size: 28px;
            margin-bottom: 24px;
          }

          .tp-tabs {
            gap: 24px;
          }

          .tp-tab {
            font-size: 12px;
            letter-spacing: 0.18em;
          }

          .tp-tabs-wrap {
            margin-bottom: 36px;
          }

          .tp-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .tp-container {
            padding: 0 16px;
          }

          .tp-card {
            --btn-size: 38px;
            --btn-icon: 16px;
            --atc-h: 40px;
            --atc-fs: 11px;
            --name-fs: 16px;
            --desc-fs: 12px;
            --price-fs: 14px;
            --info-pt: 3px;
            --info-pb: 18px;
          }

          .tp-card-info {
            min-height: auto;
            padding: var(--info-pt) 14px var(--info-pb);
          }

          .tp-badge {
            font-size: 9px;
            padding: 4px 8px;
          }

          .tp-oos {
            font-size: 9px;
            padding: 5px 10px;
          }

          .tp-badges-left {
            top: 8px;
            left: 8px;
          }

          .tp-badges-right {
            top: 8px;
            right: 8px;
          }

          .tp-card-img {
            inset: 0;
          }

          .tp-view-all-wrap {
            margin-top: 38px;
          }
        }

        /* ≥ 900px – Tablet-large: 4 columns */
        @media (min-width: 900px) {
          .tp-section {
            padding: 65px 0 75px;
          }

          .tp-title {
            font-size: 32px;
            margin-bottom: 26px;
          }

          .tp-tabs {
            gap: 32px;
          }

          .tp-tab {
            font-size: 13px;
            letter-spacing: 0.2em;
          }

          .tp-tabs-wrap {
            margin-bottom: 40px;
          }

          .tp-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
          }

          .tp-container {
            padding: 0 20px;
          }

          .tp-card {
            --btn-size: 44px;
            --btn-icon: 18px;
            --atc-h: 46px;
            --atc-fs: 12px;
            --name-fs: 17px;
            --desc-fs: 12px;
            --price-fs: 15px;
            --info-pt: 4px;
            --info-pb: 20px;
          }

          .tp-card-info {
            min-height: auto;
            padding: var(--info-pt) 16px var(--info-pb);
          }

          .tp-card-stars svg {
            width: 15px;
            height: 15px;
          }
        }

        /* ≥ 1190px – Desktop: flex wrap centered */
        @media (min-width: 1190px) {
          .tp-section {
            padding: 75px 0 85px;
          }

          .tp-title {
            font-size: 36px;
            letter-spacing: .14em;
            margin: 0 0 28px;
          }

          .tp-tabs {
            gap: 40px;
          }

          .tp-tab {
            font-size: 14px;
            letter-spacing: 0.2em;
          }

          .tp-tabs-wrap {
            margin-bottom: 48px;
          }

          .tp-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .tp-container {
            padding: 0 15px;
          }

          .tp-card {
            flex: 0 0 260px;
            max-width: 260px;
            width: auto;
            --btn-size: 52px;
            --btn-icon: 20px;
            --atc-h: 54px;
            --atc-fs: 13px;
            --name-fs: 20px;
            --desc-fs: 13px;
            --price-fs: 16px;
            --info-pt: 3px;
            --info-pb: 26px;
          }

          .tp-card-info {
            min-height: auto;
            padding: var(--info-pt) 20px var(--info-pb);
          }

          .tp-card-name {
            letter-spacing: 0.25em;
            margin: 0;
            padding-bottom: 5px;
            padding-left: 0;
          }

          .tp-badge {
            font-size: 10px;
            padding: 5px 10px;
          }

          .tp-oos {
            font-size: 10px;
            padding: 6px 12px;
            bottom: 10px;
            right: 10px;
          }

          .tp-badges-left {
            top: 10px;
            left: 10px;
          }

          .tp-badges-right {
            top: 10px;
            right: 10px;
          }

          .tp-card-img {
            inset: 0;
          }

          .tp-view-all-wrap {
            margin-top: 48px;
          }
        }
      `}</style>
    </section>
  );
}
