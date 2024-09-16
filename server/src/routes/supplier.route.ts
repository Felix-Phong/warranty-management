import express from 'express';

import { getSupplierById, createSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from '../controllers/supplier.controller';

import { isAuthenticated, isOwner } from '../middlewares';
import authentication from './authentication.route';


export default (router: express.Router) => {
    router.post('/suppliers', isAuthenticated, createSupplier);

    router.get('/suppliers', isAuthenticated, getAllSuppliers);

    router.get('/suppliers/:id', isAuthenticated, getSupplierById);

    router.delete('/suppliers/:id', isAuthenticated, deleteSupplier); 

    router.patch('/suppliers/:id', isAuthenticated, updateSupplier);
}

