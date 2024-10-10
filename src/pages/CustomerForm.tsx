// src/components/CustomerForm.tsx
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createCustomer, updateCustomerById } from '../services/CustomerService'; // Dịch vụ API cho khách hàng

interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

interface Customer {
    _id?: string;
    name: string;
    contact_info: ContactInfo;
}

interface Props {
    customer: Customer | null;
    onClose: () => void;
}

const CustomerForm: React.FC<Props> = ({ customer, onClose }) => {
    const [formData, setFormData] = useState<Customer>({
        name: '',
        contact_info: {
            phone: '',
            email: '',
            address: ''
        }
    });

    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            contact_info: {
                ...prev.contact_info,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (customer) {
                await updateCustomerById(customer._id!, formData);
            } else {
                await createCustomer(formData);
            }
            onClose();
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{customer ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.contact_info.phone}
                            onChange={handleContactChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.contact_info.email}
                            onChange={handleContactChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.contact_info.address}
                            onChange={handleContactChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {customer ? 'Update' : 'Create'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CustomerForm;
