import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // Wait until authentication check completes
  if (loading) {
    return <Loader />;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // User is logged in
  return children;
}