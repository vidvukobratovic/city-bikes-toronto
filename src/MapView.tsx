import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map-container', // HTML element ID where we want to output the map
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-79.3832, 43.6532], // downtown toronto
            zoom: 12,
            accessToken: mapboxAccessToken
        });

        // Get user's current location
        navigator.geolocation.getCurrentPosition(
            position => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
                map.flyTo({
                    center: [longitude, latitude],
                    essential: true
                });
            },
            error => {
                console.error('Error getting user location:', error);
            }
        );

        return () => {
            map.remove(); // Cleanup map instance on component unmount
        };
    }, []);

    return (
        <div id="map-container" style={{ width: '100%', height: '400px' }}></div> // todo where does this go?
    );
};

export default Map;
