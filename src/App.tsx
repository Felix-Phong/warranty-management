// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProductListPage from './pages/ProductListPage';
import ProductDetail from './pages/ProductDetail';
import OrderList from './pages/OderList';
import CustomerManagement from './pages/CustomerManagement';
import WarrantyRegistration from './pages/WarrantyRegistration';
import WarrantyRegistrationProduct from './pages/WarrantyRegistrationProduct';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App: React.FC = () => {
    return (
        <AuthProvider> {/* Wrap your routes with AuthProvider */}
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/orders" element={<PrivateRoute element={<OrderList />} />} />
                    <Route path="/customers" element={<PrivateRoute element={<CustomerManagement />} />} />
                    <Route path="/warrantys" element={<PrivateRoute element={<WarrantyRegistration />} />} />
                    <Route path="/products" element={<PrivateRoute element={<ProductListPage />} />} />
                    <Route path="/products/:id" element={<PrivateRoute element={<ProductDetail />} />} />
                    <Route path="/warranty-registration/:customerId" element={<PrivateRoute element={<WarrantyRegistrationProduct />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
