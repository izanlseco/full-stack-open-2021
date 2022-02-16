import { ALL_BOOKS, ALL_BOOKS_FILTERED } from '../queries'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filterBooks, filterResult] = useLazyQuery(ALL_BOOKS_FILTERED)

  const [genres, setGenres] = useState([])
  const [genreToFilter, setGenreToFilter] = useState(null)

  useEffect(() => {
    if (result.data) {
      const nonFilteredGenres = result.data.allBooks.map(a => a.genres)
      let stringArray = nonFilteredGenres.flat().map(JSON.stringify)
      let uniqueStringArray = new Set(stringArray)
      let uniqueArray = Array.from(uniqueStringArray, JSON.parse)
      setGenres(uniqueArray)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])
  
  useEffect(() => {
    if (genreToFilter) {
      filterBooks({ variables: { genreToFilter } })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreToFilter])

  if (!props.show) {
    return null
  }

  if (filterResult.loading) {
    return <div>loading...</div>
  }
  
  if (filterResult.data && genreToFilter) {
    return (
      <div>
        <h2>books</h2>
        <h3>in genre {genreToFilter}</h3>
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
            {filterResult.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        {genres.map(g =>
          <button key={g} onClick={() => setGenreToFilter(g)}>{g}</button>
        )}<button onClick={() => setGenreToFilter(null)}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
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
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} onClick={() => setGenreToFilter(g)}>{g}</button>
      )}<button onClick={() => setGenreToFilter(null)}>all genres</button>
    </div>
  )
}

export default Books