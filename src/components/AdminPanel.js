import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Tabs, Tab, Box, Button, Typography, Modal, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import CompanyFormModal from './CompanyFormModal';
import BankFormModal from './BankFormModal';
import CurrencyFormModal from './CurrencyFormModal';
import ContractorFormModal from './ContractorFormModal';
import TransactionFormModal from './TransactionFormModal';
import styles from './styles/AdminPanel.module.scss';
import modalStyles from './styles/Modal.module.scss';

const AdminPanel = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [banks, setBanks] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const tables = useMemo(() => ['companies', 'projects', 'contractors', 'banks', 'currencies', 'account', 'transactions'], []);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/${tables[tabIndex]}`);
            const data = await response.json();
            setData(data);
        } catch (err) {
            console.error(`Error fetching ${tables[tabIndex]} data:`, err);
        }
    }, [tabIndex, tables]);

    useEffect(() => {
        fetchData();
        if (tabIndex === 0 || tabIndex === 3) {
            fetchBanks();
        }
        if (tabIndex === 0 || tabIndex === 4) {
            fetchCurrencies();
        }
        if (tabIndex === 0 || tabIndex === 6) {
            fetchCompanies();
            fetchAccounts();
        }
    }, [tabIndex, fetchData]);

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

    const fetchCompanies = () => {
        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));
    };

    const fetchAccounts = () => {
        fetch('http://localhost:3000/api/account')
            .then(response => response.json())
            .then(data => setAccounts(data))
            .catch(err => console.error('Error fetching accounts:', err));
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ name: '', accounts: [{ bankId: '', currencyId: '', accountNumber: '', balance: '' }] });
        setIsEdit(false);
        setEditId(null);
    };

    const handleEditRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/companies/${id}`);
            const data = await response.json();
            console.log('Editing record data:', data); // Log data for debugging
            setFormData({
                name: data.name,
                accounts: data.accounts.map(account => ({
                    bankId: account.bank_id,
                    currencyId: account.currency_id,
                    accountNumber: account.account_number,
                    balance: account.balance
                }))
            });
            setIsEdit(true);
            setEditId(id);
            handleOpen();
        } catch (err) {
            console.error('Error fetching record data:', err);
        }
    };

    const handleSave = async (formData, isEdit) => {
        const url = isEdit ? `http://localhost:3000/api/companies/${editId}` : 'http://localhost:3000/api/companies';
        const method = isEdit ? 'PUT' : 'POST';

        console.log(`URL: ${url}, Method: ${method}`, formData, isEdit); // Log URL, method, formData, and isEdit for debugging

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchData();
            handleClose();
        } catch (err) {
            console.error(`Error ${isEdit ? 'editing' : 'adding'} record in companies:`, err);
        }
    };

    const handleDeleteRecord = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:3000/api/${tables[tabIndex]}/${deleteId}`, {
            method: 'DELETE',
        })
        .then(() => {
            fetchData();
            setConfirmOpen(false);
        })
        .catch(err => console.error(`Error deleting record from ${tables[tabIndex]}:`, err));
    };

    const renderTable = () => {
        if (!data.length) return <Typography>Нет данных</Typography>;

        const columns = Object.keys(data[0]);

        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column}>{column}</th>
                        ))}
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map(column => (
                                <td key={column}>{row[column]}</td>
                            ))}
                            <td>
                                <IconButton onClick={() => handleEditRecord(row.id)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteRecord(row.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <Box className={styles.adminPanel}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="admin panel tabs">
                {tables.map((table, index) => (
                    <Tab key={index} label={table} />
                ))}
            </Tabs>
            <Box className={styles.tabContent}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Добавить
                </Button>
                {renderTable()}
            </Box>
            {tabIndex === 0 && (
                <CompanyFormModal
                    open={open}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    initialData={isEdit ? formData : { name: '', accounts: [{ bankId: '', currencyId: '', accountNumber: '', balance: '' }] }}
                    banks={banks}
                    currencies={currencies}
                    isEdit={isEdit}
                />
            )}
            {tabIndex === 3 && (
                <BankFormModal
                    open={open}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    initialData={isEdit ? formData : { name: '' }}
                />
            )}
            {tabIndex === 4 && (
                <CurrencyFormModal
                    open={open}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    initialData={isEdit ? formData : { name: '', short_name: '' }}
                />
            )}
            {tabIndex === 2 && (
                <ContractorFormModal
                    open={open}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    initialData={isEdit ? formData : { name: '' }}
                />
            )}
            {tabIndex === 6 && (
                <TransactionFormModal
                    open={open}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    initialData={isEdit ? formData : { description: '', amount: '', companyId: '', accountId: '' }}
                    companies={companies}
                    accounts={accounts}
                />
            )}
            <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <Box className={modalStyles.modalBox}>
                    <Typography variant="h6" component="h2">
                        Подтверждение удаления
                    </Typography>
                    <Typography>Действительно удалить запись из базы данных?</Typography>
                    <Box className={modalStyles.buttonContainer}>
                        <Button variant="contained" color="secondary" onClick={confirmDelete}>
                            Удалить
                        </Button>
                        <Button variant="contained" onClick={() => setConfirmOpen(false)}>
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AdminPanel;
