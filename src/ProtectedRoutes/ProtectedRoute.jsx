import React from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <p className="text-center mt-30 text-lg">Loading user...</p>;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!currentUser?.profileSetup) {
    const redirectPath =
      currentUser?.userType === "ally" ? "/profile/ally" : "/profile/host";

    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
