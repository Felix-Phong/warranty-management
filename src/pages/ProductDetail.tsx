// src/pages/ProductDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService'; // Ensure this path is correct
import { Product } from '../types';
import { Card, Spinner, Alert } from 'react-bootstrap';
import Header from '../components/Header';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError("Product ID is missing.");
                setLoading(false);
                return;
            }
            try {
                const fetchedProduct = await getProductById(id);
                setProduct(fetchedProduct);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className="container mt-5">
            <Header />
            {loading ? (
                <Spinner animation="border" role="status" className="d-block mx-auto">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger" className="text-center">{error}</Alert>
            ) : product ? (
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            <strong>Description:</strong> {product.description}
                        </Card.Text>
                        <Card.Text>
                            <strong>Warranty Period:</strong> {product.warranty_period} months
                        </Card.Text>
                        <Card.Text>
                            <strong>Type:</strong> {product.type}
                        </Card.Text>
                        <Card.Text>
                            <strong>Specifications:</strong> {JSON.stringify(product.specifications)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : null}
        </div>
    );
};

export default ProductDetail;
