import { useEffect, useRef, useState } from "react";
import { forecastWeather } from "../../components/weatherapi";
import "./Ciity.scss";
import { weatherData, weatherDataHour } from "./weather.types";
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
      // console.log(weatherData);
      // console.log(weatherData?.forecast["forecastday"][0].day.maxtemp_c);
      // console.log(weatherData?.forecast["forecastday"][2].hour[21].dewpoint_c);
      // console.log(isDay.current);

      return (
        <>
          <div className="city__header-location">{weatherData["location"].name}</div>
          <div className="city__header-wrapper">
            <img src={weatherData["current"]["condition"].icon} className="icon"></img>
            <div className={"city__header-temp" + getPathModifiers()}>{weatherData["current"].temp_c}</div>
          </div>
          <div className={"city__header-weathertext" + getPathModifiers()}>{weatherData["current"]["condition"].text}</div>
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
    // let data: JSX.Element[] = [];

    function getTime(dateTime: string, nowInHour: number) {
      const time = dateTime.split(" ")[1];
      const date = dateTime.split(" ")[0];
      const now = new Date().getDate();
      // console.log(time, date, now);

      if (Number(time.split(":")[0]) === nowInHour && Number(date.split("-")[2]) === now) {
        return "Jetzt";
      } else {
        return time;
      }
    }

    function getDate(dateTime: string) {
      const time = dateTime.split(" ");
      // console.log(time[0], time[1]);
      const date = time[0].split("-");
      // console.log(date);

      return date[2] + "." + date[1];
    }

    function getHeaderText() {
      const now = new Date();

      const date = {
        year: now.getFullYear(),
        month: String(now.getMonth() + 1).padStart(2, "0"),
        day: String(now.getDate()).padStart(2, "0"),
      };
      if (weatherData) {
        const headerText = `Heute ist der: ${date.day}.${date.month}.${date.year}`;
        const uv = `Der UV Index beträgt: ${weatherData["current"].uv}`;
        const wind = `Wind bis zu ${weatherData["current"].wind_kph} km/h`;
        return (
          <>
            <p>{headerText}</p>
            <p>
              {uv}, {wind}
            </p>
          </>
        );
      }
    }

    function getForcastHour() {
      const forecastHours = 48;
      // const newForcastHours = [];

      const nowInHour = new Date().getHours();
      // console.log(nowInHour);
      const allForecastHours: weatherDataHour[] = [];
      // let hours: {} = {};

      if (weatherData) {
        const forecastDays = weatherData["forecast"].forecastday;
        console.log(forecastDays);

        forecastDays.forEach((element) => {
          const forecastHours = element.hour;

          forecastHours.forEach((allHours) => {
            // console.log(allHours);
            allForecastHours.push(allHours);
          });
        });

        // console.log(allForecastHours);
      }
      const newForcastHours = allForecastHours.slice(nowInHour, nowInHour + forecastHours);
      // console.log(newForcastHours);

      // return weatherData["forecast"].forecastday[0].hour.map((hourData) => {

      if (weatherData) {
        return newForcastHours.map((hourData) => {
          // console.log(hourData, weatherData["forecast"].forecastday[0].hour);
          //  <div>{hourData.time.split(" ")[1]}</div>
          return (
            <div className="city__information-timeline-hour" key={hourData.time_epoch}>
              <div className={"city__information-timeline-text" + getPathModifiers()}>{getDate(hourData.time)}</div>
              <div className={"city__information-timeline-text" + getPathModifiers()}>{getTime(hourData.time, nowInHour)}</div>
              <img src={hourData.condition.icon} className="icon"></img>
              <div className={"city__information-timeline-text" + getPathModifiers()}>{hourData.temp_c}°</div>
            </div>
          );
        });
      }
      // return data;
    }
    return (
      <>
        <div className="city__information-overview">
          <div className="city__information-header">
            <div className={"city__information-header-text" + getPathModifiers()}>{getHeaderText()}</div>
          </div>
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
      // console.log(conditionImagePath, isDay);

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
