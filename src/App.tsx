import React from 'react';
import Header from './components/Header';
import List from './components/List';
import './App.css';

function App() {
    return (
        <div className="App container mx-auto">
            <Header />
            <List useCache={true} />
        </div>
    );
}

export default App;
