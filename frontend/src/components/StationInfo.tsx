// components/StationInfo.tsx
import React from 'react';

interface StationInfoProps {
    totalStations?: number;
    networkName?: string;
}

const StationInfo: React.FC<StationInfoProps> = ({ totalStations, networkName = 'Toronto, Ontario' }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Bike Sharing Data for {networkName}
            </h2>
            {totalStations !== undefined && (
                <p className="text-gray-600">Total Stations: {totalStations}</p>
            )}
        </div>
    );
};

export default StationInfo;

