import { ChevronRight } from "lucide-react";

const categories = [
  { id: 1, name: "Pizza", icon: "🍕" },
  { id: 2, name: "Burger", icon: "🍔" },
  { id: 3, name: "Biryani", icon: "🍛" },
  { id: 4, name: "Chinese", icon: "🍜" },
  { id: 5, name: "Momos", icon: "🥟" },
  { id: 6, name: "Coffee", icon: "☕" },
  { id: 7, name: "Dessert", icon: "🍰" },
  { id: 8, name: "Drinks", icon: "🥤" },
  { id: 9, name: "Healthy", icon: "🥗" },
  { id: 10, name: "Rolls", icon: "🌯" },
];

export default function CategorySlider() {
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

      {/* Categories */}

      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">

        {categories.map((item) => (

          <div
            key={item.id}
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
                {item.icon}
              </span>
            </div>

            <h3 className="text-center mt-4 font-semibold text-gray-700 group-hover:text-orange-500 transition">
              {item.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}