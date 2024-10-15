// src/components/Header.tsx

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header: React.FC = () => {
    const { user, logout } = useAuth(); // Access user and logout from Auth context

    const handleLogout = () => {
        logout(); // Call logout function
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Warranty Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    
                    {/* Render Orders link only for staff and admin */}
                    {(user && user.active && (user.role === 'staff' || user.role === 'admin')) && (
                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                    )}
                    
                    {/* Render Customers link only for admin */}
                    {user && user.active && (user.role === 'admin' ||user.role === 'staff')&& (
                        <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                    )}
                    
                     {/* Render WarrantyHistory link only for admin and staff technical */}
                     {user && user.active && (user.role === 'admin' ||user.role === 'staff technical')&& (
                        <Nav.Link as={Link} to="/warrantyHistorys">warrantyHistorys</Nav.Link>
                    )}

                    {/* Render Warrantys link for all roles */}
                    {user && user.active && (
                        <Nav.Link as={Link} to="/warrantys">Warrantys</Nav.Link>
                    )}
                    
                    <Nav.Link as={Link} to="/about">About</Nav.Link>

                    {user && user.active ? ( // Check if the user is active
                        <>
                            <Nav.Link disabled>Welcome, {user.email}</Nav.Link> {/* Display email if user is active */}
                            <Nav.Link disabled>ID: {user.id}</Nav.Link> {/* Display user ID */}
                            <Nav.Link disabled>Role: {user.role}</Nav.Link> {/* Display user role */}
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Add logout link */}
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login">Login</Nav.Link> // Show login link if not logged in
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
