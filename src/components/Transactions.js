import React, { useEffect, useState } from 'react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch transactions from API
        fetch('http://localhost:3000/api/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(err => console.error('Error fetching transactions:', err));
    }, []);

    return (
        <div>
            <h1>Операции</h1>
            <button>Добавить новую транзакцию</button>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.date}: {transaction.summ} руб. - {transaction.notes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
