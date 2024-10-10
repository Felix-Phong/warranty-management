// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProductListPage from './pages/ProductListPage';
import ProductDetail from './pages/ProductDetail'; // Import the new ProductDetail component
import OrderList from './pages/OderList';
import CustomerManagement from './pages/CustomerManagement';
import WarrantyRegistration from './pages/WarrantyRegistration';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/customers" element={<CustomerManagement/>} />
                <Route path="/warrantys" element={<WarrantyRegistration />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetail />} /> {/* Add route for ProductDetail */}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
