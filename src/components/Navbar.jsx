// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Link as ScrollLink } from "react-scroll"
import MobileNavbar from "./MobileNavbar";
import MobileMenu from "./MobileMenu";


const Navbar = () => {

  const navigate = useNavigate();

  const {
    isLogin, setIsLogin,
    userDetails, setUserDetails,
    isLoading, setIsLoading } = useContext(AppContext)




  const clickToScroll = (section) => {
    if (section == 'home') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const to = document.getElementById(section);
      if (to) {
        to.scrollIntoView({ behavior: "smooth", block: "center", });
      }
    }
  }






  const handleLogout = async () => {
    try {
      const { data } = await axios.post('/api/auth/logout');
      console.log(data);
      if (data.success) {
        navigate('/');
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error);

    }
  }


  const bars = Array.from({ length: 20 });

  return (

    <nav className="w-full flex justify-center items-center fixed top-0 left-0 z-60 border-0">
      {/* <div className="h-35 w-full bg-[#a5a5a500] absolute top-0 left-0 z-40">
        {bars.map((_, index) => {
          const height = 5 * (index + 1); // each increases by 5%
          return (
            <div
              key={index}
              className="w-full backdrop-blur-[1px] bg-[#00000000] rounded-sm absolute  border-0 border-white"
              style={{ height: `${height}%` }}
            ></div>
          );
        })}
      </div> */}



      {/* This is for mid to large screen  */}
      <section className="hidden md:flex items-center justify-between px-6 lg:px-12 py-3 
                    bg-gradient-to-r from-[#0a3cff] via-[#0e2b90] to-[#040c2e]
                    text-white shadow-lg rounded-xl mx-auto mt-4 w-[95%] max-w-7xl z-50">

        {/* Logo */}
        <Link to={'/'} onClick={() => clickToScroll('home')} className="flex items-center gap-2">
          <img src="../src/assets/react.svg" alt="logo" className="w-8 h-8 hidden lg:block hover:animate-[spin-slow_6s_linear_infinite]" />
          <h1 className="font-semibold text-lg">VISION</h1>
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8 text-sm font-medium">

          <Link to={'/about'} onClick={() => clickToScroll('about')} className="hover:text-blue-300 cursor-pointer transition">
            About
          </Link>

          <Link to={'/features'} onClick={() => clickToScroll('features')} className="hover:text-blue-300 cursor-pointer transition">
            Features
          </Link>

          <Link to={'/contact'} className="hover:text-blue-300 cursor-pointer transition">Contact Us</Link>

          {!isLoading && isLogin && (
            <Link to="/dashboard" className="hover:text-blue-300 cursor-pointer transition">
              Dashboard
            </Link>
          )}

        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {!isLoading &&
            <div>
              {
                !isLogin &&
                <Link to={'/login'} className="text-sm font-medium hover:text-blue-300 transition">
                  Login
                </Link>
              }
              {
                isLogin &&
                <button onClick={() => handleLogout()} className="text-sm font-medium hover:text-blue-300 transition">
                  Logout
                </button>
              }

            </div>
          }
          <Link to={'/signup'} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold 
                           px-4 py-2 rounded-full transition">
            Sign Up
          </Link>
        </div>
      </section>




      {/* This for small screen  */}
      <MobileNavbar />


    </nav>
  );
};


/*
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
  },
};
*/
export default Navbar;
