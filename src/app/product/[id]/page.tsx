import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductHero from '../../components/product/ProductHero';
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import ProductTabs from '../../components/product/ProductTabs';
import RelatedProducts from '../../components/product/RelatedProducts';
import AnimatedBackground from '../../components/product/AnimatedBackground';
import PageTransition from '../../components/product/PageTransition';
import { mockProducts } from '../../data/mockProducts';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  // Try to find the product by ID, otherwise use the first mock product for demonstration
  const product = mockProducts[id] || Object.values(mockProducts)[0];

  if (!product) {
    notFound();
  }

  // Ensure there are at least 3 images for the gallery
  const galleryImages = product.images.length > 0 
    ? product.images 
    : [
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop'
      ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent">
      <AnimatedBackground />
      <PageTransition>
      <div className="relative z-10">
        <Header />
      
      <ProductHero category={product.category} productName={product.name} />

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Gallery */}
          <div className="w-full">
            <ProductGallery images={galleryImages} />
          </div>

          {/* Right Column: Info */}
          <div className="w-full">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs product={product} />

        <RelatedProducts />
        <Footer />
      </div>
      </PageTransition>
    </main>
  );
}
