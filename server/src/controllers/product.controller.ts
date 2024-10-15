import express from 'express';

import ProductModel from '../Models/product.model';

type CategoryType = 'laptop'| 'chuot'| 'banphim'| 'manhinh'| 'ram'| 'cpu'| 'tainghe';

export const getProductsByCategory = async (req: express.Request, res: express.Response) => {
    const category = req.params.category;

    const validCategories = ['laptop', 'chuot', 'banphim', 'manhinh', 'ram', 'cpu', 'tainghe'];

    try {
        if (!category) {
            return res.status(400).json({message: "Invalid category!"});
        }

        if (!validCategories.includes(category as CategoryType)) {
            return res.status(400).json({ message: 'Invalid category value!' });
        }

        const products = await ProductModel.find({
            type: category
        });

        return res.status(201).json({products});

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error });
    }
}

export const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.body){
            return res.status(400);
        }
        const product = new ProductModel(req.body);
        const savedProduct = await product.save();

        return res.status(201).json(savedProduct);
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await ProductModel.find({});

        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const getProductById = async (req: express.Request, res: express.Response) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }

        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const updateProductById = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }

        if (!req.body) {
            return res.status(400).json({message: 'Invalid body'});
        }

        const product = await ProductModel.findByIdAndUpdate(req.params.id,  {$set: req.body}, {new: true});

        if (!product) {
            return res.status(404).json("Product not found");
        }

        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export const deleteProductById = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: 'Invalid id'});
        }
        
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }

        return res.status(200).json(deletedProduct);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
