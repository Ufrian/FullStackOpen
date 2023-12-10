import { useState, useEffect } from 'react'
import countriesService from '../services/countries'
import Form from '../components/Form'

const Countries = ({ countries, handleButton }) => {

  if (countries.length > 10) return (<div>Too many matches, specify another filter</div>)

  if (countries.length === 1 ) return (
    <><RenderCountry country={countries[0].name} />
    <RenderWeather capitalCity={countries[0].capital} /></>
    )

  return (
    <div>
      {countries.map(country => 
      <ListCountries countryName={country.name} 
      key={country.id} 
      handleButton={handleButton} 
      isShow={country.isShow} countryId={country.id}/>)}
    </div>
  )
}

const ListCountries = ({countryName, handleButton, isShow, countryId}) => {
  const btnTxt = isShow ? "hide" : "show"

  return (
  <div>
    { countryName }
    <button type="submit" onClick={() => handleButton(countryId)}>{btnTxt}</button>
    {isShow ? <RenderCountry country={countryName} /> : null } 
  </div>
  )
}

const RenderCountry = ({ country }) => {
  const ctry = country
  const [countryData, setCountryData] = useState(null)

  useEffect(() => {

    if (ctry) {
      countriesService
      .getCountry(ctry)
      .then(data => {
        setCountryData(data)
      })
      .catch(err => console.error(err))
    }
    }, [ctry])

  if (!countryData) return 

  return (
    <DisplayCountry country={countryData}/>
  )
}

const DisplayCountry = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png}/>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Area: {country.area}
      </div>
      <div>
        Languages:
      </div>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    </div>
  )
}

const RenderWeather = ({ capitalCity }) => {
  const city = capitalCity[0]
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


const App  = () => {
  const [input, setInput] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [showCountries, setShowCountries] = useState(false)

  useEffect(() => {
    countriesService
      .getAll()
      .then(countriesData => {
        const countriesArr = countriesData.map(country => ({
          name: country.name.common, 
          id: country.ccn3 ? Number(country.ccn3) : Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
          isShow: false,
          capital: country.capital
        }))
        setAllCountries(countriesArr)
      })
  }, [])

  const handleInputChange = (e) => {
    e.preventDefault()
    if (e.target.value) setShowCountries(true)
    else setShowCountries(false) 

    setInput(e.target.value)
  }

  const handleShowButton = (id) => {
    const changedCountry = allCountries.find(country => country.id === id)
    changedCountry.isShow = !changedCountry.isShow
    
    setAllCountries(allCountries.filter(country => country.id !== id).concat(changedCountry))
  }

  const filterCountries = () => {
    const filtered = allCountries.filter(countryObj => countryObj.name.toLowerCase().includes(input.toLowerCase()))
    return filtered.toSorted((a, b) => a.id - b.id)
  }

  const filteredCountries = showCountries ? filterCountries() : []
  
  return (
    <div>
      <Form input={input} handleChange={handleInputChange} />
      <Countries countries={filteredCountries} handleButton={handleShowButton} />
    </div>
  )
}

export default App