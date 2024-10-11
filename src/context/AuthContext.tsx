// src/context/AuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface User {
    id: string;
    email: string;
    active: boolean;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void; // Add logout function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        if (user) {
            const updatedUser = { ...user, active: false }; // Set active to false
            setUser(updatedUser); // Update the user state with active set to false
        }
        // Optionally clear other session data, like tokens
        localStorage.removeItem('token'); // If you're using local storage
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
