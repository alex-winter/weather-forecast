import { useState, useEffect } from "react";
import { LocationResult, searchLocations } from "./services/fetch-location";
import { getWeatherForecast, WeatherForecast } from "./services/fetch-weather";
import SearchBar from "./components/SearchBar";
import LocationList from "./components/LocationList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import WeatherForecastDisplay from "./components/WeatherForecastDisplay";

function App() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<LocationResult[] | null>(null);
  const [weather, setWeather] = useState<WeatherForecast[] | null>(null);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length > 2) {
        const results = await searchLocations(query);
        setLocations(results);
        setVisible(true);
      } else {
        setLocations(null);
        setWeather(null);
      }
    };

    fetchLocations();
  }, [query]);

  const handleLocationSelect = async (name: string) => {
    setQuery(name);
    setLocations(null);

    const forecast = await getWeatherForecast(name);
    setWeather(forecast);

    setVisible(false);
  };

  return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Weather Search</h1>
        <SearchBar query={query} setQuery={setQuery} />
        <LocationList locations={locations} handleLocationSelect={handleLocationSelect} setVisible={setVisible} visible={visible} />
        <WeatherForecastDisplay weather={weather} />
      </div>
  );
}

export default App;
