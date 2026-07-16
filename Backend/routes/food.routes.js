import express from "express";

import {
  createFood,
  getAllFoods,
  getFoodById,
  getFoodsByRestaurant,
  getFoodsByCategory,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import ownerMiddleware from "../middlewares/owner.middleware.js";

const router = express.Router();

/* ==========================================
   Public Routes
========================================== */

router.get("/", getAllFoods);

router.get("/:id", getFoodById);

router.get("/restaurant/:restaurantId", getFoodsByRestaurant);

router.get("/category/:categoryId", getFoodsByCategory);

/* ==========================================
   Owner Routes
========================================== */

router.post(
  "/",
  authMiddleware,
  ownerMiddleware,
  createFood
);

router.put(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  updateFood
);

router.delete(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  deleteFood
);

export default router;