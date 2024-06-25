import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Modal, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import modalStyles from './styles/Modal.module.scss';

const TransactionFormModal = ({ open, handleClose, handleSave, initialData, companies, accounts }) => {
    const [formData, setFormData] = useState(initialData || { description: '', amount: '', companyId: '', accountId: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(initialData || { description: '', amount: '', companyId: '', accountId: '' });
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.description) newErrors.description = 'Описание обязательно';
        if (!formData.amount) newErrors.amount = 'Сумма обязательна';
        if (!formData.companyId) newErrors.companyId = 'Компания обязательна';
        if (!formData.accountId) newErrors.accountId = 'Счет обязателен';
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
                    {initialData ? 'Редактировать транзакцию' : 'Добавить новую транзакцию'}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Описание"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Сумма"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    error={!!errors.amount}
                    helperText={errors.amount}
                />
                <FormControl fullWidth margin="normal" error={!!errors.companyId}>
                    <InputLabel id="company-label">Выберите компанию</InputLabel>
                    <Select
                        labelId="company-label"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleInputChange}
                    >
                        {companies.map(company => (
                            <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                        ))}
                    </Select>
                    {errors.companyId && <Typography color="error">{errors.companyId}</Typography>}
                </FormControl>
                <FormControl fullWidth margin="normal" error={!!errors.accountId}>
                    <InputLabel id="account-label">Выберите счет</InputLabel>
                    <Select
                        labelId="account-label"
                        name="accountId"
                        value={formData.accountId}
                        onChange={handleInputChange}
                    >
                        {accounts.map(account => (
                            <MenuItem key={account.id} value={account.id}>{account.accountNumber}</MenuItem>
                        ))}
                    </Select>
                    {errors.accountId && <Typography color="error">{errors.accountId}</Typography>}
                </FormControl>
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

export default TransactionFormModal;
