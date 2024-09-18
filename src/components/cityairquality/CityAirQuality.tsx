import { useContext } from "react";
import "./CityAirQuality.scss";
import { WeatherContext } from "../../context/WeatherContext";

function CityAirQuality() {
  const weather = useContext(WeatherContext);
  return (
    <div className="city-airquality">
      <div className="city-airquality__header">
        <p>Luftqualität Index: {weather.weatherData.current.air_quality["us-epa-index"]} </p>
      </div>
      <div className="city-airquality__data-wrapper">
        <div className="city-airquality__data">
          <div className="city-airquality__data-header">
            <p>Kohlen-monoxid</p>
          </div>
          <div className="city-airquality__data-unit">
            <p>(μg/m3)</p>
          </div>
          <div className="city-airquality__data-value">{weather.weatherData.current.air_quality.co}</div>
        </div>
        <div className="city-airquality__data">
          <div className="city-airquality__data-header">
            <p>Stickstoff-dioxid</p>
          </div>
          <div className="city-airquality__data-unit">
            <p>(μg/m3)</p>
          </div>
          <div className="city-airquality__data-value">{weather.weatherData.current.air_quality.no2}</div>
        </div>
        <div className="city-airquality__data">
          <div className="city-airquality__data-header">
            <p>Ozon</p>
          </div>
          <div className="city-airquality__data-unit">
            <p>(μg/m3)</p>
          </div>
          <div className="city-airquality__data-value">{weather.weatherData.current.air_quality.o3}</div>
        </div>
        <div className="city-airquality__data">
          <div className="city-airquality__data-header">
            <p>Schwefel-dioxid</p>
          </div>
          <div className="city-airquality__data-unit">
            <p>(μg/m3)</p>
          </div>
          <div className="city-airquality__data-value">{weather.weatherData.current.air_quality.so2}</div>
        </div>
        <div className="city-airquality__data">
          <div className="city-airquality__data-header">
            <p>Feinstaub PM2.5</p>
          </div>
          <div className="city-airquality__data-unit">
            <p>(μg/m3)</p>
          </div>
          <div className="city-airquality__data-value">{weather.weatherData.current.air_quality.pm2_5}</div>
        </div>
        <div className="city-airquality__data">
          <div className="city-airquality__data-header">
            <p>Feinstaub PM10</p>
          </div>
          <div className="city-airquality__data-unit">
            <p>(μg/m3)</p>
          </div>
          <div className="city-airquality__data-value">{weather.weatherData.current.air_quality.pm10}</div>
        </div>
      </div>
      <div className="city-airquality__description">
        <p>US-EPA standard Index: 1 gut, 2 mäßig, 3 ungesund für eine empfindliche Gruppe, 4 ungesund, 5 sehr ungesund, 6 ist gefährlich</p>
      </div>
    </div>
  );
}

export default CityAirQuality;
