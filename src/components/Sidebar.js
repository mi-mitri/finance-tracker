import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import styles from './styles/Sidebar.module.scss'; // Проверьте путь к файлу стилей

const Sidebar = () => {
    const handleDeleteAll = () => {
        fetch('http://localhost:3000/api/delete-all', {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Все записи удалены из базы данных');
            } else {
                alert('Произошла ошибка при удалении записей');
            }
        })
        .catch(err => {
            console.error('Error deleting all records:', err);
            alert('Произошла ошибка при удалении записей');
        });
    };

    return (
        <div className={styles.sidebar}>
            <List>
                <ListItem button component={NavLink} to="/home">
                    <ListItemText primary="Главная" />
                </ListItem>
                <ListItem button component={NavLink} to="/companies">
                    <ListItemText primary="Компании" />
                </ListItem>
                <ListItem button component={NavLink} to="/admin">
                    <ListItemText primary="Панель администратора" />
                </ListItem>
                {/* Add more links as needed */}
            </List>
            <div className={styles.buttonContainer}>
                <Button variant="contained" color="secondary" onClick={handleDeleteAll}>
                    Удалить все записи в базе данных
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
