// services/bikeApi.ts
import axios from 'axios';
import { Network } from '../interfaces/Network';

export interface ApiResponse {
    network: Network;
}

const BIKE_API_BASE_URL = 'https://api.citybik.es/v2/networks';
// Use backend if VITE_BACKEND_URL is set, otherwise use direct API
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || null;

export const bikeApi = {
    /**
     * Fetches bike network data for Toronto (Bixi)
     * Uses backend if VITE_BACKEND_URL is configured, otherwise calls API directly
     */
    async getTorontoNetwork(): Promise<ApiResponse> {
        if (BACKEND_URL) {
            // Use backend proxy
            const response = await axios.get<ApiResponse>(`${BACKEND_URL}/api/bikes/toronto`);
            return response.data;
        } else {
            // Use direct API call
            const response = await axios.get<ApiResponse>(`${BIKE_API_BASE_URL}/bixi-toronto`);
            return response.data;
        }
    },
};

