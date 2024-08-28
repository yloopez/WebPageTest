import { fetchTours } from './database';
import { Tour } from './types';

let cachedTours: Tour[] = [];

export async function initializeCache(): Promise<void> {
    if (cachedTours.length === 0) {
        try {
            cachedTours = await fetchTours();
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    }
}

export function getCachedTours(): Tour[] {
    return cachedTours;
}

export function findTourByName(name: string): Tour | undefined {
    return cachedTours.find(tour => tour.TOUR_NAME.toLowerCase() === name.toLowerCase());
}
