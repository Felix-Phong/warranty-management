import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './WarrantyRegistrationProduct.css';
import './notification.css'; // Import CSS for notification
import { createWarrantyRegistration } from '../services/warrantyRegistrationService';
import { WarrantyRegistration } from '../types';
import { useAuth } from '../context/AuthContext'; // Import useAuth

interface Product {
    _id: string;
    name: string;
    createdAt: string;
}

const WarrantyRegistrationProduct: React.FC = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const { user } = useAuth(); // Access user from Auth context
    const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>(''); // State for error message
    const [successMessage, setSuccessMessage] = useState<string>(''); // State for success message
    const [loading, setLoading] = useState<boolean>(true);
    const [showNoteInput, setShowNoteInput] = useState<{ [key: string]: boolean }>({}); // State for note input visibility
    const [note, setNote] = useState<{ [key: string]: string }>({}); // State to store notes for each product

    useEffect(() => {
        const fetchPurchasedProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/warrantyRegistrations/getProductsByCustomerId/${customerId}`);
                if (response.data && Array.isArray(response.data)) {
                    setPurchasedProducts(response.data);
                } else {
                    setErrorMessage('No products found for this customer.');
                }
            } catch (error) {
                setErrorMessage('Failed to fetch purchased products.');
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchPurchasedProducts();
        } else {
            setErrorMessage('Customer ID is not defined.');
        }
    }, [customerId]);

    const registerWarranty = async (productId: string, customerId: string, note: string) => {
        if (!user || !user.id) {
            setErrorMessage('User ID is not available.');
            return;
        }

        try {
            const registrationData: WarrantyRegistration = {
                _staff_id: user.id,
                product_id: productId,
                customer_id: customerId,
                received_date: new Date().toISOString(),
                current_status: 'pending_check', // Set a valid status
                notes: note,
            };

            const response = await createWarrantyRegistration(registrationData);
            setSuccessMessage(`Đăng ký bảo hành thành công cho sản phẩm ID: ${productId}`);
            setErrorMessage(''); // Clear any previous error message
        } catch (error) {
            setErrorMessage('Failed to register warranty for product ID: ' + productId);
            setSuccessMessage(''); // Clear any previous success message
        }
    };

    const handleRegisterClick = (productId: string) => {
        // Toggle visibility of note input field when the "Register" button is clicked
        setShowNoteInput((prev) => ({ ...prev, [productId]: !prev[productId] }));
    };

    const handleSubmit = (productId: string) => {
        registerWarranty(productId, customerId!, note[productId] || ''); // Submit the warranty registration with note
        setShowNoteInput((prev) => ({ ...prev, [productId]: false })); // Hide the note input after submission
    };

    return (
        <div className="container">
            <Header />
            <h2>Sản Phẩm Đã Mua cho ID Khách Hàng: {customerId}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {errorMessage && (
                        <div className="notification error-message">{errorMessage}</div>
                    )}
                    {successMessage && (
                        <div className="notification success-message">{successMessage}</div>
                    )}
                    {purchasedProducts.length > 0 ? (
                        <ul>
                            {purchasedProducts.map((product) => (
                                <li key={product._id}>
                                    <strong>Tên sản phẩm:</strong> {product.name}<br />
                                    <strong>Ngày mua:</strong> {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Chưa có ngày mua'}
                                    <button onClick={() => handleRegisterClick(product._id)}>Đăng ký bảo hành</button>
                                    {showNoteInput[product._id] && (
                                        <div>
                                            <textarea
                                                placeholder="Nhập ghi chú tại đây..."
                                                value={note[product._id] || ''}
                                                onChange={(e) => setNote((prev) => ({ ...prev, [product._id]: e.target.value }))}
                                            />
                                            <button onClick={() => handleSubmit(product._id)}>Xác nhận</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có sản phẩm nào được mua.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default WarrantyRegistrationProduct;
