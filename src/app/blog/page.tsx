import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogPageContent from "../components/blog/BlogPageContent";

export const metadata = {
  title: "Blog — Parks of Ideas | Fragrance Stories & Guides",
  description:
    "Discover inspiration, tips, and stories about fragrance, lifestyle, and the art of scent from Parks of Ideas.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <BlogPageContent />
      <Footer />
    </main>
  );
}
