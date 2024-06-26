import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';
import modalStyles from './styles/Modal.module.scss';

const ContractorFormModal = ({ open, handleClose, handleSave, initialData, isEdit }) => {
    const [formData, setFormData] = useState(initialData || { name: '', email: '', phone: '' });

    useEffect(() => {
        setFormData(initialData || { name: '', email: '', phone: '' });
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
                    {isEdit ? 'Редактировать контрагента' : 'Добавить контрагента'}
                </Typography>
                <TextField
                    label="Имя"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
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

export default ContractorFormModal;



// import React, { useState, useEffect } from 'react';
// import { Box, Button, Typography, TextField, Modal } from '@mui/material';
// import modalStyles from './styles/Modal.module.scss';

// const ContractorFormModal = ({ open, handleClose, handleSave, initialData, isEdit }) => {
//     const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         if (initialData && initialData.name) {
//             setFormData(initialData);
//         }
//     }, [initialData]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name) newErrors.name = 'Название компании обязательно';
//         if (!formData.email) newErrors.email = 'Электронная почта обязательна';
//         if (!formData.phone) newErrors.phone = 'Телефон обязателен';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSaveClick = () => {
//         if (validateForm()) {
//             handleSave(formData, isEdit);
//         }
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box className={modalStyles.modalBox}>
//                 <Typography variant="h6" component="h2">
//                     {isEdit ? 'Редактировать контрагента' : 'Добавить нового контрагента'}
//                 </Typography>
//                 <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Название компании"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     error={!!errors.name}
//                     helperText={errors.name}
//                 />
//                 <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Электронная почта"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     error={!!errors.email}
//                     helperText={errors.email}
//                 />
//                 <TextField
//                     fullWidth
//                     margin="normal"
//                     label="Телефон"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     error={!!errors.phone}
//                     helperText={errors.phone}
//                 />
//                 <Box className={modalStyles.buttonContainer}>
//                     <Button variant="contained" color="primary" onClick={handleSaveClick}>
//                         Сохранить
//                     </Button>
//                     <Button variant="contained" color="secondary" onClick={handleClose}>
//                         Отмена
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// };

// export default ContractorFormModal;
