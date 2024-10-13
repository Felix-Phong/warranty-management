// Models/user.model.ts

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['staff', 'staff technical', 'admin'], // Các vai trò có thể có
        default: 'staff' // Vai trò mặc định
    },
    authentication: {
        salt: String,
        password: String
    },
    active: {
        type: Boolean,
        default: true // Vai trò mặc định là hoạt động
    }
});

export const UserModel = mongoose.model('User', UserSchema);
