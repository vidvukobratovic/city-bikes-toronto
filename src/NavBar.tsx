// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        // Add 'fixed', 'top-0', 'left-0', and 'w-full' to fix the navbar to the top
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10">
            <ul className="flex space-x-4 justify-center">
                <li>
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                </li>
                <li>
                    <Link to="/bikes" className="text-white hover:text-gray-300">Bike Sharing Data</Link>
                </li>
                <li>
                    <Link to="/map" className="text-white hover:text-gray-300">Map View</Link>
                </li>
                <li>
                    <Link to="/about" className="text-white hover:text-gray-300">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
