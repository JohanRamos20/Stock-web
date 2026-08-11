import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './data/auth/AuthContext'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
