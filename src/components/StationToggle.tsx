import React from 'react';

interface StationToggleProps {
    showAllStations: boolean;
    setShowAllStations: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const StationToggle: React.FC<StationToggleProps> = ({ showAllStations, setShowAllStations }) => {
    return (
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
    );
};

export default StationToggle;
