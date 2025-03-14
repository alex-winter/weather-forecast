import { useState, useEffect } from "react";
import { searchLocations } from "./services/fetch-location";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    if (query.length > 2) {
      const fetchLocations = async () => {
        const results = await searchLocations(query);
        setLocations(results);
      };
      fetchLocations();
    } else {
      setLocations(null);
    }
  }, [query]);

  return (
      <div className="container">
        <h1>Weather Search</h1>
        <input
            type="text"
            placeholder="Enter a location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        {locations && (
            <ul>
              {locations.map((loc) => (
                  <li key={loc.id}>
                    {loc.name}, {loc.country} ({loc.latitude}, {loc.longitude})
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}

export default App;
