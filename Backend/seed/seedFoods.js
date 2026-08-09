import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();

import connectDb from "../config/db.js";

import Food from "../models/food.model.js";
import Restaurant from "../models/restaurant.model.js";
import Category from "../models/category.model.js";

await connectDb();

/* ===========================================
   Restaurant Mapping
=========================================== */

const restaurants = await Restaurant.find();
console.log("Restaurants Found:", restaurants.length);
console.log(restaurants);
const restaurantMap = {};
restaurants.forEach((restaurant) => {
  restaurantMap[restaurant.slug] = restaurant._id;
});

console.log("Restaurant Map:");
console.log(Object.keys(restaurantMap));
restaurants.forEach((restaurant) => {
  restaurantMap[restaurant.slug] = restaurant._id;
});

/* ===========================================
   Category Mapping
=========================================== */
const categories = await Category.find();

const categoryMap = {};

categories.forEach((category) => {
  categoryMap[category.slug] = category._id;
});

console.log("Category Map:");
console.log(Object.keys(categoryMap));

const foods = [
      /* ===========================================
     La Pino'z Pizza
  =========================================== */

  {
    restaurant: restaurantMap["la-pinoz-lucknow"],
    category: categoryMap["pizza"],
    name: "Margherita Pizza",
    slug: "margherita-pizza-la-pinoz",
    description: "Classic cheese pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop",
    price: 299,
    discountPrice: 249,
    rating: 4.8,
    totalReviews: 2450,
    preparationTime: 18,
    isVeg: true,
    isRecommended: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["la-pinoz-lucknow"],
    category: categoryMap["pizza"],
    name: "Farmhouse Pizza",
    slug: "farmhouse-pizza-la-pinoz",
    description: "Veg loaded farmhouse pizza",
   image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&auto=format&fit=crop",
    price: 399,
    discountPrice: 349,
    rating: 4.7,
    totalReviews: 1700,
    preparationTime: 20,
    isVeg: true,
    isRecommended: true,
  },

  {
    restaurant: restaurantMap["la-pinoz-lucknow"],
    category: categoryMap["pizza"],
    name: "Paneer Tikka Pizza",
    slug: "paneer-tikka-pizza-la-pinoz",
    description: "Spicy paneer tikka pizza",
  image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=1000&auto=format&fit=crop",
    price: 449,
    discountPrice: 399,
    rating: 4.8,
    totalReviews: 2100,
    preparationTime: 22,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["la-pinoz-lucknow"],
    category: categoryMap["pizza"],
    name: "Veg Loaded Pizza",
    slug: "veg-loaded-pizza-la-pinoz",
    description: "Loaded with fresh vegetables",
image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop",    price: 499,
    discountPrice: 449,
    rating: 4.9,
    totalReviews: 3200,
    preparationTime: 24,
    isVeg: true,
    isRecommended: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["la-pinoz-lucknow"],
    category: categoryMap["drinks"],
    name: "Pepsi",
    slug: "pepsi-la-pinoz",
    description: "Chilled Pepsi",
image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1000&auto=format&fit=crop",    price: 60,
    rating: 4.4,
    totalReviews: 500,
    preparationTime: 2,
    isVeg: true,
    isAvailable: true,
  },

  {
    restaurant: restaurantMap["la-pinoz-lucknow"],
    category: categoryMap["dessert"],
    name: "Chocolate Brownie",
    slug: "brownie-la-pinoz",
    description: "Hot chocolate brownie",
image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1000&auto=format&fit=crop",    price: 149,
    discountPrice: 129,
    rating: 4.8,
    totalReviews: 950,
    preparationTime: 8,
    isVeg: true,
  },

  /* ===========================================
     Pizza Hut
  =========================================== */

  {
    restaurant: restaurantMap["pizza-hut-lucknow"],
    category: categoryMap["pizza"],
    name: "Veggie Supreme",
    slug: "veggie-supreme-pizza-hut",
    description: "Classic Veggie Supreme Pizza",
image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop",    price: 449,
    discountPrice: 399,
    rating: 4.7,
    totalReviews: 2500,
    preparationTime: 20,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["pizza-hut-lucknow"],
    category: categoryMap["pizza"],
    name: "Chicken Supreme",
    slug: "chicken-supreme-pizza-hut",
    description: "Loaded chicken pizza",
image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=1000&auto=format&fit=crop",    price: 549,
    discountPrice: 499,
    rating: 4.8,
    totalReviews: 2800,
    preparationTime: 22,
    isVeg: false,
    isRecommended: true,
  },

  {
    restaurant: restaurantMap["pizza-hut-lucknow"],
    category: categoryMap["pizza"],
    name: "Cheese Burst Pizza",
    slug: "cheese-burst-pizza-hut",
    description: "Extra cheesy delight",
image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1000&auto=format&fit=crop",    price: 499,
    discountPrice: 449,
    rating: 4.9,
    totalReviews: 3600,
    preparationTime: 22,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["pizza-hut-lucknow"],
    category: categoryMap["drinks"],
    name: "Coca Cola",
    slug: "coca-cola-pizza-hut",
    description: "500ml Coke",
image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=1000&auto=format&fit=crop",    price: 70,
    rating: 4.5,
    totalReviews: 620,
    preparationTime: 2,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["pizza-hut-lucknow"],
    category: categoryMap["dessert"],
    name: "Choco Lava Cake",
    slug: "lava-cake-pizza-hut",
    description: "Chocolate lava cake",
image: "https://images.unsplash.com/photo-1617305855058-336d24456869?w=1000&auto=format&fit=crop",    price: 129,
    rating: 4.9,
    totalReviews: 1900,
    preparationTime: 8,
    isVeg: true,
    isRecommended: true,
  }, 
    /* ===========================================
     KFC
  =========================================== */

  {
    restaurant: restaurantMap["kfc-lucknow"],
    category: categoryMap["chicken"],
    name: "Zinger Burger",
    slug: "zinger-burger-kfc",
    description: "Classic crispy chicken burger",
image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop",    price: 229,
    discountPrice: 199,
    rating: 4.8,
    totalReviews: 4200,
    preparationTime: 15,
    isVeg: false,
    isBestSeller: true,
    isRecommended: true,
  },

  {
    restaurant: restaurantMap["kfc-lucknow"],
    category: categoryMap["chicken"],
    name: "Hot & Crispy Chicken",
    slug: "hot-crispy-kfc",
    description: "Signature crispy chicken",
image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1000&auto=format&fit=crop",    price: 349,
    discountPrice: 319,
    rating: 4.9,
    totalReviews: 5200,
    preparationTime: 18,
    isVeg: false,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["kfc-lucknow"],
    category: categoryMap["chicken"],
    name: "Chicken Popcorn",
    slug: "chicken-popcorn-kfc",
    description: "Crunchy popcorn chicken",
image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop",    price: 199,
    rating: 4.7,
    totalReviews: 3100,
    preparationTime: 10,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["kfc-lucknow"],
    category: categoryMap["drinks"],
    name: "Pepsi",
    slug: "pepsi-kfc",
    description: "Chilled Pepsi",
image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=1000&auto=format&fit=crop",    price: 60,
    rating: 4.5,
    preparationTime: 2,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["kfc-lucknow"],
    category: categoryMap["dessert"],
    name: "Chocolate Sundae",
    slug: "chocolate-sundae-kfc",
    description: "Soft serve with chocolate",
image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1000&auto=format&fit=crop",    price: 99,
    rating: 4.6,
    preparationTime: 5,
    isVeg: true,
  },

  /* ===========================================
     Burger King
  =========================================== */

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["burger"],
    name: "Whopper",
    slug: "whopper-burger-king",
    description: "Classic flame grilled burger",
image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop",    price: 249,
    discountPrice: 219,
    rating: 4.8,
    totalReviews: 3900,
    preparationTime: 15,
    isVeg: false,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["burger"],
    name: "Veg Whopper",
    slug: "veg-whopper-burger-king",
    description: "Veg flame grilled burger",
image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&auto=format&fit=crop",    price: 199,
    discountPrice: 179,
    rating: 4.6,
    totalReviews: 2200,
    preparationTime: 15,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["burger"],
    name: "Chicken Fries",
    slug: "chicken-fries-burger-king",
    description: "Crispy chicken fries",
image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=1000&auto=format&fit=crop",    price: 179,
    rating: 4.7,
    totalReviews: 1800,
    preparationTime: 10,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["drinks"],
    name: "Coke",
    slug: "coke-burger-king",
    description: "500ml Coca Cola",
image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=1000&auto=format&fit=crop",    price: 70,
    preparationTime: 2,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["dessert"],
    name: "Chocolate Shake",
    slug: "chocolate-shake-burger-king",
    description: "Rich chocolate milkshake",
image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1000&auto=format&fit=crop",    price: 149,
    rating: 4.7,
    preparationTime: 5,
    isVeg: true,
  },

  /* ===========================================
     Subway
  =========================================== */

  {
    restaurant: restaurantMap["subway-lucknow"],
    category: categoryMap["sandwich"],
    name: "Veggie Delight",
    slug: "veggie-delight-subway",
    description: "Fresh vegetable sandwich",
image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1000&auto=format&fit=crop",    price: 249,
    discountPrice: 219,
    rating: 4.6,
    totalReviews: 2600,
    preparationTime: 12,
    isVeg: true,
    isRecommended: true,
  },

  {
    restaurant: restaurantMap["subway-lucknow"],
    category: categoryMap["sandwich"],
    name: "Paneer Tikka Sub",
    slug: "paneer-tikka-subway",
    description: "Paneer tikka sandwich",
image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1000&auto=format&fit=crop",    price: 299,
    discountPrice: 269,
    rating: 4.7,
    totalReviews: 2400,
    preparationTime: 14,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["subway-lucknow"],
    category: categoryMap["sandwich"],
    name: "Chicken Teriyaki",
    slug: "chicken-teriyaki-subway",
    description: "Chicken teriyaki sandwich",
image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=1000&auto=format&fit=crop",    price: 349,
    discountPrice: 319,
    rating: 4.8,
    totalReviews: 3000,
    preparationTime: 15,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["subway-lucknow"],
    category: categoryMap["drinks"],
    name: "Sprite",
    slug: "sprite-subway",
    description: "Chilled Sprite",
image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=1000&auto=format&fit=crop",    price: 60,
    preparationTime: 2,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["subway-lucknow"],
    category: categoryMap["dessert"],
    name: "Double Chocolate Cookie",
    slug: "cookie-subway",
    description: "Fresh baked cookie",
image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1000&auto=format&fit=crop",    price: 69,
    rating: 4.7,
    preparationTime: 2,
    isVeg: true,
  },
    /* ===========================================
     Behrouz Biryani
  =========================================== */

  {
    restaurant: restaurantMap["behrouz-biryani-lucknow"],
    category: categoryMap["biryani"],
    name: "Royal Chicken Biryani",
    slug: "royal-chicken-biryani-behrouz",
    description: "Signature dum cooked chicken biryani",
image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8b?w=1000&auto=format&fit=crop",    price: 449,
    discountPrice: 399,
    rating: 4.9,
    totalReviews: 4200,
    preparationTime: 28,
    isVeg: false,
    isBestSeller: true,
    isRecommended: true,
  },

  {
    restaurant: restaurantMap["behrouz-biryani-lucknow"],
    category: categoryMap["biryani"],
    name: "Paneer Biryani",
    slug: "paneer-biryani-behrouz",
    description: "Royal veg biryani",
image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=1000&auto=format&fit=crop",    price: 349,
    discountPrice: 319,
    rating: 4.7,
    totalReviews: 2100,
    preparationTime: 25,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["behrouz-biryani-lucknow"],
    category: categoryMap["drinks"],
    name: "Sweet Lassi",
    slug: "lassi-behrouz",
    description: "Traditional sweet lassi",
image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1000&auto=format&fit=crop",    price: 99,
    preparationTime: 3,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["behrouz-biryani-lucknow"],
    category: categoryMap["dessert"],
    name: "Gulab Jamun",
    slug: "gulab-jamun-behrouz",
    description: "Soft gulab jamun",
image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop",    price: 89,
    rating: 4.8,
    isVeg: true,
  },

  /* ===========================================
     Biryani By Kilo
  =========================================== */

  {
    restaurant: restaurantMap["biryani-by-kilo-lucknow"],
    category: categoryMap["biryani"],
    name: "Hyderabadi Chicken Biryani",
    slug: "hyderabadi-biryani-bbk",
    description: "Authentic Hyderabadi dum biryani",
image: "https://images.unsplash.com/photo-1563379091339-03246963d29a?w=1000&auto=format&fit=crop",    price: 429,
    discountPrice: 379,
    rating: 4.8,
    totalReviews: 3900,
    preparationTime: 30,
    isVeg: false,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["biryani-by-kilo-lucknow"],
    category: categoryMap["biryani"],
    name: "Veg Dum Biryani",
    slug: "veg-dum-biryani-bbk",
    description: "Vegetable dum biryani",
image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1000&auto=format&fit=crop",    price: 329,
    discountPrice: 289,
    rating: 4.6,
    totalReviews: 1700,
    preparationTime: 25,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["biryani-by-kilo-lucknow"],
    category: categoryMap["drinks"],
    name: "Masala Chaas",
    slug: "chaas-bbk",
    description: "Refreshing buttermilk",
image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=1000&auto=format&fit=crop",    price: 79,
    preparationTime: 2,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["biryani-by-kilo-lucknow"],
    category: categoryMap["dessert"],
    name: "Shahi Phirni",
    slug: "phirni-bbk",
    description: "Traditional phirni",
image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1000&auto=format&fit=crop",    price: 119,
    rating: 4.8,
    isVeg: true,
  },

  /* ===========================================
     Wow! Momo
  =========================================== */

  {
    restaurant: restaurantMap["wow-momo-lucknow"],
    category: categoryMap["momos"],
    name: "Steamed Veg Momos",
    slug: "veg-momos-wow",
    description: "Fresh steamed veg momos",
image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1000&auto=format&fit=crop",    price: 149,
    discountPrice: 129,
    rating: 4.7,
    totalReviews: 2900,
    preparationTime: 12,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["wow-momo-lucknow"],
    category: categoryMap["momos"],
    name: "Chicken Momos",
    slug: "chicken-momos-wow",
    description: "Steamed chicken momos",
image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1000&auto=format&fit=crop",    price: 189,
    discountPrice: 169,
    rating: 4.8,
    totalReviews: 3500,
    preparationTime: 12,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["wow-momo-lucknow"],
    category: categoryMap["chinese"],
    name: "Chicken Thukpa",
    slug: "thukpa-wow",
    description: "Hot chicken noodle soup",
image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=1000&auto=format&fit=crop",    price: 219,
    rating: 4.6,
    preparationTime: 15,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["wow-momo-lucknow"],
    category: categoryMap["drinks"],
    name: "Lemon Iced Tea",
    slug: "iced-tea-wow",
    description: "Refreshing iced tea",
image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=1000&auto=format&fit=crop",    price: 89,
    isVeg: true,
  },

  /* ===========================================
     Taco Bell
  =========================================== */

  {
    restaurant: restaurantMap["taco-bell-lucknow"],
    category: categoryMap["mexican"],
    name: "Crunchy Taco",
    slug: "crunchy-taco-tb",
    description: "Classic crunchy taco",
image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1000&auto=format&fit=crop",    price: 179,
    discountPrice: 159,
    rating: 4.6,
    totalReviews: 1800,
    preparationTime: 10,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["taco-bell-lucknow"],
    category: categoryMap["mexican"],
    name: "Veg Burrito",
    slug: "veg-burrito-tb",
    description: "Loaded veg burrito",
image: "https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=1000&auto=format&fit=crop",    price: 229,
    discountPrice: 199,
    rating: 4.7,
    totalReviews: 1600,
    preparationTime: 14,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["taco-bell-lucknow"],
    category: categoryMap["drinks"],
    name: "Pepsi",
    slug: "pepsi-tb",
    description: "500ml Pepsi",
image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=1000&auto=format&fit=crop",    price: 60,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["taco-bell-lucknow"],
    category: categoryMap["dessert"],
    name: "Choco Taco",
    slug: "choco-taco",
    description: "Chocolate dessert taco",
image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1000&auto=format&fit=crop",    price: 129,
    rating: 4.7,
    isVeg: true,
  },
    /* ===========================================
     Starbucks
  =========================================== */

  {
    restaurant: restaurantMap["starbucks-lucknow"],
    category: categoryMap["coffee"],
    name: "Caffe Latte",
    slug: "caffe-latte-starbucks",
    description: "Fresh brewed latte",
image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&auto=format&fit=crop",    price: 299,
    discountPrice: 269,
    rating: 4.9,
    totalReviews: 4200,
    preparationTime: 8,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["starbucks-lucknow"],
    category: categoryMap["coffee"],
    name: "Cappuccino",
    slug: "cappuccino-starbucks",
    description: "Rich cappuccino",
image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&auto=format&fit=crop",    price: 279,
    rating: 4.8,
    totalReviews: 3100,
    preparationTime: 8,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["starbucks-lucknow"],
    category: categoryMap["dessert"],
    name: "Blueberry Cheesecake",
    slug: "blueberry-cheesecake-starbucks",
    description: "Creamy cheesecake",
image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1000&auto=format&fit=crop",    price: 229,
    rating: 4.8,
    preparationTime: 5,
    isVeg: true,
  },

  /* ===========================================
     Chaayos
  =========================================== */

  {
    restaurant: restaurantMap["chaayos-lucknow"],
    category: categoryMap["coffee"],
    name: "Masala Chai",
    slug: "masala-chai-chaayos",
    description: "Signature masala chai",
image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1000&auto=format&fit=crop",    price: 99,
    rating: 4.8,
    totalReviews: 2900,
    preparationTime: 5,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["chaayos-lucknow"],
    category: categoryMap["sandwich"],
    name: "Paneer Sandwich",
    slug: "paneer-sandwich-chaayos",
    description: "Grilled paneer sandwich",
image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1000&auto=format&fit=crop",    price: 189,
    rating: 4.7,
    preparationTime: 10,
    isVeg: true,
  },

  /* ===========================================
     FreshMenu
  =========================================== */

  {
    restaurant: restaurantMap["freshmenu-lucknow"],
    category: categoryMap["healthy"],
    name: "Grilled Chicken Bowl",
    slug: "grilled-chicken-bowl",
    description: "Healthy protein meal",
image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&auto=format&fit=crop",    price: 349,
    rating: 4.7,
    totalReviews: 2200,
    preparationTime: 15,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["freshmenu-lucknow"],
    category: categoryMap["healthy"],
    name: "Veg Buddha Bowl",
    slug: "veg-buddha-bowl",
    description: "Healthy veg bowl",
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop",    price: 299,
    rating: 4.8,
    totalReviews: 1700,
    preparationTime: 15,
    isVeg: true,
  },

  /* ===========================================
     Haldiram's
  =========================================== */

  {
    restaurant: restaurantMap["haldirams-lucknow"],
    category: categoryMap["north-indian"],
    name: "Chole Bhature",
    slug: "chole-bhature-haldirams",
    description: "Classic North Indian meal",
image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=1000&auto=format&fit=crop",    price: 199,
    rating: 4.8,
    totalReviews: 4100,
    preparationTime: 15,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["haldirams-lucknow"],
    category: categoryMap["dessert"],
    name: "Rasmalai",
    slug: "rasmalai-haldirams",
    description: "Fresh rasmalai",
image: "https://images.unsplash.com/photo-1605197161470-5b5b7c1f6ad3?w=1000&auto=format&fit=crop",    price: 119,
    rating: 4.8,
    isVeg: true,
  },

  /* ===========================================
     Faasos
  =========================================== */

  {
    restaurant: restaurantMap["faasos-lucknow"],
    category: categoryMap["rolls"],
    name: "Paneer Tikka Roll",
    slug: "paneer-roll-faasos",
    description: "Paneer tikka wrap",
image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop",    price: 219,
    rating: 4.7,
    totalReviews: 2400,
    preparationTime: 12,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["faasos-lucknow"],
    category: categoryMap["rolls"],
    name: "Chicken Tikka Roll",
    slug: "chicken-roll-faasos",
    description: "Chicken tikka wrap",
image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1000&auto=format&fit=crop",    price: 249,
    rating: 4.8,
    totalReviews: 2600,
    preparationTime: 12,
    isVeg: false,
  },

  /* ===========================================
     Barbeque Nation
  =========================================== */

  {
    restaurant: restaurantMap["barbeque-nation-lucknow"],
    category: categoryMap["chicken"],
    name: "Grilled Chicken Platter",
    slug: "grilled-chicken-bbq",
    description: "BBQ grilled chicken platter",
image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1000&auto=format&fit=crop",    price: 599,
    rating: 4.9,
    totalReviews: 3500,
    preparationTime: 25,
    isVeg: false,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["barbeque-nation-lucknow"],
    category: categoryMap["north-indian"],
    name: "Paneer Tikka",
    slug: "paneer-tikka-bbq",
    description: "Tandoori paneer tikka",
image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1000&auto=format&fit=crop",    price: 329,
    rating: 4.8,
    totalReviews: 1800,
    preparationTime: 18,
    isVeg: true,
  },
    /* ===========================================
     Domino's Pizza
  =========================================== */

  {
    restaurant: restaurantMap["dominos-pizza-lucknow"],
    category: categoryMap["pizza"],
    name: "Pepperoni Pizza",
    slug: "pepperoni-dominos",
    description: "Loaded pepperoni pizza",
image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&auto=format&fit=crop",    price: 549,
    discountPrice: 499,
    rating: 4.8,
    totalReviews: 4100,
    preparationTime: 20,
    isVeg: false,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["dominos-lucknow"],
    category: categoryMap["pizza"],
    name: "Corn & Cheese Pizza",
    slug: "corn-cheese-dominos",
    description: "Sweet corn & mozzarella",
image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1000&auto=format&fit=crop",    price: 379,
    discountPrice: 339,
    rating: 4.7,
    totalReviews: 2500,
    preparationTime: 18,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["dominos-lucknow"],
    category: categoryMap["drinks"],
    name: "Coca Cola",
    slug: "coke-dominos",
    description: "500ml Coke",
image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=1000&auto=format&fit=crop",    price: 60,
    preparationTime: 2,
    isVeg: true,
  },

  /* ===========================================
     McDonald's
  =========================================== */

  {
    restaurant: restaurantMap["mcdonalds-lucknow"],
    category: categoryMap["burger"],
    name: "McAloo Tikki",
    slug: "mcaloo-tikki",
    description: "India's favourite burger",
image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&auto=format&fit=crop",    price: 79,
    rating: 4.7,
    totalReviews: 8200,
    preparationTime: 8,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["mcdonalds-lucknow"],
    category: categoryMap["burger"],
    name: "McSpicy Chicken",
    slug: "mcspicy-chicken",
    description: "Spicy chicken burger",
image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop",    price: 249,
    rating: 4.8,
    totalReviews: 5300,
    preparationTime: 12,
    isVeg: false,
  },

  {
    restaurant: restaurantMap["mcdonalds-lucknow"],
    category: categoryMap["drinks"],
    name: "Coke Float",
    slug: "coke-float-mcd",
    description: "Coke with vanilla ice cream",
image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=1000&auto=format&fit=crop",    price: 99,
    rating: 4.6,
    preparationTime: 3,
    isVeg: true,
  },

  /* ===========================================
     Dunkin'
  =========================================== */

  {
    restaurant:  restaurantMap["starbucks-lucknow"] ,
    category: categoryMap["dessert"],
    name: "Chocolate Donut",
    slug: "chocolate-donut",
    description: "Fresh chocolate donut",
image: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=1000&auto=format&fit=crop",   price: 99,
    rating: 4.7,
  preparationTime: 3,
    isVeg: true,
    isBestSeller: true,
  },

  {
    restaurant: restaurantMap["dunkin-lucknow"],
    category: categoryMap["coffee"],
    name: "Cold Coffee",
    slug: "cold-coffee-dunkin",
    description: "Creamy cold coffee",
image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1000&auto=format&fit=crop",    price: 179,
    rating: 4.7,
    preparationTime: 5,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["dunkin-lucknow"],
    category: categoryMap["dessert"],
    name: "Blueberry Donut",
    slug: "blueberry-donut",
    description: "Blueberry filled donut",
image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop",    price: 99,
    rating: 4.7,
    preparationTime: 3,
    isVeg: true,
  },
    /* ===========================================
     McDonald's (More Foods)
  =========================================== */

  {
    restaurant: restaurantMap["mcdonalds-lucknow"],
    category: categoryMap["burger"],
    name: "McVeggie Burger",
    slug: "mcveggie-burger",
    description: "Fresh veggie burger",
image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=1000&auto=format&fit=crop",    price: 159,
    rating: 4.6,
    preparationTime: 8,
    isVeg: true,
  },

 
  /* ===========================================
     Burger King (More Foods)
  =========================================== */

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["burger"],
    name: "Paneer King Burger",
    slug: "paneer-king-burger",
    description: "Grilled paneer burger",
image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=1000&auto=format&fit=crop",    price: 199,
    rating: 4.6,
    preparationTime: 10,
    isVeg: true,
  },

  {
    restaurant: restaurantMap["burger-king-lucknow"],
    category: categoryMap["burger"],
    name: "Crispy Veg Burger",
    slug: "crispy-veg-burger",
    description: "Crunchy veg burger",
image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1000&auto=format&fit=crop",    price: 169,
    rating: 4.5,
    preparationTime: 10,
    isVeg: true,
  }

  ];

try {
  console.log("🗑 Removing old foods...");

  await Food.deleteMany();

  // Debug missing mappings
  const validFoods = [];

  console.log("\n========== CHECKING FOODS ==========\n");

  foods.forEach((food) => {
    if (!food.restaurant) {
      console.log(`❌ Missing Restaurant -> ${food.name} (${food.slug})`);
      return;
    }

    if (!food.category) {
      console.log(`❌ Missing Category -> ${food.name} (${food.slug})`);
      return;
    }

    validFoods.push(food);
  });

  console.log("\n====================================");
  console.log(`Valid Foods : ${validFoods.length}`);
  console.log(`Total Foods : ${foods.length}`);
  console.log("====================================\n");

  console.log("🍔 Inserting foods...");

  for (const food of validFoods) {
  try {
    await Food.create(food);
    console.log("✅", food.name);
  } catch (err) {
    console.log("❌ ERROR IN:", food.name);
    console.log(err.message);
    break;
  }
}

  console.log("✅ Foods seeded successfully.");
  console.log(`🍽 Total Foods Inserted : ${validFoods.length}`);

  process.exit(0);
} catch (error) {
  console.error("❌ Seed Error");
  console.error(error);

  process.exit(1);
}