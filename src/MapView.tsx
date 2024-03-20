import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

function MapView() {
    const [bikesData, setBikesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('https://api.citybik.es/v2/networks/toronto');
                setBikesData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bike data:', error);
            }
        };

        fetchBikeData();

        return () => {
            // Cleanup code if needed
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Bike Sharing Data for Toronto, Ontario</h2>
                    <p>City: {bikesData?.network?.location?.city}</p>
                    <p>Country: {bikesData?.network?.location?.country}</p>
                    <p>Total Stations: {bikesData?.network?.stations?.length}</p>
                </div>
            )}
            <Map />
        </div>
    );
}

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map-container', // HTML element ID where we wabt ti out the map
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

export default MapView;