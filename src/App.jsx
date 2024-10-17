// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import RoomPage from './pages/RoomPage/RoomPage'
import RoomDetails from './pages/RoomDetails/RoomDetails'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Sidebar from './components/Sidebar/Sidebar'
import  { Dashboard } from './pages/Sidebar/Dashboard'
import DashboardLayout from './components/Layout/DashBoardLayout'
import UserList from './pages/Sidebar/UserList'
import UserProfile from './pages/Sidebar/UserProfile'
// import PrivateRoute from './router/PrivateRoutes'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" 
          element={
              <Layout>
                <Home/>
              </Layout>
          }>
        </Route>

        <Route path="rooms" 
          element={
              <Layout>
                <RoomPage/>
              </Layout>
          }>
          
          <Route path=":id" element={<RoomDetails/>}></Route>
        </Route>

        <Route path="login" 
          element={
              <Layout>
                <Login/>
              </Layout>
          }>
        </Route>

        <Route path="register"
          element={
              <Layout>
                <Register></Register>
              </Layout>
          }>
        </Route>

        <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </Layout>
              // </PrivateRoute>
            }
        />

        <Route
            path="/profile"
            element={
              // <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </Layout>
              // </PrivateRoute>
            }
        />

        <Route
          path="/userlist"
          element={
            // <PrivateRoute>
              <Layout>
                <DashboardLayout>
                  <UserList />
                </DashboardLayout>
              </Layout>
            // </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App