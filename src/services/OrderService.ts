// src/services/OrderService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/orders';

export const createOrder = async (orderData: any) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};

export const getAllOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getOrderById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateOrderById = async (id: string, orderData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, orderData);
    return response.data;
};

export const deleteOrderById = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
