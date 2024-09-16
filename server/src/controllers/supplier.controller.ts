import express from 'express';
import  SupplierModel  from '../Models/supplier.model'; 


export const createSupplier = async (req: express.Request, res: express.Response) => {
    try {
        const { name, contact_info } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !contact_info) {
            return res.status(400).json({ message: 'Invalid input data' }); 
        }

        // Tạo mới nhà phân phối
        const newSupplier = new SupplierModel({
            name,
            contact_info
        });

        // Lưu nhà phân phối vào cơ sở dữ liệu
        const savedSupplier = await newSupplier.save();

        // Trả về nhà phân phối vừa được tạo với mã trạng thái 201 (Created)
        return res.status(201).json(savedSupplier);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' }); 
    }
};

export const getSupplierById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        // Kiểm tra tính hợp lệ của ID
        if (!id) {
            return res.status(400).json({ message: 'Invalid ID' }); // Bad Request nếu ID không hợp lệ
        }

        // Tìm nhà phân phối theo ID
        const supplier = await SupplierModel.findById(id);

        // Kiểm tra xem nhà phân phối có tồn tại không
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' }); // Not Found nếu không tìm thấy nhà phân phối
        }

        // Trả về thông tin nhà phân phối với mã trạng thái 200 (OK)
        return res.status(200).json(supplier);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' }); // Internal Server Error nếu có lỗi xảy ra
    }
};

export const getAllSuppliers = async (req: express.Request, res: express.Response) => {
    try {
        const supplier = await SupplierModel.find(); 

        return res.status(200).json(supplier);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteSupplier = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedSupplier = await SupplierModel.findOneAndDelete({ _id: id }); 
        if (!deletedSupplier) {
            return res.sendStatus(404); 
        }
        
        return res.json(deletedSupplier);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const updateSupplier = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const newData = req.body;

        if (!newData || Object.keys(newData).length === 0) {
            return res.sendStatus(400); 
        }

        const supplier = await SupplierModel.findById(id);
        if (!supplier) {
            return res.sendStatus(404); 
        }

        // Cập nhật nhà phân phối với dữ liệu mới
        await SupplierModel.updateOne({ _id: id }, { $set: newData });

        // Lấy lại thông tin nhà phân phối đã cập nhật để trả về
        const updatedSupplier = await SupplierModel.findById(id);

        return res.status(200).json(updatedSupplier); 
    } catch (error) {
        console.log(error);
        return res.sendStatus(400); 
    }
};