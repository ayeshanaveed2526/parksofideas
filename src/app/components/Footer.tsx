"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-bg-pattern" />

      <div className="footer-content">
        {/* TOP ROW */}
        <div className="footer-top">
          <nav className="footer-nav">
            <a href="#" className="footer-nav-link">ABOUT US</a>
            <span className="footer-dot">·</span>
            <a href="#" className="footer-nav-link">OUR TEAM</a>
            <span className="footer-dot">·</span>
            <a href="#" className="footer-nav-link">FAQ</a>
            <span className="footer-dot">·</span>
            <a href="#" className="footer-nav-link">MAINTENANCE MODE</a>
            <span className="footer-dot">·</span>
            <a href="#" className="footer-nav-link">CONTACT</a>
          </nav>
        </div>

        {/* MIDDLE ROW */}
        <div className="footer-middle">
          {/* Left Column: Contact Info */}
          <div className="footer-col footer-col-left">
            <ul className="footer-contact-list">
              <li>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+123 488 9652</span>
              </li>
              <li>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>25 West 21th Street, Miami FL, USA</span>
              </li>
              <li>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>info@luchiana.com</span>
              </li>
              <li>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon-Fri: 10:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Center Column: SVG Logo and Socials */}
          <div className="footer-col footer-col-center">
            <div className="footer-logo">
              <svg width="205" height="18" xmlns="http://www.w3.org/2000/svg">
                <g fill="#000" fillRule="evenodd">
                  <path d="M62.01 0c-2.26 0-4.215.872-5.603 2.447-1.388 1.573-2.204 3.84-2.204 6.624 0 2.783.816 5.05 2.204 6.624 1.388 1.574 3.343 2.446 5.604 2.446 3.556 0 6.465-2.144 7.123-5.777l.02-.108h-2.302l-.016.073c-.5 2.372-2.538 3.648-4.825 3.648-1.563 0-2.953-.604-3.955-1.765-1.002-1.161-1.62-2.888-1.62-5.141 0-2.254.618-3.98 1.62-5.142 1.002-1.16 2.392-1.765 3.955-1.765 2.287 0 4.324 1.276 4.825 3.648l.016.073h2.301l-.02-.108C68.478 2.144 65.568 0 62.012 0zM2.3.239H0v17.663h10.426V15.84H2.3zM27.596.239h-2.3v11.665c0 1.816.679 3.395 1.883 4.518 1.204 1.124 2.926 1.787 5.002 1.787 2.077 0 3.799-.663 5.003-1.787 1.204-1.123 1.883-2.702 1.883-4.518V.24h-2.301v11.494c0 1.259-.432 2.335-1.216 3.096-.784.762-1.93 1.216-3.369 1.216-1.44 0-2.584-.454-3.369-1.216-.784-.761-1.216-1.837-1.216-3.096V.24zM117.531.239h-2.301v17.663h2.301z" fillRule="nonzero" />
                  <path d="M140.624.239h-2.313l-6.486 17.663h2.416l1.758-4.95h6.937l1.758 4.95h2.416L140.624.24zM136.73 10.89l2.734-7.702h.007l2.734 7.702h-5.475z" />
                  <path fillRule="nonzero" d="M163.573.239h-2.188v17.663h2.301V4.18h.03l9.525 13.723h2.188V.24h-2.266v13.758h-.031z" />
                  <path d="M198.514.239h-2.313l-6.486 17.663h2.416l1.758-4.95h6.937l1.758 4.95H205L198.514.24zM194.62 10.89l2.734-7.702h.007l2.734 7.702h-5.475z" />
                  <path fillRule="nonzero" d="M87.376.241h-2.3v17.663h2.3v-7.8h9.443v7.8h2.301V.241h-2.3v7.8h-9.444z" />
                </g>
              </svg>
            </div>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Description */}
          <div className="footer-col footer-col-right">
            <p className="footer-desc">
              Our formulas are made with natural, organic, and cruelty-free ingredients that are gentle, effective, and good for you and the environment.
            </p>
            <a href="#" className="footer-readmore">READ MORE</a>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2020 LUCHIANA Theme. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">PRIVACY POLICY</a>
            <span className="footer-legal-dot">·</span>
            <a href="#" className="footer-legal-link">TERMS</a>
            <span className="footer-legal-dot">·</span>
            <a href="#" className="footer-legal-link">FAQ</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          position: relative;
          width: 100%;
          max-width: 1521px;
          height: auto;
          min-height: 382px;
          margin: 0 auto;
          background-color: #ffffff;
          overflow: hidden;
          font-family: var(--font-inter), "Inter", sans-serif;
          box-sizing: border-box;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        /* Isometric Diamond Background Pattern with Peach Gradient */
        .footer-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background-color: #ffffff;
          background-image: 
            radial-gradient(100% 150% at top center, rgba(250, 232, 226, 0.9) 0%, rgba(255, 255, 255, 0) 50%),
            linear-gradient(135deg, transparent 49%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 51%), 
            linear-gradient(45deg, transparent 49%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 51%);
          background-size: 100% 100%, 140px 140px, 140px 140px;
          background-position: top center, 0 0, 0 0;
          background-repeat: no-repeat, repeat, repeat;
          pointer-events: none;
        }

        .footer-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 50px 40px 30px;
          box-sizing: border-box;
          min-height: 382px;
        }

        /* ── Top Row ── */
        .footer-top {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 50px;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-nav-link {
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #000000;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .footer-nav-link:hover {
          color: rgba(255, 255, 255, 1);
        }

        .footer-dot {
          color: #d1b8a9;
          font-size: 14px;
        }

        /* ── Middle Row ── */
        .footer-middle {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          align-items: center;
          flex-grow: 1;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        /* Left Column */
        .footer-col-left {
          align-items: flex-start;
        }

        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-contact-list li {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 12px;
          color: #666666;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .footer-contact-list svg {
          color: #000000;
        }

        /* Center Column */
        .footer-col-center {
          align-items: center;
          justify-content: center;
        }

        .footer-logo {
          margin-bottom: 24px;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .social-link {
          color: #dfbeb1;
          transition: color 0.3s ease;
        }

        .social-link:hover {
          color: #000000;
        }

        /* Right Column */
        .footer-col-right {
          align-items: flex-end;
          text-align: right;
        }

        .footer-desc {
          font-size: 12px;
          color: #888888;
          line-height: 1.8;
          max-width: 320px;
          margin: 0 0 20px 0;
        }

        .footer-readmore {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: #000000;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .footer-readmore::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background-color: #000;
          transition: width 0.3s ease;
        }

        .footer-readmore:hover {
          color: rgb(205, 174, 159);
        }

        .footer-readmore:hover::after {
          background-color: rgb(205, 174, 159);
        }

        /* ── Bottom Row ── */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 50px;
          padding-top: 20px;
        }

        .footer-copy {
          font-size: 11px;
          color: #999999;
          letter-spacing: 0.02em;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .footer-legal-link {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #999999;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-legal-link:hover {
          color: #000000;
        }

        .footer-legal-dot {
          color: #d1b8a9;
          font-size: 10px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .footer-middle {
            gap: 20px;
          }
          .footer-desc {
            max-width: 250px;
          }
        }

        @media (max-width: 860px) {
          .footer-wrapper {
            height: auto;
          }
          
          .footer-content {
            padding: 40px 20px 30px;
          }

          .footer-middle {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .footer-col-left {
            align-items: center;
          }

          .footer-col-right {
            align-items: center;
            text-align: center;
          }

          .footer-desc {
            max-width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
