'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
}

const AUTO_PLAY_MS = 3800;

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const displayImages = images.slice(0, 4);
  const activeImage = displayImages[activeIdx] || displayImages[0] || '';
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIdxRef = useRef(activeIdx);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  const go = useCallback((next: number) => {
    if (!displayImages.length) return;
    const normalized = ((next % displayImages.length) + displayImages.length) % displayImages.length;
    setActiveIdx(normalized);
  }, [displayImages.length]);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (displayImages.length <= 1) return;
    timerRef.current = setInterval(() => {
      go(activeIdxRef.current + 1);
    }, AUTO_PLAY_MS);
  }, [displayImages.length, go]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const handleThumbClick = (idx: number) => {
    go(idx);
    startAutoPlay();
  };

  const handleNav = (dir: number) => {
    go(activeIdxRef.current + dir);
    startAutoPlay();
  };

  return (
    <div className="pg-root w-full">
      <div
        className={`grid items-stretch gap-3 sm:gap-4 md:gap-5 ${
          displayImages.length > 1
            ? 'grid-cols-[76px_1fr] sm:grid-cols-[92px_1fr] md:grid-cols-[104px_1fr]'
            : 'grid-cols-1'
        }`}
      >
        {/* ── Thumbnails ── */}
        {displayImages.length > 1 && (
          <div className="flex flex-col gap-2.5 sm:gap-3 self-stretch">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleThumbClick(idx)}
                aria-label={`View image ${idx + 1}`}
                aria-current={activeIdx === idx ? 'true' : undefined}
                className={`pg-thumb group relative min-h-0 flex-1 w-full overflow-hidden rounded-xl border bg-white transition-all duration-500 ease-out
                  ${activeIdx === idx
                    ? 'border-[#00089d] shadow-[0_8px_28px_rgba(0,8,157,0.18)]'
                    : 'border-[#e5e8f0] opacity-55 hover:opacity-100 hover:border-[#aab2c6]'
                  }`}
              >
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    activeIdx === idx ? 'bg-[#f5f7fe]' : 'bg-white group-hover:bg-[#f4f6fa]'
                  }`}
                />
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="relative z-10 h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                />
                {activeIdx === idx && (
                  <motion.span
                    layoutId="pg-thumb-active"
                    className="absolute inset-0 z-20 rounded-xl ring-2 ring-[#00089d]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Main stage ── */}
        <div
          className={`pg-stage group relative w-full overflow-hidden rounded-2xl border border-[#e5e8f0] aspect-4/5 sm:aspect-5/6 ${
            displayImages.length <= 1 ? 'col-span-full' : ''
          }`}
        >
          {/* Base gradient background */}
          <div className="pg-bg" />

          {/* NEW badge */}
          <div className="absolute top-4 left-4 z-30">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block rounded-md bg-[#00089d] px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-[0_6px_18px_rgba(0,8,157,0.35)]"
            >
              NEW
            </motion.span>
          </div>

          {/* Bottle (gradient lives on the slide so multiply removes the white) */}
          <div className="absolute inset-0 z-10">
            <AnimatePresence>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="pg-slide absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="pg-bottle-wrap relative flex h-full w-full items-center justify-center"
                >
                  <img
                    src={activeImage}
                    alt="Product showcase"
                    className="pg-bottle relative z-10 max-h-[82%] max-w-[88%] object-contain mix-blend-multiply"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Soft top sheen */}
          <div className="pg-sheen" />

          {/* Floating sparkles (above the bottle) */}
          <div className="pg-sparkles" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className={`pg-spark pg-spark-${i + 1}`} />
            ))}
          </div>

          {/* Sweeping light shimmer */}
          <div className="pg-shimmer" />

          {/* Navigation arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => handleNav(-1)}
                aria-label="Previous image"
                className="pg-nav pg-nav-prev"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleNav(1)}
                aria-label="Next image"
                className="pg-nav pg-nav-next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}

          {/* Progress dots */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
              {displayImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleThumbClick(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIdx === idx ? 'w-7 bg-[#00089d]' : 'w-1.5 bg-[#c8ced8] hover:bg-[#9aa1b5]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* ── Stage base ── */
        .pg-stage {
          box-shadow: 0 30px 70px -28px rgba(0, 8, 157, 0.28),
                      0 8px 24px -12px rgba(0, 0, 0, 0.08);
          isolation: isolate;
        }

        /* Plain white backdrop (the bottle PNG's white blends in seamlessly) */
        .pg-bg,
        .pg-slide,
        .pg-bottle-wrap {
          background: #ffffff;
        }

        .pg-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        /* Soft top sheen for a luminous feel (sits above the bottle) */
        .pg-sheen {
          position: absolute;
          inset: 0;
          z-index: 15;
          pointer-events: none;
          background:
            radial-gradient(60% 45% at 50% 18%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 70%),
            radial-gradient(130% 120% at 50% 50%, transparent 62%, rgba(0, 8, 157, 0.06) 100%);
          mix-blend-mode: screen;
        }

        /* ── Bottle ── */
        .pg-bottle {
          filter: drop-shadow(0 26px 34px rgba(0, 8, 157, 0.16));
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pg-stage:hover .pg-bottle {
          transform: scale(1.05);
        }

        /* ── Sparkles ── */
        .pg-sparkles {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          overflow: hidden;
        }

        .pg-spark {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0,8,157,0.5) 60%, transparent 70%);
          opacity: 0;
          animation: pgFloat 7s ease-in-out infinite;
        }

        @keyframes pgFloat {
          0% { transform: translateY(20px) scale(0.6); opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.7; }
          100% { transform: translateY(-120px) scale(1.1); opacity: 0; }
        }

        .pg-spark-1 { left: 12%; bottom: 14%; animation-delay: 0s; }
        .pg-spark-2 { left: 26%; bottom: 8%;  animation-delay: 1.4s; width: 4px; height: 4px; }
        .pg-spark-3 { left: 40%; bottom: 20%; animation-delay: 2.8s; }
        .pg-spark-4 { left: 58%; bottom: 10%; animation-delay: 0.8s; width: 6px; height: 6px; }
        .pg-spark-5 { left: 72%; bottom: 16%; animation-delay: 3.6s; }
        .pg-spark-6 { left: 84%; bottom: 9%;  animation-delay: 2.1s; width: 4px; height: 4px; }
        .pg-spark-7 { left: 50%; bottom: 6%;  animation-delay: 4.4s; }
        .pg-spark-8 { left: 33%; bottom: 13%; animation-delay: 5.2s; width: 3px; height: 3px; }
        .pg-spark-9 { left: 66%; bottom: 18%; animation-delay: 1.9s; width: 3px; height: 3px; }

        /* ── Sweeping shimmer on hover ── */
        .pg-shimmer {
          position: absolute;
          inset: 0;
          z-index: 25;
          pointer-events: none;
          background: linear-gradient(
            115deg,
            transparent 38%,
            rgba(255, 255, 255, 0.55) 48%,
            rgba(255, 255, 255, 0.2) 52%,
            transparent 62%
          );
          background-size: 220% 100%;
          background-position: -160% center;
          transition: background-position 1s ease;
        }

        .pg-stage:hover .pg-shimmer {
          background-position: 160% center;
        }

        /* ── Navigation arrows ── */
        .pg-nav {
          position: absolute;
          top: 50%;
          z-index: 30;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--poi-btn-border);
          background: var(--poi-btn-bg);
          backdrop-filter: blur(10px);
          color: #ffffff;
          cursor: pointer;
          box-shadow: var(--poi-btn-shadow);
          opacity: 0;
          transition: opacity 0.4s ease, var(--poi-btn-transition);
        }

        .pg-stage:hover .pg-nav {
          opacity: 1;
        }

        .pg-nav:hover {
          background: var(--poi-btn-bg-hover);
          color: #ffffff;
          border-color: var(--poi-btn-border-hover);
          box-shadow: var(--poi-btn-shadow-hover);
        }

        .pg-nav-prev { left: 14px; }
        .pg-nav-prev:hover { transform: translateY(-50%) translateX(-3px); }
        .pg-nav-next { right: 14px; }
        .pg-nav-next:hover { transform: translateY(-50%) translateX(3px); }

        @media (prefers-reduced-motion: reduce) {
          .pg-bg, .pg-slide, .pg-bottle-wrap, .pg-spark {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGallery;
