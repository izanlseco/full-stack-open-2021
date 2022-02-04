import React from 'react'

const Filter = ({ nameToFilter, handleFilter}) => {
  return (
    <div>
      filter shown with: <input
                          value={nameToFilter}
                          onChange={handleFilter}/>
    </div>
  )
}

export default Filter