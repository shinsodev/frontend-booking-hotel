// components/Notification/Notification.jsx
import React from 'react';
import { X } from "react-feather"; // Import biểu tượng X từ react-feather

const Notification = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-500 rounded-xl shadow-2xl px-20 py-16 transition-all scale-100 opacity-100"
      >

        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        
        <p className="mb-4 text-3xl font-medium text-white">{message}</p>
        {/* <div className="flex justify-center items-center">
          <button onClick={onClose} className="py-3 px-10 rounded-md bg-white hover:bg-gray-400 shadow-lg">
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Notification;
