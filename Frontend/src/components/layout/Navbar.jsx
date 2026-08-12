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
  Sparkles,
  LocateFixed,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import bingoLogo from "../../assets/Bingo_Logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);

  /* ==========================================
     LOCATION STATE
  ========================================== */

  const [currentLocation, setCurrentLocation] =
    useState("");

  const [locationLoading, setLocationLoading] =
    useState(true);

  const [locationError, setLocationError] =
    useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  /* ==========================================
     PAGE CHECK
  ========================================== */

  const isHomePage = location.pathname === "/";

  const showFoodActions = !isHomePage;

  /* ==========================================
     GET CURRENT LOCATION
  ========================================== */

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationLoading(false);
      setLocationError(true);
      setCurrentLocation("Location unavailable");
      return;
    }

    setLocationLoading(true);
    setLocationError(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } =
          position.coords;

        try {
          /*
            Reverse geocoding using
            BigDataCloud's client API.
          */

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (!response.ok) {
            throw new Error(
              "Unable to detect address"
            );
          }

          const data = await response.json();

          /*
            Try to get the most useful
            locality/city information.
          */

          const locality =
            data.locality ||
            data.city ||
            data.principalSubdivision ||
            "";

          const city =
            data.city ||
            data.localityInfo?.administrative
              ?.find(
                (item) =>
                  item.adminLevel === 4 ||
                  item.adminLevel === 5
              )?.name ||
            "";

          let formattedLocation = "";

          if (
            locality &&
            city &&
            locality.toLowerCase() !==
              city.toLowerCase()
          ) {
            formattedLocation = `${locality}, ${city}`;
          } else {
            formattedLocation =
              locality ||
              city ||
              data.principalSubdivision ||
              "Current location";
          }

          setCurrentLocation(
            formattedLocation
          );

          setLocationError(false);
        } catch (error) {
          console.error(
            "Reverse geocoding error:",
            error
          );

          setCurrentLocation(
            "Current location"
          );

          setLocationError(true);
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error(
          "Geolocation error:",
          error
        );

        setLocationLoading(false);
        setLocationError(true);

        if (error.code === 1) {
          setCurrentLocation(
            "Allow location access"
          );
        } else {
          setCurrentLocation(
            "Location unavailable"
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  };

  /* ==========================================
     DETECT LOCATION ON FIRST LOAD
  ========================================== */

  useEffect(() => {
    getCurrentLocation();
  }, []);

  /* ==========================================
     SCROLL
  ========================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* ==========================================
     CLOSE PROFILE DROPDOWN
  ========================================== */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /* ==========================================
     CLOSE MOBILE ON DESKTOP
  ========================================== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  /* ==========================================
     LOCK BODY SCROLL
  ========================================== */

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  /* ==========================================
     ROUTE CHANGE
  ========================================== */

  useEffect(() => {
    setMobileMenu(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  /* ==========================================
     ACTIONS
  ========================================== */

  const handleLogout = async () => {
    setProfileMenuOpen(false);
    setMobileMenu(false);

    await logout();

    navigate("/signin");
  };

  const goHome = () => {
    setMobileMenu(false);
    navigate("/");
  };

  const goRestaurants = () => {
    setMobileMenu(false);
    navigate("/restaurants");
  };

  const openCart = () => {
    setMobileMenu(false);
    navigate("/cart");
  };

  const goWishlist = () => {
    setMobileMenu(false);
    navigate("/wishlist");
  };

  /* ==========================================
     JSX
  ========================================== */

  return (
    <>
      {/* ========================================
          NAVBAR
      ======================================== */}

      <header
        className={`
          sticky
          top-0
          z-50
          transition-all
          duration-300
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-md"
              : "bg-white"
          }
        `}
      >
        <div
          className="
            max-w-7xl
            mx-auto
            h-20
            px-4
            sm:px-6
            flex
            items-center
            justify-between
          "
        >

          {/* ====================================
              LEFT
          ==================================== */}

          <div className="flex items-center gap-10">

            {/* LOGO */}

            <button
              onClick={goHome}
              className="
                flex
                items-center
                gap-3
                cursor-pointer
              "
            >
              <img
                src={bingoLogo}
                alt="Bingo"
                className="
                  w-10
                  h-10
                  rounded-xl
                  object-contain
                "
              />

              <div className="hidden sm:block text-left">

                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                  "
                >
                  Bingo
                </h1>

                <p className="text-xs text-gray-500">
                  Food Delivery
                </p>

              </div>
            </button>

            {/* ==================================
                REAL CURRENT LOCATION
            ================================== */}

            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              className="
                hidden
                lg:flex
                items-center
                gap-2
                cursor-pointer
                group
                text-left
              "
              title="Detect current location"
            >

              <MapPin
                size={20}
                className="
                  text-orange-500
                  shrink-0
                "
              />

              <div>

                <p className="text-xs text-gray-400">
                  Deliver to
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    max-w-[210px]
                  "
                >

                  <span
                    className="
                      font-semibold
                      text-sm
                      truncate
                    "
                  >
                    {locationLoading
                      ? "Detecting location..."
                      : currentLocation ||
                        "Select your location"}
                  </span>

                  {locationLoading ? (
                    <span
                      className="
                        w-3
                        h-3
                        border-2
                        border-orange-500
                        border-t-transparent
                        rounded-full
                        animate-spin
                        shrink-0
                      "
                    />
                  ) : (
                    <ChevronDown
                      size={15}
                      className="
                        group-hover:rotate-180
                        transition
                        shrink-0
                      "
                    />
                  )}

                </div>

              </div>

            </button>

          </div>

          {/* ====================================
              HOME CENTER BRANDING
          ==================================== */}

          {isHomePage && (
            <div
              className="
                hidden
                md:flex
                flex-1
                justify-center
                px-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  text-sm
                  font-medium
                "
              >

                <Sparkles
                  size={16}
                  className="text-orange-500"
                />

                <span>
                  Fresh food. Great mood.
                </span>

                <span className="text-gray-300">
                  •
                </span>

                <span className="text-orange-500">
                  Made for you
                </span>

              </div>
            </div>
          )}

          {/* ====================================
              SEARCH
              ONLY NON-HOME PAGES
          ==================================== */}

          {!isHomePage && (
            <div
              className="
                hidden
                md:flex
                flex-1
                px-6
                lg:px-12
              "
            >
              <div className="relative w-full">

                <Search
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                  size={20}
                />

                <input
                  placeholder="Search restaurants, food..."
                  className="
                    w-full
                    h-14
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-50
                    focus:bg-white
                    focus:border-orange-500
                    outline-none
                    pl-14
                    pr-5
                    text-sm
                    transition
                  "
                />

              </div>
            </div>
          )}

          {/* ====================================
              DESKTOP RIGHT
          ==================================== */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-5
            "
          >

            {/* WISHLIST */}

            {showFoodActions && (
              <button
                onClick={goWishlist}
                className="
                  relative
                  hover:text-orange-500
                  transition
                "
                title="Wishlist"
              >
                <Heart size={23} />
              </button>
            )}

            {/* NOTIFICATIONS */}

            {showFoodActions && (
              <button
                className="
                  relative
                  hover:text-orange-500
                  transition
                "
                title="Notifications"
              >
                <Bell size={23} />

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  2
                </span>
              </button>
            )}

            {/* CART */}

            {showFoodActions && (
              <button
                onClick={openCart}
                className="
                  relative
                  hover:text-orange-500
                  transition
                "
                title="Cart"
              >
                <ShoppingCart size={24} />

                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-orange-500
                    text-white
                    text-[10px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  3
                </span>
              </button>
            )}

            {/* PROFILE */}

            <div
              className="relative"
              ref={profileRef}
            >

              <button
                onClick={() =>
                  setProfileMenuOpen(
                    (prev) => !prev
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-orange-100
                    flex
                    items-center
                    justify-center
                  "
                >
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
                  className={`
                    transition
                    ${
                      profileMenuOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </button>

              {/* PROFILE DROPDOWN */}

              <AnimatePresence>

                {profileMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    className="
                      absolute
                      right-0
                      mt-3
                      w-56
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      border-gray-100
                      overflow-hidden
                      z-[60]
                    "
                  >

                    <div
                      className="
                        px-4
                        py-3
                        border-b
                        border-gray-100
                      "
                    >

                      <p
                        className="
                          text-sm
                          font-semibold
                          truncate
                        "
                      >
                        {user?.firstName}{" "}
                        {user?.lastName}
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-400
                          truncate
                        "
                      >
                        {user?.email}
                      </p>

                    </div>

                    <button
                      onClick={handleLogout}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-sm
                        text-red-500
                        hover:bg-red-50
                        transition
                      "
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>

          {/* ====================================
              MOBILE MENU BUTTON
          ==================================== */}

          <button
            className="
              lg:hidden
              w-11
              h-11
              rounded-xl
              flex
              items-center
              justify-center
              hover:bg-gray-100
              transition
            "
            onClick={() =>
              setMobileMenu(
                (prev) => !prev
              )
            }
            aria-label="Open menu"
          >
            {mobileMenu ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>
      </header>

      {/* ========================================
          MOBILE DRAWER
      ======================================== */}

      <AnimatePresence>

        {mobileMenu && (
          <>
            {/* OVERLAY */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                fixed
                inset-0
                bg-black/30
                backdrop-blur-[2px]
                z-[90]
              "
            />

            {/* DRAWER */}

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="
                fixed
                top-0
                right-0
                h-[100dvh]
                w-[min(88vw,380px)]
                bg-white
                z-[100]
                shadow-2xl
                overflow-y-auto
              "
            >

              <div className="p-6">

                {/* DRAWER HEADER */}

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mb-8
                  "
                >

                  <div className="flex items-center gap-3">

                    <img
                      src={bingoLogo}
                      alt="Bingo"
                      className="
                        w-12
                        h-12
                        rounded-xl
                        object-contain
                      "
                    />

                    <div>

                      <h2 className="font-bold text-xl">
                        Menu
                      </h2>

                      <p className="text-xs text-gray-400">
                        Bingo Food Delivery
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="
                      w-10
                      h-10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      hover:bg-gray-100
                      transition
                    "
                    aria-label="Close menu"
                  >
                    <X size={25} />
                  </button>

                </div>

                {/* ==================================
                    MOBILE CURRENT LOCATION
                ================================== */}

                <button
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="
                    w-full
                    mb-7
                    pb-6
                    border-b
                    border-gray-100
                    flex
                    items-center
                    gap-3
                    text-left
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-orange-100
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    {locationLoading ? (
                      <span
                        className="
                          w-5
                          h-5
                          border-2
                          border-orange-500
                          border-t-transparent
                          rounded-full
                          animate-spin
                        "
                      />
                    ) : (
                      <LocateFixed
                        size={21}
                        className="text-orange-500"
                      />
                    )}
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400">
                      Deliver to
                    </p>

                    <p
                      className="
                        font-semibold
                        text-sm
                        truncate
                      "
                    >
                      {locationLoading
                        ? "Detecting location..."
                        : currentLocation ||
                          "Allow location access"}
                    </p>

                    <p
                      className="
                        text-xs
                        text-orange-500
                        mt-0.5
                      "
                    >
                      Tap to update
                    </p>

                  </div>

                </button>

                {/* USER */}

                {user && (
                  <div
                    className="
                      mb-7
                      pb-6
                      border-b
                      border-gray-100
                    "
                  >

                    <p
                      className="
                        font-semibold
                        text-lg
                      "
                    >
                      {user.firstName}{" "}
                      {user.lastName}
                    </p>

                    <p
                      className="
                        text-sm
                        text-gray-400
                        mt-1
                        truncate
                      "
                    >
                      {user.email}
                    </p>

                  </div>
                )}

                {/* MOBILE NAVIGATION */}

                <div className="space-y-2">

                  {/* HOME */}

                  <button
                    onClick={goHome}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-3
                      py-4
                      rounded-xl
                      text-left
                      text-gray-800
                      hover:bg-orange-50
                      hover:text-orange-500
                      transition
                    "
                  >
                    <MapPin size={25} />
                    Home
                  </button>

                  {/* RESTAURANTS */}

                  <button
                    onClick={goRestaurants}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-3
                      py-4
                      rounded-xl
                      text-left
                      text-gray-800
                      hover:bg-orange-50
                      hover:text-orange-500
                      transition
                    "
                  >
                    <Search size={25} />
                    Restaurants
                  </button>

                  {/* FOOD ACTIONS */}

                  {showFoodActions && (
                    <>
                      {/* WISHLIST */}

                      <button
                        onClick={goWishlist}
                        className="
                          w-full
                          flex
                          items-center
                          gap-4
                          px-3
                          py-4
                          rounded-xl
                          text-left
                          text-gray-800
                          hover:bg-orange-50
                          hover:text-orange-500
                          transition
                        "
                      >
                        <Heart size={25} />
                        Wishlist
                      </button>

                      {/* CART */}

                      <button
                        onClick={openCart}
                        className="
                          w-full
                          flex
                          items-center
                          gap-4
                          px-3
                          py-4
                          rounded-xl
                          text-left
                          text-gray-800
                          hover:bg-orange-50
                          hover:text-orange-500
                          transition
                        "
                      >
                        <ShoppingCart size={25} />

                        <span className="flex-1">
                          Cart
                        </span>

                        <span
                          className="
                            min-w-6
                            h-6
                            px-1.5
                            rounded-full
                            bg-orange-500
                            text-white
                            text-xs
                            flex
                            items-center
                            justify-center
                          "
                        >
                          3
                        </span>
                      </button>

                      {/* NOTIFICATIONS */}

                      <button
                        className="
                          w-full
                          flex
                          items-center
                          gap-4
                          px-3
                          py-4
                          rounded-xl
                          text-left
                          text-gray-800
                          hover:bg-orange-50
                          hover:text-orange-500
                          transition
                        "
                      >
                        <Bell size={25} />

                        <span className="flex-1">
                          Notifications
                        </span>

                        <span
                          className="
                            min-w-6
                            h-6
                            px-1.5
                            rounded-full
                            bg-red-500
                            text-white
                            text-xs
                            flex
                            items-center
                            justify-center
                          "
                        >
                          2
                        </span>
                      </button>
                    </>
                  )}

                  {/* PROFILE */}

                  <button
                    onClick={() =>
                      setMobileMenu(false)
                    }
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-3
                      py-4
                      rounded-xl
                      text-left
                      text-gray-800
                      hover:bg-orange-50
                      hover:text-orange-500
                      transition
                    "
                  >
                    <User size={25} />
                    Profile
                  </button>

                </div>

                {/* LOGOUT */}

                <div
                  className="
                    mt-7
                    pt-6
                    border-t
                    border-gray-100
                  "
                >

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-4
                      px-3
                      py-4
                      rounded-xl
                      text-left
                      text-red-500
                      hover:bg-red-50
                      transition
                    "
                  >
                    <LogOut size={25} />
                    Logout
                  </button>

                </div>

              </div>

            </motion.aside>
          </>
        )}

      </AnimatePresence>
    </>
  );
}