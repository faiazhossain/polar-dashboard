import React from 'react';
import navbarGuide from '@/public/guidePictures/NavbarGuide-img1.png'; // Replace with the correct path to your image
import Image from 'next/image';

const NavbarGuide = () => {
  return (
    <li>
      <strong>Navbar:</strong> The Navbar is located at the top of the dashboard
      and serves as a primary navigation tool. Its main feature is the profile
      section, which includes a user icon on the top-right corner. Clicking on
      the profile icon opens a dropdown menu with options (currently, only a
      "Logout" feature is available). This section is designed for quick access
      to user-related actions.
      <div className="mt-2">
        <Image
          src={navbarGuide}
          alt="Profile Icon Example"
          //   className="w-16 h-16 rounded-full"
        />
      </div>
    </li>
  );
};

export default NavbarGuide;
