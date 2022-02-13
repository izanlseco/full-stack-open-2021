import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  }, [props])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes
}

export default connect(
  null,
  mapDispatchToProps
)(App)