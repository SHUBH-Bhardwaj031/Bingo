import dotenv from "dotenv";
dotenv.config();
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import connectDb from "../config/db.js";
import Category from "../models/category.model.js";

const categories = [
  {
    name: "Pizza",
    slug: "pizza",
    icon: "🍕",
    banner: "/images/categories/pizza.jpg",
    description: "Cheesy & delicious pizzas",
    sortOrder: 1,
  },
  {
    name: "Burger",
    slug: "burger",
    icon: "🍔",
    banner: "/images/categories/burger.jpg",
    description: "Juicy burgers",
    sortOrder: 2,
  },
  {
    name: "Biryani",
    slug: "biryani",
    icon: "🍛",
    banner: "/images/categories/biryani.jpg",
    description: "Authentic dum biryani",
    sortOrder: 3,
  },
  {
    name: "Chinese",
    slug: "chinese",
    icon: "🍜",
    banner: "/images/categories/chinese.jpg",
    description: "Chinese specialities",
    sortOrder: 4,
  },
  {
    name: "Momos",
    slug: "momos",
    icon: "🥟",
    banner: "/images/categories/momos.jpg",
    description: "Steamed & fried momos",
    sortOrder: 5,
  },
  {
    name: "Coffee",
    slug: "coffee",
    icon: "☕",
    banner: "/images/categories/coffee.jpg",
    description: "Coffee & beverages",
    sortOrder: 6,
  },
  {
    name: "Dessert",
    slug: "dessert",
    icon: "🍰",
    banner: "/images/categories/dessert.jpg",
    description: "Sweet treats",
    sortOrder: 7,
  },
  {
    name: "Drinks",
    slug: "drinks",
    icon: "🥤",
    banner: "/images/categories/drinks.jpg",
    description: "Cold drinks & beverages",
    sortOrder: 8,
  },
  {
    name: "Healthy",
    slug: "healthy",
    icon: "🥗",
    banner: "/images/categories/healthy.jpg",
    description: "Healthy meals",
    sortOrder: 9,
  },
  {
    name: "Rolls",
    slug: "rolls",
    icon: "🌯",
    banner: "/images/categories/rolls.jpg",
    description: "Rolls & wraps",
    sortOrder: 10,
  },
  {
    name: "Sandwich",
    slug: "sandwich",
    icon: "🥪",
    banner: "/images/categories/sandwich.jpg",
    description: "Fresh sandwiches",
    sortOrder: 11,
  },
  {
    name: "Chicken",
    slug: "chicken",
    icon: "🍗",
    banner: "/images/categories/chicken.jpg",
    description: "Chicken specials",
    sortOrder: 12,
  },
  {
    name: "North Indian",
    slug: "north-indian",
    icon: "🍽️",
    banner: "/images/categories/north-indian.jpg",
    description: "North Indian cuisine",
    sortOrder: 13,
  },
  {
    name: "South Indian",
    slug: "south-indian",
    icon: "🥘",
    banner: "/images/categories/south-indian.jpg",
    description: "South Indian cuisine",
    sortOrder: 14,
  },
  {
    name: "Italian",
    slug: "italian",
    icon: "🍝",
    banner: "/images/categories/italian.jpg",
    description: "Italian dishes",
    sortOrder: 15,
  },
  {
    name: "Mexican",
    slug: "mexican",
    icon: "🌮",
    banner: "/images/categories/mexican.jpg",
    description: "Mexican food",
    sortOrder: 16,
  },
];

const seedCategories = async () => {
  try {
    await connectDb();

    console.log("🗑 Removing old categories...");

    await Category.deleteMany();

    console.log("📦 Inserting categories...");

    await Category.insertMany(categories);

    console.log("✅ Categories seeded successfully.");
    console.log(`📂 Total Categories : ${categories.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error");
    console.error(error);

    process.exit(1);
  }
};

seedCategories();