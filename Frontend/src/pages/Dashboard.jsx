import React, { useState, useMemo, useEffect, useRef } from 'react'

const FOODS = [
  { id: 1, name: "Classic Cheese Burger", cat: "Burgers", veg: false, spice: 1, price: 189, rating: 4.6, img: "https://source.unsplash.com/400x300/?cheeseburger&sig=1", desc: "Juicy patty, melted cheese, toasted bun." },
  { id: 2, name: "Paneer Tikka Pizza", cat: "Pizza", veg: true, spice: 2, price: 299, rating: 4.5, img: "https://source.unsplash.com/400x300/?pizza&sig=2", desc: "Loaded with tandoori paneer and peppers." },
  { id: 3, name: "Butter Chicken", cat: "Main Course", veg: false, spice: 2, price: 289, rating: 4.6, img: "https://source.unsplash.com/400x300/?butterchicken&sig=3", desc: "Rich makhani gravy, ghar jaisa taste." },
  { id: 4, name: "Hyderabadi Biryani", cat: "Rice & Biryani", veg: false, spice: 3, price: 319, rating: 4.8, img: "https://source.unsplash.com/400x300/?biryani&sig=4", desc: "Dum-cooked mutton biryani with raita." },
  { id: 5, name: "Veg Loaded Fries", cat: "Sides", veg: true, spice: 1, price: 129, rating: 4.3, img: "https://source.unsplash.com/400x300/?frenchfries&sig=5", desc: "Crispy fries topped with cheese and salsa." },
  { id: 6, name: "Chocolate Brownie", cat: "Desserts", veg: true, spice: 0, price: 99, rating: 4.6, img: "https://source.unsplash.com/400x300/?brownie&sig=6", desc: "Warm fudgy brownie with a molten center." },
  { id: 7, name: "Chole Bhature", cat: "Main Course", veg: true, spice: 2, price: 179, rating: 4.5, img: "https://source.unsplash.com/400x300/?indianfood&sig=7", desc: "Fluffy bhature with spiced chole." },
  { id: 8, name: "Margherita Pizza", cat: "Pizza", veg: true, spice: 0, price: 249, rating: 4.4, img: "https://source.unsplash.com/400x300/?margheritapizza&sig=8", desc: "Classic cheese and basil, wood-fired." },
  { id: 9, name: "Chicken Biryani", cat: "Rice & Biryani", veg: false, spice: 2, price: 259, rating: 4.6, img: "https://source.unsplash.com/400x300/?chickenbiryani&sig=9", desc: "Fragrant rice with marinated chicken." },
  { id: 10, name: "Garlic Bread", cat: "Sides", veg: true, spice: 0, price: 99, rating: 4.4, img: "https://source.unsplash.com/400x300/?garlicbread&sig=10", desc: "Buttery, garlicky, oven-toasted." },
  { id: 11, name: "Chicken 65", cat: "Starters", veg: false, spice: 3, price: 239, rating: 4.5, img: "https://source.unsplash.com/400x300/?friedchicken&sig=11", desc: "Crispy, spicy South Indian starter." },
  { id: 12, name: "Mango Lassi", cat: "Beverages", veg: true, spice: 0, price: 79, rating: 4.5, img: "https://source.unsplash.com/400x300/?mangolassi&sig=12", desc: "Chilled, made with fresh mango pulp." },
  { id: 13, name: "Veggie Supreme Burger", cat: "Burgers", veg: true, spice: 1, price: 169, rating: 4.3, img: "https://source.unsplash.com/400x300/?veggieburger&sig=13", desc: "Grilled veg patty with fresh crunch." },
  { id: 14, name: "Masala Chai", cat: "Beverages", veg: true, spice: 0, price: 35, rating: 4.6, img: "https://source.unsplash.com/400x300/?masalachai&sig=14", desc: "Kadak chai with ginger and cardamom." },
  { id: 15, name: "Gulab Jamun", cat: "Desserts", veg: true, spice: 0, price: 89, rating: 4.6, img: "https://source.unsplash.com/400x300/?gulabjamun&sig=15", desc: "Soft, syrup-soaked classic dessert." },
]

const CATS = ["All", "Burgers", "Pizza", "Main Course", "Rice & Biryani", "Starters", "Sides", "Desserts", "Beverages"]

const VegIcon = ({ isVeg }) => (
  <span className={`inline-flex w-3.5 h-3.5 rounded-[3px] border-2 ${isVeg ? 'border-green-600' : 'border-red-500'} items-center justify-center flex-shrink-0 bg-white`}>
    <span className={`w-1.5 h-1.5 ${isVeg ? 'rounded-full bg-green-600' : 'bg-red-500'}`} style={!isVeg ? { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } : {}} />
  </span>
)

const flameStr = (n) => n === 0 ? "—" : "🌶️".repeat(n)

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`

export default function Dashboard() {
  const [activeCat, setActiveCat] = useState("All")
  const [vegOnly, setVegOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState({})
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [pulseCart, setPulseCart] = useState(false)
  const prevCount = useRef(0)

  const filteredItems = useMemo(() => {
    return FOODS.filter(f => {
      if (activeCat !== "All" && f.cat !== activeCat) return false
      if (vegOnly && !f.veg) return false
      if (searchTerm && !f.name.toLowerCase().includes(searchTerm.toLowerCase()) && !f.cat.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
  }, [activeCat, vegOnly, searchTerm])

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const subtotal = cartItems.reduce((s, i) => s + i.qty * i.food.price, 0)
  const delivery = subtotal > 0 ? (subtotal > 300 ? 0 : 40) : 0
  const grandTotal = subtotal + delivery

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setPulseCart(true)
      const t = setTimeout(() => setPulseCart(false), 400)
      prevCount.current = cartCount
      return () => clearTimeout(t)
    }
    prevCount.current = cartCount
  }, [cartCount])

  const addItem = (food) => {
    setCart(prev => ({ ...prev, [food.id]: { food, qty: 1 } }))
  }

  const changeQty = (id, delta) => {
    setCart(prev => {
      const existing = prev[id]
      if (!existing) return prev
      const newQty = existing.qty + delta
      const updated = { ...prev }
      if (newQty <= 0) {
        delete updated[id]
      } else {
        updated[id] = { ...existing, qty: newQty }
      }
      return updated
    })
  }

  return (
    <div className="min-h-screen text-stone-900 relative" style={{ backgroundColor: '#FFF9F2' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-body { font-family: 'Inter', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-anim { animation: fadeUp 0.45s ease both; }

        @keyframes pulseBadge {
          0% { transform: scale(1); }
          40% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        .badge-pulse { animation: pulseBadge 0.4s ease; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #F97316 0%, #F5A524 25%, #F97316 50%, #F5A524 75%, #F97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 5s linear infinite;
        }

        .food-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .food-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(194,65,12,0.18); }
        .food-card:hover .food-img { transform: scale(1.08); }
        .food-img { transition: transform 0.5s ease; }

        .chip-underline { position: relative; }
        .chip-underline.active::after {
          content: '';
          position: absolute;
          bottom: -13px;
          left: 20%;
          right: 20%;
          height: 2px;
          background: #F97316;
          border-radius: 2px;
        }
      `}</style>

      {/* GRAIN TEXTURE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: GRAIN_BG }} />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#FFF9F2]/90 backdrop-blur border-b border-stone-200 font-body">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl shadow-sm shadow-orange-500/30">🍔</div>
            <span className="text-xl font-display font-semibold">Bingo</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 border-l border-stone-200 pl-5">
            <span>📍</span> Deliver to <span className="font-medium text-stone-800">Lucknow, UP</span>
          </div>

          <div className="flex-1 min-w-[220px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search for pizza, burgers, biryani..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-9 pr-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative h-11 px-5 bg-white border border-stone-200 rounded-xl flex items-center gap-2 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
          >
            🛒 Cart
            <span className={`min-w-[18px] h-[18px] px-1 bg-orange-500 text-white text-[11px] font-semibold rounded-full flex items-center justify-center ${pulseCart ? 'badge-pulse' : ''}`}>
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* CATEGORY NAV */}
      <nav className="border-b border-stone-200 font-body">
        <div className="max-w-6xl mx-auto px-6 pt-3 pb-4 flex items-center gap-2 overflow-x-auto">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`chip-underline flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${cat === activeCat ? 'active' : ''} ${
                cat === activeCat
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "bg-white border-stone-200 text-stone-600 hover:border-orange-300"
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex-shrink-0 ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
              vegOnly ? "border-green-500 text-green-600 bg-green-50" : "bg-white border-stone-200 text-stone-500 hover:border-green-300"
            }`}
          >
            <VegIcon isVeg={true} /> Veg only
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 relative z-10 font-body">

        {/* HERO */}
        <div className="mb-10 relative">
          <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-2">Craving something?</p>
          <h1 className="font-display text-4xl sm:text-5xl font-medium mt-1 max-w-xl leading-tight">
            Order your <span className="shimmer-text">favourites</span>,<br />delivered in minutes
          </h1>
          <p className="text-stone-500 text-sm mt-3 max-w-md">
            Browse restaurants, search dishes, and check out — all from one dashboard.
          </p>
        </div>

        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-display font-medium">{activeCat === "All" ? "All items" : activeCat}</h2>
          <span className="text-xs text-stone-400">{filteredItems.length} items found</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-3xl mb-2">🍽️</div>
            No items found.<br />Try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((f, idx) => {
              const qty = cart[f.id] ? cart[f.id].qty : 0
              return (
                <div
                  key={f.id}
                  className="food-card card-anim bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="relative h-40 overflow-hidden bg-stone-100">
                    <img src={f.img} alt={f.name} className="food-img w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-2 left-2">
                      <VegIcon isVeg={f.veg} />
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-xs font-semibold text-orange-600 shadow-sm">
                      ★ {f.rating}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3 className="text-sm font-medium text-stone-900">{f.name}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed min-h-[32px]">{f.desc}</p>
                    <p className="text-xs">{flameStr(f.spice)}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-stone-200 mt-auto">
                      <span className="text-sm font-semibold text-stone-900">₹{f.price}</span>
                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(f)}
                          className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all"
                        >
                          + Add
                        </button>
                      ) : (
                        <div className="flex items-center bg-stone-100 rounded-lg overflow-hidden">
                          <button onClick={() => changeQty(f.id, -1)} className="w-7 h-7 text-stone-600 hover:bg-stone-200 transition-colors">−</button>
                          <span className="w-6 text-center text-sm font-medium">{qty}</span>
                          <button onClick={() => changeQty(f.id, 1)} className="w-7 h-7 text-stone-600 hover:bg-stone-200 transition-colors">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 mt-14 relative z-10 font-body">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-base">🍔</div>
              <span className="text-white text-lg font-display font-medium">Bingo</span>
            </div>
            <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
              Your favourite restaurants, delivered fast. Ordering made simple, tracking made easy.
            </p>
          </div>
          <div>
            <h4 className="text-stone-300 text-xs font-medium uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-400">About us</a></li>
              <li><a href="#" className="hover:text-orange-400">Careers</a></li>
              <li><a href="#" className="hover:text-orange-400">Partner with us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-300 text-xs font-medium uppercase tracking-wider mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-400">Help center</a></li>
              <li><a href="#" className="hover:text-orange-400">Track order</a></li>
              <li><a href="#" className="hover:text-orange-400">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 px-6 py-4 max-w-6xl mx-auto flex justify-between text-xs text-stone-500 flex-wrap gap-2">
          <span>© 2026 Bingo. All rights reserved.</span>
          <span>Made with 🧡 in Lucknow</span>
        </div>
      </footer>

      {/* CART DRAWER */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity z-40 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`fixed top-0 right-0 h-screen w-[380px] max-w-[90vw] bg-white border-l border-stone-200 transition-transform z-50 flex flex-col font-body ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-lg font-display font-medium">Your cart</h3>
          <button onClick={() => setDrawerOpen(false)} className="text-stone-400 hover:text-stone-700 text-xl leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <div className="text-3xl mb-2">🛒</div>
              Your cart is empty.<br />Add something tasty!
            </div>
          ) : (
            cartItems.map(i => (
              <div key={i.food.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                  <img src={i.food.img} alt={i.food.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-800">{i.food.name}</p>
                  <p className="text-xs text-stone-400">₹{i.food.price} × {i.qty}</p>
                </div>
                <div className="flex items-center bg-stone-100 rounded-lg overflow-hidden">
                  <button onClick={() => changeQty(i.food.id, -1)} className="w-7 h-7 text-stone-600 hover:bg-stone-200">−</button>
                  <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                  <button onClick={() => changeQty(i.food.id, 1)} className="w-7 h-7 text-stone-600 hover:bg-stone-200">+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-stone-200 px-5 py-4">
          <div className="flex justify-between text-sm text-stone-500 mb-1"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-sm text-stone-500 mb-2"><span>Delivery fee</span><span>{delivery === 0 ? "Free" : `₹${delivery}`}</span></div>
          <div className="flex justify-between text-base font-medium text-stone-900 mt-2"><span>Total</span><span>₹{grandTotal}</span></div>
          <button className="w-full mt-4 h-12 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white rounded-xl text-sm font-medium transition-all">
            Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}