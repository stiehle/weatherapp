import { currentWeather, searchCity } from "../../components/weatherapi";
import "./Ciity.scss";

export function City() {
  async function getCurrentWheater() {
    const city = "Ehingen";
    const { current, location } = await currentWeather(city);
    console.log(current, location);
  }

  async function getCities() {
    const city = "Ehingen";
    const cities = await searchCity(city);
    console.log(cities, cities[0].id);
  }

  return (
    <div className="city">
      <div className="city__navigation">
        <button onClick={getCurrentWheater}>Wetter</button>
        <button onClick={getCities}>Search</button>
      </div>
      <div className="city__header"></div>
      <div className="city__information"></div>
    </div>
  );
}

export default City;
