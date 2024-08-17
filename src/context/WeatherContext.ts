import { createContext } from "react";
import { weatherData, weatherDataTypes } from "../routes/city/weather.types";

export const WeatherContext = createContext<{
  weatherData: weatherData;
  // setWd: React.Dispatch<weatherData>;
  setWeatherData: (weatherData: weatherData) => void;
}>({ weatherData: weatherDataTypes, setWeatherData: () => {} });

// export const WeatherContext = createContext<{}>({});

// export const WeatherContext = createContext<{
//     mycount: number;
//     name: string;
//     setNumber: React.Dispatch<number>;
//     // -> setNumber: (num: number) => void;
//   }>({ mycount: 0, name: "hi", setNumber: () => {} });
