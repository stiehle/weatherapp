import "./CityInformation.scss";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { weatherDataHour } from "../utils/weather.types.ts";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { convertTime } from "../utils/convertTime.ts";
import CityAirQuality from "./CityAirQuality.tsx";

function CityInformation() {
  const weather = useContext(WeatherContext);

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
    if (weather.weatherData) {
      const uv = `Der UV Index beträgt: ${weather.weatherData.current.uv}`;
      const wind = `Wind bis zu ${weather.weatherData.current.wind_kph} km/h.`;
      return (
        <>
          <p>{uv}</p>
          <p>{wind}</p>
        </>
      );
    }
  }

  function getForcastHour() {
    const forecastHours = 48;

    const allForecastHours: weatherDataHour[] = [];

    if (weather.weatherData) {
      const forecastDays = weather.weatherData.forecast.forecastday;

      forecastDays.forEach((element) => {
        const forecastHours = element.hour;

        forecastHours.forEach((allHours) => {
          allForecastHours.push(allHours);
        });
      });
    }

    if (weather.weatherData) {
      const nowInHourByLocation = Number(getDateAndTime(weather.weatherData.location.localtime).hour);
      const newForcastHours = allForecastHours.slice(nowInHourByLocation, nowInHourByLocation + forecastHours);

      return newForcastHours.map((hourData) => {
        return (
          <div className="city-information__overview-timeline-hour" key={hourData.time_epoch}>
            {getTimelineHour(hourData.time, weather.weatherData.location.localtime)}
            <img src={hourData.condition.icon} className="icon"></img>
            <p>{hourData.temp_c}°</p>
          </div>
        );
      });
    }
  }

  function getInformationForecastHeader() {
    if (weather.weatherData) {
      return "Vorhersage für die nächsten " + `${weather.weatherData.forecast.forecastday.length}` + " Tage";
    }
  }

  function getInformationForecastItems() {
    type items = {
      id: number;
      day: string;
      icon: string;
      astro: { sunrise: string; sunset: string };
      temp: { max: number; min: number };
    };

    let data: items[] = [];

    if (weather.weatherData) {
      const forecastDays = weather.weatherData.forecast.forecastday;
      const locationNow = new Date(weather.weatherData.location.localtime).getDate();

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
          astro: { sunrise: convertTime(element.astro.sunrise), sunset: convertTime(element.astro.sunset) },
          temp: { max: element.day.maxtemp_c, min: element.day.mintemp_c },
        };

        data.push(dayObj);
      });
    }

    return data.map((day) => {
      return (
        <div className="city-information__forecast-day" key={day.id}>
          <p>{day.day}</p>
          <img src={day.icon} className="icon"></img>
          <div className="city-information__forecast-wrapper">
            <div className="city-information__forecast-astro">
              <p>
                <FiSunrise /> {day.astro.sunrise} Uhr
              </p>
              <p>
                <FiSunset /> {day.astro.sunset} Uhr
              </p>
            </div>
            <div className="city-information__forecast-temperatur">
              <p>
                <FaTemperatureHigh /> {day.temp.max}
              </p>
              <p>
                <FaTemperatureLow /> {day.temp.min}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="city-information">
        <div className="city-information__overview">
          <div className="city-information__overview-header">{getHeaderText()}</div>
          <div className="city-information__overview-timeline">{getForcastHour()}</div>
        </div>
        <div className="city-information__forecast">
          <div className="city-information__forecast-header">
            <p>{getInformationForecastHeader()}</p>
          </div>
          <div className="city-information__forecast-items">{getInformationForecastItems()}</div>
        </div>
        <CityAirQuality />
      </div>
    </>
  );
}

export default CityInformation;
