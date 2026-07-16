import express from "express";

import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantBySlug,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import ownerMiddleware from "../middlewares/owner.middleware.js";

const router = express.Router();

/*
========================================
PUBLIC ROUTES
========================================
*/

router.get("/", getAllRestaurants);

router.get("/slug/:slug", getRestaurantBySlug);

router.get("/:id", getRestaurantById);


/*
========================================
OWNER ROUTES
========================================
*/

router.post(
  "/",
  authMiddleware,
  ownerMiddleware,
  createRestaurant
);

router.put(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  updateRestaurant
);

router.delete(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  deleteRestaurant
);

export default router;