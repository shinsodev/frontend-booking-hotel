import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoIosLogOut, IoIosHeartEmpty } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { MdOutlineCategory, MdOutlineBedroomParent } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TbCurrencyDollar } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";
import { FaStar, FaThumbsUp } from "react-icons/fa";

import ModalConfirm from "../ModalConfirm/ModalConfirm";
import logoutImage from "../../assets/img/logout.jpg";
import Logo from "../../assets/img/LogoHotel.jpg";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hàm xử lý logout
  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate("/"); // Điều hướng về trang home sau khi logout
  };

  // Hàm tạo class cho các NavLink
  const getNavLinkClass = (isActive) =>
    `flex items-center gap-3 mb-2 p-4 rounded-lg text-white hover:bg-accent hover:scale-105 text-[17px] font-medium transition-all duration-300 ease-in-out ${
      isActive ? "text-white bg-accent" : ""
    }`;

  return (
    <>
      <section className="flex flex-col min-h-screen">
        {/* Logo và tên khách sạn */}
        <NavLink to="/" className="flex items-center mb-6">
          <div className="w-16">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="pl-2 text-[25px] font-primary text-white">
            Aurora Grand
          </div>
        </NavLink>

        {/* Các mục điều hướng của Sidebar */}
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <CiGrid41 size={22} />
            <span>Dashboard</span>
          </NavLink>

          {/* Mục hiển thị cho Admin */}
          {user?.role === "ADMIN" && (
            <>
              {/* <NavLink to="/admin/createroom" className={({ isActive }) => getNavLinkClass(isActive)}>
                <FaPlusCircle size={22} />
                <span>Create Room</span>
              </NavLink> */}

              <NavLink
                to="/admin/userlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FiUser size={22} />
                <span>All Users</span>
              </NavLink>

              <NavLink
                to="/admin/roomlist"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MdOutlineBedroomParent size={22} />
                <span>All Rooms List</span>
              </NavLink>

              <NavLink
                to="/admin/booking-history"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaHistory size={22} />
                <span>Booking History</span>
              </NavLink>

              <NavLink
                to="/admin/booking-late-payments"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaHistory size={22} />
                <span>Booking Late Payment</span>
              </NavLink>

              <NavLink
                to="/admin/promotion"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MdOutlineCategory size={22} />
                <span>Promotion</span>
              </NavLink>

              <NavLink
                to="/admin/report"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <TbCurrencyDollar size={22} />
                <span>Report</span>
              </NavLink>
            </>
          )}

          {/* Mục hiển thị cho User */}
          {user?.role === "USER" && (
            <>
              {/* <NavLink to="/payment" className={({ isActive }) => getNavLinkClass(isActive)}>
                <TbCurrencyDollar size={22} />
                <span>Payment</span>
              </NavLink> */}

              <NavLink
                to="/recent-booking"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <TbCurrencyDollar size={22} />
                <span>Recent Booking</span>
              </NavLink>

              <NavLink
                to="/booking-history"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaHistory size={22} />
                <span>Booking History</span>
              </NavLink>

              <NavLink
                to="/user-review"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <FaStar size={22} />
                <span>Review</span>
              </NavLink>

              {/* <NavLink to="/favorites" className={({ isActive }) => getNavLinkClass(isActive)}>
                <IoIosHeartEmpty size={22} />
                <span>My Favorites</span>
              </NavLink> */}
            </>
          )}

          {/* Mục Profile cho cả User và Admin */}
          <NavLink
            to="/profile"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <IoSettingsOutline size={22} />
            <span>Personal Profile</span>
          </NavLink>

          {/* Nút Logout */}
          <div className="flex items-center justify-center m-5 hover:opacity-60 text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-3 text-white bg-red-500 py-4 px-12 rounded-full"
            >
              <IoIosLogOut size={22} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Modal xác nhận logout */}
        <ModalConfirm
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          image={logoutImage}
        />
      </section>
    </>
  );
};

export default Sidebar;
