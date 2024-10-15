import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  timeFrame,
  setSelectedRegion,
  setSelectedAffluence,
  setSelectedAgeGroup,
  setSelectedGender,
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
  } = useAppSelector((state) => state.leftPanel);
  console.log("🚀 ~ selectedRegion:", selectedRegion);

  const handleDropdownChange =
    (action: any, dropdownLabel: string) => (value: any) => {
      dispatch(action(value));
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
      onChange: handleDropdownChange(setSelectedAffluence, "Affluence"),
      disabled: !selectedRegion?.title, // Enable only if region is selected
    },
    {
      label: "Select Gender",
      placeHolder: "Select Gender",
      options: ["Male", "Female"],
      value: selectedGender,
      onChange: handleDropdownChange(setSelectedGender, "Select Gender"),
      disabled: !selectedRegion?.title, // Enable only if region is selected
    },
    {
      label: "Age Group",
      placeHolder: "Select Age Group",
      options: ["18-24", "25-34", "35-49", "50+"],
      value: selectedAgeGroup,
      onChange: handleDropdownChange(setSelectedAgeGroup, "Age Group"),
      disabled: !selectedRegion?.title, // Enable only if region is selected
    },
  ];

  const clickedOnDrop = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    let textContent = target.textContent || "";
    if (!textContent && target.parentElement) {
      textContent = target.parentElement.textContent || "";
    }
    const cleanText = textContent.trim();
  };

  // Reset all dropdowns
  const resetAllValues = () => {
    dispatch(setSelectedRegion(""));
    dispatch(setSelectedAffluence(""));
    dispatch(setSelectedAgeGroup(""));
    dispatch(setSelectedGender(""));

    // Access the underlying map instance
    const mapInstance = myMapA?.getMap();

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

    // Remove layers
    layerIds.forEach((layerId) => {
      if (mapInstance?.getLayer(layerId)) {
        mapInstance.removeLayer(layerId);
      }
    });

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
              onSelect={dropdown.onChange}
              onClick={clickedOnDrop}
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
    </div>
  );
};

export default LeftCard;
