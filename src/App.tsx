import { useState, useEffect } from "react";
import {LocationResult, searchLocations} from "./services/fetch-location";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React from "react";

function App() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<LocationResult[]|null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length > 2) {
        const results = await searchLocations(query);
        setLocations(results as LocationResult[]);
      } else {
        setLocations(null);
      }
    };

    fetchLocations();
  }, [query]);

  // Function to handle location selection
  const handleLocationSelect = (name: string) => {
    setQuery(name); // Set the input to the selected location name
    setLocations(null); // Clear the list after selection
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
                      onClick={() => handleLocationSelect(`${loc.name}, ${loc.country}`)}
                      style={{ cursor: "pointer" }}
                  >
                    {loc.name}, {loc.country}
                  </li>
              ))}
            </ul>
        ) : (
            query.length > 2 && <p className="text-center">No results found</p>
        )}
      </div>
  );
}

export default App;
