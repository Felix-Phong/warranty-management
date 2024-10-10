import express from 'express';
import { ParsedQs } from 'qs';

import warrantyRegistrationModel from '../Models/warrantyRegistration.model';
import CustomerModel from '../Models/customer.model';

export const getCustomerQueryParams = async (req: express.Request, res: express.Response) => { 
    const find: { [key: string]: any } = {};
    // Kiểm tra các query parameters
    if (typeof req.query.name === 'string') {
        const regex = new RegExp(req.query.name, "i");
        find.name = regex;
    }

    if (req.query.email) {
        find['contact_info.email'] = req.query.email;
    }

    if (req.query.phone) {
        find['contact_info.phone'] = req.query.phone;
    }

    try {
        // Tìm kiếm dựa trên điều kiện
        const customers = await CustomerModel.find(find);
        return res.status(200).json(customers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching customers', error });
    }
}

export const createWarrantyRegistration = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.body){
            return res.status(400);
        }
        const warrantyRegistration = new warrantyRegistrationModel(req.body);
        const savedWarrantyRegistration = await warrantyRegistration.save();

        return res.status(201).json(savedWarrantyRegistration);
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}

export const getAllWarrantyRegistrations = async (req: express.Request, res: express.Response) => {
    try {
        const warrantyRegistrations = await warrantyRegistrationModel.find({});

        return res.status(200).json(warrantyRegistrations);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const getWarrantyRegistrationById = async (req: express.Request, res: express.Response) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }

        const warrantyRegistration = await warrantyRegistrationModel.findById(req.params.id);

        if (!warrantyRegistration) {
            return res.status(404).json({message: 'WarrantyRegistration not found'});
        }

        return res.status(200).json(warrantyRegistration);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const updateWarrantyRegistrationById = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }

        if (!req.body) {
            return res.status(400).json({message: 'Invalid body'});
        }

        const warrantyRegistration = await warrantyRegistrationModel.findByIdAndUpdate(req.params.id,  {$set: req.body}, {new: true});

        if (!warrantyRegistration) {
            return res.status(404).json("WarrantyRegistration not found");
        }

        return res.status(200).json(warrantyRegistration);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const deleteWarrantyRegistrationById = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }
        
        const deletedWarrantyRegistration = await warrantyRegistrationModel.findByIdAndDelete(req.params.id);

        if (!deletedWarrantyRegistration) {
            return res.status(404).json({message: 'WarrantyRegistration not found'});
        }

        return res.status(200).json(deletedWarrantyRegistration);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
