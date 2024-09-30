import { merge } from 'lodash';
import express from 'express';

import OrderModel from '../Models/order.model';

export const createOrder = async(req:express.Request,res:express.Response) =>{
    try
    {
        if(!req.body)
        {
            res.status(400).json({message: "Bad request: Missing order data"});
        }
        const order = new OrderModel(req.body);
        const savedOrder = await order.save();

        return res.status(201).json(savedOrder);
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({messgae:"Interval Sever Error",error: error.message});
    }

}

export const getAllOrders = async (req:express.Request,res:express.Response) => {
    try{
        const orders = await OrderModel.find();
        return res.status(200).json(orders);
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getOrderById = async(req:express.Request,res:express.Response) => {
    try{
        const {id} = req.params;
        if(!id)
        {
            res.status(400).json({message:"Invalid id"});
        }
        const order = await OrderModel.findById(id)
        
        if(!order)
        {
            res.status(404).json({message:"Order not found"});
        }

        return res.status(200).json(order);
    } catch(error)
    {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteOrderById = async (req:express.Request, res:express.Response) =>{
    try{
        const {id} = req.params;
        if(!id)
        {
            res.status(400).json({messgae:"Invalid id"});
        }
        const deleteOrder = await OrderModel.findByIdAndDelete(id);

        if(!deleteOrder)
        {
            res.status(404).json({message:"Order not found"});
        }

        return res.status(200).json({message:"Order deleted successfully",deletedOrder:deleteOrder});
    } catch( error)
    {
        console.log(error);
        return res.status(500).json({message:"Interval Server Error"});
    }
}

export const updateOrderById = async (req:express.Request,res:express.Response) => {
    try{
        const {id} = req.params;

        if(!id)
        {
            res.status(400).json({message:"Invalid id"});
        }

        const updateOrder = await OrderModel.findByIdAndUpdate(id,req.body,{new:true});

        if(!updateOrder)
        {
            res.status(200).json({message:"Order not found"});
        }

        return res.status(200).json({message: "Order updated successfully",updatedOrder:updateOrder});
    } catch(error)
    {
        console.log(error);
        return res.status(500).json({message:"Interval Sever Error"});
    }
}