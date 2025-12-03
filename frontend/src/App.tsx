import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapView from './pages/MapView';
import About from './pages/About';
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <NavBar/> {/* This ensures NavBar is present on all pages */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
