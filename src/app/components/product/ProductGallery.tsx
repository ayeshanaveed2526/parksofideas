'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
}

const AUTO_PLAY_MS = 3000;

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const displayImages = images.slice(0, 4);
  const activeImage = displayImages[activeIdx] || displayImages[0] || '';
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIdxRef = useRef(activeIdx);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  const go = useCallback((next: number, dir?: number) => {
    if (!displayImages.length) return;
    const normalized = ((next % displayImages.length) + displayImages.length) % displayImages.length;
    setDirection(dir ?? (normalized >= activeIdxRef.current ? 1 : -1));
    setActiveIdx(normalized);
  }, [displayImages.length]);

  const startAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (displayImages.length <= 1) return;
    timerRef.current = setInterval(() => {
      go(activeIdxRef.current + 1, 1);
    }, AUTO_PLAY_MS);
  }, [displayImages.length, go]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  const handleThumbClick = (idx: number) => {
    go(idx, idx > activeIdxRef.current ? 1 : -1);
    startAutoPlay();
  };

  return (
    <div className="w-full">
      <div
        className={`grid items-stretch gap-3 sm:gap-4 md:gap-5 ${
          displayImages.length > 1
            ? 'grid-cols-[76px_1fr] sm:grid-cols-[92px_1fr] md:grid-cols-[104px_1fr]'
            : 'grid-cols-1'
        }`}
      >
        {displayImages.length > 1 && (
          <div className="flex flex-col gap-2.5 sm:gap-3 self-stretch">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleThumbClick(idx)}
                aria-label={`View image ${idx + 1}`}
                aria-current={activeIdx === idx ? 'true' : undefined}
                className={`group relative min-h-0 flex-1 w-full overflow-hidden border bg-white transition-all duration-500 ease-out
                  ${activeIdx === idx
                    ? 'border-[#1a1a1a] shadow-[0_4px_20px_rgba(26,26,26,0.08)]'
                    : 'border-[#dfe3eb] opacity-60 hover:opacity-100 hover:border-[#a8b0c0]'
                  }`}
              >
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    activeIdx === idx ? 'bg-[#f8f9fc]' : 'bg-white group-hover:bg-[#f4f6fa]'
                  }`}
                />
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="relative z-10 h-full w-full object-contain p-1.5 sm:p-2 mix-blend-multiply"
                />
                {activeIdx === idx && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1a1a1a] z-20" />
                )}
              </button>
            ))}
          </div>
        )}

        <div
          className={`relative w-full overflow-hidden border border-[#dfe3eb] bg-white shadow-[0_16px_48px_-16px_rgba(26,26,26,0.1)] aspect-4/5 sm:aspect-5/6 ${
            displayImages.length <= 1 ? 'col-span-full' : ''
          }`}
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#f8f9fc] via-white to-[#eef1f7] pointer-events-none" />

          <div className="absolute top-4 left-4 z-20">
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block bg-[#1a1a1a] text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 font-bold tracking-widest uppercase"
            >
              NEW
            </motion.span>
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-center px-8 py-10 sm:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={activeImage}
                src={activeImage}
                alt="Product showcase"
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, scale: 0.98, x: d > 0 ? 20 : -20 }),
                  center: { opacity: 1, scale: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, scale: 0.98, x: d > 0 ? -20 : 20 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-[85%] max-w-[90%] object-contain mix-blend-multiply"
              />
            </AnimatePresence>
          </div>

          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {displayImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeIdx === idx ? 'w-6 bg-[#1a1a1a]' : 'w-1.5 bg-[#c8ced8]'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#c8ced8]/60 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
