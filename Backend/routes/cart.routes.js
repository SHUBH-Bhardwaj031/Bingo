import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

/* ===========================
   Cart Routes
=========================== */

// Get User Cart
router.get(
  "/",
  authMiddleware,
  getCart
);

// Add Food To Cart
router.post(
  "/add",
  authMiddleware,
  addToCart
);

// Update Quantity
router.patch(
  "/update",
  authMiddleware,
  updateCart
);

// Remove Item
router.delete(
  "/remove",
  authMiddleware,
  removeCartItem
);

export default router;