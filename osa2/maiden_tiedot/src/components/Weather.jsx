import { useState, useEffect } from "react";
import countryService from "../services/CountriesService";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    countryService.getWeather(country).then((newWeather) => {
      setWeather(newWeather);
    });
  }, [country]);

  if (!weather) return null;

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon displaying current weather"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
