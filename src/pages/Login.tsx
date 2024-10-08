import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginUser(username, password);
            // Nếu loginUser thành công, chuyển hướng đến trang sản phẩm
            navigate('/'); 
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message); // Nếu error là kiểu Error, thiết lập thông báo lỗi
            } else {
                setErrorMessage('An unexpected error occurred'); // Lỗi không xác định
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>

                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>} {/* Hiển thị thông báo lỗi */}
            </div>
        </Container>
    );
};

export default Login;
