import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  Bell,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                B
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Bingo
                </h1>

                <p className="text-xs text-gray-500">
                  Food Delivery
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
              <MapPin
                size={20}
                className="text-orange-500"
              />

              <div>
                <p className="text-xs text-gray-400">
                  Deliver to
                </p>

                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">
                    Aliganj, Lucknow
                  </span>

                  <ChevronDown
                    size={15}
                    className="group-hover:rotate-180 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 px-12">
            <div className="relative w-full">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                placeholder="Search restaurants, food..."
                className="w-full h-14 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 outline-none pl-14 pr-5 text-sm transition"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-5">
            <button className="relative hover:text-orange-500 transition">
              <Heart size={23} />
            </button>

            <button className="relative hover:text-orange-500 transition">
              <Bell size={23} />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                2
              </span>
            </button>

            <button className="relative hover:text-orange-500 transition">
              <ShoppingCart size={24} />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </button>

            <button className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
                <User
                  size={20}
                  className="text-orange-500"
                />
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-500">
                  Hello
                </p>

                <p className="font-semibold text-sm">
                  Shubham
                </p>
              </div>
            </button>
          </div>

          {/* MOBILE */}
          <button
            className="lg:hidden"
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
          >
            {mobileMenu ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      {mobileMenu && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          className="fixed top-0 right-0 h-screen w-80 bg-white z-[100] shadow-2xl p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-xl">
              Menu
            </h2>

            <button
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <X />
            </button>
          </div>

          <div className="space-y-6">
            <button className="flex items-center gap-4">
              <Heart />
              Wishlist
            </button>

            <button className="flex items-center gap-4">
              <ShoppingCart />
              Cart
            </button>

            <button className="flex items-center gap-4">
              <Bell />
              Notifications
            </button>

            <button className="flex items-center gap-4">
              <User />
              Profile
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}