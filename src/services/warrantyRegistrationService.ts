// src/services/warrantyRegistrationService.ts

import axios from 'axios';
import { WarrantyRegistration } from '../types';

const API_URL = 'http://localhost:8080/warrantyregistrations'; // Ensure this URL is correct

export const getAllWarrantyRegistrations = async () => {
    try {
        const response = await axios.get(API_URL); // Sửa đổi ở đây
        return response.data;
    } catch (error) {
        console.error('Error fetching warranty registrations:', error);
        throw error; // Ném lỗi ra ngoài để xử lý tiếp
    }
};

export const createWarrantyRegistration = async (registration: WarrantyRegistration) => {
    try {
        const response = await axios.post(API_URL, registration); // Sửa đổi ở đây
        return response.data;
    } catch (error) {
        console.error('Error creating warranty registration:', error);
        throw error;
    }
};

export const deleteWarrantyRegistration = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // Sửa đổi ở đây
    } catch (error) {
        console.error('Error deleting warranty registration:', error);
        throw error;
    }
};
