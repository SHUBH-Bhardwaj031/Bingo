import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Star, Clock3, MapPin, IndianRupee } from "lucide-react";

import { serverUrl } from "../App";
import Navbar from "../components/layout/Navbar";

const PLACEHOLDER =
  "https://placehold.co/1400x500/F97316/FFFFFF?text=Bingo";

export default function RestaurantDetails() {
  const { slug } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRestaurant = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/restaurants/slug/${slug}`,
        {
          withCredentials: true,
        }
      );

      setRestaurant(data.restaurant);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Restaurant...
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Restaurant Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FB]">

      <Navbar />

      {/* Cover */}

      <div className="relative">

        <img
          src={restaurant.coverImage || PLACEHOLDER}
          alt={restaurant.name}
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
          className="w-full h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute bottom-10 left-10 flex items-center gap-6">

          <img
            src={restaurant.logo || PLACEHOLDER}
            alt=""
            className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl"
          />

          <div className="text-white">

            <h1 className="text-5xl font-bold">
              {restaurant.name}
            </h1>

            <p className="text-lg mt-3 opacity-90">
              {restaurant.description}
            </p>

          </div>

        </div>

      </div>

      {/* Details */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl p-5 shadow">

            <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
              <Star fill="currentColor" size={20} />
              {restaurant.rating}
            </div>

            <p className="text-gray-500 mt-2">
              {restaurant.totalReviews} Reviews
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow">

            <div className="flex items-center gap-2 font-bold text-xl">

              <Clock3 />

              {restaurant.deliveryTime} min

            </div>

            <p className="text-gray-500 mt-2">
              Estimated Delivery
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow">

            <div className="flex items-center gap-2 font-bold text-xl">

              <IndianRupee />

              {restaurant.priceForTwo}

            </div>

            <p className="text-gray-500 mt-2">
              For Two
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow">

            <div className="flex items-center gap-2 font-bold">

              <MapPin />

              {restaurant.city}

            </div>

            <p className="text-gray-500 mt-2">
              {restaurant.address}
            </p>

          </div>

        </div>

        {/* Cuisines */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-5">

            Cuisines

          </h2>

          <div className="flex flex-wrap gap-4">

            {restaurant.cuisines.map((item) => (
              <span
                key={item}
                className="px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-medium"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

        {/* Offers */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-6">

            Available Offers

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {restaurant.offers.map((offer) => (
              <div
                key={offer._id}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-bold">
                  {offer.title}
                </h3>

                <p className="opacity-90 mt-2">
                  Enjoy this offer on your next order.
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Next Step */}

        <div className="mt-16 rounded-2xl bg-white shadow p-10">

          <h2 className="text-3xl font-bold">

            Menu

          </h2>

          <p className="text-gray-500 mt-3">

            Food items will appear here in the next step.

          </p>

        </div>

      </section>

    </main>
  );
}