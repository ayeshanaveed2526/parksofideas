import Header from "../components/Header";
import Footer from "../components/Footer";
import WishlistPageContent from "../components/wishlist/WishlistPageContent";

export const metadata = {
  title: "My Wishlist — ELIX BY IR | Parks of Ideas",
  description:
    "View and manage your saved ELIX fragrances. Start shopping to discover your next signature scent.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <WishlistPageContent />
      <Footer />
    </main>
  );
}
