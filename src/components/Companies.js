import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CompanyFormModal from './CompanyFormModal';
import styles from './styles/Companies.module.scss';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [open, setOpen] = useState(false);
    const [banks, setBanks] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetchCompanies();
        fetchBanks();
        fetchCurrencies();
    }, []);

    const fetchCompanies = () => {
        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));
    };

    const fetchBanks = () => {
        fetch('http://localhost:3000/api/banks')
            .then(response => response.json())
            .then(data => setBanks(data))
            .catch(err => console.error('Error fetching banks:', err));
    };

    const fetchCurrencies = () => {
        fetch('http://localhost:3000/api/currencies')
            .then(response => response.json())
            .then(data => setCurrencies(data))
            .catch(err => console.error('Error fetching currencies:', err));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (formData) => {
        fetch('http://localhost:3000/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(() => {
            fetchCompanies();
            handleClose();
        })
        .catch(err => console.error('Error adding company:', err));
    };

    return (
        <div className={styles.companiesContainer}>
            <h1>Компании</h1>
            {companies.map(company => (
                <div key={company.id}>
                    <h2>{company.name}</h2>
                    <ul>
                        {company.accounts && company.accounts.map(account => (
                            <li key={account.id}>{account.bankName}: {account.accountNumber} - {parseFloat(account.balance).toFixed(2)} руб.</li>
                        ))}
                    </ul>
                </div>
            ))}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Добавить компанию
            </Button>
            <CompanyFormModal
                open={open}
                handleClose={handleClose}
                handleSave={handleSave}
                banks={banks}
                currencies={currencies}
            />
        </div>
    );
};

export default Companies;
