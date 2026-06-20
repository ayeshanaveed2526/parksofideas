import Header from "./components/Header";
import Herosection from "./components/Herosection";
import ShopByCategory from "./components/ShopByCategory";
import TopCategory from "./components/TopCategory";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Herosection />
      <ShopByCategory />
      <TopCategory />
    </main>
  );
}
