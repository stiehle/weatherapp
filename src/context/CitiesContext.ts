import { createContext } from "react";

export const CitiesContext = createContext<{
  cities: number[];
  setCities: React.Dispatch<number[]>;
}>({
  cities: [1, 2],
  setCities: () => {},
});
