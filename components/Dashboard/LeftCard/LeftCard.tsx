// LeftCard.tsx
import React from "react";
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
  } = useAppSelector((state) => state.leftPanel);

  const handleDropdownChange = (action: any) => (event: any) => {
    const value = event;
    dispatch(action(value));
  };

  const handleSliderChange = (value: number) => {
    dispatch(setSelectedAgeGroupPercentage(value));
  };

  const dropdownData = [
    {
      label: "Time Based Filtration",
      options: ["Day", "Night"],
      value: timeState,
      onChange: handleDropdownChange(timeFrame),
    },
    {
      label: "Select Region",
      options: ["North", "South", "East", "West"],
      value: selectedRegion,
      onChange: handleDropdownChange(setSelectedRegion),
    },
    {
      label: "Affluence",
      options: ["High", "Medium", "Low"],
      value: selectedAffluence,
      onChange: handleDropdownChange(setSelectedAffluence),
    },
    {
      label: "Select Gender",
      options: ["Male", "Female", "Other"],
      value: selectedGender,
      onChange: handleDropdownChange(setSelectedGender),
    },
    // {
    //   label: "Sale Phone Price Range",
    //   options: [
    //     "Less than $100",
    //     "$100 - $500",
    //     "$500 - $1000",
    //     "More than $1000",
    //   ],
    //   value: selectedPriceRange,
    //   onChange: handleDropdownChange(setSelectedPriceRange),
    // },
    // {
    //   label: "Select Zone Level",
    //   options: ["Low", "Mid", "High", "Ultra-high", "All-Zone"],
    //   value: zoneState,
    //   onChange: handleDropdownChange(zoneFrame),
    // },
    {
      label: "Age Group",
      options: ["18-24", "25-34", "35-49", "50+"],
      value: selectedAgeGroup,
      onChange: handleDropdownChange(setSelectedAgeGroup),
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
      {selectedAgeGroup && (
        <Slider
          label={`Percentage of ${selectedAgeGroup} group`} // Default value, you can set it accordingly
          onChange={handleSliderChange}
        />
      )}
      {/* Uncomment the button below if you want to manually trigger the load state action */}
      {/* <button
        className="bg-[#EC1B23] text-white px-4 w-full py-2 rounded-[8px] hover:bg-[#dC1B23] transition-colors"
        onClick={handleLoadState}
      >
        Load State
      </button> */}
    </div>
  );
};

export default LeftCard;
