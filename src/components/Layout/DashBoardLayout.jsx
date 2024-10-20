import React, { useState } from 'react';
import Sidebar from "../Sidebar/Sidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar visibility
  const role = "admin";

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <>
      <section>
        <div className="flex flex-row">
          {/* Sidebar */}
          <div 
            className={`${
              isSidebarOpen ? 'block' : 'hidden'
            } lg:block fixed lg:static z-40 top-0 left-0 w-[65%] lg:w-[20%] bg-neutral-700 px-2 py-4 transition-transform lg:transition-none`}
          >
            <Sidebar role={role} />
          </div>

          {/* Content area */}
          <div className="w-full lg:w-[80%] bg-white">
            <DashboardHeader toggleSidebar={toggleSidebar} /> {/* Pass the toggleSidebar function */}
            {children}
          </div>
        </div>

        {/* Overlay for small screens when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar} // Close sidebar when clicking on overlay
          ></div>
        )}
      </section>
    </>
  );
};

export default DashboardLayout;
