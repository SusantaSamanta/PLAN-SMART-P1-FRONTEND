// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-8 flex justify-between items-center px-3 py-5  bg-gray-400 text-black border-0">
      <h2 className="border-0">Plan Smart</h2>
      <ul style={styles.menu}>
        <li><Link to="/" className="">Home</Link></li>
        <li><Link to="/about" className="">About</Link></li>
        <li><Link to="/contact" className="">Contact</Link></li>
        <li><Link to="/login" className="">Login</Link></li>
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
