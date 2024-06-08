import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TiTick } from "react-icons/ti";

interface Option {
  value: string;
  percentage?: number;
}

interface DropdownProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  const handleOpenPanel = (e: any) => {
    console.log("🚀 ~ handleOpenPanel ~ e:", e.target);
    !disabled && setIsOpen(!isOpen);
  };

  return (
    <div className={`mb-4 relative `}>
      {!disabled && (
        <label
          className={`text-sm mb-1 block absolute top-[-11px] left-8 bg-white font-extralight`}
        >
          {label}
        </label>
      )}
      <div
        className={`w-full border border-gray-300 p-3 hover:cursor-pointer rounded-xl ${
          disabled
            ? "bg-gray-200 cursor-not-allowed text-[#c7c7c7]"
            : "bg-white text-[#000008]"
        }`}
        onClick={(e) => handleOpenPanel(e)}
      >
        <div className="flex items-center justify-between">
          <span className="ml-2 texts-md text-[#434343]">
            {value ? (
              <>
                {value}
                {options.find((option) => option.value === value)
                  ?.percentage !== undefined &&
                  ` (${
                    options.find((option) => option.value === value)?.percentage
                  }%)`}
              </>
            ) : (
              `Select ${label}`
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="drop-shadow-lg absolute z-10 mt-1 w-full p-2 bg-white rounded-lg border border-gray-300 shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 relative cursor-pointer hover:bg-[#ef3d49] hover:text-white ${
                value === option.value ? "text-black font-bold" : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {value === option.value && (
                <TiTick className="absolute left-0 top-3 mr-2" />
              )}
              {option.value}
              {option.percentage !== undefined &&
                ` (${option.percentage}%)`}{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
