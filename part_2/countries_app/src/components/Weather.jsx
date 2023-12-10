import { useState, useEffect } from 'react'
import countriesService from '../../services/countries'

const RenderWeather = ({ capitalCity }) => {
  const city = capitalCity ? capitalCity[0] : undefined 
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {

    if (city) {
      countriesService
      .getWeather(city)
      .then(data => {
        setWeatherData(data)
      })
      .catch(err => console.error(err))
    }
    }, [city])

  if (!weatherData) return 

  return(
    <DisplayWeather weather={weatherData} />
  )
}

const DisplayWeather = ({weather}) => {
  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>temperature: {(weather.main.temp - 273).toFixed(2)} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <p>wind {weather.wind.speed} m/s </p>
    </div>
  )
}

export default RenderWeather