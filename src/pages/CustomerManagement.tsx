// src/components/CustomerList.tsx

import React, { useEffect, useState } from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import CustomerForm from './CustomerForm'; // Form to add/edit customers
import CustomerDetail from './CustomerDetail'; // New Customer Detail component
import { createCustomer, deleteCustomerById, getAllCustomers } from '../services/CustomerService'; // Customer service API
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CustomerList.css'; // Import CSS

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

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false); // State to manage detail view
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const customersData = await getAllCustomers();
        setCustomers(customersData);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            await deleteCustomerById(id);
            fetchCustomers(); // Refresh the list after deletion
        }
    };

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowForm(true);
    };

    const handleDetail = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowDetail(true);
    };

    const handleRegisterWarranty = (customerId: string) => {
        navigate(`/warranty-registration/${customerId}`); // Redirect to the warranty registration page with customer ID
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <Header />
            <h2>Customer List</h2>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by name"
                    aria-label="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>
            <Button variant="primary" onClick={() => { setShowForm(true); setSelectedCustomer(null); }}>Create New Customer</Button>
            {showForm && <CustomerForm onClose={() => { setShowForm(false); fetchCustomers(); }} customer={selectedCustomer} />}
            {showDetail && <CustomerDetail customer={selectedCustomer} />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer._id} onClick={() => handleDetail(customer)}>
                            <td>{customer._id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.contact_info.phone}</td>
                            <td>{customer.contact_info.email}</td>
                            <td>{customer.contact_info.address}</td>
                            <td>
                                <Button variant="warning" onClick={(e) => { e.stopPropagation(); handleEdit(customer); }}>Edit</Button>
                                <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(customer._id); }}>Delete</Button>
                                <Button variant="success" onClick={(e) => { e.stopPropagation(); handleRegisterWarranty(customer._id); }}>Register Warranty</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomerList;
