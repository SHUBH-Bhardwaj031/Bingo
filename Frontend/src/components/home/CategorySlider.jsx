import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import { serverUrl } from "../../App";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/categories`
      );

      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">

      {/* Heading */}

      <div className="flex items-center justify-between mb-7">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            What's on your mind?
          </h2>

          <p className="text-gray-500 mt-1">
            Explore categories
          </p>

        </div>

        <button className="flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all">

          View All

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="flex gap-6 overflow-x-auto">

          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="w-28 h-28 rounded-full bg-gray-200 animate-pulse flex-shrink-0"
            />
          ))}

        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">

          {categories.map((category) => (

            <div
              key={category._id}
              className="group flex-shrink-0 cursor-pointer"
            >

              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  bg-white
                  shadow-md
                  border
                  border-gray-100
                  flex
                  items-center
                  justify-center
                  text-5xl
                  transition-all
                  duration-300
                  group-hover:bg-orange-500
                  group-hover:scale-110
                  group-hover:shadow-xl
                "
              >

                <span className="transition-all duration-300 group-hover:scale-125">

                  {category.icon}

                </span>

              </div>

              <h3 className="text-center mt-4 font-semibold text-gray-700 group-hover:text-orange-500 transition">

                {category.name}

              </h3>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}