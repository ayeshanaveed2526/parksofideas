import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactPageContent from "../components/contact/ContactPageContent";

export const metadata = {
  title: "Contact Us — ELIX BY IR | Parks of Ideas",
  description:
    "Get in touch with ELIX BY IR for orders, returns, product questions, and partnerships. We're here to help.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <ContactPageContent />
      <Footer />
    </main>
  );
}
