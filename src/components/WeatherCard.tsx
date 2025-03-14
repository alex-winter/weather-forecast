import React from "react";
import { WeatherForecast } from "../services/fetch-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faWind } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";
import getWeatherIcon from "./WeatherIcon";

interface WeatherCardProps {
    forecast: WeatherForecast;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{format(parseISO(forecast.date), "EEEE, MMM d")}</h5>
                    <p className="card-text text-center">
                        {getWeatherIcon(forecast.weatherDescription)}<br />
                        <strong>{forecast.weatherDescription}</strong><br />
                        <FontAwesomeIcon icon={faArrowUp} /> {forecast.temperature.high}°C<br />
                        <FontAwesomeIcon icon={faArrowDown} /> {forecast.temperature.low}°C<br />
                        <FontAwesomeIcon icon={faWind} /> {forecast.windSpeed} km/h
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
