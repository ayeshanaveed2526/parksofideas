"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, A11y } from "swiper/modules";
import { PERFUME_CATALOG, formatPerfumePrice } from "../data/perfumeCatalog";
import { useCart } from "./cart/CartProvider";
import { useWishlist } from "./wishlist/WishlistProvider";
import "swiper/css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  oldPrice?: string;
  image: string;
  rating: number;
  badges: { text: string; color: string }[];
  outOfStock?: boolean;
  isExternal?: boolean;
}

const productsData: Product[] = PERFUME_CATALOG.slice(0, 16).map((perfume) => ({
  id: perfume.id,
  name: perfume.brand,
  description: perfume.description,
  price: formatPerfumePrice(perfume.price),
  oldPrice: perfume.id % 2 === 0 ? formatPerfumePrice(perfume.price + 12) : undefined,
  image: perfume.image,
  rating: 5,
  badges: [
    ...(perfume.id % 2 === 0 ? [{ text: "-11%", color: "#000000" }] : []),
    ...(perfume.id % 3 === 0 ? [{ text: "FEATURED", color: "#00089d" }] : []),
    ...(perfume.id % 5 === 0 ? [{ text: "NEW", color: "#00089d" }] : []),
  ],
}));

export default function NewProducts() {
  const swiperRef = useRef<SwiperType | null>(null);
  const router = useRouter();
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();

  const pauseMarquee = () => swiperRef.current?.autoplay?.stop();
  const resumeMarquee = () => swiperRef.current?.autoplay?.start();

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

  const currentProducts = productsData;

  return (
    <section className="np-section">
      <div className="np-marquee-wrap">
        <Swiper
          modules={[Autoplay, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop
          slidesPerView="auto"
          spaceBetween={16}
          speed={16000}
          allowTouchMove
          grabCursor
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="np-swiper"
        >
          {currentProducts.map((product, idx) => {
            const leftBadges = product.badges.filter((b) => b.text !== "FEATURED");
            const rightBadges = product.badges.filter((b) => b.text === "FEATURED");

            return (
              <SwiperSlide key={product.id}>
                <Link
                  href={`/product/${product.id}`}
                  style={{ display: 'contents', textDecoration: 'none' }}
                >
                  <article
                    className="np-card"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                  {/* Image wrapper */}
                  <div className="np-card-img-wrap">
                    {/* Left Badges */}
                    {leftBadges.length > 0 && (
                      <div className="np-badges-left">
                        {leftBadges.map((b, i) => (
                          <span key={i} className="np-badge" style={{ backgroundColor: b.color }}>
                            {b.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Right Badges */}
                    {rightBadges.length > 0 && (
                      <div className="np-badges-right">
                        {rightBadges.map((b, i) => (
                          <span key={i} className="np-badge" style={{ backgroundColor: b.color }}>
                            {b.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="np-card-img">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 559px) 45vw, (max-width: 1189px) 30vw, 260px"
                      />
                    </div>

                    {/* Hover Overlays */}
                    <div className="np-card-hover-bg" />

                    {/* Center Eye / Heart Action buttons */}
                    <div className="np-hover-actions">
                      <button className="np-action-btn" type="button" aria-label="Quick View" onClick={(e) => handleQuickView(e, product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="np-action-btn" type="button" aria-label="Add to Wishlist" onClick={(e) => handleWishlist(e, product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom Add to Cart Button */}
                    <button className="np-atc-btn" type="button" onClick={(e) => handleAddToCart(e, product.id)}>
                      ADD TO CART
                    </button>
                  </div>

                  {/* Description Box */}
                  <div className="np-card-info">
                    <h3 className="np-card-name">{product.name}</h3>
                    <p className="np-card-desc">{product.description}</p>
                    
                    {/* Star Rating */}
                    <div className="np-card-rating">
                      {Array.from({ length: product.rating }).map((_, i) => (
                        <span key={i} className="np-star">★</span>
                      ))}
                    </div>

                    {/* Prices */}
                    <div className="np-card-prices">
                      {product.oldPrice && (
                        <span className="np-price-old">{product.oldPrice}</span>
                      )}
                      <span className="np-price-current">{product.price}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

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

        /* ── Section ── */
        .np-section {
          width: 100%;
          background: linear-gradient(180deg, #f0f2f8 0%, #f5f7fc 50%, #eef1f8 100%);
          padding: 50px 0 60px;
          font-family: var(--font-inter), "Inter", sans-serif;
          overflow: hidden;
        }

        .np-marquee-wrap {
          width: 100%;
          overflow: hidden;
        }

        .np-swiper {
          width: 100%;
          overflow: visible;
          padding: 8px 0 12px;
        }

        :global(.np-swiper .swiper-slide) {
          height: auto;
          box-sizing: border-box;
          width: min(300px, 82vw);
        }

        :global(.np-swiper .swiper-wrapper) {
          align-items: stretch;
          transition-timing-function: linear !important;
        }

        @media (min-width: 640px) {
          :global(.np-swiper .swiper-slide) {
            width: 280px;
          }
        }

        @media (min-width: 1024px) {
          :global(.np-swiper .swiper-slide) {
            width: 300px;
          }
        }

        @media (min-width: 1400px) {
          :global(.np-swiper .swiper-slide) {
            width: 320px;
          }
        }

        /* Card */
        .np-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          box-sizing: border-box;
          border: 1px solid rgba(0, 8, 157, 0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 8, 157, 0.04);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.45s ease;
          animation: cardFadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;

          --btn-size: 42px;
          --btn-icon: 16px;
          --atc-h: 42px;
          --atc-fs: 11px;
          --np-blue: #00089d;
        }

        .np-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 8, 157, 0.22);
          box-shadow:
            0 24px 48px rgba(0, 8, 157, 0.22),
            0 12px 24px rgba(0, 8, 157, 0.12),
            0 0 0 1px rgba(0, 8, 157, 0.06);
        }

        /* Image area */
        .np-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 360 / 280;
          background: linear-gradient(165deg, #f8f9fd 0%, #ffffff 55%, #f3f5fb 100%);
          overflow: hidden;
        }

        .np-card-img-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 70%, rgba(0, 8, 157, 0.03) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .np-card-img {
          position: absolute;
          inset: 16px;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .np-card:hover .np-card-img {
          transform: scale(1.08);
        }

        /* Badges */
        .np-badges-left {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .np-badges-right {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 6;
        }

        .np-badge {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 9px;
          line-height: 1;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        /* Hover Overlay Bg */
        .np-card-hover-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 8, 157, 0.06) 100%);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.45s ease, visibility 0.45s ease;
          z-index: 4;
        }

        .np-card:hover .np-card-hover-bg {
          opacity: 1;
          visibility: visible;
        }

        /* Center Eye / Heart Action buttons */
        .np-hover-actions {
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

        .np-card:hover .np-hover-actions {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%);
        }

        .np-action-btn {
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

        .np-action-btn svg {
          width: var(--btn-icon);
          height: var(--btn-icon);
        }

        .np-action-btn:hover {
          background: var(--poi-btn-bg-hover);
          color: #ffffff;
          transform: scale(1.05);
          box-shadow: var(--poi-btn-shadow-hover);
        }

        /* Add to cart button */
        .np-atc-btn {
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
          color: #ffffff;
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

        .np-card:hover .np-atc-btn {
          transform: translateY(0);
          opacity: 1;
        }

        .np-atc-btn:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
        }

        /* Description Box */
        .np-card-info {
          width: 100%;
          box-sizing: border-box;
          padding: 24px 16px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          background: linear-gradient(180deg, #ffffff 0%, #fafbfd 100%);
          text-align: left;
          min-height: 180px;
          position: relative;
        }

        .np-card-info::before {
          content: "";
          position: absolute;
          top: 0;
          left: 16px;
          transform: none;
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, rgba(0, 8, 157, 0.35), transparent);
          border-radius: 1px;
        }

        .np-card-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.26;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #111111;
          margin: 0 0 8px;
          padding-left: 0;
          text-align: left;
          width: 100%;
          transition: color 0.35s ease, letter-spacing 0.35s ease;
        }

        .np-card:hover .np-card-name {
          color: #00089d;
          letter-spacing: 0.22em;
        }

        .np-card-desc {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.5;
          color: rgb(130, 130, 130);
          margin: 0 0 12px;
          max-width: 90%;
          transition: color 0.3s ease;
        }

        .np-card:hover .np-card-desc {
          color: rgb(97, 97, 97);
        }

        /* Rating Stars */
        .np-card-rating {
          display: flex;
          gap: 3px;
          margin-bottom: 12px;
        }

        .np-star {
          color: #FFD700;
          font-size: 14px;
          transition: transform 0.3s ease;
        }

        .np-card:hover .np-star {
          animation: starPop 0.4s ease both;
        }

        .np-card:hover .np-star:nth-child(1) { animation-delay: 0s; }
        .np-card:hover .np-star:nth-child(2) { animation-delay: 0.05s; }
        .np-card:hover .np-star:nth-child(3) { animation-delay: 0.1s; }
        .np-card:hover .np-star:nth-child(4) { animation-delay: 0.15s; }
        .np-card:hover .np-star:nth-child(5) { animation-delay: 0.2s; }

        @keyframes starPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }

        /* Prices */
        .np-card-prices {
          margin-top: auto;
          display: flex;
          gap: 10px;
          align-items: center;
          align-self: flex-end;
          transition: transform 0.35s ease;
        }

        .np-card:hover .np-card-prices {
          transform: scale(1.05);
        }

        .np-price-old {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: rgb(160, 160, 160);
          text-decoration: line-through;
        }

        .np-price-current {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 13px;
          color: #000000;
          letter-spacing: 0.01em;
        }

        @media (max-width: 639px) {
          .np-section {
            padding: 40px 0 50px;
          }
        }

        /* ── Responsive: sm ── */
        @media (min-width: 640px) {
          .np-section {
            padding: 65px 0 75px;
          }

          .np-card {
            --btn-size: 48px;
            --btn-icon: 18px;
            --atc-h: 48px;
            --atc-fs: 12px;
          }

          .np-card-img {
            inset: 20px;
          }

          .np-card-info {
            padding: 32px 20px 28px;
            min-height: 210px;
          }

          .np-card-name {
            font-size: 19px;
            letter-spacing: 0.2em;
          }

          .np-card-desc {
            font-size: 13px;
          }

          .np-star {
            font-size: 15px;
          }

          .np-price-current {
            font-size: 16px;
          }

          .np-badge {
            font-size: 10px;
            padding: 5px 10px;
          }

          .np-badges-left {
            top: 15px;
            left: 15px;
            gap: 6px;
          }

          .np-badges-right {
            top: 15px;
            right: 15px;
            gap: 6px;
          }
        }

        /* ── Responsive: desktop ── */
        @media (min-width: 1180px) {
          .np-section {
            padding: 85px 0 95px;
          }

          .np-card {
            --btn-size: 52px;
            --btn-icon: 20px;
            --atc-h: 54px;
            --atc-fs: 13px;
          }

          .np-card-img-wrap {
            aspect-ratio: 360 / 318;
          }

          .np-card-img {
            inset: 24px;
          }

          .np-card-info {
            padding: 40px 24px 35px;
            min-height: 255px;
          }

          .np-card-name {
            font-size: 22px;
            letter-spacing: 0.22em;
            margin: 0 0 12px;
          }

          .np-card-desc {
            font-size: 13px;
            line-height: 1.6;
            margin: 0 0 15px;
          }

          .np-card-rating {
            gap: 4px;
            margin-bottom: 20px;
          }

          .np-star {
            font-size: 16px;
          }

          .np-price-old {
            font-size: 15px;
          }

          .np-price-current {
            font-size: 17px;
          }

          .np-badge {
            font-size: 10px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </section>
  );
}
