// App.js
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import ApiKeyPage from './pages/ApiKeyPage';
import './App.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        
        <Router>
            <div className="appContainer">
                <Header toggleSidebar={toggleSidebar} />
                <div className="contentContainer">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <main className={`mainContent ${isSidebarOpen ? 'contentShifted' : ''}`}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/page1" element={<Page1 />} />
                            <Route path="/page2" element={<Page2 />} />
                            <Route path="/apikey" element={<ApiKeyPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
