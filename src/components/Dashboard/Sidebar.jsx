import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { Home, User, Briefcase, Mic, FileText, BarChart2, Settings } from "lucide-react";

const Sidebar = () => {
    const location = useLocation();
    const active = (path) => location.pathname === path ? "bg-blue-600 hover:bg-blue-600" : "hover:bg-[#1c2338]";

    return (
        <aside className="w-64 bg-[#10172a] p-5 flex flex-col border-r-1 border-gray-800">
            <h1 className="text-2xl font-bold text-blue-400 mb-10 ">
                <img src="../src/assets/react.svg" alt="logo" className="w-6 h-6 mb-1 mr-2 hidden lg:inline-block hover:animate-[spin-slow_5s_linear_infinite]" />
                VISION
            </h1>

            <nav className="flex flex-col gap-3">
                <Link to="/dashboard" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard')}`}>Home</Link>
                <Link to="/dashboard/profile" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/profile')}`}>Profile</Link>
                <Link to="/dashboard/jobs" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/jobs')}`}>Job Matches</Link>
                {/* <Link to="/dashboard/interview" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/interview')}`}>AI Interview</Link>
                <Link to="/dashboard/applications" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/applications')}`}>Applications</Link>
                <Link to="/dashboard/analytics" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/analytics')}`}>Analytics</Link>
                <Link to="/dashboard/settings" className={`p-2 pl-3 rounded-md flex items-center gap-2 ${active('/dashboard/settings')}`}>Settings</Link> */}
            </nav>
        </aside>
    );
};

export default Sidebar;
