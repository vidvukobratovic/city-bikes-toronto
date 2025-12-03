// hooks/useLocation.ts
import { useState, useEffect } from 'react';

export const useLocation = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([
                    position.coords.longitude,
                    position.coords.latitude,
                ]);
                setLoading(false);
            },
            (err) => {
                setError(`Error getting location: ${err.message}`);
                setLoading(false);
            }
        );
    }, []);

    return { userLocation, loading, error };
};

