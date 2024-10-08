import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/login'; // Thay đổi URL cho phù hợp

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.patch(API_URL, { email: username, password }); // Sử dụng PATCH và gửi email thay vì username
        return response.data; // Giả sử dữ liệu trả về có trường success
    } catch (error: unknown) { // Khai báo kiểu cho error là unknown
        // Kiểm tra xem có phải là lỗi axios hay không
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Login failed'); // Lỗi từ API
        } else {
            throw new Error('An unexpected error occurred'); // Lỗi không xác định
        }
    }
};
