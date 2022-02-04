import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import BookForm from './BookForm'
import Persons from './Persons'
import Notification from './Notification'
import numberService from '../services/phoneNumbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameToFilter, setNameToFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    numberService
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const addPhoneNumber = (event) => { 
    event.preventDefault()

    let filteredPerson = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    if (filteredPerson.length > 0 && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const foundPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
      const changedPerson = {...foundPerson, number: newNumber}

      numberService
        .update(foundPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
        })
    } else {
      setPersons(persons.concat(personObject))

      numberService
        .create(personObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removeNumber = (id) => {
    if (window.confirm("Do you really want to remove this number?")) {
      const personToRemove = persons.filter(p => p.id === id)
      numberService
        .remove(id)
        .then(emptyArray => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setMessage(`Information of ${personToRemove.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNameToFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
        <Filter
          nameToFilter={nameToFilter}
          handleFilter={handleFilter} />
      <h2>Add a new</h2>
        <BookForm
          addPhoneNumber={addPhoneNumber}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
        <Persons
          persons={persons}
          nameToFilter={nameToFilter}
          removeNumber={removeNumber} />
    </div>
  )
}

export default App;
