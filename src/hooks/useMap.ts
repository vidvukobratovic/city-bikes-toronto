import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Station } from '../interfaces/Station';

const useMap = (userLocation: [number, number] | null, stations: Station[], showAll: boolean) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);

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

        // Add user location marker
        new mapboxgl.Marker({ draggable: false }).setLngLat(userLocation).addTo(map);
    }, [map, userLocation]);

    useEffect(() => {
        if (!map) return;

        // Remove existing markers
        map?.markers?.forEach(marker => marker.remove());

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

            map.markers = map.markers || [];
            map.markers.push(marker);
        });
    }, [map, stations, showAll]);

    return { map };
};

export default useMap;
