import { useState, useEffect } from "react";
import { LocationResult, searchLocations } from "./services/fetch-location";
import { getWeatherForecast, WeatherForecast } from "./services/fetch-weather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faWind } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React from "react";

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
    switch (description.toLowerCase()) {
      case 'sunny':
        return <FontAwesomeIcon icon={faSun} />;
      case 'cloudy':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'rain':
      case 'showers':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 'windy':
        return <FontAwesomeIcon icon={faWind} />;
      default:
        return <FontAwesomeIcon icon={faCloud} />;
    }
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
                    <div key={index} className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{day.date}</h5>
                          <p className="card-text">
                            {getWeatherIcon(day.weatherDescription)} <strong>{day.weatherDescription}</strong><br />
                            High: {day.temperature.high}°C<br />
                            Low: {day.temperature.low}°C<br />
                            {getWeatherIcon('Wind Speed')} Wind Speed: {day.windSpeed} km/h
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
