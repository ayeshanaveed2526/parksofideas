'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const activeImage = images[activeIdx] || '';

  const go = (next: number) => {
    setDirection(next > activeIdx ? 1 : -1);
    setActiveIdx((next + images.length) % images.length);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Main Image Showcase */}
      <div className="relative w-full max-w-[520px] mx-auto aspect-square flex items-center justify-center group overflow-hidden bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_20px_40px_-15px_rgba(205,174,159,0.25)] rounded-[2rem] p-8">
        
        {/* Soft elegant glow behind the image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[80%] bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-50" />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-black text-white text-xs px-4 py-2 font-bold tracking-widest uppercase rounded-full"
          >
            NEW
          </motion.span>
        </div>

        {/* The Animated Image */}
        <div className="relative w-full h-full flex items-center justify-center z-10 cursor-crosshair">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.img
              key={activeImage}
              src={activeImage}
              alt="Product Showcase"
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full h-full object-contain max-h-[600px] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-90"
            />
          </AnimatePresence>
          
          {/* Static soft shadow behind the product */}
          <img
            src={activeImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-contain max-h-[600px] scale-95 translate-y-8 blur-2xl mix-blend-multiply saturate-0 opacity-15 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[0.85]"
          />
        </div>

        {/* Slideshow navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(activeIdx - 1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/70 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300 rounded-full shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(activeIdx + 1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/70 backdrop-blur-sm text-black opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300 rounded-full shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Hover zoom instruction */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-6 right-6 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase z-20 pointer-events-none bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full"
        >
          Hover to zoom
        </motion.div>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-6 h-1.5 bg-black' : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-500'}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail preview bar */}
      {images.length > 1 && (
        <div className="mt-6 grid grid-cols-4 gap-4 w-full max-w-[520px] mx-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300 ease-out shadow-sm
                ${activeIdx === idx ? 'border-black ring-2 ring-black/5 ring-offset-2 scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-100 scale-95'}`}
            >
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="relative w-full h-full object-contain p-3 mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
