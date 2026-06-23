'use client';

import React from 'react';
import { motion } from 'framer-motion';

const relatedProducts = [
  {
    id: '5',
    name: 'OIL-INFUSED LIP TINT',
    desc: 'A hydrating lip oil with a hint of universally flattering colour.',
    price: 45.00,
    image: '/images/luchiana-3002880645-520x460.webp',
    badge: 'NEW',
  },
  {
    id: '6',
    name: 'OIL-FREE FOUNDATION',
    desc: 'Oil-free foundation that delivers buildable, skin-like coverage.',
    price: 80.00,
    image: '/images/luchiana-3050518087-520x460.webp',
    badge: 'FEATURED',
  },
  {
    id: '8',
    name: 'PURITY MADE CLEANSER',
    desc: 'Top-selling facial cleanser for a radiant complexion.',
    price: 60.00,
    image: '/images/luchiana-3025788510-520x460.webp',
    badge: null,
  },
];

const RelatedProducts: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto px-4 my-20 py-10 border-t border-gray-100">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-2"
    >
      You May Also Like
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-8 h-0.5 bg-black mx-auto mb-12"
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedProducts.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group cursor-pointer flex flex-col"
        >
          {/* Image container */}
          <div className="relative overflow-hidden bg-[#f7f7f7] aspect-square mb-4">
            {product.badge && (
              <div className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] font-bold px-2.5 py-1 tracking-[0.2em]">
                {product.badge}
              </div>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-6 mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Slide-up cart button */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <button className="w-full bg-black text-white py-3.5 text-[10px] font-bold tracking-[0.25em] hover:bg-gray-800 transition-colors">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center px-2">
            <h3 className="font-serif text-sm tracking-[0.15em] uppercase mb-1.5 text-gray-900">{product.name}</h3>
            <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{product.desc}</p>
            <span className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RelatedProducts;
