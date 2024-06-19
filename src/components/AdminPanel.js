import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        // Fetch list of tables from API
        fetch('http://localhost:3000/api/tables')
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(err => console.error('Error fetching tables:', err));
    }, []);

    return (
        <div>
            <h1>Панель администратора</h1>
            <ul>
                {tables.map(table => (
                    <li key={table.name}>{table.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
