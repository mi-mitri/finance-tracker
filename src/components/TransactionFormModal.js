import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Modal, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import modalStyles from './styles/TransactionFormModal.module.scss';

const TransactionFormModal = ({ open, handleClose, handleSave, initialData, companies, accounts }) => {
    const [formData, setFormData] = useState(initialData);
    const [transactionType, setTransactionType] = useState('income');

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTypeChange = (e) => {
        setTransactionType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const adjustedFormData = {
            ...formData,
            amount: transactionType === 'expense' ? -Math.abs(formData.amount) : Math.abs(formData.amount)
        };
        handleSave(adjustedFormData);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={modalStyles.modalBox}>
                <Typography variant="h6" component="h2">
                    {formData.id ? 'Редактировать Транзакцию' : 'Добавить Транзакцию'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl component="fieldset">
                        <RadioGroup row name="transactionType" value={transactionType} onChange={handleTypeChange}>
                            <FormControlLabel value="income" control={<Radio />} label="Приход" />
                            <FormControlLabel value="expense" control={<Radio />} label="Расход" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="company-label">Компания</InputLabel>
                        <Select
                            labelId="company-label"
                            name="companyId"
                            value={formData.companyId || ''}
                            onChange={handleChange}
                        >
                            {companies.map((company) => (
                                <MenuItem key={company.id} value={company.id}>
                                    {company.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="account-label">Аккаунт</InputLabel>
                        <Select
                            labelId="account-label"
                            name="accountId"
                            value={formData.accountId || ''}
                            onChange={handleChange}
                        >
                            {accounts.map((account) => (
                                <MenuItem key={account.id} value={account.id}>
                                    {account.accountNumber}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="projectId"
                        label="Проект"
                        value={formData.projectId || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="contractorId"
                        label="Контрагент"
                        value={formData.contractorId || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="amount"
                        label="Сумма"
                        value={formData.amount || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="date"
                        label="Дата транзакции"
                        type="date"
                        value={formData.date || ''}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="notes"
                        label="Примечания"
                        value={formData.notes || ''}
                        onChange={handleChange}
                    />
                    <Box className={modalStyles.buttonContainer}>
                        <Button variant="contained" color="primary" type="submit">
                            Провести транзакцию
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            Отмена
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default TransactionFormModal;
