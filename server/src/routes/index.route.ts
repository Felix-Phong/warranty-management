import express from 'express';

import authentication from './authentication.route';
import users from './users.route';
import suppliers from './supplier.route';
import products from './product.route';
import orders from './order.route';
import customers from './customer.route';
import warrantyHistorys from './warrantyHistory.route';
import warrantyRegistrations from './warrantyRegistration.route';

const router = express.Router();


export default (): express.Router => {
    authentication(router);

    users(router);

    suppliers(router);

    products(router);

    orders(router);

    customers(router);

    warrantyHistorys(router);

    warrantyRegistrations(router);

    return router;
} 



