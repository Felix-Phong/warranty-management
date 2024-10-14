import express from 'express';

import { 
    getCustomerQueryParams, createWarrantyRegistration, deleteWarrantyRegistrationById, 
    getAllWarrantyRegistrations, getWarrantyRegistrationById, updateWarrantyRegistrationById,
    getProductsByCustomerId, filterRegistrationByReceivedDate
} from '../controllers/warrantyRegistration.controller';


import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {

    router.get('/warrantyRegistrations/getRegistrationByReceivedDate', isAuthenticated, filterRegistrationByReceivedDate);

    router.get('/warrantyRegistrations/getCustomerQueryParams', isAuthenticated, getCustomerQueryParams);

    router.get('/warrantyRegistrations/getProductsByCustomerId/:id', isAuthenticated, getProductsByCustomerId);

    router.post('/warrantyRegistrations', isAuthenticated, createWarrantyRegistration);

    router.get('/warrantyRegistrations', isAuthenticated, getAllWarrantyRegistrations);

    router.get('/warrantyRegistrations/:id', isAuthenticated, getWarrantyRegistrationById);

    router.patch('/warrantyRegistrations/:id', isAuthenticated, updateWarrantyRegistrationById);

    router.delete('/warrantyRegistrations/:id', isAuthenticated, deleteWarrantyRegistrationById);
}