import { useContext } from "react";
import "./CityInformation.scss";
import { WeatherContext } from "../context/WeatherContext";
import { weatherDataHour } from "../routes/city/weather.types";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { convertTime } from "../others/convertTime.ts";

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
    if (weather.weatherData) {
      // const headerText = `Heute ist der: ${date.day}.${date.month}.${date.year}.`;
      const uv = `Der UV Index beträgt: ${weather.weatherData.current.uv}`;
      const wind = `Wind bis zu ${weather.weatherData.current.wind_kph} km/h.`;
      return (
        <>
          {/* <p>{headerText}</p> */}
          <p>{uv}</p>
          <p>{wind}</p>
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

    if (weather.weatherData) {
      // console.log(nowInHour_2);
      const forecastDays = weather.weatherData.forecast.forecastday;
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

    // return weather.weatherData["forecast"].forecastday[0].hour.map((hourData) => {

    if (weather.weatherData) {
      const nowInHourByLocation = Number(getDateAndTime(weather.weatherData.location.localtime).hour);
      const newForcastHours = allForecastHours.slice(nowInHourByLocation, nowInHourByLocation + forecastHours);
      // const newForcastHours2 = allForecastHours;

      return newForcastHours.map((hourData) => {
        // console.log(hourData, weather.weatherData["forecast"].forecastday[0].hour);
        //  <div>{hourData.time.split(" ")[1]}</div>
        return (
          <div className="city__information-overview-timeline-hour" key={hourData.time_epoch}>
            {getTimelineHour(hourData.time, weather.weatherData.location.localtime)}
            <img src={hourData.condition.icon} className="icon"></img>
            <p>{hourData.temp_c}°</p>
          </div>
        );
      });
    }
    // return data;
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

        // const convertedTime = convertTime(element.astro.sunset);

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
        <div className="city__information-forecast-day" key={day.id}>
          <p>{day.day}</p>
          <img src={day.icon} className="icon"></img>
          <div className="city__information-forecast-wrapper">
            <div className="city__information-forecast-astro">
              <p>
                <FiSunrise /> {day.astro.sunrise} Uhr
              </p>
              <p>
                <FiSunset /> {day.astro.sunset} Uhr
              </p>
            </div>
            <div className="city__information-forecast-temperatur">
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
      <div className="city__information">
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
      </div>
    </>
  );
}

export default CityInformation;
