import React, { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import User1 from "../../assets/img/user1.png"; // Hình ảnh người dùng (có thể thay đổi)
import UserIcon from "../../assets/img/userIcon.png";

import { AuthContext } from "../../context/AuthContext"; // Đảm bảo import đúng đường dẫn

const DashboardHeader = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng từ context

  return (
    <div className="flex items-center justify-between lg:justify-end py-4 px-6 shadow-lg">
      {/* Hamburger menu */}
      <button onClick={toggleSidebar} className="lg:hidden">
        {" "}
        {/* Only visible on small screens */}
        <GiHamburgerMenu size={22} />
      </button>

      {/* Right side (notifications, profile) */}
      <nav className="text-primary flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8">
        <button>
          <IoMdNotifications size={25} />
        </button>
        <div className="flex">
          <div className="flex items-center justify-center">
            <img
              src={user.imageUrl || UserIcon}
              alt="User Profile"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col mx-4">
            {/* Hiển thị tên và vai trò của người dùng */}
            <div className="font-medium text-[17px]">
              {user ? user.name : "User"}
            </div>
            <div className="text-gray-500 text-[12px]">
              {user ? user.role : "Guest"}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardHeader;
