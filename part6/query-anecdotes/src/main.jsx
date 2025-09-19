import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>  
    <App />
  </QueryClientProvider>
)