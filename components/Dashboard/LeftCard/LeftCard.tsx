import React, { useState } from "react";
import {
  timeFrame,
  setSelectedRegion,
  setSelectedAffluence,
  setSelectedAgeGroup,
  setSelectedGender,
} from "@/lib/store/features/leftPanelSlice/leftPanelDataSlice";
import {
  setSelectedAgeGroupPercentage,
  setGenderPercentage,
  setAffluencePercentage,
} from "@/lib/store/features/leftPanelSlice/leftPanelPercentageSlice";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import Slider from "./Slider";
import CustomDropdown from "./Dropdown";
import { useMap } from "react-map-gl";

const LeftCard = () => {
  const dispatch = useAppDispatch();
  const { myMapA } = useMap();
  const {
    timeState,
    selectedRegion,
    selectedAffluence,
    selectedAgeGroup,
    selectedGender,
  } = useAppSelector((state) => state.leftPanel);

  const { selectedAgeGroupPercentage, genderPercentage, affluencePercentage } =
    useAppSelector((state) => state.leftPanelPercentage);

  // Individual state for each slider
  const [ageGroupSliderValue, setAgeGroupSliderValue] = useState(0);
  const [genderSliderValue, setGenderSliderValue] = useState(0);
  const [affluenceSliderValue, setAffluenceSliderValue] = useState(0);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownChange =
    (
      action: any,
      dropdownLabel: string,
      sliderAction?: any,
      setSliderValue?: any
    ) =>
    (event: any) => {
      const value = event;
      dispatch(action(value));
      setActiveDropdown(dropdownLabel);
      if (sliderAction && setSliderValue) {
        const percentage = getPercentageForDropdown(dropdownLabel, value);
        setSliderValue(percentage);
        dispatch(sliderAction(percentage));
      }
    };

  const handleSliderChange =
    (setSliderValue: any, action: any) => (value: number) => {
      setSliderValue(value);
      dispatch(action(value));
    };

  const getPercentageForDropdown = (dropdownLabel: string, value: string) => {
    switch (dropdownLabel) {
      case "Age Group":
        return selectedAgeGroupPercentage;
      case "Select Gender":
        return genderPercentage;
      case "Affluence":
        return affluencePercentage;
      default:
        return 0;
    }
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
      options: [
        {
          value: "Ultra High",
          percentage:
            selectedAffluence === "Ultra High"
              ? affluencePercentage
              : undefined,
        },
        {
          value: "High",
          percentage:
            selectedAffluence === "High" ? affluencePercentage : undefined,
        },
        {
          value: "Medium",
          percentage:
            selectedAffluence === "Medium" ? affluencePercentage : undefined,
        },
        {
          value: "Low",
          percentage:
            selectedAffluence === "Low" ? affluencePercentage : undefined,
        },
      ],
      value: selectedAffluence,
      onChange: handleDropdownChange(
        setSelectedAffluence,
        "Affluence",
        setAffluencePercentage,
        setAffluenceSliderValue
      ),
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
      onChange: handleDropdownChange(
        setSelectedGender,
        "Select Gender",
        setGenderPercentage,
        setGenderSliderValue
      ),
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
      onChange: handleDropdownChange(
        setSelectedAgeGroup,
        "Age Group",
        setSelectedAgeGroupPercentage,
        setAgeGroupSliderValue
      ),
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
          label={`Percentage of ${selectedAgeGroup} group is ${selectedAgeGroupPercentage} %`}
          value={ageGroupSliderValue}
          onChange={handleSliderChange(
            setAgeGroupSliderValue,
            setSelectedAgeGroupPercentage
          )}
          disabled={!timeState}
        />
      )}
      {activeDropdown === "Select Gender" && selectedGender && (
        <Slider
          label={`Percentage of ${selectedGender} is ${genderPercentage} %`}
          value={genderSliderValue}
          onChange={handleSliderChange(
            setGenderSliderValue,
            setGenderPercentage
          )}
          disabled={!timeState}
        />
      )}
      {activeDropdown === "Affluence" && selectedAffluence && (
        <Slider
          label={`Percentage of ${selectedAffluence} is ${affluencePercentage} %`}
          value={affluenceSliderValue}
          onChange={handleSliderChange(
            setAffluenceSliderValue,
            setAffluencePercentage
          )}
          disabled={!timeState}
        />
      )}
    </div>
  );
};

export default LeftCard;
