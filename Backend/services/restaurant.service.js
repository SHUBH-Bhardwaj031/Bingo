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

export const getAllRestaurantsService = async (query) => {
  const {
    page = 1,
    limit = 100,
    search = "",
    city = "",
    featured,
    sort = "latest",
  } = query;

  const filters = {};

  // Search
  if (search) {
    filters.name = {
      $regex: search,
      $options: "i",
    };
  }

  // City
  if (city) {
    filters.city = city;
  }

  // Featured
  if (featured === "true") {
    filters.isFeatured = true;
  }

  // Sorting
  let sortOption = { createdAt: -1 };

  switch (sort) {
    case "rating":
      sortOption = { rating: -1 };
      break;

    case "deliveryTime":
      sortOption = { deliveryTime: 1 };
      break;

    case "priceLow":
      sortOption = { priceForTwo: 1 };
      break;

    case "priceHigh":
      sortOption = { priceForTwo: -1 };
      break;

    default:
      sortOption = { createdAt: -1 };
  }

  const total = await Restaurant.countDocuments(filters);

  const restaurants = await Restaurant.find(filters)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return {
    restaurants,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
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
  return await Restaurant.findOne({ slug }).populate("owner", "firstName lastName");
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