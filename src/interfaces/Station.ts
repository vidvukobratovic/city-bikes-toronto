import { Extra } from './Extra';

export interface Station {
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
