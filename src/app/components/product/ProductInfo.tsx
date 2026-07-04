'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Share2, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useCart } from '../cart/CartProvider';
import { useWishlist } from '../wishlist/WishlistProvider';
import { Product } from '../../data/mockProducts';

interface ProductInfoProps {
  product: Product;
}

const avgRating = (reviews: Product['reviews']) => {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const router = useRouter();
  const { add: addToCart } = useCart();
  const { toggle: toggleWishlist, has: isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const rating = avgRating(product.reviews);

  const handleAddToCart = () => {
    addToCart(Number(product.id), quantity);
    router.push('/cart');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-md lg:max-w-none lg:mx-0 text-left"
      >
        <motion.div variants={itemVariants} className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <h1
            className="text-2xl font-serif uppercase leading-tight tracking-widest text-[#1a1a1a] sm:text-3xl lg:text-[2rem]"
            style={{ fontFamily: 'var(--font-marcellus), Marcellus, serif' }}
          >
            {product.name}
          </h1>
          <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-emerald-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            IN STOCK
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-5 flex flex-wrap items-center justify-start gap-6">
          {product.reviews.length > 0 ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs tracking-wide text-gray-400">
                ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          ) : <div />}

          <button
            type="button"
            onClick={() => toggleWishlist(Number(product.id))}
            className={`group flex items-center gap-2 text-xs font-semibold tracking-wider transition-all ${
              isInWishlist(Number(product.id)) ? 'text-[#1a1a1a]' : 'text-gray-500 hover:text-[#1a1a1a]'
            }`}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 group-hover:scale-110 ${
              isInWishlist(Number(product.id)) ? 'fill-[#1a1a1a] text-[#1a1a1a]' : 'group-hover:fill-[#1a1a1a]'
            }`} />
            {isInWishlist(Number(product.id)) ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
          </button>
        </motion.div>

        <motion.p variants={itemVariants} className="mb-6 text-sm leading-relaxed text-gray-500">
          {product.shortDescription}
        </motion.p>

        <motion.div variants={itemVariants} className="mb-8 flex items-baseline gap-4">
          <span className="text-2xl font-semibold text-[#1a1a1a]">${product.price.toFixed(2)}</span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 h-px w-full bg-[#dfe3eb]" />

        <motion.div variants={itemVariants} className="mb-6 flex items-stretch gap-3 sm:gap-4">
          <div className="flex h-12 w-[120px] shrink-0 items-center overflow-hidden rounded-none border border-[#dfe3eb] bg-white sm:w-32">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-full w-10 items-center justify-center text-lg font-light text-[#1a1a1a] transition-colors hover:bg-[rgba(0,0,0,0.06)]"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setQuantity(isNaN(val) || val < 1 ? 1 : val);
              }}
              className="flex w-full flex-1 appearance-none items-center justify-center bg-transparent text-center text-sm font-semibold text-[#1a1a1a] outline-none"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-full w-10 items-center justify-center text-lg font-light text-[#1a1a1a] transition-colors hover:bg-[rgba(0,0,0,0.06)]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="poi-btn h-12 min-w-[220px] flex-1 sm:flex-none"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </motion.div>



        <motion.div
          variants={itemVariants}
          className="mb-8 grid grid-cols-3 gap-2 border-y border-[#e8ecf2] py-6 sm:gap-3"
        >
          {[
            { icon: Truck, label: 'Free Shipping', sub: 'Orders over $75' },
            { icon: RefreshCw, label: 'Easy Returns', sub: '30-day policy' },
            { icon: ShieldCheck, label: 'Secure Pay', sub: '100% protected' },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-1 text-center cursor-default transition-transform duration-300 hover:scale-110"
            >
              <Icon className="mb-0.5 h-4 w-4 text-[#8b93a5] transition-colors duration-300 group-hover:text-[#00089d]" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1a1a1a]">{label}</span>
              <span className="text-[10px] text-gray-400">{sub}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 flex flex-col gap-2.5 text-xs text-gray-500">
          <p className="flex flex-wrap items-center gap-x-2">
            <span className="font-semibold uppercase tracking-wider text-[#1a1a1a]">SKU</span>
            <span className="pi-pill">
              {product.sku}
            </span>
          </p>
          <p className="flex flex-wrap items-center gap-x-2">
            <span className="font-semibold uppercase tracking-wider text-[#1a1a1a]">Tags</span>
            <span className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="pi-pill"
                >
                  {tag}
                </span>
              ))}
            </span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-4 text-xs font-semibold text-gray-500">
          <span className="uppercase tracking-wider">Share</span>
          <div className="h-4 w-px bg-[#dfe3eb]" />
          <div className="flex gap-3 text-[#8b93a5]">
            <FaFacebookF className="h-3.5 w-3.5 cursor-pointer transition-colors duration-200 hover:text-[#1877f2]" />
            <FaTwitter className="h-3.5 w-3.5 cursor-pointer transition-colors duration-200 hover:text-[#000000]" />
            <FaInstagram className="h-3.5 w-3.5 cursor-pointer transition-colors duration-200 hover:text-[#e1306c]" />
            <Share2 className="h-3.5 w-3.5 cursor-pointer transition-colors duration-200 hover:text-[#1a1a1a]" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;
