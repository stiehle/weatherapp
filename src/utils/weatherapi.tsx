const baseURL = "https://api.weatherapi.com/v1";
const apiKey = import.meta.env.VITE_WEATHER_KEY;
const lang = "de";

export async function forecastWeather(city: string) {
  const currentWeatherURL = `${baseURL}/forecast.json?key=${apiKey}&q=${city}&lang=${lang}&days=3`;

  const response = await fetch(currentWeatherURL, {
    method: "GET",
  });
  const body = await response.json();
  // console.log(body);

  return body;
}

export async function currentWeather(city: string) {
  const currentWeatherURL = `${baseURL}/current.json?key=${apiKey}&q=${city}&lang=${lang}&days=3`;

  const response = await fetch(currentWeatherURL, {
    method: "GET",
  });
  const body = await response.json();
  // console.log(body);

  return body;
}

export async function searchCity(city: string) {
  const searchCityURL = `${baseURL}/search.json?key=${apiKey}&q=${city}&lang=${lang}`;

  const response = await fetch(searchCityURL, {
    method: "GET",
  });
  const body = await response.json();
  // console.log(body);

  return body;
}
