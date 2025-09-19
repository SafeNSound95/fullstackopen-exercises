import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const App = () => {
  const queryClient = useQueryClient()
  
  const { data, isLoading, isError } = useQuery({
    queryKey:['anecdotes'],
    queryFn: async () => {
      const result = await axios.get(baseUrl)
      return result.data
    }
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: async (content) => {
      const result = await axios.post(baseUrl,{ content, votes: 0 })
      return result.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes']})
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: async (anecdote) => {
      const result = await axios.put(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1 })
      return result.data
    },
    onSuccess: (updatedAnecdote) => {
     const anecdotes = queryClient.getQueryData(['anecdotes'])
     const updatedAnecdotes = anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
     queryClient.setQueryData(['anecdotes'],updatedAnecdotes)
    }
  })

  if(isError) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  if(isLoading) {
    return <div>loading ...</div>
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm mutation={newAnecdoteMutation} />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
