import { useEffect, useRef, useState } from "react";
import { forecastWeather } from "../../components/weatherapi";
import "./Ciity.scss";
import { weatherData } from "./weather.types";
import { getConditionImagePath } from "../../others/conditions";
// import { JSX } from "react/jsx-runtime";

export function City() {
  // const [currentWeatherData, setCurrentWeatherData] = useState<weatherData>();
  const [weatherData, setWeatherData] = useState<weatherData>();
  const isDay = useRef(true);

  useEffect(() => {
    getForecastWeather();
  }, []);

  async function getForecastWeather() {
    let city = "ehingen";
    // const { current, location, forecast } = await forecastWeather(city);
    const data = await forecastWeather(city);
    // console.log(current, location);

    // setCurrentWeatherData({ current, location, forecast });
    // console.log(current, location, forecast);
    setWeatherData(data);
    console.log(data);
    // console.log(currentWeatherData);
    // return data;
  }

  // async function getCities() {
  //   const city = "Ehingen";
  //   const cities = await searchCity(city);
  //   console.log(cities, cities[0].id);
  // }

  function getPathModifiers() {
    let pathModifiers = "";

    if (isDay.current) {
      pathModifiers = "";
    } else {
      pathModifiers = "--night";
    }

    return pathModifiers;
  }

  function showCurrentWeatherData() {
    // console.log(currentWeatherData?.name, currentWeatherData?.lat);
    if (weatherData) {
      console.log(weatherData);
      console.log(weatherData?.forecast["forecastday"][0].day.maxtemp_c);
      console.log(weatherData?.forecast["forecastday"][2].hour[21].dewpoint_c);
      console.log(isDay.current);

      const pathModifiers = getPathModifiers();
      return (
        <>
          <div className="city__header-location">{weatherData["location"].name}</div>
          <div className="city__header-wrapper">
            <img src={weatherData["current"]["condition"].icon} className="icon"></img>
            <div className={"city__header-temp" + pathModifiers}>{weatherData["current"].temp_c}</div>
          </div>
          <div className={"city__header-weathertext" + pathModifiers}>{weatherData["current"]["condition"].text}</div>
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

  function showCityInformation() {
    function getForcastHour() {
      // let data: JSX.Element[] = [];

      if (weatherData) {
        return weatherData["forecast"].forecastday[0].hour.map((hour) => {
          console.log(hour);
          return (
            <div className="city__information-timeline-hour">
              <div>ABC</div>
              <img src={hour.condition.icon} className="icon"></img>
              <div>{hour.temp_c}°</div>
            </div>
          );
        });
      }
      // return data;
    }
    return (
      <>
        <div className="city__information-overview">
          <div className="city__information-header">Header</div>
          <div className="city__information-timeline">{getForcastHour()}</div>
        </div>
      </>
    );
  }

  function getWeatherBackgroundImage() {
    if (weatherData) {
      const conditionCode = weatherData["current"]["condition"].code;
      if (weatherData["current"].is_day === 1) {
        isDay.current = true;
      } else isDay.current = false;

      const conditionImagePath = getConditionImagePath(conditionCode, !isDay.current);
      console.log(conditionImagePath, isDay);

      if (conditionImagePath) {
        return { backgroundImage: `url(${conditionImagePath})` };
      } else {
        return { backgroundColor: "#220044" };
      }
    }

    // const image = "partly_cloudy_day.jpg";
    // // const image = "rain_day.jpg";
    // const dayOrNight = "day";
    // const imagePath = `./conditionImages/${dayOrNight}/${image}`;
    return { backgroundImage: `url(${getConditionImagePath})` };
  }
  // <div className="city" style={{ backgroundImage: `url(${getBackgroundImage()})` }}></div>
  return (
    <div className="city" style={getWeatherBackgroundImage()}>
      <div className="city__navigation"></div>
      <div className="city__header">{showCurrentWeatherData()}</div>
      <div className="city__information">{showCityInformation()}</div>
    </div>
  );
}

export default City;
