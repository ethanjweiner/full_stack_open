import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Weather = ({ capital }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const WEATHER_API_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`;

  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get(WEATHER_API_ENDPOINT).then(({ data }) => {
      const { main, wind, weather } = data;
      setWeather({
        tempCelsius: Math.round((main.temp - 273.15) * 100) / 100,
        wind: wind.speed,
        icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
      });
    });
  }, []);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.tempCelsius} Celcius</p>
      <img src={weather.icon} alt={weather.icon} />
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default Weather;
