import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const API_KEY = import.meta.env.VITE_API_KEY

// api_call = https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const getAll = () => 
    axios
      .get(`${baseUrl}`)
      .then(response => response.data)

const getWeather = (lat, lon) =>
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(response => response.data)

export default {getAll, getWeather}