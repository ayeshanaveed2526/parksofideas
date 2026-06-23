'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#fafafa] pointer-events-none">
      {/* Soft static elegant background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#d4e4e6] to-[#e8d5d9] blur-[100px] mix-blend-multiply opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#e8d1cc] to-[#e4e1f0] blur-[100px] mix-blend-multiply opacity-40" />
      <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-[#e3e7db] to-[#f0e1e9] blur-[120px] mix-blend-multiply opacity-30" />
    </div>
  );
};

export default AnimatedBackground;
