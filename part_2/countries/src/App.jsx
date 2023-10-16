import { useState, useEffect } from 'react'
import countriesService from '../services/countries'

const Form = (props) => 
  <div>
    find countries: <input value={props.country} onChange={props.handleChange} />
  </div>

const SingleCountry = ({country}) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Area: {country.area}
      </div>
      <h3>languages</h3>
      <ul>
        {languages.map(lang => <li key={lang} >{lang}</li>)}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10) return (
    <div>Too many matches, specify another filter</div>
  )

  if (countries.length === 1) return (
    <div>
      <SingleCountry country={countries[0]} />
    </div>
  )

  return (
    <div>
      {countries.map(country => 
        <Country key={country.name.official} value={country.name.common} />  
      )}
    </div>
  )
}

const Country = (props) => {
  return (
    <div>{props.value}</div>
  )
}

const App = () => {
  const [country, setCountry] = useState('')
  const [allCountriesData, setAllCountriesData] = useState([])
  const [showCountry, setShowCountry] = useState(false)

  useEffect (() => {
      countriesService
      .getAll()
      .then(CountriesData => setAllCountriesData(CountriesData))
  }, [])
  
  const handleCountryChange = (e) => {
    if (e.target.value) setShowCountry(true)
    else setShowCountry(false) 

    setCountry(e.target.value)
  }

  if (!allCountriesData) return
  
  const filterCountries = () => allCountriesData.filter(countryObj => countryObj.name.common.toLowerCase().includes(country.toLowerCase()))

  const filteredCountries = showCountry ? filterCountries() : []

  return (
    <div>
      <Form country={country} handleChange={handleCountryChange} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
