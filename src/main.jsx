// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import RoomProvider from './context/RoomContext.jsx'

createRoot(document.getElementById('root')).render(
  <RoomProvider>
    <App />
  </RoomProvider>
)
