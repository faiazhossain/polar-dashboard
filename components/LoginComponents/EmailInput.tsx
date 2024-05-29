import React, { FC, ChangeEvent } from "react";
import { IconType } from "react-icons";

interface EmailInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactElement<IconType>;
  placeholder: string;
  autoComplete?: string; // Optional prop
  list?: string; // Optional prop
}
const EmailInput: FC<EmailInputProps> = ({
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
  autoComplete,
  list,
}) => (
  <div className="py-2 bg-white rounded-lg">
    <label className="px-1 text-sm text-gray-600 ml-2">{label}</label>
    <div className="flex items-center ml-3">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-md block px-3 rounded-lg w-full bg-white placeholder-gray-300 focus:outline-none focus:placeholder-gray-200"
        autoComplete={autoComplete} // Pass the prop to the input element
        list={list} // Pass the prop to the input element
      />
    </div>
  </div>
);

export default EmailInput;
