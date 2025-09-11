import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type:'VOTE', payload: id})
  }

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    e.target.newAnecdote.value = ''
    dispatch({ type:'ADD_ANECDOTE', payload:content })
  }

  const sort = () => {
    dispatch({ type:'SORT' })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="newAnecdote"/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App