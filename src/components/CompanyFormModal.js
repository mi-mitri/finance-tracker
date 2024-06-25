import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Modal, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import modalStyles from './styles/Modal.module.scss';

const CompanyFormModal = ({ open, handleClose, handleSave, initialData, banks, currencies }) => {
    const [formData, setFormData] = useState(initialData || { name: '', accounts: [{ bankId: '', currencyId: '', accountNumber: '', balance: '' }] });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAccountChange = (index, e) => {
        const { name, value } = e.target;
        const accounts = [...formData.accounts];
        accounts[index][name] = value;
        setFormData({ ...formData, accounts });
    };

    const addAccount = () => {
        setFormData({ ...formData, accounts: [...formData.accounts, { bankId: '', currencyId: '', accountNumber: '', balance: '' }] });
    };

    const removeAccount = (index) => {
        const accounts = [...formData.accounts];
        accounts.splice(index, 1);
        setFormData({ ...formData, accounts });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Название компании обязательно';
        formData.accounts.forEach((account, index) => {
            if (!account.bankId) newErrors[`bankId${index}`] = 'Банк обязателен';
            if (!account.currencyId) newErrors[`currencyId${index}`] = 'Валюта обязательна';
            if (!account.accountNumber) newErrors[`accountNumber${index}`] = 'Номер счета обязателен';
            if (!account.balance) newErrors[`balance${index}`] = 'Баланс обязателен';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            handleSave(formData);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={modalStyles.modalBox}>
                <Typography variant="h6" component="h2">
                    {initialData ? 'Редактировать компанию' : 'Добавить новую компанию'}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Название компании"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                {formData.accounts.map((account, index) => (
                    <Box key={index} className={modalStyles.accountBox}>
                        <Typography variant="subtitle1" component="h3">
                            Банковские данные {index + 1}
                            {index > 0 && (
                                <IconButton onClick={() => removeAccount(index)} color="secondary" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Typography>
                        <FormControl fullWidth margin="normal" error={!!errors[`bankId${index}`]}>
                            <InputLabel id={`bank-label-${index}`}>Банк</InputLabel>
                            <Select
                                labelId={`bank-label-${index}`}
                                name="bankId"
                                value={account.bankId}
                                onChange={(e) => handleAccountChange(index, e)}
                            >
                                {banks.map(bank => (
                                    <MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
                                ))}
                            </Select>
                            {errors[`bankId${index}`] && <Typography color="error">{errors[`bankId${index}`]}</Typography>}
                        </FormControl>
                        <FormControl fullWidth margin="normal" error={!!errors[`currencyId${index}`]}>
                            <InputLabel id={`currency-label-${index}`}>Валюта</InputLabel>
                            <Select
                                labelId={`currency-label-${index}`}
                                name="currencyId"
                                value={account.currencyId}
                                onChange={(e) => handleAccountChange(index, e)}
                            >
                                {currencies.map(currency => (
                                    <MenuItem key={currency.id} value={currency.id}>{currency.name}</MenuItem>
                                ))}
                            </Select>
                            {errors[`currencyId${index}`] && <Typography color="error">{errors[`currencyId${index}`]}</Typography>}
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Номер счета"
                            name="accountNumber"
                            value={account.accountNumber}
                            onChange={(e) => handleAccountChange(index, e)}
                            error={!!errors[`accountNumber${index}`]}
                            helperText={errors[`accountNumber${index}`]}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Баланс"
                            name="balance"
                            type="number"
                            value={account.balance}
                            onChange={(e) => handleAccountChange(index, e)}
                            error={!!errors[`balance${index}`]}
                            helperText={errors[`balance${index}`]}
                        />
                    </Box>
                ))}
                <Button startIcon={<AddIcon />} onClick={addAccount} color="primary">
                    Добавить еще банковский счет
                </Button>
                <Box className={modalStyles.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Сохранить
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CompanyFormModal;

