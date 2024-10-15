import express from 'express';

import { createCustomer, deleteCustomerById, getAllCustomer, getCustomerById, updateCustomerById } from '../controllers/customer.controller';

import { isAuthenticated } from '../middlewares';

export default(router:express.Router) =>{
    router.post('/customers',isAuthenticated,createCustomer);
    router.get('/customers',isAuthenticated,getAllCustomer);
    router.get('/customers/:id',isAuthenticated,getCustomerById);
    router.delete('/customers/:id',isAuthenticated,deleteCustomerById);
    router.put('/customers/:id',isAuthenticated,updateCustomerById);
}