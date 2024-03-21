// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="nav py-4 px-6">
            <ul className="flex space-x-20 justify-center">
                <li>
                    <Link to="/" className="text-white hover:text-gray-300 text-2xl md:text-2xl lg:text-4xl">HOME</Link>
                </li>
                <li>
                    <Link to="/map" className="text-white hover:text-gray-300 text-2xl md:text-2xl lg:text-4xl">MAP</Link>
                </li>
                <li>
                    <Link to="/about" className="text-white hover:text-gray-300 text-2xl md:text-2xl lg:text-4xl">ABOUT</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
