import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { Network } from './interfaces/Network';
import { Station } from './interfaces/Station';
import { Extra } from './interfaces/Extra';

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [bikesData, setBikesData] = useState<Network | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [nearestStations, setNearestStations] = useState<Station[]>([]);
    const [allStations, setAllStatations] = useState<Station[]>([]);
    const [showAllStations, setShowAllStations] = useState(false);

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('https://api.citybik.es/v2/networks/bixi-toronto');
                const data: Network = response.data;
                setBikesData(data);
                setLoading(false);
                console.log('api call', data);
                // Filter and log stations with e-bikes
                const stationsWithEbike = data?.network?.stations?.filter(station =>
                    station.extra?.has_ebikes && station.extra?.ebikes > 0
                ) || [];
                console.log('Stations with e-bikes:', stationsWithEbike);

                setAllStatations(data?.network?.stations);
                
                // Set nearest stations
                if (userLocation) {
                    const sortedStations = stationsWithEbike.sort((a, b) => {
                        const distanceA = calculateDistance(userLocation, [a.longitude, a.latitude]);
                        const distanceB = calculateDistance(userLocation, [b.longitude, b.latitude]);
                        return distanceA - distanceB;
                    });
                    const closestStations = sortedStations.slice(0, 3);
                    setNearestStations(closestStations);
                    console.log('Nearest stations with e-bikes:', closestStations);
                }
            } catch (error) {
                console.error('Error fetching bike data:', error);
                setLoading(false);
            }
        };

        fetchBikeData();
    }, [userLocation]);

    const [map, setMap] = useState<mapboxgl.Map | null>(null);

    useEffect(() => {
        const initializedMap = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-79.3832, 43.6532],
            zoom: 12,
            accessToken: mapboxAccessToken
        });
        setMap(initializedMap);

        return () => {
            initializedMap.remove();
        };
    }, []);

    useEffect(() => {
        if (userLocation && nearestStations.length > 0 && map) {
            nearestStations.forEach(station => {
                const marker = new mapboxgl.Marker({
                    color: 'red',
                    draggable: false,
                })
                    .setLngLat([station.longitude, station.latitude])
                    .addTo(map);
            });
        }
    }, [userLocation, nearestStations, map]);
    
    useEffect(() => {
        if (userLocation && map) {
            // Remove all existing markers
            map?.markers?.forEach(marker => marker.remove());
    
            if (showAllStations) {
                // Add markers for all stations
                allStations.forEach(station => {
                    const marker = new mapboxgl.Marker({
                        color: 'green',
                        draggable: false,
                    })
                    .setLngLat([station.longitude, station.latitude])
                    .addTo(map);
                    
                    // Add click event listener to show popup
                    marker.getElement().addEventListener('click', () => {
                        new mapboxgl.Popup()
                            .setLngLat([station.longitude, station.latitude])
                            .setHTML(`<p>${station.extra.address}</p>`)
                            .addTo(map);
                    });
    
                    // Store the marker reference in map object
                    map.markers = map.markers || [];
                    map.markers.push(marker);
                });
            } else {
                // Add markers for nearest stations
                nearestStations.forEach(station => {
                    const marker = new mapboxgl.Marker({
                        color: 'red',
                        draggable: false,
                    })
                    .setLngLat([station.longitude, station.latitude])
                    .addTo(map);
// Add click event listener to show popup
marker.getElement().addEventListener('click', () => {
    console.log('Station:', station);
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    })
    .setLngLat([station.longitude, station.latitude])
    .setHTML(`
    <div class="bg-white shadow-md rounded-md p-2">
        <p class="text-sm font-medium text-gray-800">${station.extra.address}</p>
    </div>
`)
    popup.addTo(map);
});
                    // Store the marker reference in map object
                    map.markers = map.markers || [];
                    map.markers.push(marker);
                });
            }
        }
    }, [userLocation, nearestStations, allStations, map, showAllStations]);

    useEffect(() => {
        if (!map) return;

        navigator.geolocation.getCurrentPosition(
            position => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
                map.flyTo({
                    center: [longitude, latitude],
                    essential: true
                });

                const userMarker = new mapboxgl.Marker({
                    draggable: false,
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            },
            error => {
                console.error('Error getting user location:', error);
            }
        );
    }, [map]);

    const calculateDistance = ([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]): number => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    const deg2rad = (deg: number): number => {
        return deg * (Math.PI / 180)
    }

    const handleShowAllStationsToggle = () => {
        setShowAllStations(prevState => !prevState);
    };

    return (
        <div className="relative">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Bike Sharing Data for Toronto, Ontario</h2>
                    <p>Total Stations: {bikesData?.network?.stations?.length}</p>
                </div>
            )}
            <div id="map-container" className="w-full h-96 bg-gray-200 relative">
                <div className="absolute top-4 left-4 z-10 bg-yellow-300 p-2 rounded-lg">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showAllStations}
                            onChange={handleShowAllStationsToggle}
                            className="form-checkbox h-5 w-5 text-indigo-600 bg-gray-700"
                        />
                        <span className="text-gray-700">Show All Stations</span>
                    </label>
                </div>
            </div>
        </div>
    );
    
    
};

export default Map;