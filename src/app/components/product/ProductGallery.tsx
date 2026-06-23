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
      <div className="relative w-full max-w-[520px] mx-auto aspect-square flex items-center justify-center group overflow-hidden bg-transparent">
        
        {/* Soft elegant glow behind the image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[80%] bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-50" />
        </div>

        <div className="absolute top-2 left-2 z-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-black text-white text-xs px-3 py-1.5 font-bold tracking-widest uppercase"
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
              className="w-full h-full object-contain max-h-[600px] mix-blend-multiply"
            />
          </AnimatePresence>
          
          {/* Static soft shadow behind the product */}
          <img
            src={activeImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-contain max-h-[600px] scale-95 translate-y-8 blur-2xl mix-blend-multiply saturate-0 opacity-15 pointer-events-none"
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
          className="absolute bottom-6 right-6 text-xs font-semibold text-gray-400 tracking-widest uppercase z-20 pointer-events-none"
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
        <div className="mt-4 grid grid-cols-4 gap-3 w-full max-w-[520px] mx-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative aspect-square overflow-hidden border-2 transition-all duration-300 ease-out
                ${activeIdx === idx ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <div className="absolute inset-0 bg-[#f5f5f5]" />
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="relative w-full h-full object-contain p-2 mix-blend-multiply"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
