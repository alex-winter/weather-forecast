import {config} from '../config.ts'

export type WeatherForecast = {
    date: string;
    weatherDescription: string;
    temperature: {
        high: number;
        low: number;
    };
    windSpeed: number;
};

/**
 * Fetches the 5-day weather forecast for a given location.
 *
 * @param location - The name of the location (city).
 *
 * @returns An array of WeatherForecast objects or null if an error occurs.
 */
export async function getWeatherForecast(location: string): Promise<WeatherForecast[] | null> {
    try {
        const queryParameters = new URLSearchParams({
            key: config.weatherApi.apiKey,
            q: location,
            days: '5',
            aqi: 'no',
            alerts: 'no',
        });

        const response = await fetch(`${config.weatherApi.forecast}?${queryParameters.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        const forecast: WeatherForecast[] = data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            weatherDescription: day.day.condition.text,
            temperature: {
                high: day.day.maxtemp_c,
                low: day.day.mintemp_c,
            },
            windSpeed: day.day.maxwind_kph,
        }));

        return forecast;
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
        return null;
    }
}
