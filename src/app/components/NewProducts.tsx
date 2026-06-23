"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

const productsData: Product[] = [
  {
    id: 13,
    name: "AIRBRUSH MATTE",
    description: "Skin-perfecting bronzed filter for the face.",
    price: "$40.00",
    oldPrice: "$45.00",
    image: "/images/luchiana-3022279061.webp",
    rating: 5,
    badges: [
      { text: "-11%", color: "#000000" },
      { text: "FEATURED", color: "#e4c1b1" },
    ],
  },
  {
    id: 14,
    name: "EYELINER PACK",
    description: "A hyper-saturated, water-resistant, liquid eyeliner.",
    price: "$40.00 – $80.00",
    image: "/images/new_eyeliner.webp",
    rating: 5,
    badges: [
      { text: "-11%", color: "#000000" },
      { text: "FEATURED", color: "#e4c1b1" },
    ],
  },
  {
    id: 15,
    name: "FACE & BODY FOUNDATION",
    description: "A foundation for the face and body.",
    price: "$40.00",
    oldPrice: "$45.00",
    image: "/images/new_dior_foundation.webp",
    rating: 5,
    badges: [
      { text: "-11%", color: "#000000" },
    ],
  },
  {
    id: 16,
    name: "VELVET LIPSTICK",
    description: "Luxurious velvet matte lipstick with rich pigment.",
    price: "$25.00",
    oldPrice: "$30.00",
    image: "/images/luchiana-0654102558.webp",
    rating: 5,
    badges: [
      { text: "-11%", color: "#000000" },
    ],
  },
  {
    id: 17,
    name: "HYDRATING SERUM",
    description: "Deeply hydrates and replenishes the skin barrier.",
    price: "$55.00",
    image: "/images/luchiana-0654733209.webp",
    rating: 5,
    badges: [
      { text: "NEW", color: "#000000" },
    ],
  },
  {
    id: 18,
    name: "FRAGRANCE ESSENCE",
    description: "A sophisticated floral scent with warm vanilla notes.",
    price: "$75.00",
    image: "/images/luchiana-0654439537.webp",
    rating: 5,
    badges: [
      { text: "FEATURED", color: "#e4c1b1" },
    ],
  },
];

export default function NewProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(360);
  const [gap, setGap] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setVisibleCount(1);
        setCardWidth(w - 48);
        setGap(16);
      } else if (w < 640) {
        setVisibleCount(1);
        setCardWidth(Math.min(360, w - 80));
        setGap(20);
      } else if (w < 900) {
        setVisibleCount(2);
        setCardWidth(Math.min(320, (w - 120) / 2));
        setGap(20);
      } else if (w < 1180) {
        setVisibleCount(2);
        setCardWidth(360);
        setGap(30);
      } else if (w < 1600) {
        setVisibleCount(3);
        setCardWidth(360);
        setGap(30);
      } else if (w < 2000) {
        setVisibleCount(4);
        setCardWidth(360);
        setGap(30);
      } else {
        setVisibleCount(5);
        setCardWidth(360);
        setGap(30);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, productsData.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const translateX = currentIndex * (cardWidth + gap);

  // Calculates viewport width dynamically based on visible cards
  const viewportWidth = visibleCount * cardWidth + (visibleCount - 1) * gap;

  return (
    <section className="np-section">
      {/* <h2 className="np-title">NEW PRODUCTS</h2> */}
      
      <div className="np-slider-container">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev} 
          className="np-arrow np-arrow-left" 
          type="button" 
          aria-label="Previous products"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Viewport */}
        <div className="np-viewport" style={{ maxWidth: `${viewportWidth}px` }}>
          <div 
            className="np-track" 
            style={{ 
              transform: `translateX(-${translateX}px)`,
              gap: `${gap}px`
            }}
          >
            {productsData.map((product) => {
              const leftBadges = product.badges.filter((b) => b.text !== "FEATURED");
              const rightBadges = product.badges.filter((b) => b.text === "FEATURED");

              return (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id} 
                  style={{ display: 'contents', textDecoration: 'none' }}
                >
                  <article 
                    className="np-card" 
                    style={{ width: `${cardWidth}px`, flex: `0 0 ${cardWidth}px` }}
                  >
                  {/* Image wrapper */}
                  <div className="np-card-img-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
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
                        sizes="360px"
                      />
                    </div>

                    {/* Hover Overlays */}
                    <div className="np-card-hover-bg" />

                    {/* Center Eye / Heart Action buttons */}
                    <div className="np-hover-actions">
                      <button className="np-action-btn" type="button" aria-label="Quick View">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <div className="np-action-divider" />
                      <button className="np-action-btn" type="button" aria-label="Add to Wishlist">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom Add to Cart Button */}
                    <button className="np-atc-btn" type="button">
                      + ADD TO CART
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
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext} 
          className="np-arrow np-arrow-right" 
          type="button" 
          aria-label="Next products"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .np-section {
          width: 100%;
          background-color: #f3f3f3;
          padding: 50px 0 60px;
          font-family: var(--font-inter), "Inter", sans-serif;
          overflow: hidden;
        }

        .np-title {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 1.28;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #000;
          text-align: center;
          margin: 0 0 30px;
          padding-left: 0.25em;
        }

        .np-slider-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        /* Viewport */
        .np-viewport {
          width: 100%;
          overflow: hidden;
        }

        /* Sliding Track */
        .np-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Arrows */
        .np-arrow {
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(26, 26, 26, 0.5);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          z-index: 30;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .np-arrow:hover {
          background-color: rgba(26, 26, 26, 0.9);
          transform: translateY(-50%) scale(1.05);
        }

        .np-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .np-arrow-left {
          left: 4px;
        }

        .np-arrow-right {
          right: 4px;
        }

        /* Card */
        .np-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          box-sizing: border-box;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;

          --btn-size: 42px;
          --btn-icon: 16px;
          --atc-h: 42px;
          --atc-fs: 11px;
        }

        .np-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        /* Image area */
        .np-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 360 / 280;
          background: #ffffff;
          overflow: hidden;
          border-bottom: 1px solid #f2f2f2;
        }

        .np-card-img {
          position: absolute;
          inset: 16px;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
        }

        /* Hover Overlay Bg */
        .np-card-hover-bg {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease;
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
          transform: translate(-50%, -50%);
          display: flex;
          background: #ffffff;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          overflow: hidden;
          z-index: 5;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          width: calc(var(--btn-size) * 2 + 1px);
          height: var(--btn-size);
          box-sizing: border-box;
        }

        .np-card:hover .np-hover-actions {
          opacity: 1;
          visibility: visible;
        }

        .np-action-btn {
          width: var(--btn-size);
          height: calc(var(--btn-size) - 2px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: none;
          color: #000000;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
          padding: 0;
        }

        .np-action-btn svg {
          width: var(--btn-icon);
          height: var(--btn-icon);
        }

        .np-action-btn:hover {
          background: #000000;
          color: #ffffff;
        }

        .np-action-divider {
          width: 1px;
          height: calc(var(--btn-size) - 2px);
          background: #000000;
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
          background: #000000;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease,
            background-color 0.2s linear, color 0.2s linear;
          z-index: 5;
          padding: 0 10px;
        }

        .np-card:hover .np-atc-btn {
          transform: translateY(0);
          opacity: 1;
        }

        .np-atc-btn:hover {
          background: #333333;
          color: #ffffff;
        }

        /* Description Box */
        .np-card-info {
          width: 100%;
          box-sizing: border-box;
          padding: 24px 16px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: #ffffff;
          text-align: center;
          min-height: 180px;
        }

        .np-card-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.26;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #000000;
          margin: 0 0 8px;
          padding-left: 0.18em;
          transition: color 0.15s linear;
        }

        .np-card:hover .np-card-name {
          color: rgb(205, 174, 159);
        }

        .np-card-desc {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.5;
          color: rgb(97, 97, 97);
          margin: 0 0 12px;
          max-width: 90%;
        }

        /* Rating Stars */
        .np-card-rating {
          display: flex;
          gap: 3px;
          margin-bottom: 12px;
        }

        .np-star {
          color: #e4c1b1;
          font-size: 14px;
        }

        /* Prices */
        .np-card-prices {
          margin-top: auto;
          display: flex;
          gap: 10px;
          align-items: center;
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
          font-size: 15px;
          color: #000000;
          letter-spacing: 0.02em;
        }

        /* ── Responsive: sm ── */
        @media (min-width: 640px) {
          .np-section {
            padding: 65px 0 75px;
          }

          .np-title {
            font-size: 30px;
            margin-bottom: 38px;
          }

          .np-slider-container {
            padding: 0 60px;
          }

          .np-arrow {
            width: 50px;
            height: 50px;
          }

          .np-arrow-left {
            left: 8px;
          }

          .np-arrow-right {
            right: 8px;
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

          .np-title {
            font-size: 36px;
            margin-bottom: 48px;
          }

          .np-slider-container {
            padding: 0 80px;
          }

          .np-arrow {
            width: 58px;
            height: 58px;
            top: calc(318px / 2);
          }

          .np-arrow-left {
            left: 10px;
          }

          .np-arrow-right {
            right: 10px;
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
