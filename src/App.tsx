// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProductListPage from './pages/ProductListPage';
import ProductDetail from './pages/ProductDetail';
import OrderList from './pages/OderList'; // Fix typo in import path
import CustomerManagement from './pages/CustomerManagement';
import WarrantyRegistration from './pages/WarrantyRegistration';
import WarrantyRegistrationProduct from './pages/WarrantyRegistrationProduct';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import WarrantyHistoryList from './pages/WarrantyHistory';

const App: React.FC = () => {
    return (
        <AuthProvider> {/* Wrap your routes with AuthProvider */}
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<HomePage />} />

                    {/* Use children instead of element */}
                    <Route path="/orders"
                        element={
                            <PrivateRoute allowedRoles={['staff', 'admin']}>
                                <OrderList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/customers"
                        element={
                            <PrivateRoute allowedRoles={['staff', 'admin']}>
                                <CustomerManagement />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/warrantys"
                        element={
                            <PrivateRoute allowedRoles={['staff', 'admin', 'staff technical']}>
                                <WarrantyRegistration />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/products"
                        element={
                            <PrivateRoute allowedRoles={['staff technical', 
                                                        'admin',
                                                        'staff']}>
                                <ProductListPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/products/:id"
                        element={
                            <PrivateRoute allowedRoles={['staff', 'admin']}>
                                <ProductDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/warranty-registration/:customerId"
                        element={
                            <PrivateRoute allowedRoles={['staff', 'staff technical', 'admin']}>
                                <WarrantyRegistrationProduct />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
