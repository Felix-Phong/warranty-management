// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ProductListPage from './pages/ProductListPage';
import ProductDetail from './pages/ProductDetail'; // Import the new ProductDetail component

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetail />} /> {/* Add route for ProductDetail */}
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
