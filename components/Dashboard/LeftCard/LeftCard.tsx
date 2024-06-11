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
import { FaInfoCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Slider from "./Slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const LeftCard = () => {
  const dispatch = useAppDispatch();
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
    (value: any) => {
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
      options: ["Day", "Night"],
      value: timeState,
      onChange: handleDropdownChange(timeFrame, "Time Based Filtration"),
    },
    {
      label: "Region",
      options: ["Northern", "Southern", "Central", "Eastern"],
      value: selectedRegion,
      onChange: handleDropdownChange(setSelectedRegion, "Select Region"),
      disabled: !timeState,
    },
    {
      label: "Affluence",
      options: ["Ultra High", "High", "Medium", "Low"],
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
      options: ["Male", "Female"],
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
      options: ["18-24", "25-34", "35-49", "50+"],
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
    <div className="bg-white h-full flex flex-col px-4 py-8 rounded-[20px] shadow-md">
      {dropdownData.map((dropdown, index) => (
        <div key={index} className="mb-4">
          <label className="text-sm mb-1 font-extralight flex items-center">
            <div>{dropdown.label}</div>
            {dropdown.label === "Time Based Filtration" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>
                      <FaInfoCircle className="text-md" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm"> Day: 8:00 AM to 7:59 PM </p>
                    <p className="text-sm"> Night: 8:00 PM to 7:59 AM </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </label>
          <Select
            value={dropdown.value}
            onValueChange={dropdown.onChange}
            disabled={dropdown.disabled}
          >
            <SelectTrigger className="w-full border border-gray-300 p-3 rounded-xl bg-white text-[#000008]">
              <SelectValue placeholder={`Select ${dropdown.label}`} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel>{dropdown.label}</SelectLabel>
                {dropdown.options.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="selectItem"
                  >
                    {option}
                    {dropdown.value === option &&
                    dropdown.label !== "Time Based Filtration" &&
                    dropdown.label !== "Region"
                      ? ` (${getPercentageForDropdown(
                          dropdown.label,
                          option
                        )}%)`
                      : ""}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
