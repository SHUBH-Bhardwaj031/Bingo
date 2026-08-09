import Food from "../models/food.model.js";
import Category from "../models/category.model.js";

/* ==========================================
   Create Food
========================================== */

export const createFoodService = async (data) => {
  return await Food.create(data);
};

/* ==========================================
   Get All Foods
========================================== */

export const getAllFoodsService = async () => {
  return await Food.find()
    .populate("restaurant", "name")
    .populate("category", "name")
    .sort({ createdAt: -1 });
};

/* ==========================================
   Get Food By ID
========================================== */

export const getFoodByIdService = async (id) => {
  return await Food.findById(id)
    .populate("restaurant")
    .populate("category");
};

/* ==========================================
   Get Foods By Restaurant
========================================== */

export const getFoodsByRestaurantService = async (
  restaurantId
) => {
  return await Food.find({
    restaurant: restaurantId,
    isAvailable: true,
  }).sort({ createdAt: -1 });
};

/* ==========================================
   Get Foods By Category
========================================== */

export const getFoodsByCategoryService = async (slug) => {
  const category = await Category.findOne({
    slug,
    isActive: true,
  });

  if (!category) {
    return {
      category: null,
      foods: [],
    };
  }

  const foods = await Food.find({
    category: category._id,
    isAvailable: true,
  })
    .populate("restaurant", "name logo rating deliveryTime")
    .populate("category", "name slug banner")
    .sort({ rating: -1 });

  return {
    category,
    foods,
  };
};

/* ==========================================
   Update Food
========================================== */

export const updateFoodService = async (
  id,
  data
) => {
  return await Food.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

/* ==========================================
   Delete Food
========================================== */

export const deleteFoodService = async (id) => {
  return await Food.findByIdAndDelete(id);
};