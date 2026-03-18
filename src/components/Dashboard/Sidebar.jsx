import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { AiOutlineLaptop } from "react-icons/ai";
import { BsFillLaptopFill } from "react-icons/bs";




const Sidebar = ({ sideMenuOpen, setSideMenuOpen }) => {
    const location = useLocation();
    const active = (path) => location.pathname === path ? "bg-blue-600 hover:bg-blue-600" : "hover:bg-[#1c2338]";




    return (
        <aside className={`w-44 lg:w-64 absolute lg:relative top-0 ${sideMenuOpen ? "left-0" : "left-[-180px]"} lg:left-0 z-10 h-screen bg-[#10172a] p-4 flex flex-col border-r-1 border-gray-800 transition-all duration-300`}>
            <h1 className="text-2xl font-bold text-blue-400 mb-10 hidden lg:block">
                <Link to={'/'}>
                    <img src="../src/assets/react.svg" alt="logo" className="w-6 h-6 mb-1 mr-2 hidden lg:inline-block hover:animate-[spin-slow_5s_linear_infinite]" />
                    VISION
                </Link>
            </h1>


            <div className="h-screen flex flex-col justify-between border-0"> 
                <nav className="flex flex-col gap-3 mt-15 lg:mt-0">
                    <Link to="/dashboard" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard')}`} onClick={() =>{ setSideMenuOpen(false)}}><HiHome />Home</Link>
                    <Link to="/dashboard/profile" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/profile')}`} onClick={() =>{ setSideMenuOpen(false)}}><FaUser />My Profile</Link>
                    <Link to="/dashboard/job-profile" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/job-profile')}`} onClick={() =>{ setSideMenuOpen(false)}}><BsFillBriefcaseFill />Job Profiles</Link>
                    <Link to="/dashboard/job-interview" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/job-interview')}`} onClick={() =>{ setSideMenuOpen(false)}}><BsFillLaptopFill />AI Interview</Link>
                {/* <Link to="/dashboard/applications" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/applications')}`}>Applications</Link>
                <Link to="/dashboard/analytics" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/analytics')}`}>Analytics</Link>
                <Link to="/dashboard/settings" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/settings')}`}>Settings</Link> */}
                </nav>

                <h1 className="text-2xl font-bold text-blue-400 mb-1 block lg:hidden">
                    <Link to={'/'}>
                        <img src="../src/assets/react.svg" alt="logo" className="w-7 h-7 mb-2 mr-2  inline-block hover:animate-[spin-slow_5s_linear_infinite]" />
                        VISION
                    </Link>
                </h1>
            </div>
        </aside>
    );
};

export default Sidebar;
