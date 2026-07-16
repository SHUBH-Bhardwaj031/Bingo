import {
  Clock3,
  Star,
  Heart,
  MapPin,
  Bike,
} from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        border
        border-gray-100
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        duration-300
        cursor-pointer
      "
    >
      {/* IMAGE */}

      <div className="relative h-60 overflow-hidden">

        {/* Placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-orange-300 via-orange-400 to-red-500 flex items-center justify-center">

          <span className="text-8xl">
            🍔
          </span>

        </div>

        {/* IMAGE LATER */}
        {/* <img src={restaurant.image} className="..." /> */}

        {/* OFFER */}

        <div className="absolute left-4 bottom-4">

          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">

            50% OFF

          </span>

        </div>

        {/* WISHLIST */}

        <button
          className="
            absolute
            right-4
            top-4
            w-11
            h-11
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            shadow-lg
            hover:bg-red-500
            hover:text-white
            duration-300
          "
        >
          <Heart size={20} />
        </button>
      </div>

      {/* CONTENT */}

      <div className="p-5">

        {/* NAME */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold">

              {restaurant.name}

            </h2>

            <p className="text-gray-500 text-sm mt-1">

              {restaurant.cuisine}

            </p>

          </div>

          {/* RATING */}

          <div
            className="
              bg-green-600
              text-white
              px-2
              py-1
              rounded-xl
              flex
              items-center
              gap-1
              text-sm
              font-semibold
            "
          >
            <Star size={14} fill="white" />

            {restaurant.rating}

          </div>

        </div>

        {/* INFO */}

        <div className="flex items-center gap-5 mt-5 text-sm text-gray-600">

          <div className="flex items-center gap-2">

            <Clock3 size={17} />

            {restaurant.time}

          </div>

          <div className="flex items-center gap-2">

            <MapPin size={17} />

            {restaurant.distance}

          </div>

        </div>

        {/* TAGS */}

        <div className="flex flex-wrap gap-2 mt-5">

          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">

            Free Delivery

          </span>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">

            Pure Veg

          </span>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">

            Bestseller

          </span>

        </div>

        {/* PRICE */}

        <div className="flex justify-between items-center mt-6">

          <div>

            <p className="text-xs text-gray-400">

              Cost for two

            </p>

            <h3 className="font-bold text-lg">

              ₹{restaurant.price}

            </h3>

          </div>

          <button
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              rounded-2xl
              px-6
              py-3
              font-semibold
              flex
              items-center
              gap-2
              duration-300
            "
          >
            <Bike size={18} />

            Order
          </button>

        </div>

      </div>
    </div>
  );
}