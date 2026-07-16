import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import CategorySlider from "../components/home/CategorySlider";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FB]">
      <Navbar />

      <HeroSlider />

      <CategorySlider />

      {/* Restaurant Listing */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <RestaurantGrid
          restaurants={[]}
          loading={true}
        />
      </section>
    </main>
  );
}