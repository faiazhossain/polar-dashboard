//@ts-nocheck
import React, { useState } from "react";
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

  const [matchedAgeFeatures, setMatchedAgeFeatures] = useState([]);
  const [matchedGenderFeatures, setMatchedGenderFeatures] = useState([]);
  const [matchedAffluenceFeatures, setMatchedAffluenceFeatures] = useState([]);

  const handleDropdownChange =
    (action: any, dropdownLabel: string) => (value: any) => {
      // Dispatch the action to update the selected value
      dispatch(action(value));

      setTimeout(() => {
        const filteredData = myMapA?.queryRenderedFeatures(); // Get the filtered data from the map

        // Initialize arrays for matched features
        let updatedMatchedFeatures = {
          matchedAge: [...matchedAgeFeatures],
          matchedGender: [...matchedGenderFeatures],
          matchedAffluence: [...matchedAffluenceFeatures],
        };

        // Clear only the relevant matched features based on the dropdown label
        if (dropdownLabel === "Age Group") {
          updatedMatchedFeatures.matchedAge = []; // Clear age matches
        } else if (dropdownLabel === "Select Gender") {
          updatedMatchedFeatures.matchedGender = []; // Clear gender matches
        } else if (dropdownLabel === "Affluence") {
          updatedMatchedFeatures.matchedAffluence = []; // Clear affluence matches
        }

        // Update matched features based on the selected value
        filteredData?.forEach((feature) => {
          if (feature?.properties) {
            Object.entries(feature.properties).forEach(([key, propValue]) => {
              // Match features based on the selected dropdown
              if (
                dropdownLabel === "Age Group" &&
                feature.layer.id === "highlight-highest-age" &&
                key === value
              ) {
                updatedMatchedFeatures.matchedAge.push({
                  key,
                  propValue,
                  feature,
                });
              }

              if (
                dropdownLabel === "Select Gender" &&
                feature.layer.id === "highlight-highest-gender"
              ) {
                const fullGender = { F: "Female", M: "Male" }[key];
                if (fullGender === value) {
                  updatedMatchedFeatures.matchedGender.push({
                    key,
                    propValue,
                    feature,
                  });
                }
              }

              if (
                dropdownLabel === "Affluence" &&
                feature.layer.id === "highlight-highest-affluence"
              ) {
                const fullAffluence = {
                  Ultra_High: "Ultra High",
                  High: "High",
                  low: "Low",
                  Mid: "Medium",
                }[key];
                if (fullAffluence === value) {
                  updatedMatchedFeatures.matchedAffluence.push({
                    key,
                    propValue,
                    feature,
                  });
                }
              }
            });
          }
        });

        // Update the state only for the specific matched features that changed
        setMatchedAgeFeatures(updatedMatchedFeatures.matchedAge);
        setMatchedGenderFeatures(updatedMatchedFeatures.matchedGender);
        setMatchedAffluenceFeatures(updatedMatchedFeatures.matchedAffluence);
      }, 300);
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
    setMatchedAgeFeatures([]);
    setMatchedGenderFeatures([]);
    setMatchedAffluenceFeatures([]);

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

  const filteredData = myMapA?.queryRenderedFeatures();

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
      <div className="mt-4">
        {matchedAffluenceFeatures.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-green-300 to-green-100 text-green-900 rounded-lg shadow-lg mb-2 relative">
            <div className="absolute top-0 right-0 p-2 bg-green-600 text-white rounded-full text-xs font-bold">
              {(() => {
                const affluenceMap: { [key: string]: string } = {
                  Ultra_High: "Ultra High",
                  Mid: "Medium",
                  low: "Low",
                };
                return (
                  affluenceMap[matchedAffluenceFeatures[0].key] ||
                  matchedAffluenceFeatures[0].key
                );
              })()}
            </div>
            <div className="flex items-center mb-2">
              <span className="font-bold text-lg">
                % of Affluence in the Location
              </span>
            </div>
            <div className="text-2xl font-semibold">
              {(Number(matchedAffluenceFeatures[0].propValue) * 100).toFixed(2)}
              %
            </div>
          </div>
        )}

        {matchedGenderFeatures.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-blue-300 to-blue-100 text-blue-900 rounded-lg shadow-lg mb-2 relative">
            <div className="absolute top-0 right-0 p-2 bg-blue-600 text-white rounded-full text-xs font-bold">
              {(() => {
                const genderMap: { [key: string]: string } = {
                  F: "Female",
                  M: "Male",
                };
                return (
                  genderMap[matchedGenderFeatures[0].key] ||
                  matchedGenderFeatures[0].key
                );
              })()}
            </div>
            <div className="flex items-center mb-2">
              <span className="font-bold text-lg">
                ⁠% of Gender in the Location
              </span>
            </div>
            <div className="text-2xl font-semibold">
              {(Number(matchedGenderFeatures[0].propValue) * 100).toFixed(2)}%
            </div>
          </div>
        )}

        {matchedAgeFeatures.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-red-300 to-red-100 text-red-900 rounded-lg shadow-lg mb-2 relative">
            <div className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-full text-xs font-bold">
              {matchedAgeFeatures[0].key}
            </div>
            <div className="flex items-center mb-2">
              <span className="font-bold text-lg">
                ⁠% of Age Band in the Location
              </span>
            </div>
            <div className="text-2xl font-semibold">
              {(Number(matchedAgeFeatures[0].propValue) * 100).toFixed(2)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftCard;
