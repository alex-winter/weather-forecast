import React from "react";
import { WeatherForecast } from "../services/fetch-weather";
import WeatherCard from "./WeatherCard";

interface WeatherForecastProps {
    weather: WeatherForecast[] | null;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="mt-4">
            <h2 className="text-center">5-Day Weather Forecast</h2>
            <div className="row">
                {weather.map((day, index) => (
                    <WeatherCard key={index} forecast={day} />
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
