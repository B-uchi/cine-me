import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showing,setShowing] = useState(false)
  return (
    <nav className="sm:px-20 mt-1 border-b-2 z-30 bg-background-color border-b-primary-color sticky top-0 px-4">
      <div className="flex nav-container justify-around items-center">
        <h1 className="text-secondary-color">CineMe</h1>
        <button className="hamburger" onClick={()=>setShowing(!showing)}>
          <IoMdMenu color="white" size={35} />
        </button>
        <ul className="text-text-color nav-ul nav-ul flex">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/movies"}>Movies</Link>
          </li>
          <li>
            <Link to={"/shows"}>Tv Shows</Link>
          </li>
        </ul>
        {showing? <div className="absolute nav-mobile left-5 right-10 mt-56 list-none p-1 bg-hover-color rounded flex-col flex justify-center items-center w-[90%]">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/movies"}>Movies</Link>
            </li>
            <li>
              <Link to={"/shows"}>Tv Shows</Link>
            </li>
        </div> : ""}
      </div>
    </nav>
  );
};

export default NavBar;
