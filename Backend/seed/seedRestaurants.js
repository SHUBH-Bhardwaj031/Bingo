import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import connectDb from "../config/db.js";

import Restaurant from "../models/restaurant.model.js";


dotenv.config();

const OWNER_ID = "6a25b8ef695cd9aa383e9f11";

const restaurants = [

  {
    owner: OWNER_ID,

    name: "McDonald's",

    slug: "mcdonalds-lucknow",

    description:
      "World famous burgers and fries.",

    logo:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300",

    coverImage:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",

    cuisines: [
      "Burger",
      "Fast Food",
      "Beverages",
    ],

    rating: 4.5,

    totalReviews: 4215,

    deliveryTime: 28,

    deliveryFee: 29,

    minimumOrder: 149,

    priceForTwo: 450,

    address:
      "Hazratganj",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226001",

    openingTime: "09:00",

    closingTime: "23:30",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Flat ₹125 OFF",

        discount: 125,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Burger King",

    slug: "burger-king-lucknow",

    description:
      "Flame grilled burgers.",

    logo:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300",

    coverImage:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",

    cuisines: [
      "Burger",
      "American",
    ],

    rating: 4.3,

    totalReviews: 3520,

    deliveryTime: 25,

    deliveryFee: 25,

    minimumOrder: 199,

    priceForTwo: 500,

    address:
      "Alambagh",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226005",

    openingTime: "09:00",

    closingTime: "23:00",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Buy 1 Get 1",

        discount: 50,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Domino's Pizza",

    slug: "dominos-pizza-lucknow",

    description:
      "Fresh oven baked pizzas.",

    logo:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",

    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",

    cuisines: [
      "Pizza",
      "Italian",
    ],

    rating: 4.6,

    totalReviews: 6100,

    deliveryTime: 30,

    deliveryFee: 35,

    minimumOrder: 199,

    priceForTwo: 700,

    address:
      "Gomti Nagar",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    openingTime: "10:00",

    closingTime: "23:59",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "50% OFF up to ₹100",

        discount: 100,
      },
    ],
  },

{
  owner: OWNER_ID,

  name: "KFC",

  slug: "kfc-lucknow",

  description: "World famous fried chicken.",

  logo: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=300",

  coverImage: "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=1200",

  cuisines: ["Chicken", "Burger", "Fast Food"],

  rating: 4.4,

  totalReviews: 5120,

  deliveryTime: 27,

  deliveryFee: 29,

  minimumOrder: 199,

  priceForTwo: 550,

  address: "Hazratganj",

  city: "Lucknow",

  state: "Uttar Pradesh",

  pincode: "226001",

  openingTime: "10:00",

  closingTime: "23:30",

  isVeg: false,

  isOpen: true,

  isFeatured: true,

  offers: [
    {
      title: "Free Chicken Popcorn",
      discount: 99,
    },
  ],
},

  {
    owner: OWNER_ID,

    name: "Pizza Hut",

    slug: "pizza-hut-lucknow",

    description: "Cheesy pizzas & pasta.",

    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",

    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",

    cuisines: ["Pizza", "Italian"],

    rating: 4.5,

    totalReviews: 6021,

    deliveryTime: 31,

    deliveryFee: 35,

    minimumOrder: 249,

    priceForTwo: 750,

    address: "Indira Nagar",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226016",

    openingTime: "10:00",

    closingTime: "23:59",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Flat ₹150 OFF",

        discount: 150,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Subway",

    slug: "subway-lucknow",

    description: "Fresh sandwiches & wraps.",

    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300",

    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",

    cuisines: ["Healthy", "Sandwich"],

    rating: 4.2,

    totalReviews: 2810,

    deliveryTime: 20,

    deliveryFee: 20,

    minimumOrder: 149,

    priceForTwo: 450,

    address: "Aliganj",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226024",

    openingTime: "09:00",

    closingTime: "23:00",

    isVeg: false,

    isOpen: true,

    isFeatured: false,

    offers: [
      {
        title: "20% OFF",

        discount: 20,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Starbucks",

    slug: "starbucks-lucknow",

    description: "Premium coffee & desserts.",

    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",

    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",

    cuisines: ["Coffee", "Dessert"],

    rating: 4.8,

    totalReviews: 8230,

    deliveryTime: 18,

    deliveryFee: 25,

    minimumOrder: 199,

    priceForTwo: 650,

    address: "Phoenix Palassio",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    openingTime: "08:00",

    closingTime: "23:00",

    isVeg: true,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Buy 2 Get 1",

        discount: 33,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "La Pino'z Pizza",

    slug: "la-pinoz-lucknow",

    description: "Loaded giant pizzas.",

    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",

    coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",

    cuisines: ["Pizza", "Italian"],

    rating: 4.4,

    totalReviews: 3900,

    deliveryTime: 29,

    deliveryFee: 30,

    minimumOrder: 199,

    priceForTwo: 700,

    address: "Gomti Nagar",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    openingTime: "10:00",

    closingTime: "23:59",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "40% OFF",

        discount: 40,
      },
    ],
  },

    {
    owner: OWNER_ID,

    name: "Behrouz Biryani",

    slug: "behrouz-biryani-lucknow",

    description: "Royal Dum Biryani.",

  logo:
"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=300",

coverImage:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGqzP64D6hQ3mGCY7rArAu1obwV_dl65Kbra3F23mXgA&s=10",

    cuisines: ["Biryani", "Mughlai"],

    rating: 4.7,

    totalReviews: 4380,

    deliveryTime: 34,

    deliveryFee: 39,

    minimumOrder: 249,

    priceForTwo: 850,

    address: "Vibhuti Khand",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Flat ₹175 OFF",

        discount: 175,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Biryani By Kilo",

    slug: "biryani-by-kilo-lucknow",

    description: "Handi Dum Biryani.",

   logo:
"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&auto=format&fit=crop&q=80",

coverImage:
"https://bbk-images-links.s3.ap-south-1.amazonaws.com/192p78iconbbk-luck.jpg",

    cuisines: ["Biryani", "North Indian"],

    rating: 4.6,

    totalReviews: 3920,

    deliveryTime: 38,

    deliveryFee: 39,

    minimumOrder: 299,

    priceForTwo: 950,

    address: "Gomti Nagar",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "20% OFF",

        discount: 20,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Wow! Momo",

    slug: "wow-momo-lucknow",

    description: "Momos, Thukpa & Chinese.",

    logo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300",
coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200",

    cuisines: ["Momos", "Chinese"],

    rating: 4.4,

    totalReviews: 2980,

    deliveryTime: 24,

    deliveryFee: 25,

    minimumOrder: 149,

    priceForTwo: 450,

    address: "Alambagh",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226005",

    isVeg: false,

    isOpen: true,

    isFeatured: false,

    offers: [
      {
        title: "Free Coke",

        discount: 40,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Taco Bell",

    slug: "taco-bell-lucknow",

    description: "Mexican Tacos & Burritos.",

    logo: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=300",
coverImage: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1200",

    cuisines: ["Mexican"],

    rating: 4.3,

    totalReviews: 2200,

    deliveryTime: 30,

    deliveryFee: 29,

    minimumOrder: 199,

    priceForTwo: 650,

    address: "Phoenix Palassio",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    isVeg: false,

    isOpen: true,

    isFeatured: false,

    offers: [
      {
        title: "Buy 2 Get 1",

        discount: 33,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Haldiram's",

    slug: "haldirams-lucknow",

    description: "North Indian & Sweets.",

    logo: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300",
coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200",

    cuisines: ["North Indian", "Sweets"],

    rating: 4.5,

    totalReviews: 6500,

    deliveryTime: 32,

    deliveryFee: 35,

    minimumOrder: 199,

    priceForTwo: 600,

    address: "Hazratganj",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226001",

    isVeg: true,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Flat ₹100 OFF",

        discount: 100,
      },
    ],
  } ,

  {
    owner: OWNER_ID,

    name: "Faasos",

    slug: "faasos-lucknow",

    description: "Rolls, Wraps & Meals.",

    logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300",
coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",

    cuisines: ["Rolls", "Fast Food"],

    rating: 4.4,

    totalReviews: 3521,

    deliveryTime: 28,

    deliveryFee: 25,

    minimumOrder: 199,

    priceForTwo: 550,

    address: "Hazratganj",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226001",

    isVeg: false,

    isOpen: true,

    isFeatured: false,

    offers: [
      {
        title: "Flat ₹100 OFF",

        discount: 100,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Chaayos",

    slug: "chaayos-lucknow",

    description: "Tea & Snacks.",

    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",

    cuisines: ["Tea", "Cafe"],

    rating: 4.6,

    totalReviews: 4322,

    deliveryTime: 18,

    deliveryFee: 20,

    minimumOrder: 149,

    priceForTwo: 350,

    address: "Gomti Nagar",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    isVeg: true,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Buy 1 Get 1 Tea",

        discount: 50,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "Barbeque Nation",

    slug: "barbeque-nation-lucknow",

    description: "Buffet & Barbecue.",

  logo: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300",
coverImage: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1200",
    cuisines: ["Barbecue", "North Indian"],

    rating: 4.7,

    totalReviews: 9100,

    deliveryTime: 40,

    deliveryFee: 45,

    minimumOrder: 499,

    priceForTwo: 1800,

    address: "Riverside Mall",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    isVeg: false,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "Flat ₹250 OFF",

        discount: 250,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "The Belgian Waffle Co.",

    slug: "belgian-waffle-lucknow",

    description: "Desserts & Waffles.",

   logo: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300",
coverImage: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=1200",

    cuisines: ["Desserts"],

    rating: 4.8,

    totalReviews: 5210,

    deliveryTime: 20,

    deliveryFee: 20,

    minimumOrder: 199,

    priceForTwo: 450,

    address: "Phoenix Palassio",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226010",

    isVeg: true,

    isOpen: true,

    isFeatured: true,

    offers: [
      {
        title: "20% OFF",

        discount: 20,
      },
    ],
  },

  {
    owner: OWNER_ID,

    name: "FreshMenu",

    slug: "freshmenu-lucknow",

    description: "Healthy Meals.",

    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200",

    cuisines: ["Healthy", "Continental"],

    rating: 4.5,

    totalReviews: 2730,

    deliveryTime: 24,

    deliveryFee: 25,

    minimumOrder: 199,

    priceForTwo: 550,

    address: "Indira Nagar",

    city: "Lucknow",

    state: "Uttar Pradesh",

    pincode: "226016",

    isVeg: false,

    isOpen: true,

    isFeatured: false,

    offers: [
      {
        title: "Flat ₹120 OFF",

        discount: 120,
      },
    ],
  },


];



const seedRestaurants = async () => {
  try {
    await connectDb();

    console.log("🗑 Removing old restaurants...");
    await Restaurant.deleteMany();

    console.log("🍔 Inserting restaurants...");
    await Restaurant.insertMany(restaurants);

    console.log("✅ Restaurants seeded successfully.");
    console.log(`📦 Total Restaurants : ${restaurants.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error");
    console.error(error);

    process.exit(1);
  }
};

seedRestaurants();