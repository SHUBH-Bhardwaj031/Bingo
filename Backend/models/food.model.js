import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const foodSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
  type: String,
  default: "/images/foods/default-food.jpg",
},

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    preparationTime: {
      type: Number,
      default: 20,
    },

    calories: {
      type: Number,
      default: 0,
    },

    ingredients: [
      {
        type: String,
      },
    ],

    addons: [addonSchema],

    isVeg: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isRecommended: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

foodSchema.index({ restaurant: 1 });

foodSchema.index({ category: 1 });

foodSchema.index({ slug: 1 });

foodSchema.index({ restaurant: 1, category: 1 });

const Food = mongoose.model("Food", foodSchema);

export default Food;