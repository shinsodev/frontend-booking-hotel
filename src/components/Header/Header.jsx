// import React from 'react'
import { useState, useEffect } from "react"
import LogoWhite from "../../assets/img/logo-white.svg"
import LogoDark from "../../assets/img/logo-dark.svg"
import Logo from "../../assets/img/LogoHotel.jpg"
import { Link, NavLink } from "react-router-dom"
import User1 from "../../assets/img/User1.png"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Thêm sự kiện scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Mảng rỗng để chỉ chạy khi component mount/unmount

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHomePage = location.pathname === "/";
  const isRoomPage = location.pathname === "/rooms";

  return (
    // ${
      // header ? 'bg-white py-1 shadow-lg' : 'bg-transparent py-5'
    // } 
    <header className={`${
      (isHomePage || isRoomPage) && !isScrolled ? 'bg-transparent py-5 text-white' : 'bg-white py-1 shadow-lg'
    } fixed z-50 w-full transition-all duration-300`}>

      <div className="container mx-auto flex flex-col items-center 
      lg:flex-row lg:justify-between lg:gap-y-0
      ">
        {/* logo  */}
        <Link to="/" className="flex items-center">
          {isHomePage ? (
            <img className="w-20" src={Logo} alt="logodark" />
          ) : (
            <img className="w-20" src={Logo} alt="logowhite" />
          )}

          <span className="pl-2 text-[25px] font-primary">Aurora Grand</span>
        </Link>

        {/* nav  */}
        <nav className="(isHomePage || isRoomPage) && !isScrolled ? (text-white) : (text-primary) flex
          gap-x-4 font-tertiary tracking-[3px] text-[15px]
          items-center uppercase lg:gap-x-8"
        >
          <NavLink to="/" className="hover:text-accent transition"> Home </NavLink>
          <NavLink to="/rooms" className="hover:text-accent transition"> Rooms </NavLink>
          <NavLink to="/" className="hover:text-accent transition"> Contact </NavLink>
          
          {/* <NavLink to="rooms" className="btn btn-sm btn-primary mx-auto">
            Book Now
          </NavLink> */}

          {/* <NavLink to="/login" className="bg-accent px-4 py-2 rounded-lg text-white hover:opacity-60">
            Login
          </NavLink> */}

          <NavLink to="/dashboard" className="w-10 h-10">
            <img src={User1} alt="" className="w-full h-full object-cover"/>
          </NavLink>

          <div className="lg:hidden px-6 py-3 bg-slate-600"> trigger </div>
        </nav>

      </div>
      
    </header>
  )
}

export default Header