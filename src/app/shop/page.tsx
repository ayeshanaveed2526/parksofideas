import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopBackground from "../components/shop/ShopBackground";
import ShopHero from "../components/shop/ShopHero";
import ShopGrid from "../components/shop/ShopGrid";

export const metadata = {
  title: "Shop — Parks of Ideas | Premium Fragrance Collection",
  description:
    "Explore our curated collection of premium eau de parfum fragrances. Shop by price, name, and discover your signature scent.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #f0f2f8 0%, #f5f7fc 30%, #eef1f8 60%, #f3f5fb 100%)" }}>
      {/* Animated geometric background */}
      <ShopBackground />

      {/* Header */}
      <Header />

      {/* Hero section */}
      <ShopHero />

      {/* Product grid with toolbar */}
      <ShopGrid />

      {/* Footer */}
      <Footer />
    </main>
  );
}
