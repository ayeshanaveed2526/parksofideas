import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientCheckout from "./ClientCheckout";

export const metadata = {
  title: "Checkout — ELIX BY IR | Parks of Ideas",
  description: "Secure checkout for your ELIX fragrances.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <ClientCheckout />
      <Footer />
    </main>
  );
}
