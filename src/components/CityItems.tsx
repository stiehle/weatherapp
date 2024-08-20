import { useState } from "react";
import "./CityItems.scss";

function CitiesItem() {
<<<<<<< HEAD
  const [cities, setCities] = useState<number[]>([576216, 623685, 386789, 267097, 604791, 9000293, 9000433]);

=======
  const [cities] = useState<number[]>([576216, 623685, 386789, 267097, 604791, 9000293, 9000433]);

 
>>>>>>> 11d8fd30e0dc1a538b67288c3e8ede81a9b1ee9e
  return cities.map((city) => {
    return (
      <div className="city-item" key={city}>
        {city}
      </div>
    );
  });
}

export default CitiesItem;
