// src/services/warrantyRegistrationService.ts

import axios from 'axios';
import { WarrantyRegistration } from '../types';

const API_URL = 'http://localhost:8080/warrantyregistrations'; // Ensure this URL is correct


export const getAllWarrantyRegistrations = async () => {
    const response = await axios.get(`${API_URL}/warrantyRegistrations`);
    return response.data;
};

export const createWarrantyRegistration = async (registration: WarrantyRegistration) => {
    const response = await axios.post(`${API_URL}/warrantyRegistrations`, registration);
    return response.data;
};

export const deleteWarrantyRegistration = async (id: string) => {
    await axios.delete(`${API_URL}/warrantyRegistrations/${id}`);
};
