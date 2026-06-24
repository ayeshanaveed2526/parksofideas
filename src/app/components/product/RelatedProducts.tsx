'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PERFUME_CATALOG, formatPerfumePrice } from '../../data/perfumeCatalog';

const relatedProducts = PERFUME_CATALOG.filter((p) => [19, 22, 29].includes(p.id)).map((p) => ({
  id: String(p.id),
  name: p.brand,
  desc: p.description,
  price: p.price,
  image: p.image,
  badge: p.id % 4 === 0 ? 'FEATURED' : p.id <= 8 ? 'NEW' : null,
}));

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
      className="w-8 h-0.5 bg-[#00089d] mx-auto mb-12"
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedProducts.map((product, idx) => (
        <Link key={product.id} href={`/product/${product.id}`} className="block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group cursor-pointer flex flex-col hover-card-3d rounded-xl overflow-hidden"
          >
            <div className="relative overflow-hidden bg-[#f7f8fc] aspect-square mb-4">
              {product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-[#00089d] text-white text-[9px] font-bold px-2.5 py-1 tracking-[0.2em]">
                  {product.badge}
                </div>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6 transform group-hover:scale-90 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <button type="button" className="w-full bg-[#00089d] text-white py-3.5 text-[10px] font-bold tracking-[0.25em] hover-btn-shine hover:bg-[#000672] transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>

            <h3 className="text-[11px] font-bold tracking-[0.25em] text-gray-900 uppercase mb-1 group-hover:text-[#00089d] transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-2 line-clamp-2">{product.desc}</p>
            <p className="text-sm font-semibold text-[#00089d]">{formatPerfumePrice(product.price)}</p>
          </motion.div>
        </Link>
      ))}
    </div>
  </section>
);

export default RelatedProducts;
