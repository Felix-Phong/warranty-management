import express from 'express';

import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller';

import { isAuthenticated, isOwner } from '../middlewares';
import authentication from './authentication.route';


export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/:id', isAuthenticated, getUserById);

    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser); 

    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}

