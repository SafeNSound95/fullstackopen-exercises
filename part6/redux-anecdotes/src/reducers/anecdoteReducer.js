import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const anecdote = action.payload
       state.push(anecdote)
    },

    sortAnecdotes(state) {
      state.sort((a,b) => b.votes - a.votes)
    },

    incrementVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
    },

    setAnecdotes(state,action) {
      return action.payload
    }

  }
})

export const { addAnecdote, sortAnecdotes, setAnecdotes, incrementVote} = anecdoteSlice.actions

export const getAnecdotes = () => {
    return async(dispatch) => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
}

export const newAnecdote = (content) => {
  return async(dispatch) => {
    const anecdote = await anecdoteService.postAnecdote(content)
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`you added '${anecdote.content}'`, 5))
  }
}

export const addVote = (anecdote) => {
  return async(dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(incrementVote(updatedAnecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
   }
}

export default anecdoteSlice.reducer