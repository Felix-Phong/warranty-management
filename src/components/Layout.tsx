// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';

// Correct typing for children prop using ReactNode
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header />  {/* Shared Header */}
            <main>{children}</main>  {/* Content of the page */}
        </div>
    );
};

export default Layout;
