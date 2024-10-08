// src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/Header';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <main className="container mt-4">
                <h2>Welcome to the 12DHTH_TD</h2>
                <p>Thành Viên Nhóm.</p>
                <ul >
                    <li>Nguyễn Đăng Triều</li>  
                    <li>Trần Minh Hòa</li>
                    <li>Hoàng Quốc Phong</li>
                </ul>
            </main>
        </div>
    );
};

export default HomePage;
