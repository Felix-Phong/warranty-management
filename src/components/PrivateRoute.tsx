// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface PrivateRouteProps {
    children: React.ReactNode; // The component to render inside the route
    allowedRoles: string[];   // Roles allowed to access the route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
    const { user } = useAuth(); // Get user from Auth context

    // Check if the user is authenticated and has one of the allowed roles
    if (user && user.active && allowedRoles.includes(user.role)) {
        return <>{children}</>; // Render children (the component to render)
    } else {
        return <Navigate to="/login" />; // Redirect to login if not authenticated or role not allowed
    }
};

export default PrivateRoute;
