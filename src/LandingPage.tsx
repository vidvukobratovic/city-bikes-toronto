import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>EBIKE EVERYWHERE</h1>
            <Link to="/bikes">View Bike Sharing Data</Link>
            <Link to="/map">View Map</Link>
            <Link to="/about">About Us</Link>
        </div>
    );
};

export default LandingPage;
