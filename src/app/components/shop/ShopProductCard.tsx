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

export default function ShopProductCard({ product, index, onQuickView, layoutMode }: ShopProductCardProps) {
  const router = useRouter();
  const { toggle, has } = useWishlist();
  const { add: addToCart } = useCart();
  const inWishlist = has(product.id);

  const badges: { text: string; color: string }[] = [];
  if (product.id <= 6) badges.push({ text: "NEW", color: "#00089d" });
  if (product.id % 4 === 0) badges.push({ text: "FEATURED", color: "#c8a96e" });
  if (product.id === 5) badges.push({ text: "-10%", color: "#1a1a1a" });
  const leftBadges = badges.filter((b) => b.text !== "FEATURED");

  const hasDiscount = product.id === 5;
  const currentPrice = hasDiscount ? product.price * 0.9 : product.price;

  const formattedPrice = `$${currentPrice.toFixed(2)}`;
  const formattedOriginalPrice = hasDiscount ? `$${product.price.toFixed(2)}` : null;
  const hoverProduct = PERFUME_CATALOG[(index + 1) % PERFUME_CATALOG.length];
  const hoverImage = hoverProduct ? hoverProduct.image : product.image;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    router.push(`/product/${product.id}`);
  };

  /* ════════════════════════════════════════
     LIST VIEW  —  Horizontal Listing Card
     [  Image LEFT  |  Info RIGHT  ]
  ════════════════════════════════════════ */
  if (layoutMode === "list") {
    return (
      <motion.article
        layout
        onClick={handleCardClick}
        whileHover={{ boxShadow: "0 16px 48px rgba(0,8,157,0.12), 0 4px 12px rgba(0,0,0,0.04)" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          flexDirection: "row" as const,
          alignItems: "stretch",
          width: "100%",
          height: "240px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #E8EAF0",
          overflow: "hidden",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* ══ LEFT: Image ══ */}
        <div style={{
          position: "relative",
          flexShrink: 0,
          width: "34%",
          height: "100%",
          background: "linear-gradient(145deg, #f0f2fa 0%, #e8eaf5 100%)",
          borderRight: "1px solid #E8EAF0",
        }}>
          {leftBadges.length > 0 && (
            <span style={{
              position: "absolute", top: 14, left: 14, zIndex: 5,
              background: leftBadges[0].color, color: "#fff",
              fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              padding: "4px 10px", borderRadius: "20px",
            }}>
              {leftBadges[0].text}
            </span>
          )}
          {/* Images */}
          <div style={{ position: "absolute", inset: 0, transition: "opacity 0.5s ease, transform 0.7s ease" }}
            className="lcard-img-primary">
            <Image src={product.image} alt={product.brand} fill
              style={{ objectFit: "cover" }} sizes="34vw" priority={index < 6} />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.5s ease, transform 0.7s ease", transform: "scale(0.96)" }}
            className="lcard-img-hover">
            <Image src={hoverImage} alt="" fill style={{ objectFit: "cover" }} sizes="34vw" />
          </div>
        </div>

        {/* ══ RIGHT: Info ══ */}
        <div style={{
          flex: "1 1 0",
          minWidth: 0,
          display: "flex",
          flexDirection: "column" as const,
          padding: "22px 26px 20px",
          position: "relative",
          background: "#fff",
        }}>
          {/* Wishlist heart */}
          <button type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}
            style={{
              position: "absolute", top: 18, right: 20,
              background: "none", border: "none", padding: 4,
              cursor: "pointer", lineHeight: 0,
            }}>
            <svg width="22" height="22" viewBox="0 0 24 24"
              fill={inWishlist ? "#00089d" : "none"}
              stroke={inWishlist ? "#00089d" : "#9CA3AF"}
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          {/* 1 ─ Brand name */}
          <h3 className="lcard-name" style={{
            fontFamily: "Marcellus, Georgia, serif",
            fontSize: "21px", fontWeight: 400,
            letterSpacing: "0.1em", textTransform: "uppercase" as const,
            color: "#0c0c1d", margin: "0 40px 6px 0",
            lineHeight: 1.2,
          }}>
            {product.brand}
          </h3>

          {/* 2 ─ Description */}
          <p style={{
            fontSize: "13px", color: "#6B7280",
            margin: "0 0 10px", lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}>
            {product.description}
          </p>

          {/* 3 ─ Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: 0 }}>
            <p style={{
              fontSize: "19px", fontWeight: 700,
              color: "#0c0c1d", margin: "0",
              letterSpacing: "-0.01em",
            }}>
              {formattedPrice}
            </p>
            {formattedOriginalPrice && (
              <p style={{
                fontSize: "15px", fontWeight: 500,
                color: "#9CA3AF", margin: "0",
                textDecoration: "line-through",
              }}>
                {formattedOriginalPrice}
              </p>
            )}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Divider */}
          <div style={{ height: "1px", background: "#F1F3F8", marginBottom: 12 }} />

          {/* 4 ─ Meta + Buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontSize: "11.5px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Ships in 24 hours
            </span>

            <div style={{ display: "flex", gap: 8 }}>
              {/* Quick View */}
              <button type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "7px 14px", fontSize: "12px", fontWeight: 500,
                  fontFamily: "inherit",
                  background: "transparent", border: "1.5px solid #D1D5DB", color: "#374151",
                  borderRadius: "8px", cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                </svg>
                Quick View
              </button>
              {/* Add to Cart */}
              <button type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product.id); router.push("/cart"); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "7px 14px", fontSize: "12px", fontWeight: 600,
                  fontFamily: "inherit",
                  background: "linear-gradient(135deg,#00089d,#0010c4)",
                  border: "none", color: "#fff",
                  borderRadius: "8px", cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 3px 10px rgba(0,8,157,0.28)",
                }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .lcard-img-primary, .lcard-img-hover {
            transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
          }
          article:hover .lcard-img-primary {
            opacity: 0 !important;
            transform: scale(1.05);
          }
          article:hover .lcard-img-hover {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
          .lcard-name {
            transition: color 0.25s ease;
          }
          article:hover .lcard-name {
            color: #00089d !important;
          }
        `}</style>
      </motion.article>
    );
  }

  /* ════════════════════════════════════════
     GRID & CINEMATIC VIEWS
  ════════════════════════════════════════ */
  return (
    <motion.article
      layout
      className={`sp-card sp-card--${layoutMode}`}
      whileHover={{ y: -5, boxShadow: "0 18px 36px rgba(0,8,157,0.08), 0 6px 14px rgba(0,8,157,0.04)" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
    >
      <div className="sp-card-img-wrap">
        {leftBadges.length > 0 && (
          <div className="sp-badges sp-badges--left">
            {leftBadges.map((b, i) => (
              <span key={i} className="sp-badge" style={{ backgroundColor: b.color }}>{b.text}</span>
            ))}
          </div>
        )}
        <div className="sp-card-img">
          <div className="sp-img-layer sp-img-layer--primary">
            <Image src={product.image} alt={product.brand} fill
              style={{ objectFit: "cover" }}
              sizes={layoutMode === "cinematic"
                ? "(max-width:559px) 45vw, 320px"
                : "(max-width:559px) 50vw, (max-width:1023px) 25vw, 280px"}
              priority={index < 8}
            />
          </div>
          <div className="sp-img-layer sp-img-layer--hover">
            <Image src={hoverImage} alt="" fill
              style={{ objectFit: "cover" }}
              sizes={layoutMode === "cinematic"
                ? "(max-width:559px) 45vw, 320px"
                : "(max-width:559px) 50vw, (max-width:1023px) 25vw, 280px"}
            />
          </div>
        </div>
        <div className="sp-card-overlay" />
        <div className="sp-shimmer-effect" />
        <div className="sp-hover-actions">
          <button className="sp-action-btn" type="button" aria-label="Quick view"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <div className="sp-action-divider" />
          <button className="sp-action-btn" type="button"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill={inWishlist ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="sp-card-info">
        <h3 className="sp-card-name">{product.brand}</h3>
        <p className="sp-card-desc">{product.description}</p>
        <div className="sp-card-rating">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} className="sp-star">★</span>)}
        </div>
        <div className="sp-card-price-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <div className="sp-card-price">{formattedPrice}</div>
          {formattedOriginalPrice && (
            <div className="sp-card-original-price" style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '13px' }}>
              {formattedOriginalPrice}
            </div>
          )}
        </div>
        <button className="sp-grid-atc-btn" type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product.id); router.push("/cart"); }}>
          ADD TO CART
        </button>
      </div>

      <style jsx>{`
        @keyframes spStarPop {
          0%,100% { transform:scale(1); }
          50% { transform:scale(1.35); }
        }
        .sp-card {
          width:100%; background:#fff; display:flex; flex-direction:column;
          position:relative; border-radius:12px; overflow:hidden;
          border:1px solid rgba(0,8,157,0.05);
          box-shadow:0 4px 16px rgba(0,8,157,0.02);
          transition:border-color 0.4s ease; cursor:pointer;
          --btn-size:36px; --btn-icon:13px;
        }
        .sp-card:hover { border-color:rgba(0,8,157,0.12); }

        .sp-card-img-wrap {
          position:relative; width:100%; aspect-ratio:360/500;
          background:linear-gradient(165deg,#f8f9fd 0%,#fff 55%,#f3f5fb 100%);
          overflow:hidden;
        }
        .sp-card--cinematic .sp-card-img-wrap { aspect-ratio:4/5; }

        .sp-card-img-wrap::after {
          content:""; position:absolute; inset:0;
          background:linear-gradient(180deg,transparent 75%,rgba(0,8,157,0.015) 100%);
          pointer-events:none; z-index:1;
        }
        .sp-card-img { position:absolute; inset:0; transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .sp-img-layer {
          position:absolute; inset:0;
          transition:opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .sp-img-layer--hover { opacity:0; transform:scale(0.93) rotate(-2deg); }
        .sp-card:hover .sp-card-img { transform:scale(1.03); }
        .sp-card:hover .sp-img-layer--primary { opacity:0; transform:scale(0.95) rotate(2deg); }
        .sp-card:hover .sp-img-layer--hover { opacity:1; transform:scale(1.02) rotate(0deg); }

        .sp-badges { position:absolute; display:flex; flex-direction:column; gap:4px; z-index:6; }
        .sp-badges--left { top:10px; left:10px; }
        .sp-badge {
          font-family:var(--font-inter),"Inter",sans-serif;
          font-weight:600; font-size:8px; letter-spacing:0.06em;
          text-transform:uppercase; color:#fff;
          padding:4px 7px; border-radius:4px;
        }

        .sp-card-overlay {
          position:absolute; inset:0;
          background:linear-gradient(180deg,transparent 55%,rgba(0,0,30,0.06) 100%);
          opacity:0; transition:opacity 0.4s ease; z-index:2; pointer-events:none;
        }
        .sp-card:hover .sp-card-overlay { opacity:1; }

        .sp-shimmer-effect {
          position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%);
          transform:translateX(-100%); z-index:3; pointer-events:none;
        }
        .sp-card:hover .sp-shimmer-effect { transform:translateX(100%); transition:transform 0.7s ease; }

        .sp-hover-actions {
          position:absolute; bottom:14px; left:50%;
          transform:translateX(-50%) translateY(8px);
          display:flex; align-items:center;
          background:var(--poi-btn-bg,rgba(0,8,100,0.92));
          backdrop-filter:blur(8px); border-radius:24px;
          padding:4px; opacity:0; z-index:7;
          transition:opacity 0.3s ease, transform 0.3s ease;
          box-shadow:0 4px 20px rgba(0,8,157,0.2);
        }
        .sp-card:hover .sp-hover-actions { opacity:1; transform:translateX(-50%) translateY(0); }
        .sp-action-btn {
          width:var(--btn-size); height:var(--btn-size);
          border-radius:50%; border:none; background:transparent;
          color:#fff; display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:background 0.2s ease;
        }
        .sp-action-btn svg { width:var(--btn-icon); height:var(--btn-icon); }
        .sp-action-btn:hover { background:rgba(255,255,255,0.15); }
        .sp-action-divider { width:1px; height:calc(var(--btn-size) - 10px); background:rgba(255,255,255,0.2); }

        .sp-card-info {
          width:100%; padding:10px 14px 16px;
          display:flex; flex-direction:column; align-items:flex-start;
          background:#fff; flex-grow:1;
        }
        .sp-card-name {
          font-family:var(--font-marcellus),"Marcellus",serif;
          font-weight:600; font-size:13px; letter-spacing:0.16em;
          text-transform:uppercase; color:#111; margin:0 0 3px;
          transition:color 0.3s ease;
        }
        .sp-card:hover .sp-card-name { color:#00089d; }
        .sp-card-desc {
          font-family:var(--font-inter),"Inter",sans-serif;
          font-size:11px; color:#888; margin:0 0 5px; line-height:1.4;
        }
        .sp-card-rating { display:flex; gap:2px; margin-bottom:5px; }
        .sp-star { color:#FFD700; font-size:10px; }
        .sp-card-price {
          font-family:var(--font-inter),"Inter",sans-serif;
          font-weight:700; font-size:14px; color:#111; margin-bottom:10px;
        }
        .sp-grid-atc-btn {
          width:100%; padding:8px 0;
          font-family:var(--font-inter),"Inter",sans-serif;
          font-weight:600; font-size:9px; letter-spacing:0.12em;
          text-transform:uppercase; color:#fff;
          background:var(--poi-btn-bg,rgba(0,8,100,0.92));
          border:none; cursor:pointer;
          transition:background 0.25s ease, transform 0.2s ease;
        }
        .sp-grid-atc-btn:hover { background:#00089d; transform:translateY(-1px); }
      `}</style>
    </motion.article>
  );
}
