import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  
  const newAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    anecdoteService.createAnecdote(content).then(anecdote => {
      dispatch(addAnecdote(anecdote))
      dispatch(setNotification(`you added '${anecdote.content}'`))
      setTimeout(() => dispatch(clearNotification()) ,5000)
    })
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