import { Station } from './Station';

export interface Network {
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
