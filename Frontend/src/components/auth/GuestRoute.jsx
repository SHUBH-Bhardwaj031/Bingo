import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";


export default function GuestRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

   if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/restaurants" replace />;
  }

  return children;
}