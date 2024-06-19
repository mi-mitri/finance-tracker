import React, { useEffect, useState } from 'react';

const Home = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch total balance and companies from API
        fetch('http://localhost:3000/api/total-balance')
            .then(response => response.json())
            .then(data => setTotalBalance(data.totalBalance))
            .catch(err => console.error('Error fetching total balance:', err));

        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));
    }, []);

    return (
        <div>
            <h1>Главная</h1>
            <h2>Общий баланс: {totalBalance} руб.</h2>
            <h3>Компании</h3>
            <ul>
                {companies.map(company => (
                    <li key={company.id}>{company.name}: {company.balance} руб.</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;

