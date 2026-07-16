import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // Wait until auth check completes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Logged in
  return children;
}