import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Search,
  Star,
  Clock3,
  Heart,
  Plus,
  Flame,
  Leaf,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { serverUrl } from "../App";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Footer from "../components/layout/Footer";

export default function CategoryPage() {

  const { category } = useParams();

  const [loading, setLoading] = useState(true);

  const [categoryData, setCategoryData] = useState(null);

  const [foods, setFoods] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [sortBy, setSortBy] = useState("rating");

  const getFoods = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `${serverUrl}/api/foods/category/${category}`,
        {
          withCredentials: true,
        }
      );

      setCategoryData(data.category);

      setFoods(data.foods || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

const addToCart = async (foodId) => {
  try {
    const { data } = await axios.post(
      `${serverUrl}/api/cart/add`,
      {
        foodId,
      },
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      const addedFood = foods.find(
        (food) => food._id === foodId
      );

      toast.success(
        <div className="flex items-center gap-3 min-w-[280px]">

          <img
            src={addedFood?.image}
            alt={addedFood?.name}
            className="w-12 h-12 rounded-xl object-cover"
          />

          <div className="flex-1">
            <p className="font-bold text-gray-900">
              Added to cart
            </p>

            <p className="text-sm text-gray-500 truncate">
              {addedFood?.name}
            </p>

            <p className="text-sm font-semibold text-orange-500">
              ₹
              {addedFood?.discountPrice ||
                addedFood?.price}
            </p>
          </div>

        </div>,
        {
          duration: 2200,
          position: "bottom-right",

          style: {
            borderRadius: "18px",
            padding: "10px 14px",
            background: "#ffffff",
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.15)",
          },

          icon: null,
        }
      );
    }

  } catch (error) {

    console.error("Add To Cart Error:", error);

    toast.error(
      error.response?.data?.message ||
        "Please login to add items to cart",
      {
        duration: 2500,
        position: "bottom-right",
      }
    );

  }
};
  useEffect(() => {

    getFoods();

  }, [category]);

  const filteredFoods = useMemo(() => {

    let result = [...foods];

    if (search) {

      result = result.filter((food) =>
        food.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (filter === "veg") {

      result = result.filter((food) => food.isVeg);

    }

    if (filter === "nonveg") {

      result = result.filter((food) => !food.isVeg);

    }

    switch (sortBy) {

      case "priceLow":

        result.sort((a, b) => a.price - b.price);

        break;

      case "priceHigh":

        result.sort((a, b) => b.price - a.price);

        break;

      case "rating":

        result.sort((a, b) => b.rating - a.rating);

        break;

      default:

        break;

    }

    return result;

  }, [foods, search, filter, sortBy]);



return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gray-50">

      {/* HERO */}

      <section className="relative h-[340px] overflow-hidden">

        <img
          src={
            categoryData?.banner ||
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
          }
          alt={categoryData?.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-10">

          <span className="inline-flex w-fit rounded-full bg-orange-500 px-5 py-2 text-white font-semibold">
            Explore Category
          </span>

          <h1 className="mt-5 text-5xl font-bold text-white">
            {categoryData?.name}
          </h1>

          <p className="mt-3 text-lg text-white/80 max-w-2xl">
            {categoryData?.description}
          </p>

          <div className="mt-8 flex gap-10">

            <div>

              <h2 className="text-3xl font-bold text-white">
                {foods.length}
              </h2>

              <p className="text-white/70">
                Food Items
              </p>

            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                4.8
              </h2>

              <p className="text-white/70">
                Average Rating
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* SEARCH */}

      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-wrap gap-5 items-center justify-between">

          <div className="relative flex-1 min-w-[320px]">

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${categoryData?.name || ""}`}
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-gray-200
                bg-white
                pl-14
                pr-5
                outline-none
                transition
                focus:ring-4
                focus:ring-orange-100
                focus:border-orange-500
              "
            />

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-3 rounded-xl transition ${
                filter === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-white border"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("veg")}
              className={`px-5 py-3 rounded-xl transition ${
                filter === "veg"
                  ? "bg-green-500 text-white"
                  : "bg-white border"
              }`}
            >
              Veg
            </button>

            <button
              onClick={() => setFilter("nonveg")}
              className={`px-5 py-3 rounded-xl transition ${
                filter === "nonveg"
                  ? "bg-red-500 text-white"
                  : "bg-white border"
              }`}
            >
              Non Veg
            </button>

          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-14 rounded-xl border bg-white px-5"
          >

            <option value="rating">
              Top Rated
            </option>

            <option value="priceLow">
              Price Low → High
            </option>

            <option value="priceHigh">
              Price High → Low
            </option>

          </select>

        </div>

      </section>

      {/* FOOD GRID */}

   {/* FOOD GRID */}

<section className="max-w-7xl mx-auto px-6 pb-16">

  {loading ? (

    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7">

      {[...Array(8)].map((_, i) => (

        <div
          key={i}
          className="h-[370px] rounded-3xl bg-gray-200 animate-pulse"
        />

      ))}

    </div>

  ) : filteredFoods.length === 0 ? (

    <div className="text-center py-24">

      <h2 className="text-3xl font-bold">
        No Food Found
      </h2>

      <p className="mt-3 text-gray-500">
        Try another search or filter.
      </p>

    </div>

  ) : (

    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7">

      {filteredFoods.map((food) => (

        <div
          key={food._id}
          className="group rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
        >

          {/* IMAGE */}

          <div className="relative h-56 overflow-hidden">

            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow">

              <Star
                size={14}
                fill="currentColor"
                className="text-yellow-500"
              />

              <span className="text-sm font-semibold">
                {food.rating}
              </span>

            </div>

            <div className="absolute top-4 right-4">

  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-500 hover:text-white transition">

    <Heart size={18} />

  </button>

</div>

{food.isBestSeller && (

  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">

    <Flame size={12} />

    Bestseller

  </div>

)}

          </div>

          {/* CONTENT */}

          <div className="p-5">

            <div className="flex items-center justify-between">

              <h2 className="font-bold text-xl line-clamp-1">
                {food.name}
              </h2>

             <div
  className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
    food.isVeg
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"
  }`}
>

  <Leaf size={12} />

  {food.isVeg ? "Veg" : "Non Veg"}

</div>

            </div>

           <p className="text-gray-500 mt-2 text-sm">
  {food.restaurant?.name}
</p>

<p className="text-xs text-orange-500 mt-2">
  ⭐ {food.totalReviews} Reviews
</p>

            <div className="flex justify-between mt-5 text-sm">

              <div className="flex items-center gap-2">

                <Clock3 size={16} />

                {food.preparationTime} min

              </div>

              <div className="font-semibold">

                ⭐ {food.rating}

              </div>

            </div>

            <div className="flex justify-between items-center mt-6">

              <div>

                <h2 className="text-2xl font-bold">

                  ₹{food.discountPrice || food.price}

                </h2>

                {food.discountPrice > 0 && (

                  <p className="text-sm text-gray-400 line-through">

                    ₹{food.price}

                  </p>

                )}

              </div>
<button
  onClick={() => addToCart(food._id)}
  className="
    flex
    items-center
    gap-2
    bg-orange-500
    hover:bg-orange-600
    text-white
    px-5
    py-3
    rounded-xl
    font-semibold
    transition
    hover:scale-105
  "
>
  <Plus size={18} />
  ADD
</button>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</section>

     </div>

    {/* Footer */}
    <Footer />

  </>
);
}