import Food from "../models/food.model.js";

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

export const getFoodsByCategoryService = async (
  categoryId
) => {
  return await Food.find({
    category: categoryId,
    isAvailable: true,
  }).sort({ createdAt: -1 });
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