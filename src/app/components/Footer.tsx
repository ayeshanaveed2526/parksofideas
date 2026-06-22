"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="footer-wrapper">

      <div className="footer-content">
        <div className="footer-main">
          {/* Left Column */}
          <div className="footer-col footer-left">
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
            <p className="footer-desc">
              Our formulas are made with natural, organic, and cruelty-free ingredients that are gentle, effective, and good for you and the environment.
            </p>

            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="X">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-newsletter-text">Get product drops and exclusive offers.</p>
            <form className="footer-newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" aria-label="Subscribe">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </form>
          </div>

          {/* Middle Column */}
          <div className="footer-col footer-middle-col">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><a href="#">New Arrivals</a> <span className="badge badge-hot">Hot</span></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Sale Items</a> <span className="badge badge-sale">Up to 70% Off</span></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Lookbook</a></li>
            </ul>

            <h4 className="footer-heading mt-6">Categories</h4>
            <div className="footer-categories">
              <a href="#" className="category-pill">Skincare</a>
              <a href="#" className="category-pill">Body</a>
              <a href="#" className="category-pill">Face</a>
              <a href="#" className="category-pill">Hair</a>
              <a href="#" className="category-pill">Accessories</a>
            </div>
          </div>

          {/* Right Column */}
          <div className="footer-col footer-right">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <div className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-info">
                  <strong>Our Store</strong>
                  <span>25 West 21th Street, Miami FL, USA</span>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-info">
                  <strong>Call Us</strong>
                  <span>+123 488 9652</span>
                  <span className="contact-sub">Mon-Fri: 10:00 - 18:00</span>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info">
                  <strong>Email Us</strong>
                  <span>info@luchiana.com</span>
                  <span className="contact-sub">We reply within 24 hours</span>
                </div>
              </li>
            </ul>

            <div className="footer-rating">
              <div className="stars">
                ⭐⭐⭐⭐⭐ <span style={{ color: '#000' }}>4.8/5</span>
              </div>
              <p className="rating-text">"Amazing quality! Love my new products!"</p>
              <p className="rating-author">- Sarah K.</p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom">
          <div className="footer-copy">
            <span>© 2024 LUCHIANA Theme. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
          <div className="footer-payment">
            <span>We accept:</span>
            <div className="payment-methods">
              <div className="payment-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Visa/Master
              </div>
              <div className="payment-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                JazzCash
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-wrapper {
          position: relative;
          width: 100%;
          background-color: #ffffff;
          color: #666666;
          font-family: var(--font-inter), "Inter", sans-serif;
          border-top: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .footer-content {
          position: relative;
          z-index: 1;
          max-width: 1536px;
          margin: 0 auto;
          padding: 60px 40px 20px;
        }
        .footer-main {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 50px;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
        }
        .footer-logo {
          margin-bottom: 24px;
        }
        .footer-desc {
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 30px;
          color: #888888;
        }
        .footer-heading {
          font-size: 16px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 15px;
          margin-top: 0;
        }
        .footer-socials {
          display: flex;
          gap: 12px;
          margin-bottom: 35px;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #dfbeb1;
          color: #ffffff;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .social-icon:hover {
          background-color: #d1b8a9;
        }
        .footer-newsletter-text {
          font-size: 13px;
          color: #888888;
          margin-bottom: 15px;
        }
        .footer-newsletter-form {
          display: flex;
          height: 44px;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
        }
        .footer-newsletter-form input {
          flex: 1;
          border: none;
          padding: 0 15px;
          font-size: 13px;
          outline: none;
        }
        .footer-newsletter-form button {
          background-color: #dfbeb1;
          color: #ffffff;
          border: none;
          padding: 0 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s;
        }
        .footer-newsletter-form button:hover {
          background-color: #d1b8a9;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-links li {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-links a {
          text-decoration: none;
          color: #666666;
          font-size: 13px;
          transition: color 0.3s;
        }
        .footer-links a:hover {
          color: #dfbeb1;
        }
        .badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
        }
        .badge-hot {
          color: #dfbeb1;
          background-color: rgba(223, 190, 177, 0.15);
        }
        .badge-sale {
          color: #d1b8a9;
          background-color: rgba(209, 184, 169, 0.15);
        }
        .mt-6 {
          margin-top: 35px;
        }
        .footer-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .category-pill {
          text-decoration: none;
          font-size: 12px;
          color: #dfbeb1;
          background-color: rgba(223, 190, 177, 0.15);
          padding: 6px 14px;
          border-radius: 15px;
          transition: all 0.3s;
        }
        .category-pill:hover {
          background-color: #dfbeb1;
          color: #ffffff;
        }
        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0 0 35px 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .footer-contact-list li {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }
        .contact-icon {
          color: #dfbeb1;
          background-color: rgba(223, 190, 177, 0.15);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          color: #666666;
          line-height: 1.4;
        }
        .contact-info strong {
          color: #000000;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .contact-sub {
          font-size: 11px;
          color: #999999;
          margin-top: 2px;
        }
        .footer-rating {
          font-size: 13px;
          color: #666666;
          background-color: #fafafa;
          padding: 15px;
          border-radius: 8px;
        }
        .stars {
          color: #f5b041;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .rating-text {
          font-style: italic;
          margin: 0 0 8px 0;
          color: #888888;
        }
        .rating-author {
          font-size: 12px;
          color: #999999;
          margin: 0;
        }
        .footer-bottom {
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888888;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-copy {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .footer-legal {
          display: flex;
          gap: 20px;
        }
        .footer-legal a {
          color: #888888;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-legal a:hover {
          color: #dfbeb1;
        }
        .footer-payment {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .payment-methods {
          display: flex;
          gap: 10px;
        }
        .payment-badge {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 11px;
          color: #666666;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        @media (max-width: 992px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-copy {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </footer>
  );
}

