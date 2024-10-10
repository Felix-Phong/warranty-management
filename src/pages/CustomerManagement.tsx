// src/components/CustomerList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import CustomerForm from './CustomerForm'; // Form để thêm/sửa khách hàng
import { createCustomer, deleteCustomerById, getAllCustomers, updateCustomerById } from '../services/CustomerService'; // Dịch vụ API cho khách hàng
import Header from '../components/Header';

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

    return (
        <div>
            <Header />
            <h2>Customer List</h2>
            <Button variant="primary" onClick={() => { setShowForm(true); setSelectedCustomer(null); }}>Create New Customer</Button>
            {showForm && <CustomerForm onClose={() => { setShowForm(false); fetchCustomers(); }} customer={selectedCustomer} />}
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
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer._id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.contact_info.phone}</td>
                            <td>{customer.contact_info.email}</td>
                            <td>{customer.contact_info.address}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(customer)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(customer._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomerList;
