import { ALL_AUTHORS } from '../queries'
import EditAuthorForm from './EditAuthorForm'
import React from 'react'
import { useQuery } from '@apollo/client'
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if ( result.loading ) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <EditAuthorForm authors={result.data.allAuthors.map(a => a.name)}/>
    </div>
  )
}

export default Authors
