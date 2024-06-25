import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import clsx from 'clsx';
import styles from './styles/Sidebar.module.scss';

const Sidebar = ({ open, handleDrawerOpen, handleDrawerClose }) => {
    return (
        <Drawer
            variant="permanent"
            className={clsx({
                [styles.drawerPaper]: open,
                [styles.drawerPaperClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [styles.drawerPaper]: open,
                    [styles.drawerPaperClose]: !open,
                }),
            }}
            open={open}
        >
            <div className={styles.drawerHeader}>
                <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
            </div>
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


