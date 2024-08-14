import { useEffect, useState } from "react";
import { forecastWeather } from "../../others/weatherapi";
import "./City.scss";
import { weatherData, weatherDataHour } from "./weather.types";
import { getConditionImagePath } from "../../others/conditions";
// import { JSX } from "react/jsx-runtime";

export function City() {
  const [weatherData, setWeatherData] = useState<weatherData>();
  // const isDay = useRef(true);

  useEffect(() => {
    getForecastWeather();
  }, []);

  async function getForecastWeather() {
    let city = "ehingen";

    const data = await forecastWeather(city);

    setWeatherData(data);
    console.log(data);
  }

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
    function getDateAndTime(dateTime: string) {
      const seperator = dateTime.split(" ");
      const date = seperator[0].split("-");
      const time = seperator[1].split(":");

      const dateAndTime = {
        day: date[2],
        month: date[1],
        hour: time[0],
        minute: time[1],
      };

      return dateAndTime;
    }

    function getTimelineHour(dateTime: string, localDateTime: string) {
      const dateTimeTimeline = getDateAndTime(dateTime);
      const localTime = getDateAndTime(localDateTime);
      // console.log(dateTimeTimeline, localTime);

      return (
        <>
          <p>
            {dateTimeTimeline.day}.{dateTimeTimeline.month}
          </p>
          <p>{localTime.hour === dateTimeTimeline.hour ? "Jetzt" : `${dateTimeTimeline.hour + ":" + dateTimeTimeline.minute}`}</p>
        </>
      );
    }

    function getHeaderText() {
      if (weatherData) {
        // const headerText = `Heute ist der: ${date.day}.${date.month}.${date.year}.`;
        const uv = `Der UV Index beträgt: ${weatherData["current"].uv}`;
        const wind = `Wind bis zu ${weatherData["current"].wind_kph} km/h.`;
        return (
          <>
            {/* <p>{headerText}</p> */}
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

      // const nowInHour = new Date().getHours();

      // console.log(nowInHour);
      const allForecastHours: weatherDataHour[] = [];
      // let hours: {} = {};

      if (weatherData) {
        // console.log(nowInHour_2);
        const forecastDays = weatherData["forecast"].forecastday;
        // console.log(forecastDays);

        forecastDays.forEach((element) => {
          const forecastHours = element.hour;

          forecastHours.forEach((allHours) => {
            // console.log(allHours);
            allForecastHours.push(allHours);
          });
        });

        // console.log(allForecastHours);
      }

      // console.log(newForcastHours);

      // return weatherData["forecast"].forecastday[0].hour.map((hourData) => {

      if (weatherData) {
        const nowInHourByLocation = Number(getDateAndTime(weatherData.location.localtime).hour);
        const newForcastHours = allForecastHours.slice(nowInHourByLocation, nowInHourByLocation + forecastHours);
        // const newForcastHours2 = allForecastHours;

        return newForcastHours.map((hourData) => {
          // console.log(hourData, weatherData["forecast"].forecastday[0].hour);
          //  <div>{hourData.time.split(" ")[1]}</div>
          return (
            <div className="city__information-overview-timeline-hour" key={hourData.time_epoch}>
              {getTimelineHour(hourData.time, weatherData.location.localtime)}
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
        const locationNow = new Date(weatherData.location.localtime).getDate();

        forecastDays.forEach((element, id) => {
          let shortWeekDay = new Date(element.date).toLocaleString("de-DE", { weekday: "short" });
          const icon = element.day.condition.icon;

          if (new Date(element.date).getDate() === locationNow) {
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
      <div className={weatherData.current.is_day === 1 ? "city" : "city city--night"} style={getWeatherBackgroundImage()}>
        <div className="city__navigation"></div>
        <div className="city__header">{showCurrentWeatherData()}</div>
        <div className="city__information">{showCityInformation()}</div>
      </div>
    );
  }
}

export default City;
