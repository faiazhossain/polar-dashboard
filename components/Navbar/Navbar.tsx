// components/Navbar.js

import Image from "next/image";
import PolarIcon from "@/public/Polar_Icon.svg";
const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <Image src={PolarIcon} alt="Logo" width={30} height={20} />
      </div>

      <div className="flex items-center space-x-4">
        {/* Title */}
        <h1 className="text-[#EC1B23] text-lg font-bold">Polar Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <span className="text-[#EC1B23] text-sm">John Doe</span>
        <Image
          src={PolarIcon}
          alt="Logo"
          width={30}
          height={20}
          className="rounded-full"
        />
        {/* User Name */}
      </div>
    </nav>
  );
};

export default Navbar;
