import express from 'express';
import { UserModel } from '../Models/user.model'; 

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.find(); 

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await UserModel.findOneAndDelete({ _id: id }); 
        if (!deletedUser) {
            return res.sendStatus(404); // Nếu user không tồn tại
        }
        
        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { full_name } = req.body;

        if (!full_name) {
            return res.sendStatus(400); 
        }

        const user = await UserModel.findById(id); 
        if (!user) {
            return res.sendStatus(404); 
        }

        user.full_name = full_name; 

        await user.save(); 

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
