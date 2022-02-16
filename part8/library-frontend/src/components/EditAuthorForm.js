import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import React, { useState } from 'react'

import Select from 'react-select'
import { useMutation } from '@apollo/client'

const EditAuthorForm = ({ authors }) => {
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [name, setName] = useState('')
  const [born, setBornTo] = useState('')

  const submit = (event) => {
    event.preventDefault()
    
    const nameValue = name.value
    editAuthor({ variables: { nameValue, born } })

    setName('')
    setBornTo('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={name}
            options={authors.map(a => { return { value: a, label: a } })}
            onChange={setName}
          />
        </div>
        <div>
          born <input
            type='number'
            value={born}
            onChange={({ target }) => setBornTo(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default EditAuthorForm