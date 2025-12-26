import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../pages/Dashboard/DashboardLayout'
import DashboardProfile from '../pages/Dashboard/DashboardProfile'
import DashboardHome from '../pages/Dashboard/DashboardHome'
import ProfileSetup from '../pages/Dashboard/ProfileSetup/ProfileSetup'

const DashboardRoutes = () => {
  return (
    <>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
        </Routes>
      </DashboardLayout>
    </>
  )
}

export default DashboardRoutes