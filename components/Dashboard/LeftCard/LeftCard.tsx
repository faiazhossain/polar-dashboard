// components/LeftCard.js
"use client";
import { timeFrame, zoneFrame } from "@/lib/store/features/timeSlice/timeSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="mb-4 relative">
    <label className="text-sm text-[#808080] mb-1 block absolute top-[-11px] left-6 bg-white">
      {label}
    </label>
    <select
      className="w-full bg-white border border-gray-300 p-4 rounded-xl text-[#000008]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option className="rounded-2xl" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const LeftCard = () => {
  const dispatch = useAppDispatch();

  const [selectedRegion, setSelectedRegion] = useState("North");
  const [selectedAffluence, setSelectedAffluence] = useState("High");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("18-25");
  const [selectedGender, setSelectedGender] = useState("Male");
  const [selectedPriceRange, setSelectedPriceRange] =
    useState("Less than $100");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Day");
  const [selectedZoneLevel, setSelectedZoneLevel] = useState("LOW");

  const dropdownData = [
    {
      label: "Select Region",
      options: ["North", "South", "East", "West"],
      value: selectedRegion,
      onChange: setSelectedRegion,
    },
    {
      label: "Affluence",
      options: ["High", "Medium", "Low"],
      value: selectedAffluence,
      onChange: setSelectedAffluence,
    },
    {
      label: "Age Group",
      options: ["18-25", "26-35", "36-45", "45+"],
      value: selectedAgeGroup,
      onChange: setSelectedAgeGroup,
    },
    {
      label: "Select Gender",
      options: ["Male", "Female", "Other"],
      value: selectedGender,
      onChange: setSelectedGender,
    },
    {
      label: "Sale Phone Price Range",
      options: [
        "Less than $100",
        "$100 - $500",
        "$500 - $1000",
        "More than $1000",
      ],
      value: selectedPriceRange,
      onChange: setSelectedPriceRange,
    },
    {
      label: "Time Based Filtration",
      options: ["Day", "Night"],
      value: selectedTimeFilter,
      onChange: setSelectedTimeFilter,
    },
    {
      label: "Select Zone Level",
      options: ["Low", "Mid", "High", "Ultra-high", "All-Zone"],
      value: selectedZoneLevel,
      onChange: setSelectedZoneLevel,
    },
  ];
  const handleLoadState = () => {
    dispatch(timeFrame(selectedTimeFilter));
    dispatch(zoneFrame(selectedZoneLevel.toUpperCase()));
    console.log({
      selectedRegion,
      selectedAffluence,
      selectedAgeGroup,
      selectedGender,
      selectedPriceRange,
      selectedTimeFilter,
      selectedZoneLevel,
    });
  };

  return (
    <div className="bg-white w-full flex flex-col md:w-1/2 lg:w-1/3 px-4 py-8 rounded-[20px] shadow-md">
      {dropdownData.map((dropdown, index) => (
        <Dropdown
          key={index}
          label={dropdown.label}
          options={dropdown.options}
          value={dropdown.value}
          onChange={dropdown.onChange}
        />
      ))}
      <button
        className="bg-[#EC1B23] text-white px-4 w-full py-2 rounded-[8px] hover:bg-[#dC1B23] transition-colors"
        onClick={handleLoadState}
      >
        Load State
      </button>
    </div>
  );
};

export default LeftCard;
