"use client";
import React, { useState } from "react";
import {
  RiEyeLine,
  RiEyeCloseLine,
  RiProfileLine,
  RiLockPasswordLine,
} from "react-icons/ri";

const LoginFormInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto py-24 px-6 max-w-lg font-sans bg-[#EC1B231A]">
      <div className="max-w-sm mx-auto">
        <form className="mt-8">
          <div className="max-w-lg mx-auto">
            <div className="py-2 bg-white rounded-lg mb-4">
              <label className="px-1 text-sm text-gray-600 ml-2">Email</label>
              <div className="flex items-center ml-3">
                <RiProfileLine className="text-xl text-[#EC1B23]" />
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="text-md block px-3 rounded-lg w-full bg-white placeholder-gray-300 focus:outline-none focus:placeholder-gray-200 "
                />
              </div>
            </div>
            <div className="py-2 bg-white relative rounded-lg">
              <label className="px-1 text-sm text-gray-600 ml-2">
                Password
              </label>
              <div className="flex items-center ml-3">
                <RiLockPasswordLine className="text-xl text-[#EC1B23]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="text-md block px-3 rounded-lg w-full bg-white placeholder-gray-300 focus:outline-none focus:placeholder-gray-200 "
                />
              </div>
              <div
                className="absolute text-[#EC1B23] inset-y-0 top-5 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
              </div>
            </div>
            <div className="flex justify-between my-4">
              <label className="block text-gray-500 font-bold">
                <input
                  type="checkbox"
                  className="leading-loose text-pink-600"
                />
                <span className="py-2 text-sm text-gray-600 leading-snug">
                  {" "}
                  Remember Me{" "}
                </span>
              </label>
              <a
                href="#"
                className="block text-gray-500 border-gray-200 hover:border-b-2 font-lato"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="mt-3 text-lg font-lato font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 shadow-xl hover:bg-black"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginFormInput;
