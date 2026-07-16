import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import RestaurantListing from "./pages/RestaurantListing";
import OwnerDashboard from "./pages/OwnerDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import RestaurantDetails from "./pages/RestaurantDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import OwnerRoute from "./components/auth/OwnerRoute";

export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

export default function App() {
  return (
    <Routes>

      {/* Default */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Guest Routes */}
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

      {/* Customer */}
      <Route
       path="/restaurants"
        element={
          <ProtectedRoute>
           <RestaurantListing />
          </ProtectedRoute>
        }
      />

      {/* Owner */}
      <Route
        path="/owner"
        element={
          <OwnerRoute>
            <OwnerDashboard />
          </OwnerRoute>
        }
      />

      {/* Delivery */}
      <Route
        path="/delivery"
        element={
          <ProtectedRoute>
            <DeliveryDashboard />
          </ProtectedRoute>
        }
      />
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

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/signin" replace />}
      />

    </Routes>
  );
}