import {
  getAllCategoriesService,
  getCategoryBySlugService,
} from "../services/category.service.js";

/* ==========================
   Get All Categories
========================== */

export const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();

    return res.status(200).json({
      success: true,
      total: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Get Category By Slug
========================== */

export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await getCategoryBySlugService(
      req.params.slug
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};