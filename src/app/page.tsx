import Header from "./components/Header";
import Herosection from "./components/Herosection";
import ShopByCategory from "./components/ShopByCategory";
import TopCategory from "./components/TopCategory";
import VideoSection from "./components/VideoSection";
import NewProducts from "./components/NewProducts";
import FBottomBar from "./components/FBottomBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <Header />
      <Herosection />
      <ShopByCategory />
      <TopCategory />
      <VideoSection />
      <NewProducts />
      <FBottomBar />
      <Footer />
    </main>
  );
}
