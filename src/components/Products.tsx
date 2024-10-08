import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService'; // Adjust path as needed
import { Product } from '../types';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Product List</h2>
            {loading ? (
                <Spinner animation="border" role="status" className="d-block mx-auto">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger" className="text-center">{error}</Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product) => (
                        <Col key={product._id}>
                            <Card className="h-100">
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
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ProductList;
