import React from "react";

const NavBar = () => {
  return (
    <nav className="px-20 mt-1 border-b-2 z-30 bg-background-color border-b-primary-color sticky top-0">
      <div className="flex justify-around items-center">
        <h1 className="text-secondary-color">CineMe</h1>
        <ul className="text-text-color nav-ul flex">
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
