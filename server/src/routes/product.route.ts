import express from 'express';

import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/product.controller';

import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/products', isAuthenticated, createProduct);

    router.get('/products', isAuthenticated, getAllProducts);

    router.get('/products/:id', isAuthenticated, getProductById);

    router.patch('/products/:id', isAuthenticated, updateProductById);

    router.delete('/products/:id', isAuthenticated, deleteProductById);
}