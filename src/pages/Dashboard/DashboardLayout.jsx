import React from 'react'
import Sidebar from '../../components/Dashboard/Sidebar'
import DashboardHeader from '../../components/Dashboard/DashboardHeader'

const DashboardLayout = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen bg-[#0a0f1c] text-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="h-screen flex-1 flex flex-col ">

                    <DashboardHeader />
                    {/* Page Content */}
                    <main className=" py-3 md:px-8 px-4 flex-1 overflow-y-auto border-0 border-gray-800">{children}</main>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout