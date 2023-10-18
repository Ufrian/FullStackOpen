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
      <img src={country.flags.png}/>
      <div>
        Capital: {country.capital}
      </div>
      <div>
        Area: {country.area}
      </div>
      <h3>languages</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    </div>
  )
}

const Countries = ({countries, handleShow, isShow}) => {
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
        <Country key={country.name.official} country={country} handleShow={handleShow} isShow={isShow} />  
      )}
    </div>
  )
}

const Country = ({country, handleShow, isShow}) => {
  const countryStatus = isShow.filter(id => Object.keys(id)[0] === country.name.official)  
  const btnTxt = countryStatus[0] === undefined ? "show" : (countryStatus[0][country.name.official] ? "hide" : "show") 

  return (
    <div>
      {country.name.common}
    <button type="submit" onClick={() => handleShow(country.name.official)} >{btnTxt}</button>
    {btnTxt === "hide" ? <SingleCountry country={country} /> : null } 
    </div>
  )
}

const App = () => {
  const [country, setCountry] = useState('')
  const [allCountriesData, setAllCountriesData] = useState([])
  const [showCountries, setShowCountries] = useState(false)
  const [showStatus, setShowStatus] = useState([])

  useEffect (() => {
      countriesService
      .getAll()
      .then(CountriesData => setAllCountriesData(CountriesData))
  }, [])
  
  const handleCountryChange = (e) => {
    if (e.target.value) setShowCountries(true)
    else setShowCountries(false) 

    setCountry(e.target.value)
  }

  const handleShowCountry = (id) => {
    const copyStatus = showStatus.map(x => x)
    const copyKeys = copyStatus.map(country => Object.keys(country)[0])
    
    if (copyKeys.includes(id)) {
      const toggledStatus = copyStatus.map(country => Object.keys(country)[0] !== id ? country : {[id]: !Object.values(country)[0]})      
      setShowStatus(toggledStatus)
    }

    else setShowStatus(copyStatus.concat({[id]: true}))
  } 

  if (!allCountriesData) return
  
  const filterCountries = () => allCountriesData.filter(countryObj => countryObj.name.common.toLowerCase().includes(country.toLowerCase()))

  const filteredCountries = showCountries ? filterCountries() : []


  return (
    <div>
      <Form country={country} handleChange={handleCountryChange} />
      <Countries countries={filteredCountries} handleShow={handleShowCountry} isShow={showStatus} />
    </div>
  )
}

export default App
