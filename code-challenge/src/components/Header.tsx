import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-linear-right flex fixed top-0 w-full p-4 md:p-6">
      <nav className="w-full">
        <ul className="flex gap-8 items-center justify-center sm:gap-16">
          <li>
            <Link 
              to="/" 
              className={`hover:text-gray-400 transition-colors duration-300 text-sm sm:text-base ${
                location.pathname === "/" ? "border-b-2 border-white font-bold" : ""
              }`}
            >
              Sum
            </Link>
          </li>
          <li>
            <Link 
              to="/fancy-form"
              className={`hover:text-gray-400 transition-colors duration-300 text-sm sm:text-base ${
                location.pathname === "/fancy-form" ? "border-b-2 border-white font-bold" : ""
              }`}
            >
              Fancy Form
            </Link>
          </li>
          <li>
            <Link 
              to="/messy-react"
              className={`hover:text-gray-400 transition-colors duration-300 text-sm sm:text-base ${
                location.pathname === "/messy-react" ? "border-b-2 border-white font-bold" : ""
              }`}
            >
              Messy React
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
