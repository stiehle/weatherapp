import { useState } from "react";
import "./CityItems.scss";

function CitiesItem() {
  const [cities] = useState<number[]>([576216, 623685, 386789, 267097, 604791, 9000293, 9000433]);

 
  return cities.map((city) => {
    return (
      <div className="city-item" key={city}>
        {city}
      </div>
    );
  });
}

export default CitiesItem;
