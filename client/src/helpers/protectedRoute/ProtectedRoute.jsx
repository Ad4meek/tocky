import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();

    if (!user.status.isAuthenticated) {
        return <Navigate to="/?auth-redirect=true" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
