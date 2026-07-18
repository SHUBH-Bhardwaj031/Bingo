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
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBjRk-bI8p57t8Np3aAYaN19lrZM-ctuK7lXhTA63uA&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBjRk-bI8p57t8Np3aAYaN19lrZM-ctuK7lXhTA63uA&s=10",
    description: "Cheesy & delicious pizzas",
    sortOrder: 1,
  },
  {
    name: "Burger",
    slug: "burger",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfiVcbu49d_nUGwL6R7ZbVpoQYbuGSWSRM05BkGMPNw&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfiVcbu49d_nUGwL6R7ZbVpoQYbuGSWSRM05BkGMPNw&s=10",
    description: "Juicy burgers",
    sortOrder: 2,
  },
  {
    name: "Biryani",
    slug: "biryani",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2vcm2wYZPyspsFHur8iz0naHwTBIl0A7pRJCBYW6Vw&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_EV-qh4Pu13muRkx4ElZUeOKOb7DLA3HNpUfLreGtA&s=10",
    description: "Authentic dum biryani",
    sortOrder: 3,
  },
  {
    name: "Chinese",
    slug: "chinese",
    icon: "https://loremflickr.com/100/100/noodles",
    banner: "https://loremflickr.com/600/400/chinesefood",
    description: "Chinese specialities",
    sortOrder: 4,
  },
  {
    name: "Momos",
    slug: "momos",
    icon: "https://dms.mydukaan.io/original/jpeg/4338846/1f4ed201-cae3-41e6-90b8-319709966f5f/chicken-momo-3b453671-d5a3-45c5-8494-92847dedc6b3.jpeg",
    banner: "https://dms.mydukaan.io/original/jpeg/4338846/1f4ed201-cae3-41e6-90b8-319709966f5f/chicken-momo-3b453671-d5a3-45c5-8494-92847dedc6b3.jpeg",
    description: "Steamed & fried momos",
    sortOrder: 5,
  },
  {
    name: "Coffee",
    slug: "coffee",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnjQoygmTifgO4JM5RTbda-IzyfKbSwWUnY8NVvgXsDg&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnjQoygmTifgO4JM5RTbda-IzyfKbSwWUnY8NVvgXsDg&s=10",
    description: "Coffee & beverages",
    sortOrder: 6,
  },
  {
    name: "Dessert",
    slug: "dessert",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtOBUsSwAvr_71_-Rc8Z_36YYvM5Q6zZrp7UabY5Q3dw&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtOBUsSwAvr_71_-Rc8Z_36YYvM5Q6zZrp7UabY5Q3dw&s=10",
    description: "Sweet treats",
    sortOrder: 7,
  },
  {
    name: "Drinks",
    slug: "drinks",
    icon: "https://loremflickr.com/100/100/beverage",
    banner: "https://loremflickr.com/600/400/coldrink,beverage",
    description: "Cold drinks & beverages",
    sortOrder: 8,
  },
  {
    name: "Healthy",
    slug: "healthy",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHL8zlj8NGmmFhNcjwgAv0WfCK-0_ROMpxWkh-OIoog&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHL8zlj8NGmmFhNcjwgAv0WfCK-0_ROMpxWkh-OIoog&s=10",
    description: "Healthy meals",
    sortOrder: 9,
  },
  {
    name: "Rolls",
    slug: "rolls",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHY3Wr9TTAVzGnzY86eUPmg5Qq8rECJsqudn93OIMJg&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHY3Wr9TTAVzGnzY86eUPmg5Qq8rECJsqudn93OIMJg&s=10",
    description: "Rolls & wraps",
    sortOrder: 10,
  },
  {
    name: "Sandwich",
    slug: "sandwich",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV9CJoCjGXdVpI-P1vv6Loxn4kbvmCP3JfPJBPscloA&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV9CJoCjGXdVpI-P1vv6Loxn4kbvmCP3JfPJBPscloA&s=10",
    description: "Fresh sandwiches",
    sortOrder: 11,
  },
  {
    name: "Chicken",
    slug: "chicken",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkWV_51Y3LI2FAVxqnSoVGfecIPnqCxb7LUsud6R35Q&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkWV_51Y3LI2FAVxqnSoVGfecIPnqCxb7LUsud6R35Q&s=10",
    description: "Chicken specials",
    sortOrder: 12,
  },
  {
    name: "North Indian",
    slug: "north-indian",
    icon: "https://loremflickr.com/100/100/indianfood",
    banner: "https://loremflickr.com/600/400/indianfood,curry",
    description: "North Indian cuisine",
    sortOrder: 13,
  },
  {
    name: "South Indian",
    slug: "south-indian",
    icon: "https://loremflickr.com/100/100/dosa",
    banner: "https://loremflickr.com/600/400/dosa,indianfood",
    description: "South Indian cuisine",
    sortOrder: 14,
  },
  {
    name: "Italian",
    slug: "italian",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrrlFJz2Jvi8uBkoll09onYn5NzZVhMfmH6iW04KPFTw&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrrlFJz2Jvi8uBkoll09onYn5NzZVhMfmH6iW04KPFTw&s=10",
    description: "Italian dishes",
    sortOrder: 15,
  },
  {
    name: "Mexican",
    slug: "mexican",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV2JMai2DDQyNvOV4UFY8SoKosqjm6IX1I15rBOmyvVg&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV2JMai2DDQyNvOV4UFY8SoKosqjm6IX1I15rBOmyvVg&s=10",
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