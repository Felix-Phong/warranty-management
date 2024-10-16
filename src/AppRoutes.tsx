// src/AppRoutes.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomerManagement';
import ProductsPage from './pages/ProductListPage';
import OrdersPage from './pages/OderList';
import WarrantyPage from './pages/WarrantyRegistration';
import LoginPage from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import WarrantyHistoryList from './pages/WarrantyHistory';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public route: Home page */}
                <Route path="/" element={<HomePage />} />

                {/* Public route: Login page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Private route: Customers page, accessible to 'staff' and 'admin' */}
                <Route
                    path="/customers"
                    element={
                        <PrivateRoute allowedRoles={['staff', 
                                                     'admin']}>
                            <CustomersPage />
                        </PrivateRoute>
                    }
                />

                {/* Private route: Products page, accessible to 'admin' only */}
                <Route
                    path="/products"
                    element={
                        <PrivateRoute allowedRoles={['admin',
                             'staff technical',
                             'staff'
                        ]}>
                            <ProductsPage />
                        </PrivateRoute>
                    }
                />

                {/* Private route: Orders page, accessible to 'admin' only */}
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute allowedRoles={['admin']}>
                            <OrdersPage />
                        </PrivateRoute>
                    }
                />

                {/* Private route: Warranty page, accessible to 'staff technical', 'staff', and 'admin' */}
                <Route
                    path="/warranty"
                    element={
                        <PrivateRoute allowedRoles={['staff technical', 'staff', 'admin']}>
                            <WarrantyPage />
                        </PrivateRoute>
                    }
                />

                 {/* Private route: WarrantyHistory page, accessible to 'staff technical' and 'admin' */}
                                <Route
                    path="/warrantyHistorys"
                    element={
                        <PrivateRoute allowedRoles={['staff technical', 'admin','staff']}>
                            <WarrantyHistoryList />
                        </PrivateRoute>
                    }
                />


                {/* Redirect all other routes to the home page if no access */}
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
