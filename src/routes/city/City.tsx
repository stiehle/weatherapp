import { useContext, useEffect, useState } from "react";
import { forecastWeather } from "../../utils/weatherapi";
import { weatherData } from "../../utils/weather.types";
// import { getConditionImagePath } from "../../utils/conditions";
import { WeatherContext } from "../../context/WeatherContext";
import CityNavigation from "../../components/CityNavigation";
import CityHeader from "../../components/CityHeader";
import CityInformation from "../../components/CityInformation";
import Footer from "../../components/Footer";

import "./City.scss";
import { useLocation } from "react-router-dom";
import { getWeatherBackgroundImage } from "../../utils/backgroundImage";
import { CitiesContext } from "../../context/CitiesContext";

function City() {
  const [weatherData, setWeatherData] = useState<weatherData>();
  const { state } = useLocation();

  const myCities = useContext(CitiesContext);

  useEffect(() => {
    getForecastWeather();
    showCities();
  }, []);

  function showCities() {
    console.log(state);
    console.log("--", myCities);
  }

  async function getForecastWeather() {
    let city = "ehingen";
    if (state) {
      city = "id:" + state;
    }

    const data: weatherData = await forecastWeather(city);

    setWeatherData(data);
    console.log(data);
  }

  if (weatherData) {
    return (
      <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
        <div
          className={weatherData.current.is_day === 1 ? "city" : "city city--night"}
          style={getWeatherBackgroundImage(weatherData.current.condition.code, weatherData.current.is_day)}>
          <CityNavigation />
          <CityHeader />
          <CityInformation />
          <Footer />
        </div>
      </WeatherContext.Provider>
    );
  }
}

export default City;
