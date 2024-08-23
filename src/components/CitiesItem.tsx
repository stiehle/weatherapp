import { useState } from "react";
import "./CitiesItem.scss";
import { useNavigate } from "react-router-dom";
import CityItem from "./CityItem";

function CitiesItem() {
  const [cities] = useState<number[]>([576216, 2618724, 623685, 386789, 267097, 604791, 9000293, 9000433]);
  const navigate = useNavigate();

  return cities.map((city) => {
    return (
      <div className="cities-item" key={city} onClick={() => navigate("City", { state: city })}>
        <CityItem id={city} />
      </div>
    );
  });
}

export default CitiesItem;
