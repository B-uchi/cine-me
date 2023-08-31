import React from "react";
import { IoMdMenu } from "react-icons/io";

const NavBar = () => {
  return (
    <nav className="sm:px-20 mt-1 border-b-2 z-30 bg-background-color border-b-primary-color sticky top-0 px-4">
      <div className="flex nav-container justify-around items-center">
        <h1 className="text-secondary-color">CineMe</h1>
        <button className="hamburger"><IoMdMenu color="white" size={35}/></button>
        <ul className="text-text-color nav-ul nav-ul flex">
            <li><a href="#">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">Series</a></li>
            <li><a href="#">Tv Shows</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
