'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  galleryViewTransform,
  type ProductGalleryView,
} from '../../data/perfumeCatalog';

interface ProductGalleryProps {
  views: ProductGalleryView[];
}

const AUTO_PLAY_MS = 3800;

const ProductGallery: React.FC<ProductGalleryProps> = ({ views }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const displayViews = views.slice(0, 4);
  const activeView = displayViews[activeIdx] || displayViews[0];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIdxRef = useRef(activeIdx);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  const go = useCallback((next: number) => {
    if (!displayViews.length) return;
    const normalized = ((next % displayViews.length) + displayViews.length) % displayViews.length;
    setActiveIdx(normalized);
  }, [displayViews.length]);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (displayViews.length <= 1) return;
    timerRef.current = setInterval(() => {
      go(activeIdxRef.current + 1);
    }, AUTO_PLAY_MS);
  }, [displayViews.length, go]);

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

  if (!activeView) return null;

  return (
    <div className="pg-root w-full">
      <div
        className={`grid items-stretch gap-3 sm:gap-4 md:gap-5 ${
          displayViews.length > 1
            ? 'grid-cols-[76px_1fr] sm:grid-cols-[92px_1fr] md:grid-cols-[104px_1fr]'
            : 'grid-cols-1'
        }`}
      >
        {displayViews.length > 1 && (
          <div className="flex flex-col gap-2.5 sm:gap-3 self-stretch">
            {displayViews.map((view, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleThumbClick(idx)}
                aria-label={view.label}
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
                <div className="pg-thumb-scene relative z-10 flex h-full w-full items-center justify-center overflow-hidden">
                  <img
                    src={view.src}
                    alt={view.label}
                    className="pg-thumb-bottle h-full w-full object-contain p-1"
                    style={{ transform: galleryViewTransform(view, 1) }}
                  />
                </div>
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

        <div
          className={`pg-stage group relative w-full overflow-hidden rounded-2xl border border-[#e5e8f0] aspect-4/5 sm:aspect-5/6 ${
            displayViews.length <= 1 ? 'col-span-full' : ''
          }`}
        >
          <div className="pg-bg" />

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

          <div className="absolute inset-0 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="pg-slide absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="pg-bottle-wrap relative flex h-full w-full items-center justify-center"
                >
                  <div className="pg-bottle-scene flex h-full w-full items-center justify-center overflow-hidden">
                    <img
                      src={activeView.src}
                      alt={activeView.label}
                      className="pg-bottle relative z-10 h-full w-full object-contain p-2 sm:p-4"
                      style={{ transform: galleryViewTransform(activeView) }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pg-sheen" />
          <div className="pg-shimmer" />

          {displayViews.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => handleNav(-1)}
                aria-label="Previous view"
                className="pg-nav pg-nav-prev"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleNav(1)}
                aria-label="Next view"
                className="pg-nav pg-nav-next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .pg-stage {
          box-shadow: 0 30px 70px -28px rgba(0, 8, 157, 0.28),
                      0 8px 24px -12px rgba(0, 0, 0, 0.08);
          isolation: isolate;
        }

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

        .pg-bottle-scene,
        .pg-thumb-scene {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .pg-thumb-scene {
          perspective: 700px;
        }

        .pg-bottle,
        .pg-thumb-bottle {
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pg-thumb-bottle {
          filter: none;
        }

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
          .pg-bg, .pg-slide, .pg-bottle-wrap {
            animation: none;
          }

          .pg-bottle,
          .pg-thumb-bottle {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductGallery;
