'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductHeroGeometricBackground from './ProductHeroGeometricBackground';

interface ProductHeroProps {
  category: string;
  productName: string;
}

const ProductHero: React.FC<ProductHeroProps> = ({ category, productName }) => {
  return (
    <div
      className="relative w-full h-48 md:h-56 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#00089dff' }}
    >
      <ProductHeroGeometricBackground />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white font-light text-3xl md:text-4xl tracking-[0.2em] mb-4 uppercase drop-shadow-md hover-text-glow cursor-default"
          style={{ fontFamily: "var(--font-marcellus), Marcellus, serif" }}
        >
          {productName}
        </motion.h2>

        <motion.div
          whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.45)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-white/80 text-[10px] md:text-xs font-light tracking-[0.2em] flex items-center justify-center space-x-3 uppercase py-1.5 px-6 rounded-full border border-white/20 shadow-sm hover-lift-sm hover-glow"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <Link href="/" className="hover:text-white hover-link-slide transition-colors duration-300">HOME</Link>
          <span className="opacity-40">/</span>
          <span className="text-white">{category || 'SHOP'}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductHero;
