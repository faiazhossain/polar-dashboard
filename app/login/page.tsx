import Image from "next/image";
import React from "react";
import polarIcon from "@/public/Polar_Icon.svg";
import LoginForm from "@/components/LoginComponents/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center mx-auto justify-around h-screen p-4 md:flex-row md:p-6">
      <div className="mb-32 md:mb-0">
        <Image
          src={polarIcon}
          alt="polar-icon"
          width={204}
          height={158}
          className="mx-auto md:mx-0"
        />
      </div>
      <div className="w-1 h-full relative overflow-hidden hidden md:block">
        <div className="absolute w-1 h-2/5 shadow-[0px_0px_50px_50px_#EC1B2380] top-[30%] bg-[#EC1B2380]"></div>
      </div>
      <div className="w-full flex justify-center md:w-auto md:block">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
