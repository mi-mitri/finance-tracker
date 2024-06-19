import React, { useEffect, useState } from 'react';

const Contractors = () => {
    const [contractors, setContractors] = useState([]);

    useEffect(() => {
        // Fetch contractors from API
        fetch('http://localhost:3000/api/contractors')
            .then(response => response.json())
            .then(data => setContractors(data))
            .catch(err => console.error('Error fetching contractors:', err));
    }, []);

    return (
        <div>
            <h1>Контрагенты</h1>
            <ul>
                {contractors.map(contractor => (
                    <li key={contractor.id}>{contractor.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Contractors;

