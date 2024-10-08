// src/pages/HomePage.tsx
import React from 'react';
import Layout from '../components/Layout';
import { Container, Jumbotron, Button } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <Jumbotron fluid className="text-center mt-5">
                <Container>
                    <h1>Welcome to the Warranty Management System</h1>
                    <p>
                        Manage product warranties, view products, and track warranty history easily.
                    </p>
                    <Button href="/products" variant="primary">View Products</Button>
                </Container>
            </Jumbotron>
        </Layout>
    );
};

export default HomePage;
