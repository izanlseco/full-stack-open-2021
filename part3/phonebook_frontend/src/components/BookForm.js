import React from 'react'

const BookForm = ({ addPhoneNumber, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <form onSubmit={addPhoneNumber}>
      <div>
        name: <input 
                value={newName}
                onChange={handleNewName}/>
      </div>
      <div>
        number: <input 
                  value={newNumber}
                  onChange={handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default BookForm