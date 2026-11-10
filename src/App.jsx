import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import DashboardRoutes from './routes/DashboardRoutes'
import { ToastContainer } from 'react-toastify'
import BackendConnectionLoading from './components/BackendConnectionLoading'
import Footer from './components/Footer'
import NotFound from './components/NotFound'



const navNotHidden = ['/about', '/features', '/', '/contact'];


const Layout = () => {

  const location = useLocation();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      // transition={Bounce}
      />


      {
        (navNotHidden.includes(location.pathname)) &&
        <Navbar />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home scrollTo="about" />} />
        <Route path="/features" element={<Home scrollTo="features" />} />
        <Route path="/contact" element={<Home scrollTo="contact" />} />

        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <BackendConnectionLoading />

      {
        (navNotHidden.includes(location.pathname)) &&
        <Footer />
      }

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
