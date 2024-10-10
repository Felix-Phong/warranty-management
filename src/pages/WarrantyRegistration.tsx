import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { getAllWarrantyRegistrations, createWarrantyRegistration, deleteWarrantyRegistration } from '../services/warrantyRegistrationService';
import { getAllOrders } from '../services/OrderService';
import { Product, WarrantyRegistration, Order } from '../types';
import './WarrantyRegistration.css';
import Header from '../components/Header';

const WarrantyRegistrationComponent: React.FC = () => {
    const [registrations, setRegistrations] = useState<WarrantyRegistration[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [newRegistration, setNewRegistration] = useState<WarrantyRegistration>({
        product_id: '',
        customer_id: '',
        received_date: '',
        current_status: 'Pending',
        notes: '', // Add notes field
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const fetchRegistrations = async () => {
        try {
            const data = await getAllWarrantyRegistrations();
            setRegistrations(data);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchRegistrations();
        fetchProducts();
        fetchOrders();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewRegistration(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!newRegistration.product_id) newErrors.product_id = 'Product ID is required';
        if (!newRegistration.customer_id) newErrors.customer_id = 'Customer ID is required';
        if (!newRegistration.received_date) newErrors.received_date = 'Received Date is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setErrorMessage('Please correct the errors in the form.');
            return;
        }
        try {
            await createWarrantyRegistration(newRegistration);
            setNewRegistration({
                product_id: '',
                customer_id: '',
                received_date: '',
                current_status: 'Pending',
                notes: '', // Reset notes field
            });
            setErrors({});
            setSuccessMessage('Warranty registration created successfully!');
            setErrorMessage('');
            fetchRegistrations(); // Refresh the list
        } catch (error) {
            console.error('Error creating warranty registration:', error);
            setErrorMessage('Failed to create warranty registration.');
            setSuccessMessage('');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteWarrantyRegistration(id);
            fetchRegistrations(); // Refresh the list
        } catch (error) {
            console.error('Error deleting warranty registration:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="warranty-registration-container">
                <h2>Warranty Registration</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="warranty-form">
                    <div className="form-group">
                        <label>Product ID:</label>
                        <select
                            name="product_id"
                            value={newRegistration.product_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Product</option>
                            {products.map(product => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        {errors.product_id && <span className="error">{errors.product_id}</span>}
                    </div>
                    <div className="form-group">
                        <label>Customer ID:</label>
                        <input
                            type="text"
                            name="customer_id"
                            value={newRegistration.customer_id}
                            onChange={handleChange}
                            required
                        />
                        {errors.customer_id && <span className="error">{errors.customer_id}</span>}
                    </div>
                    <div className="form-group">
                        <label>Received Date:</label>
                        <input
                            type="date"
                            name="received_date"
                            value={newRegistration.received_date}
                            onChange={handleChange}
                            required
                        />
                        {errors.received_date && <span className="error">{errors.received_date}</span>}
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            name="current_status"
                            value={newRegistration.current_status}
                            onChange={handleChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>notes:</label>
                        <input
                            type="text"
                            name="notes"
                            value={newRegistration.notes}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">Register Warranty</button>
                </form>

                <h3>Existing Warranty Registrations</h3>
                <div className="registration-cards">
                    {registrations.map((registration) => (
                        <div key={registration._id} className="registration-card">
                            <p><strong>Product:</strong> {registration.product_id}</p>
                            <p><strong>Customer:</strong> {registration.customer_id}</p>
                            <p><strong>Received Date:</strong> {new Date(registration.received_date).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {registration.current_status}</p>
                            {registration.notes && <p><strong>notes:</strong> {registration.notes}</p>}
                            <button onClick={() => handleDelete(registration._id!)} className="delete-button">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WarrantyRegistrationComponent;