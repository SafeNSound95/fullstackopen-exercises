import { useSelector, useDispatch } from "react-redux"
import { addVote, sortAnecdotes} from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector( ({ anecdotes, filter }) => anecdotes.filter(a => a.content.includes(filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList