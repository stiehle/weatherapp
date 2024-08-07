import { useEffect, useState } from "react";
import { forecastWeather, searchCity } from "../../components/weatherapi";
import "./Ciity.scss";
import { weatherData } from "./weather.types";
import background from "../../../public/conditionImages/conditionImages/day/ice_pellets.jpg";

export function City() {
  // const [currentWeatherData, setCurrentWeatherData] = useState<weatherData>();
  const [currentWeatherData, setCurrentWeatherData] = useState<weatherData>();

  useEffect(() => {
    getForecastWeather();
  }, []);

  async function getForecastWeather() {
    let city = "Ehingen";
    // const { current, location, forecast } = await forecastWeather(city);
    const data = await forecastWeather(city);
    // console.log(current, location);

    // setCurrentWeatherData({ current, location, forecast });
    // console.log(current, location, forecast);
    setCurrentWeatherData(data);
    console.log(data);
    // console.log(currentWeatherData);
    // return data;
  }

  async function getCities() {
    const city = "Ehingen";
    const cities = await searchCity(city);
    console.log(cities, cities[0].id);
  }

  function showCurrentWeatherData() {
    // console.log(currentWeatherData?.name, currentWeatherData?.lat);
    if (currentWeatherData) {
      console.log(currentWeatherData);

      console.log(currentWeatherData?.forecast["forecastday"][0].day.maxtemp_c);
      console.log(currentWeatherData?.forecast["forecastday"][2].hour[21].dewpoint_c);
      return (
        <>
          <div className="city__header-location">{currentWeatherData["location"].name}</div>
          <div className="city__header-temp">{currentWeatherData["current"].temp_c}</div>
          <div className="city__header-weathertext">{currentWeatherData["current"]["condition"].text}</div>
        </>
      );
    } else {
      return (
        <>
          <p>Daten werden geladen...</p>
        </>
      );
    }
    // console.log(currentWeatherData);
  }

  function getWeatherBackgroundImage() {
    const image = "partly_cloudy_day.jpg";
    // const image = "rain_day.jpg";
    const dayOrNight = "day";
    const imagePath = `./conditionImages/conditionImages/${dayOrNight}/${image}`;

    return { backgroundImage: `url(${imagePath})` };
  }
  // <div className="city" style={{ backgroundImage: `url(${getBackgroundImage()})` }}></div>
  return (
    <div className="city" style={getWeatherBackgroundImage()}>
      <div className="city__navigation"></div>
      <div className="city__header">{showCurrentWeatherData()}</div>
      <div className="city__information"></div>
    </div>
  );
}

export default City;
