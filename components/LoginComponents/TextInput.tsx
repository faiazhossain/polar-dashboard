import React, { FC, ChangeEvent } from "react";
import { IconType } from "react-icons";

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactElement<IconType>;
  placeholder: string;
}
const TextInput: FC<TextInputProps> = ({
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
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
      />
    </div>
  </div>
);

export default TextInput;
