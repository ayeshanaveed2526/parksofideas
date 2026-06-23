'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ProductGalleryProps {
  images: string[];
}

// A simple 3D plane with the texture
const ThreeDImage = ({ url }: { url: string }) => {
  const texture = useTexture(url);
  
  return (
    <mesh castShadow receiveShadow>
      {/* Aspect ratio can be adjusted based on actual images */}
      <planeGeometry args={[4, 5]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 order-2 md:order-1">
        {images.map((img, idx) => (
          <div 
            key={idx}
            className={`w-20 h-24 border cursor-pointer transition-all duration-300 ${activeImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
            onClick={() => setActiveImage(img)}
          >
            {/* Using standard img for thumbnails for performance */}
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Main Image with Three.js */}
      <div className="flex-1 bg-[#f9f9f9] relative min-h-[500px] flex items-center justify-center order-1 md:order-2 overflow-hidden group">
        <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs px-2 py-1 font-bold">
          NEW
        </div>
        
        {/* Three.js Canvas */}
        <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PresentationControls 
              global 
              snap={true} 
              rotation={[0, 0, 0]} 
              polar={[-Math.PI / 10, Math.PI / 10]} 
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
                <ThreeDImage url={activeImage || '/placeholder.png'} />
              </Float>
            </PresentationControls>
            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            <Environment preset="city" />
          </Canvas>
        </div>
        
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Drag to interact
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
