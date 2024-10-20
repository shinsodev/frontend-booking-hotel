import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import User1 from "../../assets/img/user1.png";

const DashboardHeader = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between lg:justify-end py-4 px-6 shadow-lg">
      {/* Hamburger menu */}
      <button onClick={toggleSidebar} className="lg:hidden"> {/* Only visible on small screens */}
        <GiHamburgerMenu size={22} />
      </button>

      {/* Right side (notifications, profile) */}
      <nav className="text-primary flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8">
        <button>
          <IoMdNotifications size={25} />
        </button>
        <div className="flex">
          <div className="flex items-center justify-center">
            <img src={User1} alt="" className="w-10 object-cover rounded-full" />
          </div>
          <div className="flex flex-col mx-4">
            <div className="font-medium text-[17px]">Jeanne</div>
            <div className="text-gray-500 text-[12px]">Admin</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardHeader;
