import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>  
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>
)