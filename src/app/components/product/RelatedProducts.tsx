'use client';

import React from 'react';
import { motion } from 'framer-motion';

const relatedProducts = [
  {
    id: '101',
    name: 'FLOWERBOMB',
    desc: 'Vert de Bergamot, Coco de Mer Accord.',
    price: 200.00,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop', // Substitute with real image
    badge: null
  },
  {
    id: '102',
    name: 'PURITY MADE CLEANSER',
    desc: 'Top-selling facial cleanser.',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    badge: 'FEATURED'
  },
  {
    id: '103',
    name: 'VOCE VIVA EAU DE PARFUM',
    desc: 'Italian Bergamot, Orange Blossom Absolute.',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1523293115678-d2902f520b22?q=80&w=600&auto=format&fit=crop',
    badge: 'FEATURED'
  }
];

const RelatedProducts: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-20 py-10 bg-[#f9f9f9]">
      <h2 className="text-center text-2xl font-serif tracking-widest text-black mb-12 uppercase">
        Related Products
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
        {relatedProducts.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white p-6 group cursor-pointer relative shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-[450px]"
          >
            {product.badge && (
              <div className="absolute top-4 right-4 bg-[#e6c1b3] text-white text-[10px] font-bold px-2 py-1 tracking-wider z-10">
                {product.badge}
              </div>
            )}
            
            <div className="w-full h-64 mb-6 relative overflow-hidden flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Hover Add to Cart Button */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-black text-white py-3 text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors">
                  ADD TO CART
                </button>
              </div>
            </div>
            
            <h3 className="font-serif text-lg tracking-widest uppercase mb-2">{product.name}</h3>
            <p className="text-gray-400 text-xs mb-4 line-clamp-2 px-4">{product.desc}</p>
            <div className="mt-auto font-semibold">${product.price.toFixed(2)}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
