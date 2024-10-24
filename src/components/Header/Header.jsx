import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/img/LogoHotel.jpg";
import User1 from "../../assets/img/User1.png";
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng

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

  const isHomePage = window.location.pathname === "/";
  const isRoomPage = window.location.pathname === "/rooms";

  return (
    <header className={`${
      (isHomePage || isRoomPage) && !isScrolled ? 'bg-transparent py-5 text-white' : 'bg-white py-1 shadow-lg'
    } fixed z-50 w-full transition-all duration-300`}>
      
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between lg:gap-y-0">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="w-20" src={Logo} alt="Logo" />
          <span className="pl-2 text-[25px] font-primary">Aurora Grand</span>
        </Link>

        {/* Navigation */}
        <nav className={`${
          (isHomePage || isRoomPage) && !isScrolled ? 'text-white' : 'text-primary'
        } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>
          <NavLink to="/" className="hover:text-accent transition"> Home </NavLink>
          <NavLink to="/rooms" className="hover:text-accent transition"> Rooms </NavLink>
          <NavLink to="/" className="hover:text-accent transition"> Contact </NavLink>
          
          <NavLink to="/dashboard" className="flex items-center w-10 h-10">
            <img src={User1} alt="" className="w-full h-full object-cover"/>
            {user && (
              <span className="ml-2 font-medium text-[15px]">
                {user.name} {/* Hiển thị tên người dùng */}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
