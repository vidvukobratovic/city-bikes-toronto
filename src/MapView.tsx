import React, { useState, useEffect } from 'react';
import useBikeData from './hooks/useBikeData';
import useMap from './hooks/useMap';
import StationToggle from './components/StationToggle';

const Map: React.FC = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [showAllStations, setShowAllStations] = useState(false);

    const { bikesData, loading, nearestStations, allStations } = useBikeData(userLocation);
    const { map } = useMap(userLocation, showAllStations ? allStations : nearestStations, showAllStations);

    useEffect(() => {
        if (!map) return;

        navigator.geolocation.getCurrentPosition(
            position => {
                setUserLocation([position.coords.longitude, position.coords.latitude]);
            },
            error => console.error('Error getting user location:', error)
        );
    }, [map]);

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
                <StationToggle showAllStations={showAllStations} setShowAllStations={setShowAllStations} />
            </div>
        </div>
    );
};

export default Map;
