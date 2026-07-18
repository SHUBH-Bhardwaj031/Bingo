import { useState, useEffect, useRef } from "react";
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
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import bingoLogo from '../../assets/Bingo_Logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    setMobileMenu(false);
    await logout();
    navigate("/signin");
  };

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
                  <img src={bingoLogo} alt="Bingo" className="w-10 h-10 rounded-xl object-contain" />

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

            {/* PROFILE + DROPDOWN */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2"
              >
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
                    {user?.firstName || "there"}
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className={`transition ${profileMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
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

          {user && (
            <div className="mb-6 pb-6 border-b border-gray-100">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          )}

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

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 text-red-500"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}