// services/bikeApi.ts
import axios from 'axios';
import { Network } from '../interfaces/Network';

export interface ApiResponse {
    network: Network;
}

const BIKE_API_BASE_URL = 'https://api.citybik.es/v2/networks';

export const bikeApi = {
    /**
     * Fetches bike network data for Toronto (Bixi)
     */
    async getTorontoNetwork(): Promise<ApiResponse> {
        const response = await axios.get<ApiResponse>(`${BIKE_API_BASE_URL}/bixi-toronto`);
        return response.data;
    },
};

