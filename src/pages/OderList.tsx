import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import OrderForm from './OrderForm';
import OrderDetails from './OrderDetails';
import { createOrder, deleteOrderById, getAllOrders, filterOrdersByDate } from '../services/OrderService';
import Header from '../components/Header';

interface Product {
    product_id: string;
    quantity: number;
    _id: string;
}

interface Order {
    _id: string;
    products: Product[];
    total_cost: number;
    customer_id: string;
    purchase_date: string;
    createdAt: string;
    updatedAt: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
            fetchOrders();
        }
    };

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setShowForm(true);
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setShowDetails(true);
    };

    const handleFilter = async () => {
        if (startDate && endDate) {
            const filteredOrders = await filterOrdersByDate(startDate, endDate);
            setOrders(filteredOrders);
        } else {
            fetchOrders(); // If no date is provided, fetch all orders
        }
    };

    return (
        <div>
            <Header />
            <h2>Order List</h2>
            <Button variant="primary" onClick={() => setShowForm(true)}>Create New Order</Button>
            {showForm && <OrderForm onClose={() => { setShowForm(false); fetchOrders(); }} order={selectedOrder} />}
            
            {/* Date Filter Inputs */}
            <Form className="mb-3">
                <div className="d-flex align-items-end mb-2">
                    <Form.Group className="mr-2" controlId="startDate">
                        <Form.Label className="mr-2">Start Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mr-2" controlId="endDate">
                        <Form.Label className="mr-2">End Date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="success" onClick={handleFilter}>Filter</Button>
                </div>
            </Form>

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
                                <Button variant="info" onClick={() => handleViewDetails(order)}>View Details</Button>
                                <Button variant="warning" onClick={() => handleEdit(order)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(order._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal to show order details */}
            <Modal show={showDetails} onHide={() => setShowDetails(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrder && <OrderDetails order={selectedOrder} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetails(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderList;
