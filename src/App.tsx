import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MapView from './MapView';
import About from './About';
import NavBar from './NavBar'; // Make sure to import the NavBar component

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
