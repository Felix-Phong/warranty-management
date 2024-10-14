// src/components/Header.tsx

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header: React.FC = () => {
    const { user, logout } = useAuth(); // Truy cập user và logout từ Auth context

    const handleLogout = () => {
        logout(); // Gọi hàm logout
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Warranty Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                    <Nav.Link as={Link} to="/warrantys">Warrantys</Nav.Link>
                    <Nav.Link as={Link} to="/warrantyHistorys">WarrantyHistory</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    {user && user.active ? ( // Kiểm tra trạng thái active
                        <>
                            <Nav.Link disabled>Welcome, {user.email}</Nav.Link> {/* Hiển thị email nếu người dùng đã hoạt động */}
                            <Nav.Link disabled>ID: {user.id}</Nav.Link> {/* Hiển thị ID người dùng */}
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Thêm link đăng xuất */}
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login">Login</Nav.Link> // Hiện link đăng nhập nếu chưa đăng nhập
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
