import {
  createFoodService,
  getAllFoodsService,
  getFoodByIdService,
  getFoodsByRestaurantService,
  getFoodsByCategoryService,
  updateFoodService,
  deleteFoodService,
} from "../services/food.service.js";

/* ==========================================
   Create Food
========================================== */

export const createFood = async (req, res) => {
  try {
    const food = await createFoodService(req.body);

    return res.status(201).json({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get All Foods
========================================== */

export const getAllFoods = async (req, res) => {
  try {
    const foods = await getAllFoodsService();

    return res.status(200).json({
      success: true,
      total: foods.length,
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get Food By ID
========================================== */

export const getFoodById = async (req, res) => {
  try {
    const food = await getFoodByIdService(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get Foods By Restaurant
========================================== */

export const getFoodsByRestaurant = async (req, res) => {
  try {
    const foods = await getFoodsByRestaurantService(
      req.params.restaurantId
    );

    return res.status(200).json({
      success: true,
      total: foods.length,
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get Foods By Category
========================================== */

export const getFoodsByCategory = async (req, res) => {
  try {
    const foods = await getFoodsByCategoryService(
      req.params.categoryId
    );

    return res.status(200).json({
      success: true,
      total: foods.length,
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Update Food
========================================== */

export const updateFood = async (req, res) => {
  try {
    const food = await updateFoodService(
      req.params.id,
      req.body
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Delete Food
========================================== */

export const deleteFood = async (req, res) => {
  try {
    const food = await deleteFoodService(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};