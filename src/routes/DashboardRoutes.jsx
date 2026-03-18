import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../pages/Dashboard/DashboardLayout'
import DashboardProfile from '../pages/Dashboard/DashboardProfile'
import DashboardHome from '../pages/Dashboard/DashboardHome'
import ProfileSetup from '../pages/Dashboard/ProfileSetup/ProfileSetup'
import { AppContext } from '../context/AppContext'
import DashboardJobProfiles from '../pages/Dashboard/JobProfiles/DashboardJobProfiles'
import DashboardContextProvider from '../context/DashboardContext'
import DashboardAiInterview from '../pages/Dashboard/DashboardAiInterview'

const DashboardRoutes = () => {
  const { isProfileComplete } = useContext(AppContext)
  return (
    <>
      <DashboardContextProvider>
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
            />
            <Route path="/job-profile" element={<DashboardJobProfiles />} />
            <Route path="/job-interview" element={<DashboardAiInterview />} />
          </Routes>


        </DashboardLayout>
      </DashboardContextProvider>
    </>
  )
}

export default DashboardRoutes