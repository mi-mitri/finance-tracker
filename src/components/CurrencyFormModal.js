import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Modal } from '@mui/material';
import modalStyles from './styles/Modal.module.scss';

const CurrencyFormModal = ({ open, handleClose, handleSave, initialData }) => {
    const [formData, setFormData] = useState(initialData || { name: '', short_name: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(initialData || { name: '', short_name: '' });
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Название валюты обязательно';
        if (!formData.short_name) newErrors.short_name = 'Сокращенное название обязательно';
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
                    {initialData ? 'Редактировать валюту' : 'Добавить новую валюту'}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Название валюты"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Сокращенное название"
                    name="short_name"
                    value={formData.short_name}
                    onChange={handleInputChange}
                    error={!!errors.short_name}
                    helperText={errors.short_name}
                />
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

export default CurrencyFormModal;
