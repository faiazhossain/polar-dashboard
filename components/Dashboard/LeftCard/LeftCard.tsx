import React, { useState } from "react";
import {
  timeFrame,
  zoneFrame,
  setSelectedRegion,
  setSelectedAffluence,
  setSelectedAgeGroup,
  setSelectedGender,
  setSelectedPriceRange,
  setSelectedAgeGroupPercentage,
} from "@/lib/store/features/timeSlice/leftPanelSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Dropdown from "./Dropdown";
import Slider from "./Slider";

const LeftCard = () => {
  const dispatch = useAppDispatch();
  const {
    timeState,
    zoneState,
    selectedRegion,
    selectedAffluence,
    selectedAgeGroup,
    selectedGender,
    selectedPriceRange,
    selectedAgeGroupPercentage,
  } = useAppSelector((state) => state.leftPanel);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownChange =
    (action: any, dropdownLabel: string) => (event: any) => {
      const value = event;
      dispatch(action(value));
      setActiveDropdown(dropdownLabel);
    };

  const handleSliderChange = (value: number) => {
    dispatch(setSelectedAgeGroupPercentage(value));
  };

  const dropdownData = [
    {
      label: "Time Based Filtration",
      options: ["Day", "Night"],
      value: timeState,
      onChange: handleDropdownChange(timeFrame, "Time Based Filtration"),
    },
    {
      label: "Select Region",
      options: ["North", "South", "East", "West"],
      value: selectedRegion,
      onChange: handleDropdownChange(setSelectedRegion, "Select Region"),
    },
    {
      label: "Affluence",
      options: ["High", "Medium", "Low"],
      value: selectedAffluence,
      onChange: handleDropdownChange(setSelectedAffluence, "Affluence"),
    },
    {
      label: "Select Gender",
      options: ["Male", "Female", "Other"],
      value: selectedGender,
      onChange: handleDropdownChange(setSelectedGender, "Select Gender"),
    },
    // Uncomment if needed
    // {
    //   label: "Sale Phone Price Range",
    //   options: [
    //     "Less than $100",
    //     "$100 - $500",
    //     "$500 - $1000",
    //     "More than $1000",
    //   ],
    //   value: selectedPriceRange,
    //   onChange: handleDropdownChange(setSelectedPriceRange, "Sale Phone Price Range"),
    // },
    // Uncomment if needed
    // {
    //   label: "Select Zone Level",
    //   options: ["Low", "Mid", "High", "Ultra-high", "All-Zone"],
    //   value: zoneState,
    //   onChange: handleDropdownChange(zoneFrame, "Select Zone Level"),
    // },
    {
      label: "Age Group",
      options: ["18-24", "25-34", "35-49", "50+"],
      value: selectedAgeGroup,
      onChange: handleDropdownChange(setSelectedAgeGroup, "Age Group"),
    },
  ];

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
      {activeDropdown === "Age Group" && selectedAgeGroup && (
        <Slider
          label={`Percentage of ${selectedAgeGroup} group is ${selectedAgeGroupPercentage}%`}
          onChange={handleSliderChange}
        />
      )}
    </div>
  );
};

export default LeftCard;
