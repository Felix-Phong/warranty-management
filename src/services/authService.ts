import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/login'; // Change URL as needed

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_URL, { email, password }); // Use POST for login
        return response.data; // Assuming the response contains user data on successful login
    } catch (error: unknown) { // Declare the error type as unknown
        // Check if the error is an Axios error
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Login failed'); // API error message
        } else {
            throw new Error('An unexpected error occurred'); // General error
        }
    }
};
