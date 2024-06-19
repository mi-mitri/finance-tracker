import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Main />
            </div>
        </Router>
    );
}

export default App;
