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
import { getProductGalleryViews } from '../../data/perfumeCatalog';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  // Try to find the product by ID, otherwise use the first mock product for demonstration
  const product = mockProducts[id] || Object.values(mockProducts)[0];

  if (!product) {
    notFound();
  }

  const galleryViews = getProductGalleryViews(Number(id));

  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent">
      <AnimatedBackground />
      <PageTransition>
      <div className="relative z-10">
        <Header />
      
      <ProductHero category={product.category} productName={product.name} />

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 lg:pt-14 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="w-full lg:sticky lg:top-[136px] lg:self-center">
            <ProductGallery views={galleryViews} />
          </div>

          <div className="flex w-full items-center lg:min-h-[520px]">
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <ProductTabs product={product} />

        <RelatedProducts />
        <Footer />
      </div>
      </PageTransition>
    </main>
  );
}
