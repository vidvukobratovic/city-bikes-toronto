// utils/distance.ts

/**
 * Converts degrees to radians
 */
export const deg2rad = (deg: number): number => deg * (Math.PI / 180);

/**
 * Calculates the distance between two coordinates using the Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (
    [lon1, lat1]: [number, number],
    [lon2, lat2]: [number, number]
): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

