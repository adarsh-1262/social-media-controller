// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditLink from './pages/EditLink';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit/:id" element={<EditLink />} />
            </Routes>
        </div>
    );
};

export default App;
