import React from 'react';
import Header from './components/Header';
import Scroller from './components/Scroller';
import './App.css';

function App() {
    return (
        <div className="App container mx-auto">
            <Header />
            <Scroller useCache={true} />
        </div>
    );
}

export default App;
