import React, { FC, ChangeEvent } from "react";
import { RiLockPasswordLine, RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const PasswordInput: FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}) => (
  <div className="py-2 bg-white relative rounded-lg mt-4">
    <label className="px-1 text-sm text-gray-600 ml-2">{label}</label>
    <div className="flex items-center ml-3">
      <RiLockPasswordLine className="text-xl text-[#EC1B23]" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="************"
        value={value}
        onChange={onChange}
        className="text-md block px-3 rounded-lg w-full bg-white placeholder-gray-300 focus:outline-none focus:placeholder-gray-200"
      />
    </div>
    <div
      className="absolute text-[#EC1B23] inset-y-0 top-5 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
      onClick={toggleShowPassword}
    >
      {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
    </div>
  </div>
);

export default PasswordInput;
