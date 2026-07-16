import RestaurantCard from "./RestaurantCard";
import RestaurantSkeleton from "./RestaurantSkeleton";

export default function RestaurantGrid({
  restaurants,
  loading,
}) {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {[...Array(8)].map((_, index) => (
          <RestaurantSkeleton key={index} />
        ))}

      </div>
    );
  }

  if (!restaurants.length) {
    return (
      <div className="py-24 text-center">

        <h2 className="text-2xl font-bold">

          No Restaurants Found

        </h2>

        <p className="text-gray-500 mt-2">

          Try changing your search.

        </p>

      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant._id}
          restaurant={restaurant}
        />
      ))}

    </div>
  );
}