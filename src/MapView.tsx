import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

interface Extra {
    address?: string;
    altitude?: number;
    ebikes: number; // Corrected from 'ebike' to 'ebikes' to match the data structure
    has_ebikes: boolean; // Added to match the data structure
    last_updated?: number;
    normal_bikes?: number;
    payment?: string[];
    'payment-terminal'?: boolean;
    renting?: number;
    returning?: number;
    slots?: number;
    uid?: string;
    // Add other properties from `extra` as needed
}

interface Station {
    empty_slots?: number;
    extra: Extra;
    free_bikes?: number;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    timestamp?: string;
    // Include other station properties you might need
}

interface Network {
    company?: string[];
    gbfs_href?: string;
    href?: string;
    id: string;
    location: {
        city: string;
        country: string;
        latitude: number;
        longitude: number;
    };
    name: string;
    stations: Station[];
    // Include other network properties you might need
}

function MapView() {
    const [bikesData, setBikesData] = useState<BikesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [stationsWithEbike, setStationsWithEbike] = useState<Station[]>([]);
    const mapContainerRef = useRef<HTMLDivElement>(null); // create a ref for the map container

    useEffect(() => {
        const fetchBikeData = async () => {
            try {
                const response = await axios.get('https://api.citybik.es/v2/networks/toronto');
                const data = response.data; // No need to explicitly type as BikesData if you're not using TypeScript
                setBikesData(data);
                setLoading(false);
                console.log('api call', data);

                // Filter and store stations with available e-bikes
                const stationsWithEbike = data.network.stations.filter(station =>
                    station.extra.has_ebikes === true && station.extra.ebikes > 0
                );

                setStationsWithEbike(stationsWithEbike);
                console.log('Stations with e-bikes:', stationsWithEbike);

            } catch (error) {
                console.error('Error fetching bike data:', error);
            }
        };

        fetchBikeData();
    }, []);

    useEffect(() => {
        const updateSize = () => {
            // No need to set state for the map height, you can just call map.resize()
        };
        window.addEventListener('resize', updateSize);

        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-79.3832, 43.6532], // downtown toronto
                zoom: 12,
                accessToken: mapboxAccessToken
            });

            navigator.geolocation.getCurrentPosition(
                position => {
                    const {longitude, latitude} = position.coords;
                    setUserLocation([longitude, latitude]); // Now you're setting state in the MapView component
                    map.flyTo({center: [longitude, latitude], essential: true});
                },
                error => console.error('Error getting user location:', error)
            );

            updateSize(); // Set initial size and update the map size
            return () => {
                map.remove(); // Cleanup on unmount
                window.removeEventListener('resize', updateSize);
            };
        }
    }, [mapContainerRef]);
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Bike Sharing Data for Toronto, Ontario</h2>
                    <p>City: {bikesData?.network?.location?.city}</p>
                    <p>Country: {bikesData?.network?.location?.country}</p>
                    <p>Total Stations: {bikesData?.network?.stations?.length}</p>
                </div>
            )}
            <div ref={mapContainerRef} id="map-container" className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"></div>
        </div>
    );
}
export default MapView;