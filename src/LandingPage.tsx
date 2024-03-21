import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="mt-10 text-center">
            <h1 className="title text-5xl md:text-6xl lg:text-7xl xl:text-8xl">E-BIKE EVERYWHERE</h1>
            <p className="pt-6 italic mt-4 text-lg md:text-xl font-bold">
                your official guide to navigating Toronto with {/* Fixed spacing */}
                <a href="https://bikesharetoronto.com/" className="no-underline hover:no-underline text-inherit ml-1">BIKESHARE</a>
            </p>
            {/* Button to redirect to MapView */}
            <Link to="/map" className="mt-12 inline-block bg-[#6638f0] hover:bg-[#df68b4] text-white hover:text-black font-bold py-4 px-6 rounded-full text-lg md:text-xl transition duration-300 ease-in-out">
                Find E-Bikes
            </Link>
        </div>
    );
};

export default LandingPage;
