import express from 'express';

import authentication from './authentication.route';
import users from './users.route';
import suppliers from './supplier.route';
import products from './product.route';
import orders from './order.route';

const router = express.Router();


export default (): express.Router => {
    authentication(router);

    users(router);

    suppliers(router);

    products(router);

    orders(router);

    return router;
} 



