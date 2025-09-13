import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  
  const newAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotification(`you added '${content}'`))
    setTimeout(() => dispatch(clearNotification()) ,5000)
  }

  return (
    <>
      <h2>create new</h2>
        <form onSubmit={newAnecdote}>
          <div><input name="newAnecdote"/></div>
          <button type='submit'>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm