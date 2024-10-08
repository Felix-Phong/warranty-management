import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './components/Products';
import PrivateRoute from './PrivateRoute'; // Component bảo vệ route

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<PrivateRoute element={<Products />} />} />
        </Routes>
    );
};

export default AppRoutes;
