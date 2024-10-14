// src/components/OrderDetails.tsx

import React from 'react';
import './OrderDetails.css'; // Import the CSS file

interface Product {
    product_id: string;
    quantity: number;
    _id: string; // Include product ID
}

interface Order {
    _id: string;
    products: Product[];
    total_cost: number;
    customer_id: string;
    purchase_date: string; // Use string for date parsing
    createdAt: string; // Include createdAt field
    updatedAt: string; // Include updatedAt field
}

interface OrderDetailsProps {
    order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    return (
        <div className="order-details"> {/* Apply styling */}
            <h4>Order ID: {order._id}</h4>
            <p>Customer ID: {order.customer_id}</p>
            <p>Total Cost: ${order.total_cost.toFixed(2)}</p>
            <p>Purchase Date: {new Date(order.purchase_date).toLocaleDateString()}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Updated At: {new Date(order.updatedAt).toLocaleDateString()}</p>
            <h5>Products:</h5>
            <ul>
                {order.products.map((product) => (
                    <li key={product._id}>
                        Product ID: {product.product_id}, Quantity: {product.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetails;
