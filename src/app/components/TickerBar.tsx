"use client";

import React from "react";

export default function TickerBar() {
  const tickerItems = [
    "ALL PRODUCTS IS ECO",
    "FREE SHIPPING",
    "24/7 SUPPORT",
    "MONEY BACK WARRANTY",
  ];

  // Repeat items to ensure seamless marquee scrolling
  const repeatedItems = [
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
  ];

  return (
    <div className="fb-ticker-bar">
      <div className="fb-marquee">
        <div className="fb-marquee-track">
          {repeatedItems.map((item, index) => (
            <React.Fragment key={index}>
              <span className="fb-ticker-item">{item}</span>
              <span className="fb-ticker-separator">♦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Ticker Bar ── */
        .fb-ticker-bar {
          width: 100%;
          height: 50px;
          margin: 0 auto;
          background-color: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .fb-marquee {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          display: flex;
        }

        .fb-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .fb-marquee-track:hover {
          animation-play-state: paused;
        }

        .fb-ticker-item {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 50px;
          color: #0a0a0a;
          text-transform: uppercase;
          transition: color 0.3s ease, letter-spacing 0.3s ease;
          cursor: default;
        }

        .fb-ticker-item:hover {
          color: #c8a14b;
          letter-spacing: 0.05em;
        }

        .fb-ticker-separator {
          margin: 0 14px;
          color: rgba(10, 10, 10, 0.35);
          font-size: 9px;
          line-height: 50px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ── Responsive: tablet ── */
        @media (min-width: 640px) {
          .fb-ticker-bar {
            height: 50px;
          }
          .fb-ticker-item {
            font-size: 14px;
            line-height: 50px;
          }
          .fb-ticker-separator {
            margin: 0 18px;
            font-size: 10px;
            line-height: 50px;
          }
        }

        /* ── Responsive: desktop ── */
        @media (min-width: 992px) {
          .fb-ticker-bar {
            height: 50px;
          }
          .fb-ticker-item {
            font-size: 16px;
            line-height: 50px;
          }
          .fb-ticker-separator {
            margin: 0 20px;
            font-size: 12px;
            line-height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
