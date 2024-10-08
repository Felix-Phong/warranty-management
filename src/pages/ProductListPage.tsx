import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { getAllProducts } from '../services/productService';
import { Product } from '../types';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap';
import Header from '../components/Header';

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
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const containerStyle: React.CSSProperties = {
        marginTop: '2rem',
        textAlign: 'center',
    };

    const cardStyle: React.CSSProperties = {
        transition: 'transform 0.2s',
        cursor: 'pointer',
        border: '1px solid #007bff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={containerStyle}>
            <Header />
            <h2 className="mb-4">Product List</h2>
            {loading ? (
                <Spinner animation="border" role="status" className="d-block mx-auto">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product) => (
                        <Col key={product._id}>
                            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card
                                    className="h-100"
                                    style={cardStyle}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                >
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
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ProductList;
