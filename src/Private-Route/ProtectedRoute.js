import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserAuth } from "../Context/AuthContextProvider";

const ProtectedRoute = () => {

  // used for storing route location
  const location = useLocation();

  // context call
  const { user } = useUserAuth();

  return user ? 
  (<Outlet />) : 
  (<Navigate to="/" replace state={{ from: location }} />);
};

export default ProtectedRoute;
