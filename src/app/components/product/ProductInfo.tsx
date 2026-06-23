'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Product } from '../../data/mockProducts';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col h-full justify-center md:pl-10">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-4xl font-serif tracking-widest text-gray-900 mb-4 uppercase">
          {product.name}
        </h1>
        <p className="text-gray-500 mb-6 text-sm">{product.shortDescription}</p>
        
        <div className="text-2xl font-semibold mb-8">
          ${product.price.toFixed(2)}
        </div>

        {/* Add to Cart Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center border border-gray-300 h-12 w-32">
            <button 
              onClick={handleDecrease}
              className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <div className="flex-1 h-full flex items-center justify-center text-sm">
              {quantity}
            </div>
            <button 
              onClick={handleIncrease}
              className="w-10 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
          
          <button className="h-12 bg-black text-white px-8 text-xs font-bold tracking-widest hover:bg-white hover:text-black border border-black transition-all duration-300 ease-in-out relative overflow-hidden group">
            <span className="relative z-10 group-hover:text-black">ADD TO CART</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        {/* Wishlist */}
        <button className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black mb-8 transition-colors group">
          <Heart className="w-4 h-4 group-hover:fill-black transition-colors" />
          <span>ADD TO WISHLIST</span>
        </button>

        {/* Meta info */}
        <div className="flex flex-col gap-2 text-xs text-gray-500 mb-8 border-t pt-8">
          <p><span className="font-semibold text-gray-800">SKU:</span> {product.sku}</p>
          <p><span className="font-semibold text-gray-800">CATEGORY:</span> {product.category}</p>
          <p><span className="font-semibold text-gray-800">TAGS:</span> {product.tags.join(', ')}</p>
        </div>

        {/* Social Share */}
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-800">
          <span>SHARE</span>
          <div className="flex gap-3 text-gray-400">
            <FaFacebookF className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
            <FaTwitter className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
            <FaInstagram className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
            <Share2 className="w-4 h-4 hover:text-black cursor-pointer transition-colors" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;
