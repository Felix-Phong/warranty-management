import express from 'express';

import { createWarrantyRegistration, deleteWarrantyRegistrationById, getAllWarrantyRegistrations, getWarrantyRegistrationById, updateWarrantyRegistrationById } from '../controllers/warrantyRegistration.controller';

import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/warrantyRegistrations', isAuthenticated, createWarrantyRegistration);

    router.get('/warrantyRegistrations', isAuthenticated, getAllWarrantyRegistrations);

    router.get('/warrantyRegistrations/:id', isAuthenticated, getWarrantyRegistrationById);

    router.patch('/warrantyRegistrations/:id', isAuthenticated, updateWarrantyRegistrationById);

    router.delete('/warrantyRegistrations/:id', isAuthenticated, deleteWarrantyRegistrationById);
}