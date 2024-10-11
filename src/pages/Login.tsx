// src/pages/Login.tsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // Import your login function
import './Login.css'; // Import the CSS file

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Clear any previous error messages

        try {
            const userData = await loginUser(email, password); // Call loginUser function
            if (userData.active) { // Check if user is active
                setUser({ id: userData.id, email: userData.email, active: userData.active }); // Set user in context
                navigate('/'); // Redirect to home page
            } else {
                setErrorMessage('Your account is not active.'); // Handle inactive account case
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message); // Display error message to the user
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={isLoading}>Login</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
            </form>
        </div>
    );
};

export default Login;
