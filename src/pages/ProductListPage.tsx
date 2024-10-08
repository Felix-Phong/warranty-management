// src/pages/ProductListPage.tsx
import React from 'react';
import ProductList from '../components/Products';
import Layout from '../components/Layout';

const ProductListPage: React.FC = () => {
    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductListPage;
