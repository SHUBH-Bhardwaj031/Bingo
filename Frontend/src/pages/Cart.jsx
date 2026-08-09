import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import { serverUrl } from "../App";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

 const getCart = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get(
      `${serverUrl}/api/cart`,
      {
        withCredentials: true,
      }
    );

    setCart(data.cart || { items: [] });

  } catch (error) {

    console.error("Get Cart Error:", error);

    setCart({
      items: [],
    });

  } finally {

    setLoading(false);

  }
};


const updateQuantity = async (foodId, quantity) => {

  try {

    if (quantity < 1) {

      await removeItem(foodId);

      return;
    }

    const { data } = await axios.patch(
      `${serverUrl}/api/cart/update`,
      {
        foodId,
        quantity,
      },
      {
        withCredentials: true,
      }
    );

  if (data.success) {
  await getCart();
}

  } catch (error) {

    console.error(
      "Update Quantity Error:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to update quantity"
    );

  }

};


const removeItem = async (foodId) => {

  try {

    const { data } = await axios.delete(
      `${serverUrl}/api/cart/remove`,
      {
        data: {
          foodId,
        },
        withCredentials: true,
      }
    );

   if (data.success) {
  await getCart();
}

  } catch (error) {

    console.error(
      "Remove Cart Item Error:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to remove item"
    );

  }

};


useEffect(() => {

  getCart();

}, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
            >
              <ArrowLeft size={19} />
              Continue Shopping
            </button>

            <div className="mt-5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <ShoppingBag
                  size={24}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Your Cart
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  Review your items before checkout
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading ? (
          <div className="max-w-7xl mx-auto px-6 py-24 flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                size={38}
                className="text-orange-500 animate-spin"
              />

              <p className="text-gray-500">
                Loading your cart...
              </p>
            </div>
          </div>
        ) : (
          <section className="max-w-7xl mx-auto px-6 py-10">
            {/* Empty Cart */}
            {!cart?.items?.some((item) => item?.food) ? (

  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-20 text-center">

    {/* SAD EMOJI */}

    <div
      className="
        w-28
        h-28
        mx-auto
        rounded-full
        bg-orange-50
        flex
        items-center
        justify-center
        text-6xl
        shadow-sm
      "
    >
      😔
    </div>


    {/* TITLE */}

    <h2 className="text-3xl font-bold text-gray-900 mt-7">
      Nothing in your cart
    </h2>


    {/* DESCRIPTION */}

    <p className="text-gray-500 mt-3 leading-relaxed">
      Your cart is feeling a little lonely.
      <br />
      Add something delicious and make it happy! 🍕
    </p>


    {/* BUTTON */}

    <button
      onClick={() => navigate("/restaurants")}
      className="
        mt-7
        bg-orange-500
        hover:bg-orange-600
        text-white
        px-7
        py-3.5
        rounded-2xl
        font-semibold
        transition
        hover:scale-105
        shadow-lg
        shadow-orange-200
      "
    >
      Explore Restaurants
    </button>

  </div>

) : (
  <div className="grid lg:grid-cols-[1fr_380px] gap-8">

    {/* =========================
        CART ITEMS
    ========================= */}

    <div className="space-y-5">

      {cart.items.map((item) => {
        const food = item.food;

        if (!food) return null;

        const itemPrice =
          food.discountPrice > 0
            ? food.discountPrice
            : food.price;

        const itemTotal = itemPrice * item.quantity;

        return (
          <div
            key={food._id}
            className="
              bg-white
              rounded-3xl
              border
              border-gray-100
              shadow-sm
              p-5
              flex
              gap-5
              transition
              hover:shadow-md
            "
          >

            {/* FOOD IMAGE */}

            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">

              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />

            </div>


            {/* FOOD DETAILS */}

            <div className="flex-1 min-w-0">

              <div className="flex justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-xl font-bold text-gray-900 truncate">
                      {food.name}
                    </h2>

                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        food.isVeg
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {food.restaurant?.name || "Restaurant"}
                  </p>

                </div>


                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeItem(food._id)
                  }
                  className="
                    w-9
                    h-9
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-red-500
                    hover:bg-red-50
                    transition
                  "
                  title="Remove item"
                >

                  <Trash2 size={18} />

                </button>

              </div>


              {/* RATING */}

              <div className="flex items-center gap-4 mt-3">

                <span className="text-sm font-semibold text-gray-700">
                  ⭐ {food.rating || "4.5"}
                </span>

                {food.totalReviews > 0 && (
                  <span className="text-xs text-gray-400">
                    {food.totalReviews} Reviews
                  </span>
                )}

                <span className="text-sm text-gray-500">
                  {food.preparationTime || 20} min
                </span>

              </div>


              {/* PRICE + QUANTITY */}

              <div className="flex items-end justify-between mt-5">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="text-xl font-bold text-gray-900">
                      ₹{itemPrice}
                    </span>

                    {food.discountPrice > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{food.price}
                      </span>
                    )}

                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    per item
                  </p>

                </div>


                {/* QUANTITY */}

                <div
                  className="
                    flex
                    items-center
                    border
                    border-gray-200
                    rounded-xl
                    overflow-hidden
                    bg-gray-50
                  "
                >

                  <button
                    onClick={() =>
                      updateQuantity(
                        food._id,
                        item.quantity - 1
                      )
                    }
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-gray-600
                      hover:bg-orange-50
                      hover:text-orange-500
                      transition
                    "
                  >

                    <Minus size={16} />

                  </button>


                  <span
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      font-semibold
                      text-gray-900
                    "
                  >
                    {item.quantity}
                  </span>


                  <button
                    onClick={() =>
                      updateQuantity(
                        food._id,
                        item.quantity + 1
                      )
                    }
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-gray-600
                      hover:bg-orange-50
                      hover:text-orange-500
                      transition
                    "
                  >

                    <Plus size={16} />

                  </button>

                </div>


                {/* ITEM TOTAL */}

                <div className="text-right">

                  <p className="text-xs text-gray-400">
                    Total
                  </p>

                  <p className="text-xl font-bold text-orange-500">
                    ₹{itemTotal}
                  </p>

                </div>

              </div>

            </div>

          </div>
        );
      })}

    </div>


    {/* =========================
        ORDER SUMMARY
    ========================= */}

    <div className="lg:sticky lg:top-28 h-fit">

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-gray-100
          shadow-sm
          p-6
        "
      >

        <h2 className="text-xl font-bold text-gray-900">
          Order Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review your order
        </p>


        {/* SUMMARY */}

        <div className="mt-6 space-y-4">

          <div className="flex justify-between text-gray-600">
            <span>
              Item Total
            </span>

            <span className="font-medium text-gray-900">
              ₹
              {cart.items.reduce(
                (total, item) => {
                  const food = item.food;

                  if (!food) return total;

                  const price =
                    food.discountPrice > 0
                      ? food.discountPrice
                      : food.price;

                  return total + price * item.quantity;
                },
                0
              )}
            </span>
          </div>


          <div className="flex justify-between text-gray-600">

            <span>
              Delivery Fee
            </span>

            <span className="font-medium text-gray-900">
              ₹40
            </span>

          </div>


          <div className="flex justify-between text-gray-600">

            <span>
              Platform Fee
            </span>

            <span className="font-medium text-gray-900">
              ₹5
            </span>

          </div>


          <div className="border-t border-dashed border-gray-200 pt-4">

            <div className="flex justify-between">

              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-bold text-orange-500">

                ₹
                {cart.items.reduce(
                  (total, item) => {
                    const food = item.food;

                    if (!food) return total;

                    const price =
                      food.discountPrice > 0
                        ? food.discountPrice
                        : food.price;

                    return total + price * item.quantity;
                  },
                  0
                ) + 45}

              </span>

            </div>

          </div>

        </div>


        {/* CHECKOUT BUTTON */}

        <button
          className="
            w-full
            mt-7
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-4
            rounded-2xl
            font-bold
            text-lg
            transition
            hover:shadow-lg
          "
        >
          Proceed to Checkout
        </button>


        {/* SECURITY */}

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Safe & secure checkout
        </p>

      </div>

    </div>

  </div>
)}
          </section>
        )}
      </main>
    </>
  );
}