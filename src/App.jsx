// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import RoomPage from './pages/RoomPage/RoomPage'
import RoomDetails from './pages/RoomDetails/RoomDetails'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/rooms',
    element: <RoomPage />,
  },
  {
    path: '/room/:id',
    element: <RoomDetails />,
  },
]);

function App() {


  return (
    <>
      <Header/> 
      <RouterProvider router={router} />
      <Footer/> 
    </>
  )
}

export default App
