import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './components/Home';
import Companies from './components/Companies';
import Transactions from './components/Transactions';
import Contractors from './components/Contractors';
import AdminPanel from './components/AdminPanel';
import Sidebar from './components/Sidebar';
import styles from './components/styles/App.module.scss';

const App = () => {
    const [open, setOpen] = useState(true); // Сайдбар по умолчанию открыт

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <div className={styles.root}>
                <CssBaseline />
                <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <main className={styles.content} style={{ marginLeft: open ? 1 : 64 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/companies" element={<Companies />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/contractors" element={<Contractors />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;









// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Main from './components/Main';
// import './App.css';

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <Sidebar />
//                 <Main />
//             </div>
//         </Router>
//     );
// }

// export default App;
