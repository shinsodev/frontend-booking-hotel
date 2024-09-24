// import React from 'react'
import { useState, useEffect } from "react"
import LogoWhite from "../../assets/img/logo-white.svg"
import LogoDark from "../../assets/img/logo-dark.svg"

const Header = () => {
  const [header, setHeader] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    })
  })

  return (
    <header className={`${
      header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'
    } fixed z-50 w-full transition-all duration-300`}>

      <div className="container mx-auto flex flex-col items-center gap-y-6
      lg:flex-row lg:justify-between lg:gap-y-0
      ">
        {/* logo  */}
        <a href="/">
          {header ? (
            <img className="w-[160px]" src={LogoDark} alt="logodark" />
          ) : (
            <img className="w-[160px]" src={LogoWhite} alt="logowhite" />
          )}
        </a>

        {/* nav  */}
        <nav className={`${header ? 'text-primary' : 'text-white'}
          flex gap-x-4 font-tertiary tracking-[3px] text-[15px]
          items-center uppercase lg:gap-x-8
        `}>
          <a href="" className="hover:text-accent transition"> Home </a>
          <a href="" className="hover:text-accent transition"> Rooms </a>
          <a href="" className="hover:text-accent transition"> Restaurant </a>
          <a href="" className="hover:text-accent transition"> Spa </a>
          <a href="" className="hover:text-accent transition"> Contact </a>
          
        </nav>
      </div>
      
    </header>
  )
}

export default Header