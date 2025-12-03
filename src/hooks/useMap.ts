import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Station } from '../interfaces/Station';

const useMap = (userLocation: [number, number] | null, stations: Station[], showAll: boolean) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

    useEffect(() => {
        const initializedMap = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: userLocation || [-79.3832, 43.6532],
            zoom: 12,
            accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        });

        setMap(initializedMap);

        return () => {
            initializedMap.remove();
        };
    }, []);

    useEffect(() => {
        if (!map || !userLocation) return;

        map.flyTo({ center: userLocation, essential: true });

        // Remove existing user marker
        if (userMarkerRef.current) {
            userMarkerRef.current.remove();
        }

        // Add user location marker
        userMarkerRef.current = new mapboxgl.Marker({ draggable: false })
            .setLngLat(userLocation)
            .addTo(map);
    }, [map, userLocation]);

    useEffect(() => {
        if (!map) return;

        // Remove existing station markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        stations.forEach(station => {
            const marker = new mapboxgl.Marker({
                color: showAll ? 'green' : 'red',
                draggable: false,
            })
                .setLngLat([station.longitude, station.latitude])
                .addTo(map);

            marker.getElement().addEventListener('click', () => {
                new mapboxgl.Popup()
                    .setLngLat([station.longitude, station.latitude])
                    .setHTML(`<p>${station.extra?.address || 'Unknown'}</p>`)
                    .addTo(map);
            });

            markersRef.current.push(marker);
        });
    }, [map, stations, showAll]);

    return { map };
};

export default useMap;
