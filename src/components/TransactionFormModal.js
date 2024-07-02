import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Modal, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { fetchProjects, fetchContractors, fetchAccounts } from '../api'; // Импортируем API функции
import modalStyles from './styles/TransactionFormModal.module.scss';

const TransactionFormModal = ({ open, handleClose, handleSave, initialData, companies = [] }) => {
    const [formData, setFormData] = useState(initialData);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filteredContractors, setFilteredContractors] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [transactionType, setTransactionType] = useState('income');
    const [error, setError] = useState('');

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const fetchData = useCallback(async (companyId) => {
        try {
            if (companyId) {
                const [projects, contractors, accounts] = await Promise.all([
                    fetchProjects(companyId),
                    fetchContractors(companyId),
                    fetchAccounts(companyId)
                ]);

                setFilteredProjects(projects);
                setFilteredContractors(contractors);
                setFilteredAccounts(accounts);
            } else {
                setFilteredProjects([]);
                setFilteredContractors([]);
                setFilteredAccounts([]);
            }
        } catch (err) {
            setError(`Ошибка загрузки данных: ${err.message}`);
        }
    }, []);

    useEffect(() => {
        fetchData(formData.companyId);
    }, [formData.companyId, fetchData]);

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
                {error && <Typography color="error">{error}</Typography>}
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
                            {Array.isArray(filteredAccounts) && filteredAccounts.length > 0
                                ? filteredAccounts.map((account) => (
                                    <MenuItem key={account.id} value={account.id}>
                                        {account.accountNumber}
                                    </MenuItem>
                                ))
                                : <MenuItem disabled>Нет доступных аккаунтов</MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="project-label">Проект</InputLabel>
                        <Select
                            labelId="project-label"
                            name="projectId"
                            value={formData.projectId || ''}
                            onChange={handleChange}
                        >
                            {Array.isArray(filteredProjects) && filteredProjects.length > 0
                                ? filteredProjects.map((project) => (
                                    <MenuItem key={project.id} value={project.id}>
                                        {project.name}
                                    </MenuItem>
                                ))
                                : <MenuItem disabled>Нет доступных проектов</MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="contractor-label">Контрагент</InputLabel>
                        <Select
                            labelId="contractor-label"
                            name="contractorId"
                            value={formData.contractorId || ''}
                            onChange={handleChange}
                        >
                            {Array.isArray(filteredContractors) && filteredContractors.length > 0
                                ? filteredContractors.map((contractor) => (
                                    <MenuItem key={contractor.id} value={contractor.id}>
                                        {contractor.name}
                                    </MenuItem>
                                ))
                                : <MenuItem disabled>Нет доступных контрагентов</MenuItem>
                            }
                        </Select>
                    </FormControl>
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
