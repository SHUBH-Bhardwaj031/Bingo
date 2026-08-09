import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-16">

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}

          <div>

            <h2 className="text-3xl font-extrabold text-orange-500">
              Bingo
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
              Discover delicious food, explore amazing restaurants,
              and get your favourite meals delivered right to your door.
            </p>

            <div className="flex items-center gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Youtube size={18} />
              </a>

            </div>

          </div>


          {/* QUICK LINKS */}

          <div>

            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>
                <a
                  href="/"
                  className="hover:text-orange-500 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/restaurants"
                  className="hover:text-orange-500 transition"
                >
                  Restaurants
                </a>
              </li>

              <li>
                <a
                  href="/cart"
                  className="hover:text-orange-500 transition"
                >
                  My Cart
                </a>
              </li>

              <li>
                <a
                  href="/signin"
                  className="hover:text-orange-500 transition"
                >
                  Sign In
                </a>
              </li>

            </ul>

          </div>


          {/* POPULAR CATEGORIES */}

          <div>

            <h3 className="text-lg font-bold">
              Popular Categories
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>
                <a
                  href="/category/pizza"
                  className="hover:text-orange-500 transition"
                >
                  Pizza
                </a>
              </li>

              <li>
                <a
                  href="/category/burger"
                  className="hover:text-orange-500 transition"
                >
                  Burgers
                </a>
              </li>

              <li>
                <a
                  href="/category/biryani"
                  className="hover:text-orange-500 transition"
                >
                  Biryani
                </a>
              </li>

              <li>
                <a
                  href="/category/momos"
                  className="hover:text-orange-500 transition"
                >
                  Momos
                </a>
              </li>

              <li>
                <a
                  href="/category/coffee"
                  className="hover:text-orange-500 transition"
                >
                  Coffee
                </a>
              </li>

            </ul>

          </div>


          {/* CONTACT */}

          <div>

            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-gray-400">

              <div className="flex items-start gap-3">

                <MapPin
                  size={19}
                  className="text-orange-500 mt-1 shrink-0"
                />

                <p>
                  Lucknow, Uttar Pradesh, India
                </p>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-orange-500"
                />

                <span>
                  +91 00000 00000
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-orange-500"
                />

                <span>
                  support@bingo.com
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM BAR */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bingo. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">

              <a
                href="#"
                className="hover:text-orange-500 transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-orange-500 transition"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}