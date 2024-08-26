// import { useContext } from "react";
// import { WeatherContext } from "../context/WeatherContext";
import { getConditionImagePath } from "./conditions";

export function getWeatherBackgroundImage(conditionCode: number, isDay: number) {
  // const weather = useContext(WeatherContext);

  // const conditionCode = weather.weatherData.current.condition.code;
  let day = false;

  if (isDay === 1) {
    day = true;
  }

  const conditionImagePath = getConditionImagePath(conditionCode, !day);
  // console.log(conditionImagePath, isDay);

  if (conditionImagePath) {
    return { backgroundImage: `url(${conditionImagePath})` };
  } else {
    return { backgroundColor: "#220044" };
  }
}
