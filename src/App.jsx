import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Features from './components/Features'



const navHidden = ['/login', '/signup', '/forgot-password',];


const Layout = () => {

  const location = useLocation();
  return (
    <>

      {
        (!navHidden.includes(location.pathname)) &&
        <Navbar />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home scrollTo="about" />} /> 
        <Route path="/features" element={<Home scrollTo="features" />} /> 
        
        <Route path="/contact" element={
          <ProtectedRoute>
            <h1>Contact page</h1>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>

    </>
  )
}




const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  )
}

export default App
