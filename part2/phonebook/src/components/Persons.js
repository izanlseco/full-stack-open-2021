import React from 'react'

const Persons = ({ persons, nameToFilter, removeNumber }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(nameToFilter.toLowerCase()))
        .map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => removeNumber(person.id)}>delete</button>
            </li>
        )}
    </ul>
  )
}

export default Persons