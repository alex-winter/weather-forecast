import React from "react";
import { LocationResult } from "../services/fetch-location";

interface LocationListProps {
    locations: LocationResult[] | null;
    handleLocationSelect: (name: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({ locations, handleLocationSelect }) => {
    if (!locations || locations.length === 0) return null;

    return (
        <ul className="list-group">
            {locations.map((loc) => (
                <li
                    key={loc.id}
                    className="list-group-item"
                    onClick={() => handleLocationSelect(loc.name)}
                    style={{ cursor: "pointer" }}
                >
                    {loc.name}, {loc.country}
                </li>
            ))}
        </ul>
    );
};

export default LocationList;
