"use client";

import React from "react";

export default function FBottomBar() {
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

  const promotionalBanners = [
    {
      id: 1,
      image: "/images/luchiana-1246111656.jpg",
      subtitle: "COLLECTION",
      title: "MY ROSES",
      link: "#",
      lightTheme: false,
    },

    {
      id: 2,
      image: "/images/luchiana-1246799511.jpg",
      subtitle: "HAIR HEALTH",
      title: "15% OFF",
      link: "#",
      lightTheme: true,
    },
    {
      id: 3,
      image: "/images/luchiana-1246137549.jpg",
      subtitle: "BODY SHOWERS",
      title: "20% OFF",
      link: "#",
      lightTheme: false,
    },
  ];

  return (
    <section className="fb-section">
      {/* ── Upper Ticker Bar (1521px * 80px) ── */}
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
      </div>

      {/* ── Lower Promotional Bar (3 Banners) ── */}
      <div className="fb-banners-grid">
        {promotionalBanners.map((banner) => (
          <div
            key={banner.id}
            className="fb-banner-box"
            style={{
              backgroundImage: `url('${banner.image}')`,
              height: '290px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Overlay to ensure readability */}
            <div className={`fb-banner-overlay ${banner.lightTheme ? "fb-overlay-dark" : "fb-overlay-light"}`} />

            {/* Content */}
            <div className={`fb-banner-content ${banner.lightTheme ? "fb-content-light" : "fb-content-dark"}`}>
              <span className="fb-banner-subtitle">{banner.subtitle}</span>
              <h3 className="fb-banner-title">{banner.title}</h3>

              <a href={banner.link} className="fb-banner-btn">
                EXPLORE
              </a>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .fb-section {
          width: 100%;
          background-color: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* ── Ticker Bar ── */
        .fb-ticker-bar {
          width: 100%;
          max-width: 1521px;
          height: 80px;
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
          font-size: 16px;
          line-height: 80px;
          color: #1a1a1a;
          text-transform: uppercase;
        }

        .fb-ticker-separator {
          margin: 0 20px;
          color: #1a1a1a;
          font-size: 12px;
          line-height: 80px;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ── Banners Grid ── */
        .fb-banners-grid {
          width: 100%;
          max-width: 1521px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          box-sizing: border-box;
        }

        .fb-banner-box {
          position: relative;
          height: 290px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
          box-sizing: border-box;
        }

        .fb-banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          transition: opacity 0.3s ease;
          opacity: 0.05;
        }

        .fb-overlay-dark {
          background-color: #000000;
          opacity: 0.15; /* slightly darker to make white text pop on blonde background */
        }

        .fb-overlay-light {
          background-color: #ffffff;
          opacity: 0.05;
        }

        .fb-banner-box:hover .fb-banner-overlay {
          opacity: 0.25;
        }

        .fb-banner-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 20px 45px;
          max-width: 60%;
        }

        .fb-banner-subtitle {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin: 0 0 11px;
        }

        .fb-banner-title {
          font-family: var(--font-inter), "Inter", sans-serif !important;
          font-weight: 200 !important;
          font-size: 38px !important;
          line-height: 1.185 !important;
          letter-spacing: .14em !important;
          text-transform: uppercase !important;
          margin: 0 0 25px;
          white-space: nowrap;
        }

        .fb-banner-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          width: 141px;
          height: 50px;
          padding: 0;
          text-align: center;
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 0.22em;
          text-indent: 0.22em; /* shifts text slightly to align properly with letter-spacing */
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        /* ── Dark Theme Content (Roses, Body Showers) ── */
        .fb-content-dark .fb-banner-subtitle {
          color: #1a1a1a;
        }

        .fb-content-dark .fb-banner-title {
          color: #1a1a1a;
        }

        .fb-content-dark .fb-banner-btn {
          border: 1px solid #1a1a1a;
          color: #1a1a1a;
        }

        .fb-content-dark .fb-banner-btn:hover {
          background-color: #1a1a1a;
          color: #ffffff;
          border-color: #1a1a1a;
        }

        /* ── Light Theme Content (Blonde Hair Health) ── */
        .fb-content-light .fb-banner-subtitle {
          color: #ffffff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .fb-content-light .fb-banner-title {
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .fb-content-light .fb-banner-btn {
          border: 1px solid #ffffff;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          box-shadow: inset 0 0 0 0 #ffffff;
        }

        .fb-content-light .fb-banner-btn:hover {
          background-color: #ffffff;
          color: #1a1a1a;
          border-color: #ffffff;
          text-shadow: none;
        }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .fb-banners-grid {
            grid-template-columns: 1fr;
          }
          
          .fb-banner-box {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .fb-ticker-item {
            font-size: 11px;
          }
          .fb-ticker-separator {
            margin: 0 25px;
          }
          .fb-banner-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
}
