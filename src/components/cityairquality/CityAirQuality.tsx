import { useContext } from "react";
import "./CityAirQuality.scss";
import { WeatherContext } from "../../context/WeatherContext";
import { airQuality } from "../../utils/weather.types";

function CityAirQuality() {
  const weather = useContext(WeatherContext);

  const airData = [
    {
      name: "Kohlen-monoxid",
      // object: weather.weatherData.current.air_quality.co,
      shortname: "co",
      unit: "(μg/m3)",
    },
    {
      name: "Stickstoff-dioxid",
      // object: weather.weatherData.current.air_quality.no2,
      shortname: "no2",
      unit: "(μg/m3)",
    },
    {
      name: "Ozon",
      // object: weather.weatherData.current.air_quality.o3,
      shortname: "o3",
      unit: "(μg/m3)",
    },
    {
      name: "Schwefel-dioxid",
      // object: weather.weatherData.current.air_quality.so2,
      shortname: "so2",
      unit: "(μg/m3)",
    },
    {
      name: "Feinstaub PM2.5",
      // object: weather.weatherData.current.air_quality.pm2_5,
      shortname: "pm2_5",
      unit: "(μg/m3)",
    },
    {
      name: "Feinstaub PM10",
      // object: weather.weatherData.current.air_quality.pm10,
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
            // <div className="city-airquality__data-wrapper">
            <div className="city-airquality__data" key={data.shortname}>
              <div className="city-airquality__data-header">
                <p>{data.name}</p>
              </div>
              <div className="city-airquality__data-unit">
                <p>{data.unit}</p>
              </div>
              <div className="city-airquality__data-value">
                {/* {weather.weatherData.current.air_quality.co} */}
                {/* {data.object} */}
                {/* {weather.weatherData.current.air_quality[data.shortname as keyof typeof weather.weatherData.current.air_quality]} */}
                {/* {weather.weatherData.current.air_quality[data.shortname as keyof typeof CityAirQuality]} */}
                {weather.weatherData.current.air_quality[data.shortname as keyof airQuality]}
              </div>
            </div>
            // </div>
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
