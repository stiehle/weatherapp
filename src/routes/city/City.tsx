import { useEffect, useState } from "react";
import { forecastWeather } from "../../utils/weatherapi";
import { weatherData } from "../../utils/weather.types";
import { getConditionImagePath } from "../../utils/conditions";
import { WeatherContext } from "../../context/WeatherContext";
import CityNavigation from "../../components/CityNavigation";
import CityHeader from "../../components/CityHeader";
import CityInformation from "../../components/CityInformation";
import Footer from "../../components/Footer";

import "./City.scss";
import { useLocation } from "react-router-dom";

function City() {
  const [weatherData, setWeatherData] = useState<weatherData>();
  const { state } = useLocation();
  // console.log(weatherData?.location.name);
  // const isDay = useRef(true);

  console.log(state);

  useEffect(() => {
    getForecastWeather();
    // console.log(weatherData);
  }, []);

  async function getForecastWeather() {
    let city = "id:" + state;
    // console.log(city);
    //let city = "ehingen";

    const data: weatherData = await forecastWeather(city);

    setWeatherData(data);
    console.log(data);
  }

  function getWeatherBackgroundImage() {
    if (weatherData) {
      const conditionCode = weatherData.current.condition.code;

      let isDay: boolean = false;
      if (weatherData.current.is_day === 1) {
        isDay = true;
      }

      const conditionImagePath = getConditionImagePath(conditionCode, !isDay);
      // console.log(conditionImagePath, isDay);

      if (conditionImagePath) {
        return { backgroundImage: `url(${conditionImagePath})` };
      } else {
        return { backgroundColor: "#220044" };
      }
    }
  }

  if (weatherData) {
    return (
      <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
        <div className={weatherData.current.is_day === 1 ? "city" : "city city--night"} style={getWeatherBackgroundImage()}>
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
