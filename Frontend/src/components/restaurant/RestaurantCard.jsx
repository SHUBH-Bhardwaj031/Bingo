import { Clock3, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PLACEHOLDER =
  "https://placehold.co/800x500/F97316/FFFFFF?text=Bingo";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div
   onClick={() => navigate(`/restaurants/slug/${restaurant.slug}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer"
    >
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={restaurant.coverImage || PLACEHOLDER}
          alt={restaurant.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER;
          }}
          className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

        <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
          {restaurant.deliveryTime} min
        </span>
      </div>

      {/* Content */}

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-lg line-clamp-1">
            {restaurant.name}
          </h2>

          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <Star size={16} fill="currentColor" />
            {restaurant.rating?.toFixed(1)}
          </div>
        </div>

        <p className="text-gray-500 mt-2 text-sm line-clamp-1">
          {restaurant.cuisines?.join(", ")}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock3 size={16} />
            {restaurant.deliveryTime} min
          </div>

          <span className="font-semibold">
            ₹{restaurant.priceForTwo} for two
          </span>
        </div>
      </div>
    </div>
  );
}