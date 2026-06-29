import Header from "./components/Header";
import Herosection from "./components/Herosection";
import TickerBar from "./components/TickerBar";
import ShopByCategory from "./components/ShopByCategory";
import TopCategory from "./components/TopCategory";
import VideoSection from "./components/VideoSection";
import NewProducts from "./components/NewProducts";
import TrustBadges from "./components/TrustBadges";
import FBottomBar from "./components/FBottomBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <Header />
      <Herosection />
      <TickerBar />
      <ShopByCategory />
      <TopCategory />
      <VideoSection />
      <NewProducts />
      <TrustBadges />
      <FBottomBar />
      <Footer />
    </main>
  );
}
