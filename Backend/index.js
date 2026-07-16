import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dns from "dns";

import authRouter from "./routes/auth.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import foodRouter from "./routes/food.routes.js";
import categoryRouter from "./routes/category.routes.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

/* ===============================
   API Routes
=============================== */

app.use("/api/auth", authRouter);

app.use("/api/restaurants", restaurantRouter);

app.use("/api/foods", foodRouter);

app.use("/api/categories", categoryRouter);

/* ===============================
   Health Check
=============================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bingo API Running 🚀",
  });
});

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  await connectDb();
  console.log(`🚀 Server Running on Port ${port}`);
});