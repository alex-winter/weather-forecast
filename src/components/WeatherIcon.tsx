import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudRain, faSnowflake, faWind } from "@fortawesome/free-solid-svg-icons";

const getWeatherIcon = (description: string) => {
    const text = description.trim().toLowerCase();

    if (text.includes("rain")) return <FontAwesomeIcon className="weather-icon" icon={faCloudRain} />;
    if (text.includes("snow")) return <FontAwesomeIcon className="weather-icon" icon={faSnowflake} />;
    if (text.includes("cloud")) return <FontAwesomeIcon className="weather-icon" icon={faCloud} />;
    if (text.includes("sun")) return <FontAwesomeIcon className="weather-icon" icon={faSun} />;

    return <FontAwesomeIcon className="weather-icon" icon={faCloud} />;
};

export default getWeatherIcon;
