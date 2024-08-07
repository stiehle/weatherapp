const weatherDataTypes = {
  location: {
    name: "Ehingen",
    region: "Baden-Wurttemberg",
    country: "Germany",
    lat: 48.33,
    lon: 9.72,
    tz_id: "Europe/Berlin",
    localtime_epoch: 1722775234,
    localtime: "2024-08-04 14:40",
  },
  current: {
    last_updated_epoch: 1722774600,
    last_updated: "2024-08-04 14:30",
    temp_c: 20.6,
    temp_f: 69.1,
    is_day: 1,
    condition: {
      text: "Light rain shower",
      icon: "//cdn.weatherapi.com/weather/64x64/day/353.png",
      code: 1240,
    },
    wind_mph: 8.7,
    wind_kph: 14.0,
    wind_degree: 294,
    wind_dir: "WNW",
    pressure_mb: 1015.0,
    pressure_in: 29.97,
    precip_mm: 0.55,
    precip_in: 0.02,
    humidity: 73,
    cloud: 62,
    feelslike_c: 20.6,
    feelslike_f: 69.1,
    windchill_c: 20.6,
    windchill_f: 69.1,
    heatindex_c: 20.6,
    heatindex_f: 69.1,
    dewpoint_c: 15.6,
    dewpoint_f: 60.1,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 5.0,
    gust_mph: 11.2,
    gust_kph: 18.0,
  },
  forecast: {
    forecastday: [
      {
        date: "2024-08-04",
        date_epoch: 1722729600,
        day: {
          maxtemp_c: 20.6,
          maxtemp_f: 69.1,
          mintemp_c: 14.3,
          mintemp_f: 57.8,
          avgtemp_c: 17.4,
          avgtemp_f: 63.3,
          maxwind_mph: 9.8,
          maxwind_kph: 15.8,
          totalprecip_mm: 2.89,
          totalprecip_in: 0.11,
          totalsnow_cm: 0.0,
          avgvis_km: 9.6,
          avgvis_miles: 5.0,
          avghumidity: 85,
          daily_will_it_rain: 1,
          daily_chance_of_rain: 94,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: {
            text: "Patchy rain nearby",
            icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
            code: 1063,
          },
          uv: 6.0,
        },
        astro: {
          sunrise: "06:00 AM",
          sunset: "08:53 PM",
          moonrise: "05:28 AM",
          moonset: "09:22 PM",
          moon_phase: "New Moon",
          moon_illumination: 0,
          is_moon_up: 0,
          is_sun_up: 0,
        },
        hour: [
          {
            time_epoch: 1722722400,
            time: "2024-08-04 00:00",
            temp_c: 15.6,
            temp_f: 60.2,
            is_day: 0,
            condition: {
              text: "Partly Cloudy ",
              icon: "//cdn.weatherapi.com/weather/64x64/night/116.png",
              code: 1003,
            },
            wind_mph: 7.4,
            wind_kph: 11.9,
            wind_degree: 288,
            wind_dir: "WNW",
            pressure_mb: 1015.0,
            pressure_in: 29.98,
            precip_mm: 0.0,
            precip_in: 0.0,
            snow_cm: 0.0,
            humidity: 92,
            cloud: 28,
            feelslike_c: 15.6,
            feelslike_f: 60.2,
            windchill_c: 15.6,
            windchill_f: 60.2,
            heatindex_c: 15.6,
            heatindex_f: 60.2,
            dewpoint_c: 14.4,
            dewpoint_f: 57.8,
            will_it_rain: 0,
            chance_of_rain: 0,
            will_it_snow: 0,
            chance_of_snow: 0,
            vis_km: 10.0,
            vis_miles: 6.0,
            gust_mph: 13.9,
            gust_kph: 22.4,
            uv: 0,
          },
        ],
      },
    ],
  },
};

export type weatherData = typeof weatherDataTypes;
