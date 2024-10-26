//@ts-nocheck
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  timeFrame,
  setSelectedRegion,
  setSelectedAffluence,
  setSelectedAgeGroup,
  setSelectedGender,
  setHighestAffluence,
  setHighestAgeGroup,
  setHighestGender,
} from "@/lib/store/features/leftPanelSlice/leftPanelDataSlice";
import { FaInfoCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, Select } from "antd";
import RegionSelect from "./RegionSelect";
import { setStatistics } from "@/lib/store/features/statistics/zoneStatisticsSlice";
import { clearClickedEntity } from "@/lib/store/features/statistics/clickedEntitySlice";
import { setBuildingStatistics } from "@/lib/store/features/statistics/buildingStatisticsSlice";
import { useMap } from "react-map-gl";

const LeftCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { myMapA } = useMap();

  const {
    timeState,
    selectedRegion,
    selectedAffluence,
    selectedAgeGroup,
    selectedGender,
    highestAffluence,
    highestAgeGroup,
    highestGender,
  } = useAppSelector((state) => state.leftPanel);

  const handleDropdownChange =
    (action: any, dropdownLabel: string) => (value: any) => {
      dispatch(action(value));
    };

  const dropdownData = [
    {
      label: "Time Based Filtration",
      options: ["6AM-12PM", "12PM-6PM", "6PM-12AM", "12AM-6AM"],
      value: timeState,
      onSelect: handleDropdownChange(timeFrame, "Time Based Filtration"),
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
      onSelect: handleDropdownChange(setSelectedAffluence, "Affluence"),
      disabled: !selectedRegion?.value, // Enable only if region is selected
    },
    {
      label: "Select Gender",
      placeHolder: "Select Gender",
      options: ["Male", "Female"],
      value: selectedGender,
      onSelect: handleDropdownChange(setSelectedGender, "Select Gender"),
      disabled: !selectedRegion?.value, // Enable only if region is selected
    },
    {
      label: "Age Group",
      placeHolder: "Select Age Group",
      options: ["18-24", "25-34", "35-49", "50"],
      value: selectedAgeGroup,
      onSelect: handleDropdownChange(setSelectedAgeGroup, "Age Group"),
      disabled: !selectedRegion?.value, // Enable only if region is selected
    },
  ];

  // Reset all dropdowns
  const resetAllValues = () => {
    dispatch(setSelectedRegion(""));
    dispatch(setSelectedAffluence(""));
    dispatch(setSelectedAgeGroup(""));
    dispatch(setSelectedGender(""));
    dispatch(setHighestAffluence([]));
    dispatch(setHighestAgeGroup([]));
    dispatch(setHighestGender([]));

    // Array of layer IDs to remove
    const layerIds = [
      "highlight-highest-age",
      "highlight-highest-gender",
      "highlight-highest-affluence",
      "highlight-highest-age-stroke",
      "highlight-highest-gender-stroke",
      "highlight-highest-affluence-stroke",
    ];
    const layerSources = [
      "highest-age-feature",
      "highest-gender-feature",
      "highest-affluence-feature",
    ];

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
  };

  const filteredData = myMapA?.queryRenderedFeatures();

  // Function to render individual statistics
  const renderStatistic = (data, color, label, map) => {
    if (data.length === 0) return null;

    return (
      <div
        className={`p-4 bg-gradient-to-r from-${color}-300 to-${color}-100 text-${color}-900 rounded-lg shadow-lg mb-2 relative`}
      >
        <div
          className={`absolute top-0 right-0 p-2 bg-${color}-600 text-white rounded-full text-xs font-bold`}
        >
          {map ? map[data[0]] || data[0] : data[0]}
        </div>
        <div className="flex items-center mb-2">
          <span className="font-bold text-lg">{label}</span>
        </div>
        <div className="text-2xl font-semibold">
          {(Number(data[1]) * 100).toFixed(2)}%
        </div>
      </div>
    );
  };

  // Maps for affluence and gender labels
  const affluenceMap = {
    Ultra_High: "Ultra High",
    Mid: "Medium",
    Low: "Low",
  };

  const genderMap = {
    F: "Female",
    M: "Male",
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
                    <Button type="text">
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
              onSelect={dropdown.onSelect}
              style={{ width: "100%" }}
              disabled={dropdown.disabled}
              placeholder={dropdown.placeHolder}
            >
              {dropdown.options?.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
      ))}

      {/* Reset Button */}
      <button
        className="mt-4 p-2 bg-[#EC1B23] hover:bg-[#ff0008] rounded-xl text-white hover:font-bold"
        onClick={resetAllValues}
      >
        Reset All
      </button>
      <div className="mt-4">
        {renderStatistic(
          highestAffluence,
          "green",
          "% of Affluence in the Location",
          affluenceMap
        )}
        {renderStatistic(
          highestGender,
          "blue",
          "% of Gender in the Location",
          genderMap
        )}
        {renderStatistic(
          highestAgeGroup,
          "red",
          "% of Age Band in the Location",
          null
        )}
      </div>
    </div>
  );
};

export default LeftCard;
