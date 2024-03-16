import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MapView() {
    const [bikesData, setBikesData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Access the API key

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
        </div>
    );
}

export default MapView;
