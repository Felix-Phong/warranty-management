import axios from 'axios';
import { Product } from '../types';

const API_URL = 'http://localhost:8080/products'; // Ensure this URL is correct

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};


export const createProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        handleError(error);
        throw new Error('Failed to create product');
    }
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        handleError(error);
        throw new Error('Failed to update product');
    }
};

export const deleteProduct = async (id: string): Promise<Product> => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw new Error('Failed to delete product');
    }
};

// Optional: Centralized error handling function
const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
    } else {
        console.error('Unexpected Error:', error);
    }
};
