import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const anecdote = action.payload
       state.push(anecdote)
    },

    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      anecdoteToChange.votes += 1
    },

    sortAnecdotes(state) {
      state.sort((a,b) => b.votes - a.votes)
    },

    setAnecdotes(state,action) {
      return action.payload
    }

  }
})

export const { addAnecdote, addVote, sortAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer