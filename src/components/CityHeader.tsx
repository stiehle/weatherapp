import { useContext } from "react";
import "./CityHeader.scss";
import { WeatherContext } from "../context/WeatherContext";

import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";

function CityHeader() {
  const weather = useContext(WeatherContext);

  if (weather.weatherData) {
    return (
      <>
        <div className="city__header">
          <div className="city__header-location">{weather.weatherData.location.name}</div>
          <div className="city__header-wrapper">
            <img src={weather.weatherData.current.condition.icon} className="icon"></img>
            <div className="city__header-temp">{weather.weatherData.current.temp_c}</div>
          </div>
          <div className="city__header-weathertext">
            <p>{weather.weatherData.current.condition.text}</p>
          </div>

          <div className="city__header-weathertemp">
            <p>
              <FaTemperatureHigh />
              {weather.weatherData.forecast.forecastday[0].day.maxtemp_c}
            </p>
            <p>
              <FaTemperatureLow />
              {weather.weatherData.forecast.forecastday[0].day.mintemp_c}
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="city__header">
        <InfinitySpin width="180" color="#ff0000" />
      </div>
    );
  }
}

export default CityHeader;
