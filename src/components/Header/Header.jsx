import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/img/LogoHotel.jpg";
import User1 from "../../assets/img/user1.png";
import UserIcon from "../../assets/img/userIcon.png";

import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHomePage = window.location.pathname === "/";
  const isRoomPage = window.location.pathname === "/rooms";

  return (
    <header
      className={`${
        (isHomePage || isRoomPage) && !isScrolled
          ? "bg-transparent py-5 text-white lg:text-primary" // text-primary for larger screens
          : "bg-white py-1 shadow-lg text-black lg:text-primary" // text-black for mobile
      } fixed z-50 w-full transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between p-4 lg:p-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img className="w-20" src={Logo} alt="Logo" />
          <span
            className={`pl-2 text-[25px] font-primary hidden lg:block transition-all ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            Aurora Grand
          </span>
        </Link>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="lg:hidden text-2xl">
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } lg:flex flex-col gap-4 items-center absolute lg:static top-full left-0 right-0 lg:gap-x-8 lg:top-0 lg:flex-row ${
            (isHomePage || isRoomPage) && !isScrolled
              ? "text-black lg:text-white" // text-black on mobile, white on large screens
              : "text-black"
          } bg-white lg:bg-transparent lg:w-auto w-full p-5 lg:p-0 shadow-md lg:shadow-none transition-all duration-300`}
        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent transition-all"
          >
            Home
          </NavLink>
          <NavLink
            to="/rooms"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent transition-all"
          >
            Rooms
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-accent transition-all"
          >
            Contact
          </NavLink>

          {/* Avatar and Username */}
          <div className="flex items-center space-x-2 lg:ml-4">
            <NavLink
              to="/dashboard"
              className="w-10 h-10 hover:text-accent transition-all"
            >
              <img
                src={user?.imageUrl || UserIcon}
                alt="User avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </NavLink>
            {user && (
              <span className="font-medium text-[15px] whitespace-nowrap">
                {user.name}
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
