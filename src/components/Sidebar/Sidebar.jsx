import React, { useContext } from 'react';
import User1 from "../../assets/img/user1.png";
import { NavLink, useLocation } from 'react-router-dom';
import { CiGrid41 } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { CgProductHunt } from "react-icons/cg";
import { TbCurrencyDollar } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";

import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import logoutImage from '../../assets/img/logout.jpg';
import Logo from '../../assets/img/LogoHotel.jpg'

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();  // Gọi hàm logout từ context
    navigate('/'); // Điều hướng đến trang home sau khi logout
  };

  // const location = useLocation();
  const role = "admin";

  // Corrected template literal for dynamic classes
  const getNavLinkClass = (isActive) =>
    `flex items-center gap-3 mb-2 p-4 rounded-lg text-white hover:bg-accent hover:scale-105 text-[17px] font-medium transition-all duration-300 ease-in-out ${
      isActive ? 'text-white bg-accent' : ''
    }`;

  return (
    <>
      <section className="flex flex-col min-h-screen">
        {/* <div className="profile flex items-center text-center justify-center gap-8 flex-col mb-8">
          <img src={User1} alt="" className="w-32 h-32 rounded-full object-cover" />
          <div>
            <h1 className="capitalize">Sunil B.K</h1>
            <div>example@gmail.com</div>
          </div>
        </div> */}
        
        <NavLink to="/" className='flex items-center mb-6'>
          <div className='w-16'><img src={Logo} alt="" /></div>
          <div className='pl-2 text-[25px] font-primary text-white'>Aurora Grand</div>
        </NavLink>

        <div>
          <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
            <span>
              <CiGrid41 size={22} />
            </span>
            <span>Dashboard</span>
          </NavLink>

          {(role === "admin") && (
            <>
              {/* <NavLink
                to="/product"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <MdOutlineCategory size={22} />
                </span>
                <span>My Products</span>
              </NavLink> */}
              <NavLink
                to="/admin/createroom"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <FaPlusCircle size={22} />
                </span>
                <span>Create Room</span>
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink
                to="/admin/userlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <FiUser size={22} />
                </span>
                <span>All Users</span>
              </NavLink>

              <NavLink
                to="/admin/roomlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <MdOutlineBedroomParent size={22}/>
                </span>
                <span>All Rooms List</span>
              </NavLink>

              <NavLink
                to="/admin/events"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <MdOutlineCategory size={22} />
                </span>
                <span>Events</span>
              </NavLink>

              <NavLink
                to="/admin/report"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <TbCurrencyDollar size={22} />
                </span>
                <span>Report</span>
              </NavLink>
            </>
          )}

          {(role === "user") && (
            <>
              <NavLink
                to="/Paymnent"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <TbCurrencyDollar size={22} />
                </span>
                <span>Payment</span>
              </NavLink>
              <NavLink
                to="/favorites"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <IoIosHeartEmpty size={22} />
                </span>
                <span>My Favorites</span>
              </NavLink>
            </>
          )}

          
          <NavLink
            to="/profile"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <span>
              <IoSettingsOutline size={22} />
            </span>
            <span>Personal Profile</span>
          </NavLink>

          <div className='flex items-center justify-center m-5 hover:opacity-60 text-center'>
            <button onClick={() => setModalOpen(true)} className="flex items-center gap-3 text-white bg-red-500 py-4 px-12 rounded-full">
              <span>
                <IoIosLogOut size={22} />
              </span>
              <span>Log Out</span>
            </button>
          </div>

          <ModalConfirm
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Logout"
            message="Are you sure you want to log out?"
            onConfirm={handleLogout}
            image={logoutImage} 

          />

        </div>
      </section>
    </>
  );
};

export default Sidebar;