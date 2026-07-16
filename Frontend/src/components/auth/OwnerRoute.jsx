import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OwnerRoute({ children }) {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== "owner") {
    return <Navigate to="/restaurants" replace />;
  }

  return children;
}