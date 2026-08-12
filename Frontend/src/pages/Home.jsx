import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  ShieldCheck,
  Sparkles,
  Tag,
  Utensils,
} from "lucide-react";

import { serverUrl } from "../App";

import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import CategorySlider from "../components/home/CategorySlider";
import RestaurantGrid from "../components/restaurant/RestaurantGrid";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRestaurants = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${serverUrl}/api/restaurants`,
        {
          params: {
            page: 1,
            limit: 100,
          },
          withCredentials: true,
        }
      );

      setRestaurants(data.restaurants || []);
    } catch (error) {
      console.error("Home restaurants error:", error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const popularRestaurants = restaurants.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F8F9FB]">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= HERO ================= */}

      <HeroSlider />

      {/* ================= CATEGORIES ================= */}

      <section className="pt-2">
     <CategorySlider clickable={false} />
      </section>

      {/* ================= POPULAR RESTAURANTS ================= */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">

          <div>
            <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm uppercase tracking-wider">
              <Sparkles size={17} />
              <span>Handpicked for you</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Popular Restaurants
            </h2>

            <p className="text-gray-500 mt-2 max-w-xl">
              Discover top-rated restaurants and order your favourite meals
              without the wait.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="
              inline-flex
              items-center
              gap-2
              text-orange-500
              font-semibold
              hover:text-orange-600
              transition
            "
          >
            View All
            <ArrowRight size={18} />
          </Link>

        </div>

       <RestaurantGrid
  restaurants={popularRestaurants}
  loading={loading}
  clickable={false}
/>
        {!loading && restaurants.length > 6 && (
          <div className="flex justify-center mt-10">

            <Link
              to="/restaurants"
              className="
                inline-flex
                items-center
                gap-2
                px-7
                py-3.5
                rounded-xl
                bg-orange-500
                text-white
                font-semibold
                shadow-lg
                shadow-orange-200
                hover:bg-orange-600
                hover:-translate-y-0.5
                transition-all
              "
            >
              Explore All Restaurants
              <ArrowRight size={18} />
            </Link>

          </div>
        )}

      </section>

      {/* ================= WHY BINGO ================= */}

      <section className="bg-white border-y border-gray-100">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center max-w-2xl mx-auto mb-10">

            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Why Bingo?
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Everything you need for a better meal
            </h2>

            <p className="text-gray-500 mt-3">
              From discovering your next favourite restaurant to getting it
              delivered, Bingo keeps food ordering simple.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Fast Delivery */}

            <div className="group rounded-2xl border border-gray-100 bg-[#F8F9FB] p-7 hover:-translate-y-1 hover:shadow-lg transition-all">

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Clock3 size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Get your favourite meals delivered fresh and right on time.
              </p>

            </div>

            {/* Great Restaurants */}

            <div className="group rounded-2xl border border-gray-100 bg-[#F8F9FB] p-7 hover:-translate-y-1 hover:shadow-lg transition-all">

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Utensils size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Great Restaurants
              </h3>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Explore a curated selection of restaurants and delicious
                cuisines.
              </p>

            </div>

            {/* Best Offers */}

            <div className="group rounded-2xl border border-gray-100 bg-[#F8F9FB] p-7 hover:-translate-y-1 hover:shadow-lg transition-all">

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Tag size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Best Offers
              </h3>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Enjoy exciting deals and great value every time you order.
              </p>

            </div>

            {/* Secure Ordering */}

            <div className="group rounded-2xl border border-gray-100 bg-[#F8F9FB] p-7 hover:-translate-y-1 hover:shadow-lg transition-all">

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Secure Ordering
              </h3>

              <p className="text-gray-500 mt-2 leading-relaxed">
                A simple and secure ordering experience from start to finish.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            px-7
            py-12
            md:px-12
            md:py-14
            shadow-xl
          "
        >

          {/* Decorative circles */}

          <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10" />

          <div className="absolute -right-8 -bottom-24 w-56 h-56 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="text-white max-w-2xl">

              <p className="text-white/80 font-semibold text-sm uppercase tracking-wider">
                Your next meal is waiting
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Hungry? Let's fix that.
              </h2>

              <p className="text-white/85 mt-3 text-lg">
                Find something delicious from your favourite restaurants and
                get it delivered to your doorstep.
              </p>

            </div>

            <Link
              to="/restaurants"
              className="
                shrink-0
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-3.5
                rounded-xl
                bg-white
                text-orange-600
                font-bold
                shadow-lg
                hover:bg-gray-50
                hover:-translate-y-0.5
                transition-all
              "
            >
              Explore Restaurants
              <ArrowRight size={19} />
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <Footer />

    </main>
  );
}