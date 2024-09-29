import { useContext } from "react";
import "./CityAirQuality.scss";
import { WeatherContext } from "../../context/WeatherContext";
import { airQuality } from "../../utils/weather.types";

function CityAirQuality() {
  const weather = useContext(WeatherContext);

  const airData = [
    {
      name: "Kohlen-monoxid",
      shortname: "co",
      unit: "(μg/m3)",
    },
    {
      name: "Stickstoff-dioxid",
      shortname: "no2",
      unit: "(μg/m3)",
    },
    {
      name: "Ozon",
      shortname: "o3",
      unit: "(μg/m3)",
    },
    {
      name: "Schwefel-dioxid",
      shortname: "so2",
      unit: "(μg/m3)",
    },
    {
      name: "Feinstaub PM2.5",
      shortname: "pm2_5",
      unit: "(μg/m3)",
    },
    {
      name: "Feinstaub PM10",
      shortname: "pm10",
      unit: "(μg/m3)",
    },
  ];

  return (
    <div className="city-airquality">
      <div className="city-airquality__header">
        <p>Luftqualität Index: {weather.weatherData.current.air_quality["us-epa-index"]} </p>
      </div>
      <div className="city-airquality__data-wrapper">
        {airData.map((data) => {
          return (
            <div className="city-airquality__data" key={data.shortname}>
              <div className="city-airquality__data-header">
                <p>{data.name}</p>
              </div>
              <div className="city-airquality__data-unit">
                <p>{data.unit}</p>
              </div>
              <div className="city-airquality__data-value">{weather.weatherData.current.air_quality[data.shortname as keyof airQuality]}</div>
            </div>
          );
        })}
      </div>
      <div className="city-airquality__description">
        <p>US-EPA standard Index: 1 gut, 2 mäßig, 3 ungesund für eine empfindliche Gruppe, 4 ungesund, 5 sehr ungesund, 6 ist gefährlich</p>
      </div>
    </div>
  );
}

export default CityAirQuality;
