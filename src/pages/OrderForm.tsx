// src/components/OrderForm.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createOrder, updateOrderById } from '../services/OrderService';

interface Order {
    _id?: string;
    products?: { product_id: string; quantity: number }[];
    total_cost: number;
    customer_id: string;
}

interface OrderFormProps {
    order?: Order | null;
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onClose }) => {
    const [formData, setFormData] = useState<Order>({
        products: [],
        total_cost: 0,
        customer_id: '',
    });

    useEffect(() => {
        if (order) {
            setFormData(order);
        }
    }, [order]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (order) {
            await updateOrderById(order._id as string, formData);
        } else {
            await createOrder(formData);
        }
        onClose();
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{order ? 'Edit Order' : 'Create Order'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formCustomerId">
                        <Form.Label>Customer ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_id"
                            value={formData.customer_id}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formTotalCost">
                        <Form.Label>Total Cost</Form.Label>
                        <Form.Control
                            type="number"
                            name="total_cost"
                            value={formData.total_cost}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {order ? 'Update' : 'Create'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default OrderForm;
