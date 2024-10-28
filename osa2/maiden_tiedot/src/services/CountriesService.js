import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const apiKey = import.meta.env.VITE_SOME_KEY;
console.log("API Key:", apiKey);

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getWeather = (country) => {
  const lat = country.capitalInfo?.latlng?.[0] || country.latlng[0];
  const lon = country.capitalInfo?.latlng?.[1] || country.latlng[1];
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  return axios.get(weatherUrl).then((response) => response.data);
};

export default { getAll, getWeather };
