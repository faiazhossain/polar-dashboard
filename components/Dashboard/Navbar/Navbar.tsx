// components/Navbar.js

import Image from "next/image";
import PolarIcon from "@/public/Polar_Icon.svg";
import Profile from "@/public/profile.png";
const Navbar = () => {
  return (
    <nav className="bg-white px-6 py-2 flex justify-between items-center @apply shadow-[0px_0px_10px_5px_#00000026]">
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
      <div className="flex items-center gap-2">
        {/* Profile Picture */}
        <span className="text-[#EC1B23] text-sm">John Doe</span>
        <div className="w-12 h-12">
          <Image
            src={Profile}
            alt="Logo"
            className="rounded-full"
            width={50}
            height={50}
            layout="responsive"
          />
        </div>
        {/* User Name */}
      </div>
    </nav>
  );
};

export default Navbar;
