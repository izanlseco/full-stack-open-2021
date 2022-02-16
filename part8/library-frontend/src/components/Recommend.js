import { ALL_BOOKS, CURRENT_USER } from '../queries'

import React from 'react'
import { useQuery } from '@apollo/client'

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const currentUser = useQuery(CURRENT_USER)
  
  if (!show) {
    return null
  }

  if (!result.data.allBooks.find(b => b.genres.includes(currentUser.data.me.favouriteGenre))) {
    return (
      <div>
        <h2>Recommendations</h2>
        <p>books in your favourite genre: <b>{currentUser.data.me.favouriteGenre}</b></p>
        <p>there is none at the moment</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favourite genre: <b>{currentUser.data.me.favouriteGenre}</b></p>
      <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {result.data.allBooks
              .filter(b => b.genres.includes(currentUser.data.me.favouriteGenre))
              .map(b =>
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              )
            }
          </tbody>
        </table>
    </div>
  )
}

export default Recommend