// hooks/useBikeData.ts
import { useState, useEffect } from 'react';
import { Station } from '../interfaces/Station';
import { bikeApi, ApiResponse } from '../services/bikeApi';
import { calculateDistance } from '../utils/distance';

const useBikeData = (userLocation: [number, number] | null) => {
    const [bikesData, setBikesData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [nearestStations, setNearestStations] = useState<Station[]>([]);
    const [allStations, setAllStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await bikeApi.getTorontoNetwork();
                setBikesData(data);
                setAllStations(data.network.stations);

                if (userLocation) {
                    const stationsWithEbike = data.network.stations.filter(
                        (station: Station) =>
                            station.extra?.has_ebikes && station.extra?.ebikes > 0
                    );
                    const sortedStations = stationsWithEbike.sort(
                        (a: Station, b: Station) => {
                            return (
                                calculateDistance(userLocation, [
                                    a.longitude,
                                    a.latitude,
                                ]) -
                                calculateDistance(userLocation, [
                                    b.longitude,
                                    b.latitude,
                                ])
                            );
                        }
                    );
                    setNearestStations(sortedStations.slice(0, 3));
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'Failed to fetch bike data';
                setError(errorMessage);
                console.error('Error fetching bike data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBikeData();
    }, [userLocation]);

    return { bikesData, loading, error, nearestStations, allStations };
};

export default useBikeData;
