import Cart from "../models/cart.model.js";
import Food from "../models/food.model.js";

/* ===========================
   Get Cart
=========================== */

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate({
      path: "items.food",
      populate: {
        path: "restaurant",
        select: "name",
      },
    });

    return res.status(200).json({
      success: true,
      cart,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

/* ===========================
   Add To Cart
=========================== */

export const addToCart = async (req, res) => {

  try {

    const { foodId } = req.body;

    const food = await Food.findById(foodId);

    if (!food) {

      return res.status(404).json({
        success: false,
        message: "Food not found",
      });

    }

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {

      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });

    }

    const item = cart.items.find(
      (i) => i.food.toString() === foodId
    );

    if (item) {

      item.quantity += 1;

    } else {

      cart.items.push({
        food: foodId,
        quantity: 1,
      });

    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Added to cart",
      cart,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

/* ===========================
   Update Quantity
=========================== */

export const updateCart = async (req, res) => {

  try {

    const { foodId, quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });

    }

    const item = cart.items.find(
      (i) => i.food.toString() === foodId
    );

    if (!item) {

      return res.status(404).json({
        success: false,
        message: "Item not found",
      });

    }

    item.quantity = quantity;

    cart.items = cart.items.filter(
      (i) => i.quantity > 0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      cart,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

/* ===========================
   Remove Item
=========================== */

export const removeCartItem = async (req, res) => {

  try {

    const { foodId } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });

    }

    cart.items = cart.items.filter(
      (i) => i.food.toString() !== foodId
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Removed successfully",
      cart,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};