import { useEffect, useRef, useState } from "react";
import { forecastWeather } from "../../components/weatherapi";
import "./Ciity.scss";
import { weatherData, weatherDataHour } from "./weather.types";
import { getConditionImagePath } from "../../others/conditions";
// import { JSX } from "react/jsx-runtime";

export function City() {
  const [weatherData, setWeatherData] = useState<weatherData>();
  const isDay = useRef(true);

  useEffect(() => {
    getForecastWeather();
  }, []);

  async function getForecastWeather() {
    let city = "ehingen";

    const data = await forecastWeather(city);

    setWeatherData(data);
    console.log(data);
  }

  // function getPathModifiers() {
  //   let pathModifiers = "";

  //   if (isDay.current) {
  //     pathModifiers = "";
  //   } else {
  //     pathModifiers = "--night";
  //   }

  //   return pathModifiers;
  // }

  function showCurrentWeatherData() {
    if (weatherData) {
      return (
        <>
          <div className="city__header-location">{weatherData["location"].name}</div>
          <div className="city__header-wrapper">
            <img src={weatherData["current"]["condition"].icon} className="icon"></img>
            <div className="city__header-temp">{weatherData["current"].temp_c}</div>
          </div>
          <div className="city__header-weathertext">{weatherData["current"]["condition"].text}</div>
          <div className="city__header-weathertext">
            H:{weatherData["forecast"]["forecastday"][0]["day"].maxtemp_c}° T:{weatherData["forecast"]["forecastday"][0]["day"].mintemp_c}°
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>Daten werden geladen...</p>
        </>
      );
    }
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
      const seperator = dateTime.split(" ");
      const date = seperator[0].split("-");

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
        const headerText = `Heute ist der: ${date.day}.${date.month}.${date.year}.`;
        const uv = `Der UV Index beträgt: ${weatherData["current"].uv}`;
        const wind = `Wind bis zu ${weatherData["current"].wind_kph} km/h.`;
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
            <div className="city__information-overview-timeline-hour" key={hourData.time_epoch}>
              <p>{getDate(hourData.time)}</p>
              <p>{getTime(hourData.time, nowInHour)}</p>
              <img src={hourData.condition.icon} className="icon"></img>
              <p>{hourData.temp_c}°</p>
            </div>
          );
        });
      }
      // return data;
    }

    function getInformationForecastHeader() {
      if (weatherData) {
        return "Vorhersage für die nächsten " + `${weatherData["forecast"]["forecastday"].length}` + " Tage";
      }
    }

    function getInformationForecastItems() {
      type items = {
        id: number;
        day: string;
        icon: string;
      };

      let data: items[] = [];

      if (weatherData) {
        const forecastDays = weatherData["forecast"].forecastday;
        console.log(forecastDays);
        const now = new Date().toLocaleString("de-DE", { weekday: "short" });
        console.log(now);

        forecastDays.forEach((element, id) => {
          let shortWeekDay = new Date(element.date).toLocaleString("de-DE", { weekday: "short" });
          const icon = element.day.condition.icon;
          console.log(element);

          if (shortWeekDay === now) {
            shortWeekDay = "Heute";
          }

          const dayObj = {
            id: id,
            day: shortWeekDay,
            icon: icon,
          };

          data.push(dayObj);
        });
      }

      console.log(data);

      return data.map((day) => {
        return (
          <div className="city__information-forecast-items-day" key={day.id}>
            <p>{day.day}</p>
            <img src={day.icon} className="icon"></img>
          </div>
        );
      });
    }

    return (
      <>
        <div className="city__information-overview">
          <div className="city__information-overview-header">{getHeaderText()}</div>
          <div className="city__information-overview-timeline">{getForcastHour()}</div>
        </div>
        <div className="city__information-forecast">
          <div className="city__information-forecast-header">
            <p>{getInformationForecastHeader()}</p>
          </div>
          <div className="city__information-forecast-items">{getInformationForecastItems()}</div>
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
    <div className={isDay.current ? "city" : "city city--night"} style={getWeatherBackgroundImage()}>
      <div className="city__navigation"></div>
      <div className="city__header">{showCurrentWeatherData()}</div>
      <div className="city__information">{showCityInformation()}</div>
    </div>
  );
}

export default City;
