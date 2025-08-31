import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={
            <ProtectedRoute>
              <h1>Contact page</h1>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
