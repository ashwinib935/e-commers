import React from "react";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("encodedToken");

  const location = useLocation();
  return token ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}

export default PrivateRoute;
