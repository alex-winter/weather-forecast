import { config } from '../config';

export type LocationResult = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  timezone?: string;
};

/**
 * Fetches matching locations based on a search query and removes duplicates by name.
 *
 * @param query - The location name or postal code to search for.
 * @param count - Number of results to return (default: 5).
 *
 * @returns Array of unique matching locations or null if an error occurs.
 */
export async function searchLocations(query: string, count: number = 5): Promise<LocationResult[] | null> {
  try {
    const queryParameters = new URLSearchParams({
      name: query,
      count: count.toString(),
    });

    const response = await fetch(`${config.geoLocationApi.search}?${queryParameters.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const results: LocationResult[] = data.results || [];

    const uniqueLocations = Array.from(new Map(results.map(loc => [loc.name, loc])).values());

    return uniqueLocations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
}
