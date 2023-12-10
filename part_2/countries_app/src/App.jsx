import { useState, useEffect } from 'react'
import countriesService from '../services/countries'
import Form from './components/Form'
import Countries from './components/Countries'

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