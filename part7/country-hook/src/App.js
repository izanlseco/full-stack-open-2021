import React, { useState, useEffect } from 'react'
import countryService from './services/country'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    const countryCall = async () => {
      try {
        console.log('%cApp.js line:21 name', 'color: #007acc;', name);
        const country = await countryService.getCountry(name)
        console.log('%cApp.js line:23 country', 'color: #007acc;', country);
        setCountry(country)
      } catch (error) {
        setCountry(404)
      }
    }
    countryCall()
  }, [name])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  
  if (country === 404) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name.common} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      {country.data[0].flag ? country.data[0].flag : `flag of ${country.data[0].name.common}`}
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App