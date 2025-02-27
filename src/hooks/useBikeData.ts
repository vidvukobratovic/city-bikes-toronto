// hooks/useBikeData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Network, Station } from '../interfaces';

const useBikeData = (userLocation: [number, number] | null) => {
    const [bikesData, setBikesData] = useState<Network | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [nearestStations, setNearestStations] = useState<Station[]>([]);
    const [allStations, setAllStations] = useState<Station[]>([]);

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('https://api.citybik.es/v2/networks/bixi-toronto');
                const data: Network = response.data;
                setBikesData(data);
                setAllStations(data.network.stations);

                if (userLocation) {
                    const stationsWithEbike = data.network.stations.filter(station =>
                        station.extra?.has_ebikes && station.extra?.ebikes > 0
                    );
                    const sortedStations = stationsWithEbike.sort((a, b) => {
                        return calculateDistance(userLocation, [a.longitude, a.latitude]) - 
                               calculateDistance(userLocation, [b.longitude, b.latitude]);
                    });
                    setNearestStations(sortedStations.slice(0, 3));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bike data:', error);
                setLoading(false);
            }
        };
        fetchBikeData();
    }, [userLocation]);

    const calculateDistance = ([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]): number => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    const deg2rad = (deg: number): number => deg * (Math.PI / 180);

    return { bikesData, loading, nearestStations, allStations };
};

export default useBikeData;
