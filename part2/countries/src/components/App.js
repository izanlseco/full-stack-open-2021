
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountriesList from './CountriesList'
import CountriesForm from './CountriesForm'

function App() {
  const [countries, setCountries] = useState([])
  const [countryToFilter, setCountryToFilter] = useState('')
  
  const addCountryToFilter = (event) => {
    event.preventDefault()
    setCountryToFilter(event.target.firstChild.data)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <CountriesForm countryToFilter={countryToFilter} setCountryToFilter={setCountryToFilter} />
      <CountriesList countries={countries} countryToFilter={countryToFilter} addCountryToFilter={addCountryToFilter} />
    </div>
  )
}

export default App;
