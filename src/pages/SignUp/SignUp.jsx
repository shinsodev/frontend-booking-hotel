// import React from 'react'
import ImgCover from '../../assets/img/HeroSlider/3.jpg'
import GOOGLE from '../../assets/img/google.svg'
import LogoDark from "../../assets/img/LogoHotel.jpg"


const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disbaled: "#D9D9D9"
}

const SignUp = () => {
    return (
        <div className="w-full h-screen flex items-start pt-20 mb-20">
            <div className="relative w-1/2 h-full flex flex-col ">
                <div className='absolute top-[15%] left-[10%] flex flex-col'>
                    <h1 className='text-4xl text-white font-tertiary font-bold my-4'>Turn your Ideas into reality</h1>
                    <p className='text-xl text-white font-tertiary'>Start for free and get attractive offers from the community</p>
                </div>
                <img src={ImgCover} className="w-full h-full object-cover " />
            </div>

            <div className='w-1/2 py-6 h-full bg-[#f5f5f5] flex flex-col justify-between items-center' >
                <img src={LogoDark} className='h-24 mr-10' />

                <div className='w-full flex flex-col max-w-[500px] '>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2'>Login</h3>
                        <p className='text-base mb-2'>Welcome Back! Please enter your details</p>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input
                            type='emall'
                            placeholder='Email'
                            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                        />

                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                        />
                    </div>

                    <div className='w-full flex items-center justify-between'>
                        <div className='w-full flex items-center'>
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <p className="text-sm">Remember me</p>
                        </div>

                        <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password ?</p>
                    </div>

                    <div className='w-full flex flex-col my-4'>
                        <button className='w-full font-semibold text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer' >
                            Log in
                        </button>
                        <button className='w-full font-semibold text-[#060606] my-2 bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Register
                        </button>
                    </div>

                    <div className='w-full flex items-center justify-center relative py-2 cursor-pointer' >
                        <div className='w-full h-[1px] bg-black/40'></div>
                        <p className='text-lg absolute text-black/40 bg-[#f5f5f5]'>or</p>
                    </div>

                    <div className='w-full font-semibold text-[#060606] my-2 bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                        <img src={GOOGLE} className='h-6 mr-2' />
                        Sign In With Google
                    </div>
                </div>

                <div className='w-full flex  items-center justify-center'>
                    <p className='text-sm font-normal text-[#060606]'>Dont have a account?<span className='font-semibold underline underline-offset-2 cursor-pointer'>Sign up for free</span></p>
                </div>

            </div>
        </div>
    )
}

export default SignUp