// src/controllers/auth.controller.ts

import express from 'express';
import { UserModel } from '../Models/user.model';
import { authentication, random } from '../helper';

// Hàm đăng nhập
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem email và password có được cung cấp không
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
        const user = await UserModel.findOne({ email })
            .select('+authentication.salt +authentication.password');

        // Nếu không tìm thấy người dùng, trả về lỗi 401
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Mã hóa password nhập vào và so sánh với password trong cơ sở dữ liệu
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Cập nhật active thành true khi đăng nhập thành công
        user.active = true;
        await user.save();

        // Nếu đăng nhập thành công, trả về thông tin người dùng
        return res.status(200).json({
            id: user._id,
            email: user.email,
            full_name: user.full_name,
            role: user.role,
            active: user.active
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
};

// Hàm đăng xuất
export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const { userId } = req.body; // Giả sử bạn gửi userId trong body

        // Kiểm tra xem userId có được cung cấp không
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Cập nhật trạng thái active của người dùng thành false
        await UserModel.findByIdAndUpdate(userId, { active: false });

        return res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
        console.error('Logout error:', error); // Ghi lại lỗi trên server
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log('Received request body:', req.body);

        const { email, password, full_name, role } = req.body; // Thêm role vào đây

        // Kiểm tra xem email, password và full_name có được cung cấp không
        if (!email || !password || !full_name) {
            return res.status(400).json({ message: 'Email, password, and full name are required.' });
        }

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Tạo muối và mã hóa mật khẩu
        const salt = random();
        const newUser = new UserModel({
            email,
            full_name,
            role: role || 'user', // Sử dụng vai trò mặc định nếu không có vai trò được chỉ định
            active: false, // Đặt active mặc định là false khi đăng ký
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });

        // Lưu người dùng mới vào cơ sở dữ liệu
        const user = await newUser.save();

        // Trả về thông tin người dùng mới, bao gồm id và vai trò
        return res.status(201).json({
            id: user._id, // Thêm id của người dùng mới
            email: user.email,
            full_name: user.full_name,
            role: user.role,
            active: user.active // Trả về trạng thái active
        });
    } catch (error) {
        console.error('Registration error:', error); // Ghi lại lỗi trên server
        return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
};