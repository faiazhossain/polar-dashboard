"use client";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";

const useSwitchDayNight = () => {
  const { myMapA } = useMap();
  const TimeFrame = useAppSelector((state) => state.leftPanel.timeState);
  const ageGroup = useAppSelector((state) => state.leftPanel.selectedAgeGroup);
  const percentage = useAppSelector(
    (state) => state.leftPanel.selectedAgeGroupPercentage
  );

  useEffect(() => {
    const map = myMapA?.getMap();
    const updateMapStyle = () => {
      if (map) {
        if (TimeFrame === "Day") {
          const ageGroups = ["18-24", "25-34", "35-49", "50+"];

          if (ageGroups.includes(ageGroup)) {
            map.setFilter("Ada_day_zone", [
              "all",
              ["==", ["geometry-type"], "Polygon"],
              [
                "all",
                [
                  "any",
                  ["!", ["has", "rank"]],
                  [
                    "all",
                    [">=", ["get", "rank"], 1],
                    ["<=", ["get", "rank"], 312],
                  ],
                ],
                [
                  "any",
                  ["!", ["has", ageGroup]],
                  [
                    "all",
                    [">=", ["get", ageGroup], 0],
                    ["<=", ["get", ageGroup], percentage / 100],
                  ],
                ],
              ],
            ]);
          }

          map.setLayoutProperty("Ada_day_zone", "visibility", "visible");
          map.setLayoutProperty("Ada_day_zone_symbol", "visibility", "visible");
        } else {
          map.setLayoutProperty("Ada_day_zone", "visibility", "none");
          map.setLayoutProperty("Ada_day_zone_symbol", "visibility", "none");
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
  }, [TimeFrame, myMapA, ageGroup, percentage]);
};

export default useSwitchDayNight;
