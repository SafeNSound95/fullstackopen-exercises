import { useSelector, useDispatch } from "react-redux"
import { addVote, sortAnecdotes} from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from '../reducers/notificationReducer'
 
const AnecdoteList = () => {
  const anecdotes = useSelector( ({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter)))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNotification()) ,5000)
  }

  const sort = () => {
    dispatch(sortAnecdotes())
  }

  return (
    <>
      <button onClick={sort}>sort</button>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList