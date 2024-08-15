import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function TestContext() {
  const wd = useContext(WeatherContext);
  console.log(wd);

  return (
    <>
      <div>{wd.forecast.forecastday[0].astro.sunset}</div>
    </>
  );
}

export default TestContext;
