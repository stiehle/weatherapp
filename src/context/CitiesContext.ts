import { createContext } from "react";

// export const CitiesContext = createContext<{
//   citiesX: number[];
// }>({ citiesX: [1, 2] });

// export const CitiesContext = createContext<number[]>([]);

export const CitiesContext = createContext<{
  cities: number[];
  setCities: React.Dispatch<number[]>;
}>({
  cities: [1, 2],
  setCities: () => {},
});
