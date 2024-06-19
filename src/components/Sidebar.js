import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Drawer variant="permanent">
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Главная" />
                </ListItem>
                <ListItem button component={Link} to="/companies">
                    <ListItemText primary="Компании" />
                </ListItem>
                <ListItem button component={Link} to="/transactions">
                    <ListItemText primary="Операции" />
                </ListItem>
                <ListItem button component={Link} to="/contractors">
                    <ListItemText primary="Контрагенты" />
                </ListItem>
                <ListItem button component={Link} to="/admin">
                    <ListItemText primary="Панель администратора" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
