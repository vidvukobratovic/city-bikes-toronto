import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="mt-20">
            <h1>E-BIKE EVERYWHERE</h1>
            <Link to="/bikes">View Bike Sharing Data</Link>
            <Link to="/map">View Map</Link>
            <Link to="/about">About Us</Link>
        </div>
    );
};

export default LandingPage;
