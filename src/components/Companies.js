import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, FormHelperText, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, Delete as DeleteIcon } from '@mui/icons-material';
import styles from './styles/Companies.module.scss';
import modalStyles from './styles/Modal.module.scss';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [banks, setBanks] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [open, setOpen] = useState(false);
    const [newCompany, setNewCompany] = useState('');
    const [newBankAccounts, setNewBankAccounts] = useState([{ bankId: '', accountNumber: '', currencyId: '', balance: '' }]);
    const [expanded, setExpanded] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(err => console.error('Error fetching companies:', err));

        fetch('http://localhost:3000/api/banks')
            .then(response => response.json())
            .then(data => setBanks(data))
            .catch(err => console.error('Error fetching banks:', err));

        fetch('http://localhost:3000/api/currencies')
            .then(response => response.json())
            .then(data => setCurrencies(data))
            .catch(err => console.error('Error fetching currencies:', err));
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewCompany('');
        setNewBankAccounts([{ bankId: '', accountNumber: '', currencyId: '', balance: '' }]);
        setExpanded(0);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newCompany) newErrors.newCompany = 'Название компании обязательно';
        newBankAccounts.forEach((account, index) => {
            if (!account.bankId) newErrors[`bankId${index}`] = 'Банк обязателен';
            if (!account.accountNumber) newErrors[`accountNumber${index}`] = 'Номер счета обязателен';
            if (!account.currencyId) newErrors[`currencyId${index}`] = 'Валюта обязательна';
            if (!account.balance) newErrors[`balance${index}`] = 'Баланс обязателен';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddCompany = () => {
        if (!validateForm()) return;

        const companyData = {
            name: newCompany,
            accounts: newBankAccounts
        };

        fetch('http://localhost:3000/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        })
        .then(response => response.json())
        .then(data => {
            setCompanies([...companies, data]);
            handleClose();
        })
        .catch(err => console.error('Error adding company:', err));
    };

    const handleAccountChange = (index, field, value) => {
        const newAccounts = [...newBankAccounts];
        newAccounts[index][field] = value;
        setNewBankAccounts(newAccounts);
    };

    const handleAddAccount = () => {
        setNewBankAccounts([...newBankAccounts, { bankId: '', accountNumber: '', currencyId: '', balance: '' }]);
        setExpanded(newBankAccounts.length); // Раскрыть новый банковский счет
    };

    const handleDeleteAccount = (index) => {
        const newAccounts = newBankAccounts.filter((_, i) => i !== index);
        setNewBankAccounts(newAccounts);
        setExpanded(0);
    };

    const handleBalanceInput = (index, value) => {
        const validValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        const formattedValue = validValue.match(/^\d*(\.\d{0,2})?$/) ? validValue : newBankAccounts[index].balance;
        handleAccountChange(index, 'balance', formattedValue);
    };

    const handleAccordionChange = (index) => (event, isExpanded) => {
        setExpanded(isExpanded ? index : false);
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
            <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />} 
                onClick={handleOpen}
            >
                Добавить компанию
            </Button>
            {open && (
                <div className={modalStyles.modalOverlay} onClick={handleClose}>
                    <Box className={modalStyles.modalBox} onClick={(e) => e.stopPropagation()}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Добавить новую компанию
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Название компании"
                            value={newCompany}
                            onChange={(e) => setNewCompany(e.target.value)}
                            error={!!errors.newCompany}
                            helperText={errors.newCompany}
                        />
                        {newBankAccounts.map((account, index) => (
                            <Accordion key={index} expanded={expanded === index} onChange={handleAccordionChange(index)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} className={modalStyles.accordionHeader}>
                                    <Typography>Банковские данные {index + 1}</Typography>
                                    <IconButton onClick={() => handleDeleteAccount(index)} color="secondary" aria-label="delete" className={modalStyles.iconButton}>
                                        <DeleteIcon />
                                    </IconButton>
                                </AccordionSummary>
                                <AccordionDetails className={modalStyles.accordionDetails}>
                                    <FormControl fullWidth margin="normal" className={modalStyles.formControl} error={!!errors[`bankId${index}`]}>
                                        <InputLabel id={`bank-label-${index}`}>Выберите банк</InputLabel>
                                        <Select
                                            labelId={`bank-label-${index}`}
                                            value={account.bankId}
                                            onChange={(e) => handleAccountChange(index, 'bankId', e.target.value)}
                                            className={modalStyles.selectField}
                                        >
                                            {banks.map(bank => (
                                                <MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {errors[`bankId${index}`] && <FormHelperText>{errors[`bankId${index}`]}</FormHelperText>}
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Номер счета"
                                        value={account.accountNumber}
                                        onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
                                        className={modalStyles.textField}
                                        error={!!errors[`accountNumber${index}`]}
                                        helperText={errors[`accountNumber${index}`]}
                                    />
                                    <FormControl fullWidth margin="normal" className={modalStyles.formControl} error={!!errors[`currencyId${index}`]}>
                                        <InputLabel id={`currency-label-${index}`}>Выберите валюту</InputLabel>
                                        <Select
                                            labelId={`currency-label-${index}`}
                                            value={account.currencyId}
                                            onChange={(e) => handleAccountChange(index, 'currencyId', e.target.value)}
                                            className={modalStyles.selectField}
                                        >
                                            {currencies.map(currency => (
                                                <MenuItem key={currency.id} value={currency.id}>{currency.short_name}</MenuItem>
                                            ))}
                                        </Select>
                                        {errors[`currencyId${index}`] && <FormHelperText>{errors[`currencyId${index}`]}</FormHelperText>}
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Баланс"
                                        type="text"
                                        value={account.balance}
                                        onChange={(e) => handleBalanceInput(index, e.target.value)}
                                        className={modalStyles.textField}
                                        error={!!errors[`balance${index}`]}
                                        helperText={errors[`balance${index}`]}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        <Button onClick={handleAddAccount}>Добавить ещё банковский счёт</Button>
                        <Box className={modalStyles.buttonContainer}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleAddCompany}
                            >
                                Сохранить
                            </Button>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={handleClose}
                            >
                                Отмена
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default Companies;
