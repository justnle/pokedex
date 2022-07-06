import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Captured from './pages/Captured';

function App() {
    return (
        <Router>
            <div className="App container-xl">
                <Routes>
                    <Route path="/" element={<Home useCache={false} />} />
                    <Route path="/captured" element={<Captured />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
