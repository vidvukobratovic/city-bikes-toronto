import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useBikeData from './hooks/useBikeData';

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const { bikesData, loading, nearestStations, allStations } = useBikeData(userLocation);
    const [showAllStations, setShowAllStations] = useState(false);
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
        if (userLocation && map) {
            map.flyTo({ center: userLocation, essential: true });
            new mapboxgl.Marker({ draggable: false }).setLngLat(userLocation).addTo(map);
        }
    }, [userLocation, map]);

    useEffect(() => {
        if (!map) return;

        navigator.geolocation.getCurrentPosition(
            position => {
                setUserLocation([position.coords.longitude, position.coords.latitude]);
            },
            error => console.error('Error getting user location:', error)
        );
    }, [map]);

    useEffect(() => {
        if (!map || !userLocation) return;

        // Remove existing markers
        map?.markers?.forEach(marker => marker.remove());

        const stationsToShow = showAllStations ? allStations : nearestStations;

        stationsToShow.forEach(station => {
            const marker = new mapboxgl.Marker({
                color: showAllStations ? 'green' : 'red',
                draggable: false,
            })
                .setLngLat([station.longitude, station.latitude])
                .addTo(map);

            marker.getElement().addEventListener('click', () => {
                new mapboxgl.Popup()
                    .setLngLat([station.longitude, station.latitude])
                    .setHTML(`<p>${station.extra.address}</p>`)
                    .addTo(map);
            });

            map.markers = map.markers || [];
            map.markers.push(marker);
        });
    }, [userLocation, nearestStations, allStations, map, showAllStations]);

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
                            onChange={() => setShowAllStations(prev => !prev)}
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
