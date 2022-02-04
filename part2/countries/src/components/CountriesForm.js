import React from 'react'

const CountriesForm = ({ countryToFilter, setCountryToFilter }) => {

  const handleFilterChange = (event) => {
    setCountryToFilter(event.target.value)
  }

  return (
    <div>
      Filter by <input
            value={countryToFilter}
            onChange={handleFilterChange}/>
    </div>
  )
}

export default CountriesForm