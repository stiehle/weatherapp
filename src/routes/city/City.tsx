import "./City.scss";
import { useEffect, useState } from "react";
import { forecastWeather } from "../../utils/weatherapi";
import { weatherData } from "../../utils/weather.types";
import { WeatherContext } from "../../context/WeatherContext";
import CityNavigation from "../../components/citynavigation/CityNavigation";
import CityHeader from "../../components/cityheader/CityHeader";
import CityInformation from "../../components/cityinformation/CityInformation";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { getWeatherBackgroundImage } from "../../utils/backgroundImage";
import { InfinitySpin } from "react-loader-spinner";

function City() {
  const [weatherData, setWeatherData] = useState<weatherData>();
  const { itemId } = useParams();

  useEffect(() => {
    getForecastWeather();
  }, []);

  async function getForecastWeather() {
    const city = "id:" + String(itemId);

    const data: weatherData = await forecastWeather(city);

    setWeatherData(data);
  }

  if (weatherData) {
    return (
      <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
        <div
          className={weatherData.current.is_day === 1 ? "city" : "city city--night"}
          style={{ backgroundImage: `url(../${getWeatherBackgroundImage(weatherData.current.condition.code, weatherData.current.is_day)})` }}>
          <CityNavigation />
          <CityHeader />
          <CityInformation />
          <Footer />
        </div>
      </WeatherContext.Provider>
    );
  } else {
    return (
      <div className="city city__center">
        <InfinitySpin width="180" color="#ff0000" />
      </div>
    );
  }
}

export default City;
