"use client";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";

const useSwitchDayNight = () => {
  const { myMapA } = useMap();
  const TimeFrame = useAppSelector((state: any) => state.leftPanel.timeState);
  
  const ageGroup = useAppSelector(
    (state: any) => state.leftPanel.selectedAgeGroup
  );
  const genderGroup = useAppSelector(
    (state: any) => state.leftPanel.selectedGender
  );
  const percentageAge = useAppSelector(
    (state: any) => state.leftPanel.selectedAgeGroupPercentage
  );
  const percentageGender = useAppSelector(
    (state: any) => state.leftPanel.genderPercentage
  );

  // Helper function to transform gender
  const transformGender = (gender: string) => {
    if (gender === "Male") return "M";
    if (gender === "Female") return "F";
    return gender;
  };

  useEffect(() => {
    const map = myMapA?.getMap();

    const updateMapStyle = () => {
      if (map) {
        const filters: any[] = ["all", ["==", ["geometry-type"], "Polygon"]];

        if (ageGroup) {
          filters.push([
            "any",
            ["!", ["has", ageGroup]],
            [
              "all",
              [">=", ["get", ageGroup], 0],
              ["<=", ["get", ageGroup], percentageAge / 100],
            ],
          ]);
        }

        const transformedGender = transformGender(genderGroup);

        if (transformedGender) {
          filters.push([
            "any",
            ["!", ["has", transformedGender]],
            [
              "all",
              [">=", ["get", transformedGender], 0],
              ["<=", ["get", transformedGender], percentageGender / 100],
            ],
          ]);
        }

        if (TimeFrame === "Day") {
          map.setFilter("ada_day_zone", filters);
          map.setLayoutProperty("ada_day_zone", "visibility", "visible");
          map.setLayoutProperty("ada_day_zone_symbol", "visibility", "visible");
          map.setLayoutProperty("ada_night_zone", "visibility", "none");
          map.setLayoutProperty("ada_night_zone_symbol", "visibility", "none");
        } else if (TimeFrame === "Night") {
          map.setFilter("ada_night_zone", filters);
          map.setLayoutProperty("ada_night_zone", "visibility", "visible");
          map.setLayoutProperty(
            "ada_night_zone_symbol",
            "visibility",
            "visible"
          );
          map.setLayoutProperty("ada_day_zone", "visibility", "none");
          map.setLayoutProperty("ada_day_zone_symbol", "visibility", "none");
        } else {
          map.setLayoutProperty("ada_day_zone", "visibility", "none");
          map.setLayoutProperty("ada_day_zone_symbol", "visibility", "none");
          map.setLayoutProperty("ada_night_zone", "visibility", "none");
          map.setLayoutProperty("ada_night_zone_symbol", "visibility", "none");
        }
      }
    };

    if (map) {
      if (map.isStyleLoaded()) {
        updateMapStyle();
      } else {
        map.on("styledata", updateMapStyle);
      }
    }

    return () => {
      map?.off("styledata", updateMapStyle);
    };
  }, [
    TimeFrame,
    myMapA,
    ageGroup,
    percentageAge,
    genderGroup,
    percentageGender,
  ]);
};

export default useSwitchDayNight;
