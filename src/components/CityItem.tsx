import { useEffect, useState } from "react";
import { baseWeatherData } from "../utils/weather.types";
import { currentWeather } from "../utils/weatherapi";
import { getWeatherBackgroundImage } from "../utils/backgroundImage";
import "./CityItem.scss";
import { convertDateTime } from "../utils/convertDateTime";
// import { CitiesContext } from "../context/CitiesContext";

type cityItem = {
  id: number;
};

function CityItem({ id }: cityItem) {
  const [weatherData, setWeatherData] = useState<baseWeatherData>();
  // const mycities = useContext(CitiesContext);

  useEffect(() => {
    getCurrentWeather();
    // console.log(weatherData);
    // console.log(mycities);
    //  mycities.setCities([267097, 604791]);
    // console.log(mycities);
  }, []);

  async function getCurrentWeather() {
    let city = "id:" + id;
    // console.log(city);
    //let city = "ehingen";

    const data: baseWeatherData = await currentWeather(city);

    setWeatherData(data);
    // console.log(data);
  }

  if (weatherData) {
    return (
      <div
        className={weatherData.current.is_day === 1 ? "city-item" : "city-item city-item--night"}
        style={getWeatherBackgroundImage(weatherData.current.condition.code, weatherData.current.is_day)}>
        <div className="city-item__header">
          <div className="city-item__city-name-country">
            <h2>{weatherData.location.name}</h2>
            <h4>{weatherData.location.country}</h4>
            <p>{convertDateTime(weatherData.location.localtime)} Uhr</p>
          </div>
          <img src={weatherData.current.condition.icon} className="city-item__icon"></img>
          <div className="city-item__temp">
            <h2>{weatherData.current.temp_c.toFixed(0)}°</h2>
          </div>
        </div>
        <div className="city-item__short-info">{/* <p>{weatherData.location.localtime}</p> */}</div>
      </div>
    );
  }
}

export default CityItem;
