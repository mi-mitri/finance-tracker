import React, { useEffect, useState } from 'react';

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch companies from API
        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));
    }, []);

    return (
        <div>
            <h1>Компании</h1>
            {companies.map(company => (
                <div key={company.id}>
                    <h2>{company.name}</h2>
                    <ul>
                        {company.accounts && company.accounts.map(account => (
                            <li key={account.id}>{account.name}: {account.balance} руб.</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Companies;

