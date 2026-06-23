'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Share2, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Product } from '../../data/mockProducts';

interface ProductInfoProps {
  product: Product;
}

const avgRating = (reviews: Product['reviews']) => {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const rating = avgRating(product.reviews);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col h-full justify-center md:pl-10">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">

        {/* Category pill */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8cbcc9] uppercase border border-[#8cbcc9]/40 px-3 py-1">
            {product.category}
          </span>
        </motion.div>

        {/* Product name */}
        <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-serif tracking-widest text-gray-900 mb-3 uppercase leading-tight">
          {product.name}
        </motion.h1>

        {/* Stars + review count */}
        {product.reviews.length > 0 && (
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-400 tracking-wide">({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})</span>
          </motion.div>
        )}

        {/* Short description */}
        <motion.p variants={itemVariants} className="text-gray-500 mb-5 text-sm leading-relaxed">
          {product.shortDescription}
        </motion.p>

        {/* Price + in stock */}
        <motion.div variants={itemVariants} className="flex items-baseline gap-4 mb-8">
          <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-xs font-semibold tracking-wider text-emerald-600 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            IN STOCK
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full h-px bg-gray-100 mb-8" />

        {/* Add to Cart */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-gray-300 h-12 w-32">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-lg text-gray-600">−</button>
            <div className="flex-1 h-full flex items-center justify-center text-sm font-medium">{quantity}</div>
            <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors text-lg text-gray-600">+</button>
          </div>

          <button className="h-12 flex-1 bg-black text-white text-xs font-bold tracking-widest border border-black relative overflow-hidden group transition-all duration-300">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">ADD TO CART</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>
        </motion.div>

        {/* Wishlist */}
        <motion.button variants={itemVariants} className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black mb-8 transition-colors group w-fit">
          <Heart className="w-4 h-4 group-hover:fill-black transition-all duration-200" />
          <span className="tracking-wider">ADD TO WISHLIST</span>
        </motion.button>

        {/* Trust badges */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-8 py-5 border-t border-b border-gray-100">
          {[
            { icon: Truck, label: 'Free Shipping', sub: 'Orders over $75' },
            { icon: RefreshCw, label: 'Easy Returns', sub: '30-day policy' },
            { icon: ShieldCheck, label: 'Secure Pay', sub: '100% protected' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <Icon className="w-4 h-4 text-gray-400 mb-0.5" />
              <span className="text-[10px] font-semibold tracking-wide text-gray-700 uppercase">{label}</span>
              <span className="text-[10px] text-gray-400">{sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Meta info */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2 text-xs text-gray-500 mb-8">
          <p><span className="font-semibold text-gray-700 uppercase tracking-wider">SKU</span> <span className="ml-2">{product.sku}</span></p>
          <p><span className="font-semibold text-gray-700 uppercase tracking-wider">Tags</span> <span className="ml-2">{product.tags.join(', ')}</span></p>
        </motion.div>

        {/* Social Share */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <span className="tracking-wider uppercase">Share</span>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex gap-3 text-gray-400">
            <FaFacebookF className="w-3.5 h-3.5 hover:text-black cursor-pointer transition-colors" />
            <FaTwitter className="w-3.5 h-3.5 hover:text-black cursor-pointer transition-colors" />
            <FaInstagram className="w-3.5 h-3.5 hover:text-black cursor-pointer transition-colors" />
            <Share2 className="w-3.5 h-3.5 hover:text-black cursor-pointer transition-colors" />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ProductInfo;
