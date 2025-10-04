// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";


const Navbar = () => {


  const {
    isLogin, setIsLogin,
    userDetails, setUserDetails,
    isLoading, setIsLoading } = useContext(AppContext)

  const navigate = useNavigate();


  const handelLogout = async () => {
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




  return (
    <nav className="h-8 w-full flex justify-between items-center px-3 py-5 fixed top-0 left-0 bg-[#d6d6d6c4] text-black border-0 z-50">
      <h2 className="border-0">Plan Smart</h2>
      <ul className="flex gap-5">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {
          isLoading ?
            <li><Link to="/login">Loading....</Link></li>
            :
            <div className="flex gap-5">

              {
                !isLogin &&
                <li><Link to="/login">Login</Link></li>
              }
              {
                !isLogin &&
                <li><Link to="/signup">Sign up</Link></li>
              }
              {
                isLogin &&
                <li><Link to="/profile">Profile</Link></li>
              }
              {
                isLogin &&
                <li><Link onClick={() => handelLogout()} to="/logout">Logout</Link></li>
              }

            </div>
        }


      </ul>
    </nav>
  );
};

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

export default Navbar;
