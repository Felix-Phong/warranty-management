// src/components/CustomerDetail.tsx

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

interface Customer {
    _id: string;
    name: string;
    contact_info: ContactInfo;
    createdAt: string;
    updatedAt: string;
}

interface CustomerDetailProps {
    customer: Customer | null;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
    const navigate = useNavigate();

    if (!customer) return null;

    const handleWarrantyRegistration = (productId: string) => {
        // Chuyển hướng đến trang đăng ký bảo hành với productId
        navigate(`/warranty-registration/${productId}`);
    };

    return (
        <Modal show={true} onHide={() => navigate(-1)}>
            <Modal.Header closeButton>
                <Modal.Title>Customer Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Name: {customer.name}</h4>
                <p><strong>Phone:</strong> {customer.contact_info.phone}</p>
                <p><strong>Email:</strong> {customer.contact_info.email}</p>
                <p><strong>Address:</strong> {customer.contact_info.address}</p>
                <p><strong>Created At:</strong> {new Date(customer.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(customer.updatedAt).toLocaleString()}</p>
                
                {/* Nút để đăng ký bảo hành */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomerDetail;
