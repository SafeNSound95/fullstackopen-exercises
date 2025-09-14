import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  
  const createAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.createAnecdote.value
    e.target.createAnecdote.value = ''
    dispatch(newAnecdote(content))
  }

  return (
    <>
      <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name="createAnecdote"/></div>
          <button type='submit'>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm