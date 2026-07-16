import Restaurant from "../models/restaurant.model.js";

/* ==========================
   Create Restaurant
========================== */

export const createRestaurantService = async (data) => {
  return await Restaurant.create(data);
};

/* ==========================
   Get All Restaurants
========================== */

export const getAllRestaurantsService = async () => {
  return await Restaurant.find().sort({
    createdAt: -1,
  });
};

/* ==========================
   Get Restaurant By ID
========================== */

export const getRestaurantByIdService = async (id) => {
  return await Restaurant.findById(id);
};

/* ==========================
   Get Restaurant By Slug
========================== */

export const getRestaurantBySlugService = async (slug) => {
  return await Restaurant.findOne({
    slug,
  });
};

/* ==========================
   Update Restaurant
========================== */

export const updateRestaurantService = async (
  id,
  data
) => {
  return await Restaurant.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

/* ==========================
   Delete Restaurant
========================== */

export const deleteRestaurantService = async (
  id
) => {
  return await Restaurant.findByIdAndDelete(id);
};