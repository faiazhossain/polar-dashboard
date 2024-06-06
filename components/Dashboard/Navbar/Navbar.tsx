import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PolarIcon from "@/public/Polar_Icon.svg";
import Profile from "@/public/profile.png";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-white px-6 py-2 flex justify-between items-center shadow-[0px_0px_10px_5px_#00000026]">
      {/* Left Section */}
      <div className="flex items-center space-x-4 w-16 h-14">
        {/* Logo */}
        <Image
          src={PolarIcon}
          alt="Logo"
          width={70}
          height={54}
          layout="responsive"
        />
      </div>

      <div className="flex items-center space-x-4">
        {/* Title */}
        <h1 className="text-[#EC1B23] text-sm md:text-xl font-[700] px-6">
          Polar Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleProfileClick}
        >
          {/* Profile Picture */}
          <span className="text-[#EC1B23] text-sm">Admin</span>
          <div
            className={`w-12 h-12 ${
              dropdownVisible ? "border-2 rounded-full border-red-500" : ""
            }`}
          >
            <Image
              src={Profile}
              alt="Profile"
              className="rounded-full"
              width={50}
              height={50}
              layout="responsive"
            />
          </div>
        </div>
        {dropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
          >
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
