import Category from "../models/category.model.js";

/* ==========================
   Get All Categories
========================== */

export const getAllCategoriesService = async () => {
  return await Category.find({ isActive: true }).sort({
    sortOrder: 1,
  });
};

/* ==========================
   Get Category By Slug
========================== */

export const getCategoryBySlugService = async (slug) => {
  return await Category.findOne({
    slug,
    isActive: true,
  });
};