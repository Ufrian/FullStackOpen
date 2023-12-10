import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const API_KEY = import.meta.env.VITE_API_KEY

// api_call = https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const getAll = () => 
    axios
      .get(`${baseUrl}/api/all`)
      .then(response => response.data)

const getCountry = (ctry) => 
  axios
  .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${ctry}`)
  .then(response => response.data)


const getWeather = (city) =>
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => response.data)

export default {getAll, getCountry, getWeather}