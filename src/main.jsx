import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/axiosRateLimitInterceptor'
import App from './App.jsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => error?.response?.status !== 429 && failureCount < 3,
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
    <App/>
   </QueryClientProvider>
  </StrictMode>,
)
