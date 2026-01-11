import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect, useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import HamburgerButton from "../HamburgerButton";

const DashboardHeader = ({sideMenuOpen, setSideMenuOpen}) => {

    const { profilePicUrl, userDetails } = useContext(AppContext);

    // const [sideMenuOpen, setSideMenuOpen] = useState(false);

    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const [notificationBar, setNotificationBar] = useState(false);
    const notificationRef = useRef(null);




    let page = "";
    if (location.pathname.includes("/profile-setup")) page = "Profile Setup";
    else if (location.pathname.includes("/profile")) page = "My Profile";
    else if (location.pathname.includes("/jobs")) page = "Jobs";
    else page = "Hello, Susanta";

    // 🧠 Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            // console.log(e);
            if (menuRef.current && !menuRef.current.contains(e.target)) {

                setMenuOpen(false);
                setNotificationBar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        // return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="py-1 md:py-2 px-4 flex items-center justify-between shadow-sm text-white sticky top-0 z-50 border-0 bg-[#0d1427]">
            {/* Left: Dashboard Title */}
            <div className="flex">
                <HamburgerButton
                    isOpen={sideMenuOpen}
                    onToggle={() => setSideMenuOpen(!sideMenuOpen)}
                />
                <h1 className="text-xl md:text-2xl font-semibold">{page}</h1>
            </div>

            {/* Right: Notification + Profile */}
            <div className="flex items-center gap-4 relative" ref={menuRef}>
                {/* Notification Icon */}
                <button
                    onClick={() => setNotificationBar((prev) => !prev)}
                    className="relative text-gray-400 hover:text-blue-400 transition"
                >
                    <FaRegBell className="text-2xl" />
                    <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Dropdown Menu */}
                {notificationBar && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-32 top-12  w-56 bg-[#121b33] rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50"
                    >
                        <ul className="text-sm text-gray-300">
                            <li className="px-4 py-2 hover:bg-[#1b2544] cursor-pointer transition">
                                Welcome Back
                            </li>
                            <li className="px-4 py-2 hover:bg-[#1b2544] cursor-pointer transition">
                                Login
                            </li>
                            <li className="px-4 py-2 text-blue-400 hover:bg-[#1b2544] cursor-pointer transition">
                                See all
                            </li>
                        </ul>
                    </motion.div>
                )}

                {/* Profile */}
                <div
                    className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md bg-[#121b33] transition hover:bg-[#1b2544]"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <img
                        src={profilePicUrl}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-100"
                    />
                    <div className="hidden md:flex flex-col border-0">
                        <span className="text-sm font-medium">{userDetails.name.split(" ")[0]}</span>
                        <span className="text-[12px] font-medium text-gray-400">User</span>
                    </div>
                </div>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute right-0 top-14 w-48 bg-[#121b33] rounded-lg shadow-lg border border-gray-700 overflow-hidden  z-50">
                        <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm font-medium text-white">Susanta Samanta</p>
                            <p className="text-xs text-gray-400">susanta@gmail.com</p>
                        </div>
                        <ul className="text-sm text-gray-300">
                            {/* <li className="px-4 py-2 hover:bg-[#1b2544] cursor-pointer transition">
                                View Profile
                            </li> */}
                            <li className="px-4 py-2 hover:bg-[#1b2544] cursor-pointer transition text-red-400">
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default DashboardHeader;
