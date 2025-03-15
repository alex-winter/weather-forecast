import React from "react";
import { LocationResult } from "../services/fetch-location";

interface LocationListProps {
    locations: LocationResult[] | null;
    handleLocationSelect: (name: string) => void;
    setVisible: (isVisible: boolean) => void;
    visible: boolean;
}

const LocationList: React.FC<LocationListProps> = ({ locations, handleLocationSelect, setVisible, visible }) => {

    if (!locations || locations.length === 0 || !visible) {
        return null;
    }

    const handleClick = (name: string) => {
        handleLocationSelect(name);
        setVisible(false);
    };

    return (
        <ul className="list-group">
            {locations.map((loc) => (
                <li
                    key={loc.id}
                    className="list-group-item"
                    onClick={() => handleClick(loc.name)}
                    style={{ cursor: "pointer" }}
                >
                    {loc.name}, {loc.country}
                </li>
            ))}
        </ul>
    );
};

export default LocationList;
