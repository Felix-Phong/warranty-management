import axios from 'axios';

const API_URL = 'http://localhost:8080/customers'; // Thay đổi URL theo cấu hình của bạn

export const createCustomer = async (customerData: any) => {
    const response = await axios.post(API_URL, customerData);
    return response.data;
};

export const getAllCustomers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getCustomerById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateCustomerById = async (id: string, customerData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, customerData);
    return response.data;
};

export const deleteCustomerById = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
