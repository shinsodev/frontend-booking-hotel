import React from "react";
import LogoWhite from "../../assets/img/logo-white.svg";
import Logo from "../../assets/img/LogoHotel.jpg";
// Giả sử bạn sử dụng thư viện `react-icons` để thêm các biểu tượng social media
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary py-6">
      <div className="container mx-auto text-white flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <a href="/">
            <img src={Logo} alt="Logo" className="w-24 md:w-20" />
          </a>
          <p className="mt-2 text-sm">
            Copyright &copy; 2024. All rights reserved
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
          <div className="hover:underline hover:cursor-pointer text-sm">
            About Us
          </div>
          <div className="hover:underline hover:cursor-pointer text-sm">
            Services
          </div>
          <div className="hover:underline hover:cursor-pointer text-sm">
            Contact
          </div>
          <div className="hover:underline hover:cursor-pointer text-sm">
            Privacy Policy
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-white text-2xl hover:text-blue-600" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white text-2xl hover:text-pink-500" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-white text-2xl hover:text-blue-400" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-white text-2xl hover:text-blue-700" />
          </a>
        </div>

        {/* Contact Information */}
        <div className="mt-6 md:mt-0 text-center md:text-right">
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: support@hotel.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
