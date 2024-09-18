import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select } from "antd";
import { Button } from "@/components/ui/button";
import CustomSlider from "./Slider";
import RegionSelect from "./RegionSelect";
import { setStatistics } from "@/lib/store/features/statistics/zoneStatisticsSlice";
import { clearClickedEntity } from "@/lib/store/features/statistics/clickedEntitySlice";
import { setBuildingStatistics } from "@/lib/store/features/statistics/buildingStatisticsSlice";

const LeftCard: React.FC = () => {
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

  const [ageGroupSliderValue, setAgeGroupSliderValue] = useState(0);
  const [genderSliderValue, setGenderSliderValue] = useState(0);
  const [affluenceSliderValue, setAffluenceSliderValue] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [clickedText, setClickedText] = useState<string | null>(null);

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
      placeHolder: "Select Region",
      value: selectedRegion,
      component: <RegionSelect />,
      disabled: !timeState,
    },
    {
      label: "Affluence",
      placeHolder: "Select Affluence",
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
      placeHolder: "Select Gender",
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
      placeHolder: "Select Age Group",
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

  const clickedOnDrop = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    let textContent = target.textContent || "";
    if (!textContent && target.parentElement) {
      textContent = target.parentElement.textContent || "";
    }
    const cleanText = textContent.replace(/\s*\(\d+%\)$/, "").trim();
    setClickedText(cleanText);
  };

  // Reset all dropdowns and sliders
  const resetAllValues = () => {
    dispatch(setSelectedRegion(""));
    dispatch(setSelectedAffluence(""));
    dispatch(setSelectedAgeGroup(""));
    dispatch(setSelectedGender(""));
    dispatch(setSelectedAgeGroupPercentage(0));
    dispatch(setGenderPercentage(0));
    dispatch(setAffluencePercentage(0));
    dispatch(
      setStatistics({
        "18-24": 0,
        "25-34": 0,
        "35-49": 0,
        "50": 0,
        DayCount: 0,
        NightCount: 0,
        F: 0,
        High: 0,
        M: 0,
        Mid: 0,
        Ultra_High: 0,
        details: "",
        geohash: "",
        lat: 0,
        lng: 0,
        low: 0,
        poi_count: 0,
        region: "",
      })
    );
    dispatch(
      setBuildingStatistics({
        details: "",
        lat: 0,
        lng: 0,
        poi_count: 0,
        region: "",
        rank: 0,
      })
    );
    dispatch(clearClickedEntity());
    setAgeGroupSliderValue(0);
    setGenderSliderValue(0);
    setAffluenceSliderValue(0);
  };

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
          {dropdown.label === "Region" ? (
            dropdown.component
          ) : (
            <Select
              value={dropdown?.value !== "" ? dropdown.value : null}
              onChange={dropdown.onChange}
              onClick={clickedOnDrop}
              style={{ width: "100%" }}
              disabled={dropdown.disabled}
              placeholder={dropdown.placeHolder}
            >
              {dropdown.options?.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                  {dropdown.value === option &&
                    dropdown.label !== "Time Based Filtration" &&
                    dropdown.label !== "Region" &&
                    ` (${getPercentageForDropdown(dropdown.label, option)}%)`}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
      ))}
      {activeDropdown === "Age Group" && selectedAgeGroup === "" && (
        <CustomSlider
          label={`Percentage of ${selectedAgeGroup} group is ${selectedAgeGroupPercentage}%`}
          value={ageGroupSliderValue}
          onChange={handleSliderChange(
            setAgeGroupSliderValue,
            setSelectedAgeGroupPercentage
          )}
          disabled={!timeState}
        />
      )}
      {activeDropdown === "Select Gender" && selectedGender && (
        <CustomSlider
          label={`Percentage of ${selectedGender} is ${genderPercentage}%`}
          value={genderSliderValue}
          onChange={handleSliderChange(
            setGenderSliderValue,
            setGenderPercentage
          )}
          disabled={!timeState}
        />
      )}
      {activeDropdown === "Affluence" && selectedAffluence && (
        <CustomSlider
          label={`Percentage of ${selectedAffluence} is ${affluencePercentage}%`}
          value={affluenceSliderValue}
          onChange={handleSliderChange(
            setAffluenceSliderValue,
            setAffluencePercentage
          )}
          disabled={!timeState}
        />
      )}

      {/* Reset Button */}
      <Button
        className="mt-4 bg-[#EC1B23] hover:bg-[#ff0008] rounded-xl hover:text-white"
        onClick={resetAllValues}
      >
        Reset All
      </Button>
    </div>
  );
};

export default LeftCard;
