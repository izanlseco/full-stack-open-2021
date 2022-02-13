import { createSlice } from "@reduxjs/toolkit"

import anecdote from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      return [...state, action.payload]
    },
    setVotes(state, action) {
      return state.map(anecdote =>
         anecdote.id !== action.payload.id ? anecdote : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, newAnecdote, setAnecdotes, setVotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdote.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdote.createNew(content)
    dispatch(newAnecdote(response))
  }
}

export const voteAnecdote = (votedAnecdote) => {
  return async dispatch => {
    const response = await anecdote.update(votedAnecdote)
    dispatch(setVotes(response))
  }
}

export default anecdoteSlice.reducer