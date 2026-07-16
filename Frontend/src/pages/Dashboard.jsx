import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import CategorySlider from "../components/home/CategorySlider";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#F8F9FB]">

      <Navbar />

      <HeroSlider />

      <CategorySlider />

    </main>
  );
}