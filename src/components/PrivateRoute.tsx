// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface PrivateRouteProps {
    element: React.ReactNode; // The component to render
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { user } = useAuth(); // Get user from Auth context

    // Check if the user is authenticated (active)
    return user && user.active ? <>{element}</> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
