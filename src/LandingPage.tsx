import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="mt-20">
            <h1 className="title">E-BIKE EVERYWHERE</h1>
            <Link to="/bikes" className="block mt-4 text-lg md:text-xl font-sans">View Bike Sharing Data</Link>
            <Link to="/map" className="block mt-4 text-lg md:text-xl font-sans">View Map</Link>
            <Link to="/about" className="block mt-4 text-lg md:text-xl font-sans">About Us</Link>
        </div>
    );
};

export default LandingPage;
