import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    logo: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    cuisines: [
      {
        type: String,
      },
    ],

    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

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

    deliveryTime: {
      type: Number,
      default: 30,
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    minimumOrder: {
      type: Number,
      default: 0,
    },

    priceForTwo: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      default: "",
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    openingTime: {
      type: String,
      default: "09:00",
    },

    closingTime: {
      type: String,
      default: "23:00",
    },

    isVeg: {
      type: Boolean,
      default: false,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

   offers: [
  {
    title: String,
    description: String,
    discountType: {
      type: String,
      enum: ["flat", "percentage"],
    },
    value: Number,
  },
],
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema
);

export default Restaurant;