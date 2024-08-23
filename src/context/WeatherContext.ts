import { createContext } from "react";
import { weatherData, weatherDataTypes } from "../utils/weather.types";

export const WeatherContext = createContext<{
  weatherData: weatherData;
  // setWd: React.Dispatch<weatherData>;
  setWeatherData: (weatherData: weatherData) => void;
}>({ weatherData: weatherDataTypes, setWeatherData: () => {} });
