import React, { useState } from "react";
import {
  timeFrame,
  setSelectedRegion,
  setSelectedAffluence,
  setSelectedAgeGroup,
  setSelectedGender,
  setSelectedAgeGroupPercentage,
  setGenderPercentage,
} from "@/lib/store/features/timeSlice/leftPanelSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import Slider from "./Slider";
import CustomDropdown from "./Dropdown";

const LeftCard = () => {
  const dispatch = useAppDispatch();
  const {
    timeState,
    selectedRegion,
    selectedAffluence,
    selectedAgeGroup,
    selectedGender,
    selectedAgeGroupPercentage,
    genderPercentage,
  } = useAppSelector((state) => state.leftPanel);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // console.log("🚀 ~ LeftCard ~ activeDropdown:", activeDropdown);

  const handleDropdownChange =
    (action: any, dropdownLabel: string) => (event: any) => {
      const value = event;
      dispatch(action(value));
      setActiveDropdown(dropdownLabel);
    };

  const handleSliderChange = (action: any) => (value: number) => {
    dispatch(action(value));
  };

  const dropdownData = [
    {
      label: "Time Based Filtration",
      options: [{ value: "Day" }, { value: "Night" }],
      value: timeState,
      onChange: handleDropdownChange(timeFrame, "Time Based Filtration"),
    },
    {
      label: "Select Region",
      options: [
        { value: "North" },
        { value: "South" },
        { value: "East" },
        { value: "West" },
      ],
      value: selectedRegion,
      onChange: handleDropdownChange(setSelectedRegion, "Select Region"),
      disabled: !timeState,
    },
    {
      label: "Affluence",
      options: [{ value: "High" }, { value: "Medium" }, { value: "Low" }],
      value: selectedAffluence,
      onChange: handleDropdownChange(setSelectedAffluence, "Affluence"),
      disabled: !timeState,
    },
    {
      label: "Select Gender",
      options: [
        {
          value: "Male",
          percentage: selectedGender === "Male" ? genderPercentage : undefined,
        },
        {
          value: "Female",
          percentage:
            selectedGender === "Female" ? genderPercentage : undefined,
        },
      ],
      value: selectedGender,
      onChange: handleDropdownChange(setSelectedGender, "Select Gender"),
      disabled: !timeState,
    },
    {
      label: "Age Group",
      options: [
        {
          value: "18-24",
          percentage:
            selectedAgeGroup === "18-24"
              ? selectedAgeGroupPercentage
              : undefined,
        },
        {
          value: "25-34",
          percentage:
            selectedAgeGroup === "25-34"
              ? selectedAgeGroupPercentage
              : undefined,
        },
        {
          value: "35-49",
          percentage:
            selectedAgeGroup === "35-49"
              ? selectedAgeGroupPercentage
              : undefined,
        },
        {
          value: "50+",
          percentage:
            selectedAgeGroup === "50+" ? selectedAgeGroupPercentage : undefined,
        },
      ],
      value: selectedAgeGroup,
      onChange: handleDropdownChange(setSelectedAgeGroup, "Age Group"),
      disabled: !timeState,
    },
  ];

  return (
    <div className="bg-white w-full flex flex-col md:w-1/2 lg:w-1/3 px-4 py-8 rounded-[20px] shadow-md">
      {dropdownData.map((dropdown, index) => (
        <CustomDropdown
          key={index}
          label={dropdown.label}
          options={dropdown.options}
          value={dropdown.value}
          onChange={dropdown.onChange}
          disabled={dropdown.disabled}
        />
      ))}
      {activeDropdown === "Age Group" && selectedAgeGroup && (
        <Slider
          label={`Percentage of ${selectedAgeGroup} group is ${selectedAgeGroupPercentage}%`}
          value={selectedAgeGroupPercentage}
          onChange={handleSliderChange(setSelectedAgeGroupPercentage)}
          disabled={!timeState}
        />
      )}
      {activeDropdown === "Select Gender" && selectedGender && (
        <Slider
          label={`Percentage of ${selectedGender} is ${genderPercentage}`}
          value={genderPercentage}
          onChange={handleSliderChange(setGenderPercentage)}
          disabled={!timeState}
        />
      )}
    </div>
  );
};

export default LeftCard;
