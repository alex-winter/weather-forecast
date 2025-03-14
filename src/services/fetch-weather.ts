import {config} from '../config.ts'

export type WeatherForecast = {
    date: string;           // Date of the forecast
    weatherDescription: string; // Weather condition description
    temperature: {
        high: number;        // High temperature
        low: number;         // Low temperature
    };
    windSpeed: number;     // Wind speed
};

/**
 * Fetches the 5-day weather forecast for a given location.
 * @param location - The name of the location (city).
 * @returns An array of WeatherForecast objects or null if an error occurs.
 */
export async function getWeatherForecast(location: string): Promise<WeatherForecast[] | null> {
    try {
        const response = await fetch(`${config.weatherApi.forecast}?key=${config.weatherApi.apiKey}&q=${location}&days=5&aqi=no&alerts=no`);

        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        const forecast: WeatherForecast[] = data.forecast.forecastday.map((day: any) => ({
            date: day.date,
            weatherDescription: day.day.condition.text, // Weather condition description
            temperature: {
                high: day.day.maxtemp_c,  // High temperature in Celsius
                low: day.day.mintemp_c,    // Low temperature in Celsius
            },
            windSpeed: day.day.maxwind_kph, // Maximum wind speed in kph
        }));

        return forecast;
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
        return null;
    }
}
