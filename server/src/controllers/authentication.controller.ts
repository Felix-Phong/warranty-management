import express from 'express';
import { UserModel } from '../Models/user.model'; 
import { authentication, random } from '../helper';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }

        
        const user = await UserModel.findOne({ email })
            .select('+authentication.salt +authentication.password');
        
        if (!user) {
            return res.sendStatus(400);
        }

        
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        
        // Tạo sessionToken mới
        const salt = random();
        const newSessionToken = authentication(salt, user._id.toString());

        // Cập nhật sessionToken bằng PATCH, chỉ cập nhật phần authentication.sessionToken
        await UserModel.updateOne(
            { _id: user._id },
            { 'authentication.sessionToken': newSessionToken }
        );

        
        res.cookie('MINHHOA-AUTH', newSessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log('Received request body:', req.body);

        const { email, password, full_name } = req.body;

        if (!email || !password || !full_name) {
            return res.sendStatus(400);
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const newUser = new UserModel({
            email,
            full_name,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });
        const user = await newUser.save();

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
