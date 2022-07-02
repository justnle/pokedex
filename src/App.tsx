import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Captured from './pages/Captured';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App container-xl mx-auto px-5">
                {/* <Header /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/captured" element={<Captured />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
