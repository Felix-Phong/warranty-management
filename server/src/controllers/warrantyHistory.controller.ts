import express from 'express';

import warrantyHistoryModel from '../Models/warrantyHistory.model';
import WarrantyRegistrationModel from '../Models/warrantyRegistration.model';
import { UserModel } from '../Models/user.model';

// Định nghĩa kiểu cho status để sử dụng lại
type Status = "under_repair" | "returned_to_customer" | "sent_to_manufacturer";

export const confirmWarrantyRegistration = async (req: express.Request, res: express.Response) => {
    const techId = req.params.techId;
    const warrantyRegisID = req.params.warrantyRegisID;
    const newStatus = req.query.newStatus;

    const validStatuses = ["under_repair", "returned_to_customer", "sent_to_manufacturer"];

    try {
        if (!techId || !newStatus || !warrantyRegisID) {
            return res.status(400).json({ message: 'Missing required parameters!' });
        }

        if (!validStatuses.includes(newStatus as Status)) {
            return res.status(400).json({ message: 'Invalid status value!' });
        }

        const tech = await UserModel.findOne({ _id: techId, role: "staff technical" });
        if (!tech) {
            return res.status(400).json({ message: "Technician not found!" });
        }

        const warrantyRegis = await WarrantyRegistrationModel.findOne({ _id: warrantyRegisID });
        if (!warrantyRegis) {
            return res.status(400).json({ message: "Warranty registration not found!" });
        }

        warrantyRegis.current_status = newStatus as Status;
        await warrantyRegis.save();

        if (!req.body) {
            return res.status(400).json({ message: "Can't save empty content to Warranty history!" });
        }

        const warrantyHistory = new warrantyHistoryModel(req.body);
        const savedWarrantyHistory = await warrantyHistory.save();

        return res.status(201).json(savedWarrantyHistory);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error });
    }
}

export const createWarrantyHistory = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.body){
            return res.status(400);
        }
        const warrantyHistory = new warrantyHistoryModel(req.body);
        const savedWarrantyHistory = await warrantyHistory.save();

        return res.status(201).json(savedWarrantyHistory);
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}

export const getAllWarrantyHistorys = async (req: express.Request, res: express.Response) => {
    try {
        const warrantyHistorys = await warrantyHistoryModel.find({})
        .populate('registration_id') // Populate thông tin đăng ký bảo hành
        .populate('product_id') // Populate chỉ trường 'name' của sản phẩm
        .populate('technician_id') // Populate chỉ trường 'full_name' của kỹ thuật viên
        .populate({
            path: 'status_changes.changed_by', // Populate thông tin người thay đổi trạng thái
            select: 'full_name' // Chỉ lấy trường full_name
        })
        return res.status(200).json(warrantyHistorys);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const getWarrantyHistoryById = async (req: express.Request, res: express.Response) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }

        const warrantyHistory = await warrantyHistoryModel.findById(req.params.id);

        if (!warrantyHistory) {
            return res.status(404).json({message: 'WarrantyHistory not found'});
        }

        return res.status(200).json(warrantyHistory);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const updateWarrantyHistoryById = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }

        if (!req.body) {
            return res.status(400).json({message: 'Invalid body'});
        }

        const warrantyHistory = await warrantyHistoryModel.findByIdAndUpdate(req.params.id,  {$set: req.body}, {new: true});

        if (!warrantyHistory) {
            return res.status(404).json("WarrantyHistory not found");
        }

        return res.status(200).json(warrantyHistory);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const deleteWarrantyHistoryById = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }
        
        const deletedWarrantyHistory = await warrantyHistoryModel.findByIdAndDelete(req.params.id);

        if (!deletedWarrantyHistory) {
            return res.status(404).json({message: 'WarrantyHistory not found'});
        }

        return res.status(200).json(deletedWarrantyHistory);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
