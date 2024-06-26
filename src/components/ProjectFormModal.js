import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, TextField, MenuItem } from '@mui/material';
import modalStyles from './styles/Modal.module.scss';

const ProjectFormModal = ({ open, handleClose, handleSave, initialData, companies, isEdit }) => {
    const [formData, setFormData] = useState(initialData || { name: '', description: '', companyId: '' });

    useEffect(() => {
        setFormData(initialData || { name: '', description: '', companyId: '' });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        handleSave(formData, isEdit);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={modalStyles.modalBox}>
                <Typography variant="h6" component="h2">
                    {isEdit ? 'Редактировать проект' : 'Добавить проект'}
                </Typography>
                <TextField
                    label="Название"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Описание"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    select
                    label="Компания"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {companies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                            {company.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Box className={modalStyles.buttonContainer}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {isEdit ? 'Сохранить' : 'Добавить'}
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                        Отмена
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProjectFormModal;


