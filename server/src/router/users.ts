import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';

import { isAuthenticated, isOwner } from '../middlewares';
import authentication from './authentication';


export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);


    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser); // :id chính là param sử dụng trong controller

    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}

