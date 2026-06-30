"use client";

import React from "react";

export default function FBottomBar() {
  const promotionalBanners = [
    {
      id: 1,
      image: "/images/banner-golden.png",
      subtitle: "SIGNATURE",
      title: "GOLDEN OUD",
      link: "#",
      theme: "light", // dark text on golden bg
    },
    {
      id: 2,
      image: "/images/banner-blue.png",
      subtitle: "FRESH AQUATIC",
      title: "AZURE BLUE",
      link: "#",
      theme: "dark", // white text on deep blue bg
    },
    {
      id: 3,
      image: "/images/banner-gray.png",
      subtitle: "NEW ARRIVAL",
      title: "SILVER MUSK",
      link: "#",
      theme: "light", // dark text on light gray bg
    },
  ];

  // Duplicate the set so the marquee can loop seamlessly (-50%).
  const loopBanners = [...promotionalBanners, ...promotionalBanners];

  return (
    <section className="fb-section">
      <div className="fb-marquee">
        <div className="fb-track">
          {loopBanners.map((banner, index) => (
            <div key={`${banner.id}-${index}`} className="fb-banner-box">
              <img
                src={banner.image}
                alt={banner.title}
                className="fb-banner-img"
              />
              <div className={`fb-banner-overlay ${banner.theme === "dark" ? "fb-overlay-dark" : "fb-overlay-light"}`} />

              <div className={`fb-banner-content ${banner.theme === "dark" ? "fb-content-light" : "fb-content-dark"}`}>
                <span className="fb-banner-subtitle">{banner.subtitle}</span>
                <h3 className="fb-banner-title">{banner.title}</h3>
                <a href={banner.link} className="fb-banner-btn">
                  EXPLORE
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .fb-section {
          width: 100%;
          background-color: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
        }

        .fb-marquee {
          width: 100%;
          overflow: hidden;
        }

        .fb-track {
          display: flex;
          width: max-content;
          animation: fbScroll 28s linear infinite;
          will-change: transform;
        }

        .fb-track:hover {
          animation-play-state: paused;
        }

        @keyframes fbScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ── Banner box (3 per frame on desktop) ── */
        .fb-banner-box {
          position: relative;
          flex: 0 0 80vw;
          width: 80vw;
          height: 240px;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .fb-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fb-banner-box:hover .fb-banner-img {
          transform: scale(1.05);
        }

        .fb-banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .fb-overlay-dark {
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.12) 45%, transparent 70%);
        }

        .fb-overlay-light {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 70%);
        }

        .fb-banner-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 20px 28px;
          max-width: 80%;
        }

        .fb-banner-subtitle {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 13px;
          line-height: 1;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .fb-banner-title {
          font-family: var(--font-inter), "Inter", sans-serif !important;
          font-weight: 200 !important;
          font-size: 26px !important;
          line-height: 1.185 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          margin: 0 0 18px;
          white-space: nowrap;
        }

        .fb-banner-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          width: 120px;
          height: 42px;
          padding: 0;
          text-align: center;
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-indent: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          background: var(--poi-btn-bg);
          color: #ffffff;
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          transition: var(--poi-btn-transition);
          box-sizing: border-box;
        }

        .fb-banner-btn:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
          color: #ffffff;
          transform: translateY(-3px);
        }

        /* ── Dark theme (white text) ── */
        .fb-content-light .fb-banner-subtitle {
          color: #ffffff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        .fb-content-light .fb-banner-title {
          color: #ffffff;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
        }

        /* ── Light theme (dark text) ── */
        .fb-content-dark .fb-banner-subtitle {
          color: #1a1a1a;
        }
        .fb-content-dark .fb-banner-title {
          color: #1a1a1a;
        }

        /* ── Responsive: tablet (2 per frame) ── */
        @media (min-width: 640px) {
          .fb-banner-box {
            flex-basis: 50vw;
            width: 50vw;
            height: 280px;
          }
          .fb-banner-content {
            padding: 20px 36px;
          }
          .fb-banner-subtitle {
            font-size: 14px;
          }
          .fb-banner-title {
            font-size: 30px !important;
          }
        }

        /* ── Responsive: desktop (3 per frame) ── */
        @media (min-width: 992px) {
          .fb-banner-box {
            flex-basis: 33.3333vw;
            width: 33.3333vw;
            height: 300px;
          }
          .fb-banner-content {
            padding: 20px 50px;
            max-width: 70%;
          }
          .fb-banner-subtitle {
            font-size: 16px;
            letter-spacing: 0.35em;
            margin: 0 0 12px;
          }
          .fb-banner-title {
            font-size: 38px !important;
            margin: 0 0 24px;
          }
          .fb-banner-btn {
            width: 141px;
            height: 50px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
