import React from 'react'
import Weather from './Weather'

const CountriesList = ({ countries, countryToFilter, addCountryToFilter }) => {
  
  const filteredCountries = countries?.filter((country: { name: string; }) => country.name.common.toString().toLowerCase().includes(countryToFilter.trim().toLowerCase()))

  return (
    <div>
      {
      filteredCountries.length === 1 ?
      filteredCountries
        .map(
          country => 
            <div key={country.ccn3}>
              <h1>{country.name.common}</h1>
                <li>Capital: {country.capital}</li>
                <li>Population: {country.population}</li>
              <h2>Languages</h2>
              <ul>
                {Object.keys(country.languages).map(language =>
                  <li key={language}>{language}</li>
                )}
              </ul>
              <img src={country.flag} alt={country.name.common} width="150" height="100" />
              <Weather country={country}/>
            </div>
            ) :
        filteredCountries.length > 10 ?
        'Too many matches, specify another filter' :
        filteredCountries
          .map(country => 
                <li key={country.ccn3}>
                  <form onSubmit={addCountryToFilter}>
                    {country.name.common} <button type="submit">Show</button>
                  </form>
                </li>
              )}
    </div>
  )
}

export default CountriesList