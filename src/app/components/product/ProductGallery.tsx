'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = images[activeIdx] || '';

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">
      {/* Thumbnails Sidebar */}
      <div className="flex md:flex-col gap-4 order-2 md:order-1 shrink-0 z-10">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`relative w-20 h-24 overflow-hidden border transition-all duration-500 ease-out 
              ${activeIdx === idx ? 'border-black scale-105 shadow-md' : 'border-transparent hover:border-gray-200 opacity-60 hover:opacity-100'}`}
            onClick={() => setActiveIdx(idx)}
            aria-label={`View image ${idx + 1}`}
          >
            <div className="absolute inset-0 bg-[#f9f9f9]" />
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              className="relative w-full h-full object-cover mix-blend-multiply" 
            />
            {activeIdx === idx && (
              <motion.div 
                layoutId="active-thumb-indicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Image Showcase */}
      <div className="flex-1 relative order-1 md:order-2 flex items-center justify-center min-h-[500px] lg:min-h-[600px] group overflow-hidden bg-transparent">
        
        {/* Soft elegant glow behind the image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[80%] bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-50" />
        </div>

        <div className="absolute top-6 left-6 z-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block bg-black text-white text-xs px-3 py-1.5 font-bold tracking-widest uppercase"
          >
            NEW
          </motion.span>
        </div>

        {/* The Animated Image */}
        <div className="relative w-full h-full flex items-center justify-center p-8 z-10 cursor-crosshair">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt="Product Showcase"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="w-full h-full object-contain max-h-[600px] mix-blend-multiply"
            />
          </AnimatePresence>
          
          {/* Subtle floating continuous animation */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
               <motion.img
                key={activeImage + "-shadow"}
                src={activeImage}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-contain max-h-[600px] scale-95 translate-y-8 blur-2xl mix-blend-multiply saturate-0"
              />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Hover zoom instruction */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-6 right-6 text-xs font-semibold text-gray-400 tracking-widest uppercase z-20 pointer-events-none"
        >
          Hover to zoom
        </motion.div>
      </div>
    </div>
  );
};

export default ProductGallery;
