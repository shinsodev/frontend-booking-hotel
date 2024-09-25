// import React from 'react'
import LogoWhite from "../../assets/img/logo-white.svg"
import Logo from "../../assets/img/LogoHotel.jpg"

const Footer = () => {
  return (
    <footer className="bg-primary py-6">
      <div className="container mx-auto text-white flex items-center justify-between">
        {/* logo  */}
        <a href="/">
          <img src={Logo} alt="logo" className="w-20"/>
        </a>
        
        Copyright &copy; 2024. All rights reserved
      </div>

    </footer>
  )
}

export default Footer