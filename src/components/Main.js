import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Transactions from './Transactions';
import Contractors from './Contractors';
import AdminPanel from './AdminPanel';

const Main = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/contractors" element={<Contractors />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Container>
    );
};

export default Main;
