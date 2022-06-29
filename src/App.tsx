import React from 'react';
import List from './components/List';
import './App.css';

function App() {
    return (
        <div className="App">
            <List useCache={true} />
        </div>
    );
}

export default App;
