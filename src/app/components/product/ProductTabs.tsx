'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/mockProducts';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');

  const tabs = [
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'additional', label: 'ADDITIONAL INFORMATION' },
    { id: 'reviews', label: 'REVIEWS' },
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto my-20"
    >
      {/* Tab Headers */}
      <div className="flex justify-center gap-4 border-b border-gray-200 mb-8 pb-4 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`poi-btn px-8 py-3.5 text-[11px] font-semibold tracking-[0.14em] relative${
              activeTab === tab.id ? " poi-btn-active" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-gray-500 text-sm leading-relaxed flex flex-col md:flex-row gap-8"
          >
            {activeTab === 'description' && (
              <>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1"
                >
                  <h3 className="text-2xl font-serif text-black mb-4 uppercase tracking-widest">From Lady Gaga</h3>
                  <p className="leading-relaxed">{product.description}</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex-1"
                >
                  <div className="w-full h-80 bg-gray-100 flex items-center justify-center relative overflow-hidden group hover-lift rounded-sm">
                     {/* Replace with actual image related to description, simulating Lady Gaga image */}
                     <div className="absolute inset-0 bg-pink-600/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
                     <img src="/images/products/elix-02.png" alt="Elysia Eau de Parfum" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                     <h2 className="absolute bottom-10 right-10 text-white font-serif text-4xl font-bold z-20 mix-blend-overlay">VOCE<br/>VIVA</h2>
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 'additional' && (
              <div className="w-full">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-4 text-gray-800 font-semibold w-1/4">Weight</th>
                      <td className="py-4">{product.additionalInfo.weight}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-4 text-gray-800 font-semibold w-1/4">Dimensions</th>
                      <td className="py-4">{product.additionalInfo.dimensions}</td>
                    </tr>
                    <tr>
                      <th className="py-4 text-gray-800 font-semibold w-1/4 align-top">Ingredients</th>
                      <td className="py-4">{product.additionalInfo.ingredients}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="w-full space-y-6">
                {product.reviews.map((review, idx) => (
                  <div key={idx} className="border-b pb-6 hover-lift-sm transition-all duration-300 rounded-lg px-2 -mx-2 hover:bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold text-black">{review.author}</div>
                      <div className="flex text-yellow-400 text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                    </div>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductTabs;
