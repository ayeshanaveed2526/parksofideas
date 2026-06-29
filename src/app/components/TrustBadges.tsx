"use client";

import React from "react";
import { ShieldCheck, Truck, RefreshCw, Heart } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Secure Payment", sub: "SSL Protected" },
  { icon: Truck, label: "Free Shipping", sub: "Orders Rs.2000+" },
  { icon: RefreshCw, label: "Easy Returns", sub: "7 Days" },
  { icon: Heart, label: "Loved by 50K+", sub: "Happy Customers" },
];

export default function TrustBadges() {
  return (
    <section className="tb-section">
      <div className="tb-bg" aria-hidden="true" />
      <div className="tb-grid">
        {badges.map(({ icon: Icon, label, sub }, idx) => (
          <div
            key={label}
            className="tb-item"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            <div className="tb-icon-wrap">
              <span className="tb-icon-ring" />
              <Icon className="tb-icon" strokeWidth={1.75} />
            </div>
            <div className="tb-text">
              <h4 className="tb-label">{label}</h4>
              <p className="tb-sub">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .tb-section {
          position: relative;
          width: 100%;
          padding: 60px 20px;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Beautiful bluish-gray background */
        .tb-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 15% 20%, rgba(99, 122, 158, 0.18), transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(70, 90, 130, 0.16), transparent 45%),
            linear-gradient(135deg, #eef1f6 0%, #dfe4ee 45%, #e7ebf3 100%);
        }

        .tb-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(90, 110, 150, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(90, 110, 150, 0.05) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 35%, transparent 80%);
        }

        .tb-grid {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 16px;
        }

        .tb-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          text-align: center;
          padding: 14px 10px;
          border-radius: 16px;
          cursor: default;
          opacity: 0;
          transform: translateY(22px);
          animation: tbFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.4s ease, box-shadow 0.4s ease;
        }

        .tb-item:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.55);
          box-shadow: 0 18px 40px rgba(54, 74, 110, 0.14);
        }

        @keyframes tbFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Icon */
        .tb-icon-wrap {
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(145deg, #5b6b89 0%, #3f4d6b 100%);
          box-shadow: 0 10px 24px rgba(54, 74, 110, 0.28),
                      inset 0 1px 1px rgba(255, 255, 255, 0.25);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.45s ease;
        }

        .tb-item:hover .tb-icon-wrap {
          transform: scale(1.08) rotate(-4deg);
          box-shadow: 0 16px 32px rgba(54, 74, 110, 0.4),
                      inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .tb-icon {
          width: 26px;
          height: 26px;
          color: #ffffff;
          z-index: 1;
        }

        /* Pulsing ring on hover */
        .tb-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(91, 107, 137, 0.5);
          opacity: 0;
          transform: scale(1);
        }

        .tb-item:hover .tb-icon-ring {
          animation: tbRing 1.1s ease-out infinite;
        }

        @keyframes tbRing {
          0% {
            opacity: 0.7;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        /* Text */
        .tb-label {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: #2c3650;
          margin: 0 0 4px;
          transition: color 0.3s ease;
        }

        .tb-item:hover .tb-label {
          color: #3f4d6b;
        }

        .tb-sub {
          font-family: var(--font-inter), "Inter", sans-serif;
          font-weight: 400;
          font-size: 12.5px;
          letter-spacing: 0.04em;
          color: #7c869c;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (min-width: 640px) {
          .tb-section {
            padding: 70px 24px;
          }
          .tb-grid {
            gap: 30px;
          }
          .tb-icon-wrap {
            width: 68px;
            height: 68px;
          }
        }

        @media (min-width: 992px) {
          .tb-section {
            padding: 80px 40px;
          }
          .tb-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
          .tb-item {
            flex-direction: column;
            padding: 20px 14px;
          }
          .tb-label {
            font-size: 16px;
          }
          .tb-sub {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}
