import { useEffect, useState } from "react";
import axios from "axios";

import { serverUrl } from "../App";

import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import CategorySlider from "../components/home/CategorySlider";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";

export default function RestaurantListing() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const getRestaurants = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${serverUrl}/api/restaurants`,
        {
          params: {
            search,
            page: 1,
            limit: 100,
          },
          withCredentials: true,
        }
      );

      setRestaurants(data.restaurants || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    getRestaurants();
  }, []);

  // Search (500ms debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      getRestaurants();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="min-h-screen bg-[#F8F9FB]">

      <Navbar />

      <HeroSlider />

      <CategorySlider />

      {/* Search */}

      <section className="max-w-7xl mx-auto px-6 mt-10">

        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            text-lg
            outline-none
            transition
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        />

      </section>

      {/* Restaurants */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold">

              Restaurants Near You

            </h2>

            <p className="text-gray-500 mt-1">

              {restaurants.length} restaurants available

            </p>

          </div>

        </div>

        <RestaurantGrid
          restaurants={restaurants}
          loading={loading}
        />

      </section>

    </main>
  );
}