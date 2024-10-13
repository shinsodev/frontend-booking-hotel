import React from 'react';
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

const Sidebar = () => {
  // const location = useLocation();
  const role = "admin";

  // Corrected template literal for dynamic classes
  const getNavLinkClass = (isActive) =>
    `flex items-center gap-3 mb-2 p-4 rounded-lg hover:text-white hover:bg-accent hover:scale-105 text-[17px] font-medium transition-all duration-300 ease-in-out ${
      isActive ? 'text-white bg-accent' : ''
    }`;

  return (
    <>
      <section className="flex flex-col justify-between h-full">
        <div className="profile flex items-center text-center justify-center gap-8 flex-col mb-8">
          <img src={User1} alt="" className="w-32 h-32 rounded-full object-cover" />
          <div>
            <h1 className="capitalize">Sunil B.K</h1>
            <div>example@gmail.com</div>
          </div>
        </div>

        <div>
          <NavLink to="/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
            <span>
              <CiGrid41 size={22} />
            </span>
            <span>Dashboard</span>
          </NavLink>

          {(role === "seller" || role === "admin") && (
            <>
              <NavLink
                to="/product"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <MdOutlineCategory size={22} />
                </span>
                <span>My Products</span>
              </NavLink>
              <NavLink
                to="/add"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <FaPlusCircle size={22} />
                </span>
                <span>Create Product</span>
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink
                to="/userlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <FiUser size={22} />
                </span>
                <span>All User</span>
              </NavLink>

              <NavLink
                to="/product/admin"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <CgProductHunt size={22} />
                </span>
                <span>All Product List</span>
              </NavLink>

              <NavLink
                to="/category"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <MdOutlineCategory size={22} />
                </span>
                <span>Categories</span>
              </NavLink>

              <NavLink
                to="/admin/income"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <span>
                  <TbCurrencyDollar size={22} />
                </span>
                <span>Income</span>
              </NavLink>
            </>
          )}

          <NavLink
            to="/winning-products"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <span>
              <RiAuctionLine size={22} />
            </span>
            <span>Winning Bids</span>
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
            <button className="flex items-center gap-3 text-white bg-red-500 py-4 px-12 rounded-full">
              <span>
                <IoIosLogOut size={22} />
              </span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;