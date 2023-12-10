import { useState, useEffect } from 'react'
import countriesService from '../../services/countries'
import RenderWeather from './Weather'

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

export default Countries