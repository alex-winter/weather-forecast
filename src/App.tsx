import { useState, useEffect } from "react";
import { LocationResult, searchLocations } from "./services/fetch-location";
import { getWeatherForecast, WeatherForecast } from "./services/fetch-weather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faWind, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React from "react";
import { format, parseISO } from "date-fns";

function App() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<LocationResult[] | null>(null);
  const [weather, setWeather] = useState<WeatherForecast[] | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length > 2) {
        const results = await searchLocations(query);
        setLocations(results);
      } else {
        setLocations(null);
        setWeather(null); // Clear weather when query is empty
      }
    };

    fetchLocations();
  }, [query]);

  const handleLocationSelect = async (name: string) => {
    setQuery(name); // Set the input to the selected location name
    setLocations(null); // Clear the list after selection

    const forecast = await getWeatherForecast(name); // Fetch the weather forecast using the selected location
    setWeather(forecast); // Set the weather forecast in state
  };

  // Function to map weather description to Font Awesome icons
  const getWeatherIcon = (description: string) => {
    const text = description.trim().toLowerCase()

    if (text.includes('rain')) {
      return <FontAwesomeIcon className="weather-icon" icon={faCloudRain} />;
    }

    if (text.includes('snow')) {
      return <FontAwesomeIcon className="weather-icon" icon={faSnowflake} />;
    }

    if (text.includes('cloud')) {
      return <FontAwesomeIcon className="weather-icon" icon={faCloud} />;
    }

    if (text.includes('sun')) {
      return <FontAwesomeIcon className="weather-icon" icon={faSun} />;
    }

    return <FontAwesomeIcon className="weather-icon" icon={faCloud} />;
  };

  return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Weather Search</h1>
        <div className="input-group mb-3">
          <input
              type="text"
              className="form-control"
              placeholder="Enter a location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => setQuery(query)}>
            Search
          </button>
        </div>
        {locations && locations.length > 0 ? (
            <ul className="list-group">
              {locations.map((loc) => (
                  <li
                      key={loc.id}
                      className="list-group-item"
                      onClick={() => handleLocationSelect(loc.name)} // Select location on click
                      style={{ cursor: "pointer" }}
                  >
                    {loc.name}, {loc.country}
                  </li>
              ))}
            </ul>
        ) : (
            query.length > 2 && <p className="text-center">No results found</p>
        )}
        {weather && (
            <div className="mt-4">
              <h2 className="text-center">5-Day Weather Forecast</h2>
              <div className="row">
                {weather.map((day, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{format(parseISO(day.date), "EEEE, MMM d")}</h5>
                          <p className="card-text text-center">
                            {getWeatherIcon(day.weatherDescription)}<br />
                            <strong>{day.weatherDescription}</strong><br />
                            <FontAwesomeIcon icon={faArrowUp} /> {day.temperature.high}°C<br />
                            <FontAwesomeIcon icon={faArrowDown} /> {day.temperature.low}°C<br />
                            <FontAwesomeIcon icon={faWind} /> {day.windSpeed} km/h
                          </p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
}

export default App;
