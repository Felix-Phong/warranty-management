// src/components/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import OrderForm from './OrderForm';
import { createOrder, deleteOrderById, getAllOrders, updateOrderById } from '../services/OrderService';
import Header from '../components/Header';

interface Product {
    product_id: string;
    quantity: number;
}

interface Order {
    _id: string;
    products: Product[];
    purchase_date: Date;
    total_cost: number;
    customer_id: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            await deleteOrderById(id);
            fetchOrders(); // Refresh the list after deletion
        }
    };

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setShowForm(true);
    };

    return (
        
        <div>
            <Header/>
            <h2>Order List</h2>
            
            <Button variant="primary" onClick={() => setShowForm(true)}>Create New Order</Button>
            {showForm && <OrderForm onClose={() => { setShowForm(false); fetchOrders(); }} order={selectedOrder} />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Total Cost</th>
                        <th>Purchase Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.customer_id}</td>
                            <td>{order.total_cost}</td>
                            <td>{new Date(order.purchase_date).toLocaleDateString()}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(order)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(order._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderList;
