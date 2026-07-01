import Header from "../components/Header";
import Footer from "../components/Footer";
import CartPageContent from "../components/cart/CartPageContent";

export const metadata = {
  title: "Shopping Cart — ELIX BY IR | Parks of Ideas",
  description:
    "Review your ELIX fragrance cart and proceed to checkout. Free shipping on orders over $75.",
};

export default function CartPage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <CartPageContent />
      <Footer />
    </main>
  );
}
