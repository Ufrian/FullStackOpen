import { useState, useEffect } from 'react'
import countriesService from '../services/countries'
import Countries from '../components/Countries'

const Form = (props) => 
  <div>
    find countries: <input value={props.country} onChange={props.handleChange} />
  </div>

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
