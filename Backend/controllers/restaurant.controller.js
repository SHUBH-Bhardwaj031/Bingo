import {
  createRestaurantService,
  getAllRestaurantsService,
  getRestaurantByIdService,
  getRestaurantBySlugService,
  updateRestaurantService,
  deleteRestaurantService,
} from "../services/restaurant.service.js";

/* ===========================================
   Create Restaurant
=========================================== */

export const createRestaurant = async (req, res) => {
  try {
    const restaurant = await createRestaurantService(req.body);

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get All Restaurants
=========================================== */

export const getAllRestaurants = async (req, res) => {
  try {
   const result = await getAllRestaurantsService(req.query);

    return res.status(200).json({
  success: true,
  restaurants: result.restaurants,
  pagination: result.pagination,
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get Restaurant By ID
=========================================== */

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await getRestaurantByIdService(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Get Restaurant By Slug
=========================================== */

export const getRestaurantBySlug = async (req, res) => {
  try {
    const restaurant = await getRestaurantBySlugService(req.params.slug);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Update Restaurant
=========================================== */

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await updateRestaurantService(
      req.params.id,
      req.body
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================================
   Delete Restaurant
=========================================== */

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await deleteRestaurantService(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};