import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import { serverUrl } from "../../App";

export default function CategorySlider({
  clickable = true,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ===========================
     GET CATEGORIES
  =========================== */

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/categories`
      );

      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  /* ===========================
     CATEGORY CLICK
  =========================== */

  const handleCategoryClick = (category) => {
    if (!clickable) return;

    navigate(`/category/${category.slug}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">

      {/* ===========================
          HEADING
      =========================== */}

      <div className="flex items-center justify-between mb-7">

        <div>

          <h2 className="text-3xl font-bold text-gray-900">
            What's on your mind?
          </h2>

          <p className="text-gray-500 mt-1">
            Explore categories
          </p>

        </div>

        {/* View All */}

        {clickable && (
          <button
            onClick={() => navigate("/restaurants")}
            className="
              flex
              items-center
              gap-2
              text-orange-500
              font-semibold
              hover:gap-3
              transition-all
            "
          >
            View All

            <ChevronRight size={18} />
          </button>
        )}

      </div>

      {/* ===========================
          LOADING
      =========================== */}

      {loading ? (
        <div className="flex gap-6 overflow-x-auto">

          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="
                w-28
                h-28
                rounded-full
                bg-gray-200
                animate-pulse
                flex-shrink-0
              "
            />
          ))}

        </div>
      ) : (

        /* ===========================
           CATEGORIES
        =========================== */

        <div
          className="
            flex
            gap-6
            overflow-x-auto
            scrollbar-hide
            pb-4
          "
        >

          {categories.map((category) => (

            <div
              key={category._id}
              onClick={() =>
                handleCategoryClick(category)
              }
              className={`
                group
                flex-shrink-0
                ${
                  clickable
                    ? "cursor-pointer"
                    : "cursor-default"
                }
              `}
            >

              {/* IMAGE */}

              <div
                className={`
                  w-28
                  h-28
                  rounded-full
                  bg-white
                  shadow-md
                  border
                  border-gray-100
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  ${
                    clickable
                      ? "group-hover:scale-110 group-hover:shadow-xl"
                      : ""
                  }
                `}
              >

                <img
                  src={category.icon}
                  alt={category.name}
                  className={`
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-300
                    ${
                      clickable
                        ? "group-hover:scale-110"
                        : ""
                    }
                  `}
                  loading="lazy"
                />

              </div>

              {/* NAME */}

              <h3
                className={`
                  text-center
                  mt-4
                  font-semibold
                  text-gray-700
                  transition
                  ${
                    clickable
                      ? "group-hover:text-orange-500"
                      : ""
                  }
                `}
              >
                {category.name}
              </h3>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}