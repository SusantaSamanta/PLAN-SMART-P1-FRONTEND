import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../pages/Dashboard/DashboardLayout'
import DashboardProfile from '../pages/Dashboard/DashboardProfile'
import DashboardHome from '../pages/Dashboard/DashboardHome'
import ProfileSetup from '../pages/Dashboard/ProfileSetup/ProfileSetup'
import { AppContext } from '../context/AppContext'

const DashboardRoutes = () => {
  const { isProfileComplete } = useContext(AppContext)

  return (
    <>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route
            path="/profile-setup"
            element={
              isProfileComplete
                ? <Navigate to="/dashboard/profile" replace />
                : <ProfileSetup />
            }
          /></Routes>
      </DashboardLayout>
    </>
  )
}

export default DashboardRoutes