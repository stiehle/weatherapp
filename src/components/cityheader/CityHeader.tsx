import "./CityHeader.scss";
import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";

function CityHeader() {
  const weather = useContext(WeatherContext);

  if (weather.weatherData) {
    return (
      <>
        <div className="city-header">
          <div className="city-header__location">{weather.weatherData.location.name}</div>
          <div className="city-header__wrapper">
            <img src={weather.weatherData.current.condition.icon} className="icon"></img>
            <div className="city-header__temp">{weather.weatherData.current.temp_c}</div>
          </div>
          <div className="city-header__weathertext">
            <p>{weather.weatherData.current.condition.text}</p>
          </div>

          <div className="city-header__weathertemp">
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
      <div className="city-header">
        <InfinitySpin width="180" color="#ff0000" />
      </div>
    );
  }
}

export default CityHeader;
