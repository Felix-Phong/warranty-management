import axios from 'axios';
import {WarrantyHistory} from '../types'

const API_URL = 'http://localhost:8080/warrantyHistorys';

export const getAllWarrantyHistorys = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateWarrantyHistory = async (warrantyRegisID: string, techId: string, newStatus: string) => {
    try {
        const response = await axios.post(`${API_URL}/${techId}/${warrantyRegisID}`, { newStatus });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating warranty history: ${error}`);
    }
};

export const moveRegistrationToHistory = async (registrationId: string) => {
    return axios.post(`/api/warranty-history/move/${registrationId}`);
  };
