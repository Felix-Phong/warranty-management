import express from 'express';

import { 
    createOrder, deleteOrderById, getAllOrders, 
    getOrderById, updateOrderById, filterOrderByCreatedDay,
    detail
} from '../controllers/order.controller';

import { isAuthenticated } from '../middlewares';

export default(router:express.Router) =>{
    router.get('/orders/detail/:orderID', isAuthenticated, detail);
    router.get('/orders', isAuthenticated, filterOrderByCreatedDay);
    router.post('/orders',isAuthenticated,createOrder);
    router.get('/orders',isAuthenticated,getAllOrders);
    router.get('/orders/:id',isAuthenticated,getOrderById);
    router.delete('/orders/:id',isAuthenticated,deleteOrderById);
    router.put('/orders/:id',isAuthenticated,updateOrderById);
}