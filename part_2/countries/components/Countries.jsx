const SingleCountry = ({country}) => {
    return (
      <div>
        <DisplayCountry country={country} />
      </div>
    )
}
  
const DisplayCountry = ({country}) => {
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
 
const Country = ({country, handleShow, isShow}) => {
    const countryStatus = isShow.filter(id => Object.keys(id)[0] === country.name.official)  
    const btnTxt = countryStatus[0] === undefined ? "show" : (countryStatus[0][country.name.official] ? "hide" : "show") 
  
    return (
      <div>
        {country.name.common}
        <button type="submit" onClick={() => handleShow(country.name.official)} >{btnTxt}</button>
        {btnTxt === "hide" ? <DisplayCountry country={country} /> : null } 
      </div>
    )
}

const Countries = ({countries, handleShow, isShow}) => {
    if (countries.length > 10) return (
      <div>Too many matches, specify another filter</div>
    )
  
    if (countries.length === 1)  {
        return (
        <div>
            <SingleCountry country={countries[0]} />
        </div>
    )}
  
    return (
      <div>
        {countries.map(country => 
          <Country key={country.name.official} country={country} handleShow={handleShow} isShow={isShow} />  
        )}
      </div>
    )
}
  
export default Countries