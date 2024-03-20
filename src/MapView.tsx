import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { Network } from './interfaces/Network'; 
import { Station } from './interfaces/Station'; 
import { Extra } from './interfaces/Extra'; 

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [bikesData, setBikesData] = useState<Network | null>(null); // Use Network type for bikesData
    const [loading, setLoading] = useState<boolean>(true);
    const [stationsWithEbike, setStationsWithEbike] = useState<Station[]>([]); // State to store stations with e-bikes

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('https://api.citybik.es/v2/networks/toronto');
                const data: Network = response.data; // Specify data type as Network
                setBikesData(data);
                setLoading(false);
                console.log('api call', data);

                // Filter stations with e-bikes greater than 0
                const stationsWithEbike = data?.network?.stations?.filter(station =>
                    station.extra?.has_ebikes && station.extra?.ebikes > 0
                ) || [];

                setStationsWithEbike(stationsWithEbike);
                console.log('Stations with e-bikes:', stationsWithEbike);

            } catch (error) {
                console.error('Error fetching bike data:', error);
                setLoading(false);
            }
        };

        fetchBikeData();
    }, []);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map-container', // HTML element ID where we want to output the map
            style: 'mapbox://styles/mapbox/dark-v11',
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
            <div id="map-container" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default Map;
