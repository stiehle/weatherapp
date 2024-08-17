import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { weatherData, weatherDataTypes } from "../routes/city/weather.types";
import { forecastWeather } from "../others/weatherapi";

function TestContext() {
  const wd = useContext(WeatherContext);
  console.log(wd);

  // async function getForecastWeather() {
  //   let city = "china";

  //   const data: weatherData = await forecastWeather(city);

  //   wd.setWd(data);

  //   wd.setWd(weatherDataTypes);
  //   console.log(data);
  //   console.log(wd.wd);
  // }

  // getForecastWeather();

  // console.log();

  return (
    <>
      <div>"Hallo" {wd.wd.location.name}</div>
    </>
  );
}

export default TestContext;
