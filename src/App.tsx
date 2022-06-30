import React from 'react';
import Header from './components/Header';
import InfiniteScroll from './components/InfiniteScroll';
import './App.css';

function App() {
    return (
        <div className="App container mx-auto">
            <Header />
            <InfiniteScroll useCache={true} />
        </div>
    );
}

export default App;
