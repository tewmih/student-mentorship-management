import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ["AboutUs", "Contact"];

export default function Navbar() {
  return (
    <div className="flex fixed z-100 items-center justify-between h-20 bg-gray-50 w-[100%] shadow-sm px-6 ">
      {/* Left: Logo */}
      <NavLink to="/" className="focus:outline-none">
        <img src="/Logo.png" alt="student mentor logo" className="h-12 w-12" />
      </NavLink>

      {/* Center: Nav items */}
      <ul className="flex flex-row space-x-8 cursor-pointer text-gray-700 font-medium">
        {NavItem.map((item) => (
          <li
            key={item}
            className="hover:text-purple-600 cursor-pointer select-none"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Right: Login */}
      <NavLink to="/login" className="focus:outline-none">
        <h1 className="text-gray-800 font-medium cursor-pointer bg-blue-500 p-2 rounded-sm hover:text-purple-600 select-none">
          LOGIN
        </h1>
      </NavLink>
    </div>
  );
}
