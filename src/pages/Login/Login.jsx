/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import Logo from "../../assets/img/room.jpg";
import GoogleImg from "../../assets/img/google.svg";

const Login = () => {
  return (
    <section className="bg-accent/50 flex items-center justify-center pt-28 pb-6">
      {/* Login container */}
      <div className="bg-gray-50 flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] items-center">
        {/* Form */}
        <div className="md:w-1/2 px-10">

            <h2 className="font-bold text-4xl text-primary h2 text-center mt-10">Login</h2>

          <form action="" className="flex flex-col gap-4">
            <input
              className="p-2 border-b border-black outline-none"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <div className="relative">
              <input
                className="p-2 w-full border-b border-black outline-none"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-xs hover:underline">
              <a href="#">Forgot your password?</a>
            </div>
            <button className="bg-accent rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="my-5 grid grid-cols-1 items-center text-gray-400">

            <p className="text-center text-sm">OR</p>

          </div>

          <button className="bg-white border py-2 w-full rounded-xl flex justify-center items-center text-sm hover:scale-105 duration-300 text-primary border-gray-400">
            <img src={GoogleImg} alt="" className="h-6 pr-2" />
            Login with Google
          </button>

          

          <div className="mt-3 text-xs flex justify-between items-center mb-10">
            <p>Don't have an account?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 border-gray-400">
              Register
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:block hidden w-1/2 overflow-hidden pr-10">
          <img
            className="rounded-2xl object-cover w-full h-full"
            src={Logo}
            alt="Login Background"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
