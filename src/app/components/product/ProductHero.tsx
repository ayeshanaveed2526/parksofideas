'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProductHeroProps {
  category: string;
  productName: string;
}

const ProductHero: React.FC<ProductHeroProps> = ({ category, productName }) => {
  return (
    <div
      className="relative w-full h-52 md:h-56 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#8cbcc9',
        backgroundImage: "url('/luchiana-assets/products/luchiana-1911690231.webp')",
        backgroundSize: "150px",
        backgroundRepeat: "repeat",
        backgroundPosition: "center"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center"
      >
        <h1 className="text-white text-5xl md:text-6xl font-light tracking-[0.3em] mb-6">
          SHOP
        </h1>
        <div className="text-white text-xs md:text-sm font-semibold tracking-wider flex items-center justify-center space-x-2 uppercase">
          <span className="hover:text-gray-200 cursor-pointer transition-colors">HOME</span>
          <span>&#8250;</span>
          <span className="hover:text-gray-200 cursor-pointer transition-colors">SHOP</span>
          <span>&#8250;</span>
          <span className="hover:text-gray-200 cursor-pointer transition-colors">{category}</span>
          <span>&#8250;</span>
          <span>{productName}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductHero;
