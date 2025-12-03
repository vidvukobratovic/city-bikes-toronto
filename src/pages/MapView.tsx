// pages/MapView.tsx
import React, { useState } from 'react';
import useBikeData from '../hooks/useBikeData';
import useMap from '../hooks/useMap';
import { useLocation } from '../hooks/useLocation';
import StationToggle from '../components/StationToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import StationInfo from '../components/StationInfo';
import ErrorMessage from '../components/ErrorMessage';

const MapView: React.FC = () => {
    const [showAllStations, setShowAllStations] = useState(false);
    const { userLocation, loading: locationLoading, error: locationError } = useLocation();
    const { bikesData, loading: dataLoading, error: dataError, nearestStations, allStations } = useBikeData(userLocation);
    useMap(userLocation, showAllStations ? allStations : nearestStations, showAllStations);

    const loading = locationLoading || dataLoading;
    const error = locationError || dataError;

    return (
        <div className="relative min-h-screen p-4">
            {loading ? (
                <LoadingSpinner message="Loading map and station data..." />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <>
                    <StationInfo
                        totalStations={bikesData?.network?.stations?.length}
                        networkName={bikesData?.network?.location?.city}
                    />
                    <div id="map-container" className="w-full h-96 bg-gray-200 relative rounded-lg overflow-hidden">
                        <StationToggle
                            showAllStations={showAllStations}
                            setShowAllStations={setShowAllStations}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default MapView;

