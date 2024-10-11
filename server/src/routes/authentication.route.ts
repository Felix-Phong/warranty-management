import express from 'express';
import { login, register, logout } from '../controllers/authentication.controller';

export default (router: express.Router) => {
    // Route để đăng ký người dùng mới
    router.post('/auth/register', register);

    // Route để đăng nhập người dùng
    router.post('/auth/login', login);

    // Route để đăng xuất người dùng
    router.post('/auth/logout', logout); // Thêm route cho logout
};
