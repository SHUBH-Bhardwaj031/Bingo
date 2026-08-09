import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Home from "./pages/Home";

import RestaurantListing from "./pages/RestaurantListing";
import RestaurantDetails from "./pages/RestaurantDetails";
import CategoryPage from "./pages/CategoryPage";

import OwnerDashboard from "./pages/OwnerDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import Cart from "./pages/Cart";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import OwnerRoute from "./components/auth/OwnerRoute";

export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

export default function App() {
  return (
    <>
      {/* ================= TOAST NOTIFICATIONS ================= */}

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2200,
          style: {
            borderRadius: "18px",
            padding: "12px 16px",
            background: "#ffffff",
            color: "#1f2937",
            fontWeight: "600",
            boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
          },
        }}
      />

      {/* ================= ROUTES ================= */}

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* ================= GUEST ROUTES ================= */}

        <Route
          path="/signin"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />

        <Route
          path="/forgotpassword"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />

        <Route
          path="/resetpassword/:token"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        {/* ================= CUSTOMER ================= */}

        <Route
          path="/restaurants"
          element={
            <ProtectedRoute>
              <RestaurantListing />
            </ProtectedRoute>
          }
        />

        {/* ================= CATEGORY ================= */}

        <Route
          path="/category/:category"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />

        {/* ================= RESTAURANT DETAILS ================= */}

        <Route
          path="/restaurants/:slug"
          element={
            <ProtectedRoute>
              <RestaurantDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurants/slug/:slug"
          element={
            <ProtectedRoute>
              <RestaurantDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= CART ================= */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* ================= OWNER ================= */}

        <Route
          path="/owner"
          element={
            <OwnerRoute>
              <OwnerDashboard />
            </OwnerRoute>
          }
        />

        {/* ================= DELIVERY ================= */}

        <Route
          path="/delivery"
          element={
            <ProtectedRoute>
              <DeliveryDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}