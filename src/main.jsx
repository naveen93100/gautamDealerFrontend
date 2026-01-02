import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './Context/AuthContext.jsx'
import './pages/Dashboard/index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster className='dont-print'  position='top-center' toastOptions={{
        duration: 5000
      }} />
    </AuthProvider>
  </BrowserRouter>
)
