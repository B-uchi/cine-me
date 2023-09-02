import React from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sm:px-20 mt-1 border-b-2 z-30 bg-background-color border-b-primary-color sticky top-0 px-4">
      <div className="flex nav-container justify-around items-center">
        <h1 className="text-secondary-color">CineMe</h1>
        <button className="hamburger"><IoMdMenu color="white" size={35}/></button>
        <ul className="text-text-color nav-ul nav-ul flex">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/movies'}>Movies</Link></li>
            <li><Link to={'/series'}>Series</Link></li>
            <li><Link to={'/shows'}>Tv Shows</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
