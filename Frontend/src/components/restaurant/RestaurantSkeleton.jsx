export default function RestaurantSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">

      <div className="h-48 bg-gray-200" />

      <div className="p-4">

        <div className="h-5 w-40 bg-gray-200 rounded mb-3" />

        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />

        <div className="h-4 w-32 bg-gray-200 rounded mb-4" />

        <div className="flex justify-between">

          <div className="h-4 w-16 bg-gray-200 rounded" />

          <div className="h-4 w-12 bg-gray-200 rounded" />

        </div>

      </div>

    </div>
  );
}