import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = ({ mutation }) => {
  const [ notification, notificationDispatch  ] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate(content)
    notificationDispatch({type: "SET_NOTIFICATION", payload: `anecdote '${content}' added`})
    setTimeout(() => notificationDispatch({type: "SET_NOTIFICATION", payload:""}),5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
