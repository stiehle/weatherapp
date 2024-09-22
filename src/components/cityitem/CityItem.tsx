import "./CityItem.scss";
import { useEffect, useState } from "react";
import { baseWeatherData } from "../../utils/weather.types";
import { currentWeather } from "../../utils/weatherapi";
import { getWeatherBackgroundImage } from "../../utils/backgroundImage";
import { convertDateTime } from "../../utils/convertDateTime";
import { InfinitySpin } from "react-loader-spinner";

type cityItem = {
  id: number;
};

function CityItem({ id }: cityItem) {
  const [weatherData, setWeatherData] = useState<baseWeatherData>();

  useEffect(() => {
    getCurrentWeather();
  }, []);

  async function getCurrentWeather() {
    let city = "id:" + id;

    const data: baseWeatherData = await currentWeather(city);
    console.log(data);

    setWeatherData(data);
  }

  if (weatherData) {
    return (
      <div
        className={weatherData.current.is_day === 1 ? "city-item" : "city-item city-item--night"}
        style={{ backgroundImage: `url(${getWeatherBackgroundImage(weatherData.current.condition.code, weatherData.current.is_day)})` }}>
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
      </div>
    );
  } else {
    return (
      <div className="city-item">
        <InfinitySpin width="180" color="#ff0000" />
      </div>
    );
  }
}

export default CityItem;
