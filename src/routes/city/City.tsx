import { useEffect, useState } from "react";
import { forecastWeather } from "../../others/weatherapi";
import { weatherData } from "./weather.types";
import { getConditionImagePath } from "../../others/conditions";
import { WeatherContext } from "../../context/WeatherContext";
import CityNavigation from "../../components/CityNavigation";
import CityHeader from "../../components/CityHeader";
import CityInformation from "../../components/CityInformation";
import Footer from "../../components/Footer";

import "./City.scss";

export function City() {
  const [weatherData, setWeatherData] = useState<weatherData>();
  // console.log(weatherData?.location.name);
  // const isDay = useRef(true);

  useEffect(() => {
    getForecastWeather();
    // console.log(weatherData);
  }, []);

  async function getForecastWeather() {
    let city = "Ehingen";

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

    return { backgroundImage: `url(${getConditionImagePath})` };
  }
  // <div className="city" style={{ backgroundImage: `url(${getBackgroundImage()})` }}></div>

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
