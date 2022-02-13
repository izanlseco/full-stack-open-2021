import React from 'react'
import { connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const list = props.anecdotes.slice()

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.addNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <>
      {
      list
        .filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  addNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)