'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchAllProducts, type ApiProduct } from '../../lib/api';
import { formatPerfumePrice } from '../../data/perfumeCatalog';
import { useCart } from '../cart/CartProvider';
import { useWishlist } from '../wishlist/WishlistProvider';
import { Loader2 } from 'lucide-react';

export default function RelatedProducts() {
  const router = useRouter();
  const { add: addToCart } = useCart();
  const { add: addToWishlist } = useWishlist();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts().then((data) => {
      const top8 = data.slice(0, 8).map((p: ApiProduct) => {
        const hasDiscount = p.old_price > p.new_price;
        const discountPercent = hasDiscount ? Math.round(((p.old_price - p.new_price) / p.old_price) * 100) : 0;
        
        return {
          id: String(p.id),
          name: p.brand,
          desc: p.description,
          price: p.new_price,
          originalPrice: hasDiscount ? p.old_price : undefined,
          image: p.image,
          badge: hasDiscount ? `-${discountPercent}%` : p.id % 4 === 0 ? 'FEATURED' : p.id <= 8 ? 'NEW' : null,
        };
      });
      setRelatedProducts(top8);
      setLoading(false);
    });
  }, []);

  const handleQuickView = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    router.push(`/product/${id}`);
  };

  const handleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    addToWishlist(Number(id));
    router.push("/wishlist");
  };

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    addToCart(Number(id), 1);
    router.push("/cart");
  };

  return (
    <section className="rp-section">
      <div className="rp-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rp-header"
        >
          <h2 className="rp-title">You May Also Like</h2>
          <div className="rp-divider"></div>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500 text-sm tracking-widest uppercase">Loading Recommendations...</p>
        </div>
      ) : (
        <div className="rp-marquee-wrap">
          <div className="rp-marquee-track">
            {[...relatedProducts, ...relatedProducts].map((product, idx) => (
              <div key={`${product.id}-${idx}`} className="rp-marquee-item">
              <Link href={`/product/${product.id}`} className="rp-card-link">
                <article className="rp-card">
                  <div className="rp-img-wrap">
                    {product.badge && (
                      <span className="rp-badge">{product.badge}</span>
                    )}
                    <div className="rp-img-inner">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: (idx % 8) * 0.2 }}
                        style={{ width: '100%', height: '100%', position: 'relative' }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)]"
                        />
                      </motion.div>
                    </div>
                    <div className="rp-hover-bg"></div>

                    {/* Action buttons */}
                    <div className="rp-actions">
                      <button className="rp-action-btn" aria-label="Quick View" onClick={(e) => handleQuickView(e, product.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="rp-action-btn" aria-label="Add to Wishlist" onClick={(e) => handleWishlist(e, product.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      </button>
                    </div>

                    {/* ATC Button */}
                    <button className="rp-atc" onClick={(e) => handleAddToCart(e, product.id)}>
                      ADD TO CART
                    </button>
                  </div>

                  <div className="rp-info">
                    <div className="rp-info-header">
                      <h3 className="rp-name">{product.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <p className="rp-price">{formatPerfumePrice(product.price)}</p>
                        {product.originalPrice && (
                          <p style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '13px', margin: 0 }}>
                            {formatPerfumePrice(product.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="rp-desc">{product.desc}</p>
                    <div className="rp-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="rp-star">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
      )}

      <style jsx>{`
        .rp-section {
          width: 100%;
          padding: 80px 0;
          background-color: #ffffff;
          font-family: var(--font-inter), "Inter", sans-serif;
        }
        .rp-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .rp-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .rp-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: #888;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .rp-divider {
          width: 40px;
          height: 2px;
          background-color: #00089d;
          margin: 0 auto;
        }
        
        /* ── Marquee ── */
        .rp-marquee-wrap {
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
        }

        .rp-marquee-track {
          display: flex;
          width: max-content;
          animation: rp-scroll 35s linear infinite;
        }

        .rp-marquee-wrap:hover .rp-marquee-track {
          animation-play-state: paused;
        }

        .rp-marquee-item {
          width: min(340px, 85vw);
          margin-right: 24px;
          flex-shrink: 0;
        }

        @keyframes rp-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }

        .rp-card-link {
          display: block;
          text-decoration: none;
        }
        
        .rp-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(0,0,0,0.04);
          height: 100%;
        }
        .rp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.06);
        }
        
        .rp-img-wrap {
          position: relative;
          aspect-ratio: 1;
          background: linear-gradient(165deg, #f8f9fd 0%, #ffffff 55%, #f3f5fb 100%);
          overflow: hidden;
        }
        
        .rp-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background-color: #00089d;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          letter-spacing: 0.15em;
          z-index: 10;
        }
        
        .rp-img-inner {
          position: absolute;
          inset: 0;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .rp-card:hover .rp-img-inner {
          transform: scale(1.05);
        }
        
        .rp-hover-bg {
          position: absolute;
          inset: 0;
          background: rgba(0, 8, 157, 0.03);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }
        .rp-card:hover .rp-hover-bg {
          opacity: 1;
        }
        
        .rp-actions {
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
        .rp-card:hover .rp-actions {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%);
        }
        
        .rp-action-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--poi-btn-bg);
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          color: #ffffff;
          cursor: pointer;
          transition: var(--poi-btn-transition);
          border-radius: 30px;
        }
        .rp-action-btn svg {
          width: 18px;
          height: 18px;
        }
        .rp-action-btn:hover {
          background: var(--poi-btn-bg-hover);
          color: #ffffff;
        }
        
        .rp-atc {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 48px;
          background: var(--poi-btn-bg);
          border: 1px solid var(--poi-btn-border);
          box-shadow: var(--poi-btn-shadow);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), var(--poi-btn-transition);
          z-index: 10;
        }
        .rp-card:hover .rp-atc {
          transform: translateY(0);
        }
        .rp-atc:hover {
          background: var(--poi-btn-bg-hover);
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
        }
        
        .rp-info {
          padding: 25px 20px;
          text-align: left;
          background: #ffffff;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .rp-info-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .rp-name {
          font-family: var(--font-marcellus), "Marcellus", serif;
          font-size: 18px;
          color: #111;
          margin: 0;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .rp-card:hover .rp-name {
          color: #00089d;
        }
        .rp-desc {
          font-size: 13px;
          color: #888;
          margin: 0 0 12px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .rp-price {
          font-size: 15px;
          font-weight: 700;
          color: #000000;
          margin: 0;
        }
        .rp-rating {
          display: flex;
          gap: 2px;
          margin-top: auto;
        }
        .rp-star {
          width: 14px;
          height: 14px;
          color: #fbbf24;
        }
      `}</style>
    </section>
  );
}

