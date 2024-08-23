import { useEffect, useState } from "react";
import { baseWeatherData } from "../utils/weather.types";
import { currentWeather } from "../utils/weatherapi";
import { getWeatherBackgroundImageForCity } from "../utils/backgroundImage";

import "./CityItem.scss";

type cityItem = {
  id: number;
};

function CityItem({ id }: cityItem) {
  const [weatherData, setWeatherData] = useState<baseWeatherData>();

  useEffect(() => {
    getCurrentWeather();
    // console.log(weatherData);
  }, []);

  async function getCurrentWeather() {
    let city = "id:" + id;
    // console.log(city);
    //let city = "ehingen";

    const data: baseWeatherData = await currentWeather(city);

    setWeatherData(data);
    // console.log(data);
  }

  function getCityItemInfo() {
    if (weatherData) {
      // const x = getWeatherBackgroundImageForCity(weatherData.current.condition.code, weatherData.current.is_day);
      // console.log(x);
      return (
        <div
          className={weatherData.current.is_day === 1 ? "city-item" : "city-item city-item--night"}
          style={getWeatherBackgroundImageForCity(weatherData.current.condition.code, weatherData.current.is_day)}>
          <div className="city-item__header">
            <div className="city-item__city-name-country">
              <h2>{weatherData.location.name}</h2>
              <h4>{weatherData.location.country}</h4>
            </div>
            <img src={weatherData.current.condition.icon} className="city-item__icon"></img>
            <div className="city-item__temp">
              <h1>{weatherData.current.temp_c.toFixed(0)}°</h1>
            </div>
          </div>
          <div className="city-item__short-info">Kurzinformationen</div>
        </div>
      );
      // return <div>XX</div>;
    }
  }

  //  console.log(id, name);

  // return <div>{weatherData && <p>{weatherData.current.is_day}</p>}</div>;

  return <>{getCityItemInfo()}</>;
}

export default CityItem;
