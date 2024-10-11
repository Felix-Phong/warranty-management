import express from 'express';

import { createWarrantyHistory, deleteWarrantyHistoryById, getAllWarrantyHistorys, getWarrantyHistoryById, updateWarrantyHistoryById } from '../controllers/warrantyHistory.controller';

import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/warrantyHistorys', isAuthenticated, createWarrantyHistory);

    router.get('/warrantyHistorys', isAuthenticated, getAllWarrantyHistorys);

    router.get('/warrantyHistorys/:id', isAuthenticated, getWarrantyHistoryById);

    router.patch('/warrantyHistorys/:id', isAuthenticated, updateWarrantyHistoryById);

    router.delete('/warrantyHistorys/:id', isAuthenticated, deleteWarrantyHistoryById);
}