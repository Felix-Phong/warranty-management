import {merge} from 'lodash';
import express from 'express';

import CustomerModel from '../Models/customer.model';

export const createCustomer = async(req:express.Request,res:express.Response) =>{
    try
    {
        if(!req.body)
        {
            res.status(400).json({message:"Bad request: Missing customer data"});
        }
            const customer = new CustomerModel(req.body);
            const saveCustomer = await customer.save();

            return res.status(201).json(saveCustomer);
        
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({message:"Interval Server Error",error:error.message});
    }
}

export const getAllCustomer = async (req:express.Request,res:express.Response) => {
    try{
        const customers = await CustomerModel.find();
        return res.status(200).json(customers);
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getCustomerById = async(req:express.Request,res:express.Response) => {
    try{
        const {id} = req.params;
        if(!id)
        {
            res.status(400).json({message:"Invalid id"});
        }
        const customer = await CustomerModel.findById(id)
        
        if(!customer)
        {
            res.status(404).json({message:"Customer not found"});
        }

        return res.status(200).json(customer);
    } catch(error)
    {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteCustomerById = async (req:express.Request, res:express.Response) =>{
    try{
        const {id} = req.params;
        if(!id)
        {
            res.status(400).json({messgae:"Invalid id"});
        }
        const deleteCustomer = await CustomerModel.findByIdAndDelete(id);

        if(!deleteCustomer)
        {
            res.status(404).json({message:"Customer not found"});
        }

        return res.status(200).json({message:"Customer deleted successfully",deletedCustomer:deleteCustomer});
    } catch( error)
    {
        console.log(error);
        return res.status(500).json({message:"Interval Server Error"});
    }
}


export const updateCustomerById = async (req:express.Request,res:express.Response) => {
    try{
        const {id} = req.params;

        if(!id)
        {
            res.status(400).json({message:"Invalid id"});
        }

        const updateCustomer = await CustomerModel.findByIdAndUpdate(id,req.body,{new:true});

        if(!updateCustomer)
        {
            res.status(200).json({message:"Customer not found"});
        }

        return res.status(200).json({message: "Customer updated successfully",updatedCustomer:updateCustomer});
    } catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Interval Sever Error"});
    }
}