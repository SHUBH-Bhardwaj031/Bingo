import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  {
    id: 1,
    title: "Hungry?",
    subtitle: "Flat 50% OFF on your first order",
    description: "Order your favourite food in minutes.",
    button: "Order Now",
    bg: "from-orange-500 via-orange-400 to-yellow-400",
  },
  {
    id: 2,
    title: "Weekend Special",
    subtitle: "Free Delivery on orders above ₹299",
    description: "Enjoy delicious meals without delivery charges.",
    button: "Explore",
    bg: "from-red-500 via-orange-500 to-yellow-500",
  },
  {
    id: 3,
    title: "Midnight Cravings",
    subtitle: "Restaurants open till 3 AM",
    description: "Late night? We've got you covered.",
    button: "Browse Restaurants",
    bg: "from-slate-900 via-slate-800 to-slate-700",
  },
];

export default function HeroSlider() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        spaceBetween={20}
        className="rounded-3xl overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className={`relative h-[420px] rounded-3xl bg-gradient-to-r ${banner.bg} overflow-hidden`}
            >
              {/* Background Blur Circle */}
              <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-black/10 blur-3xl"></div>

              <div className="relative z-10 flex items-center justify-between h-full px-14">
                {/* LEFT CONTENT */}
                <div className="max-w-xl text-white">
                  <span className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
                    🔥 Limited Time Offer
                  </span>

                  <h1 className="text-6xl font-extrabold leading-tight">
                    {banner.title}
                  </h1>

                  <h2 className="text-3xl font-semibold mt-3">
                    {banner.subtitle}
                  </h2>

                  <p className="text-white/80 mt-6 text-lg leading-8">
                    {banner.description}
                  </p>

                  <button className="mt-8 px-8 py-4 rounded-2xl bg-white text-orange-600 font-bold text-lg hover:scale-105 transition duration-300 shadow-xl">
                    {banner.button}
                  </button>
                </div>

                {/* RIGHT SIDE PLACEHOLDER */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-[360px] h-[360px] rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-8xl">🍔</div>

                      <p className="mt-6 text-xl font-semibold">
                        Food Image
                      </p>

                      <p className="text-sm opacity-70">
                        Replace with asset later
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Cards */}
              <div className="hidden xl:block absolute right-10 bottom-10 bg-white rounded-2xl p-5 shadow-2xl w-56">
                <p className="text-gray-500 text-sm">
                  Delivery Time
                </p>

                <h3 className="text-3xl font-bold text-orange-500">
                  25 mins
                </h3>

                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}