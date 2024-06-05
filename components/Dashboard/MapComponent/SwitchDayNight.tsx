"use client";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";

const useSwitchDayNight = () => {
  const { myMapA } = useMap();
  const TimeFrame = useAppSelector((state) => state.time.timeState);
  const ZoneLevel = useAppSelector((state) => state.time.zoneState);
  console.log("🚀 ~ useSwitchDayNight ~ ZoneLevel:", ZoneLevel);
  console.log("🚀 ~ useSwitchDayNight ~ TimeFrame:", TimeFrame);

  useEffect(() => {
    const map = myMapA?.getMap();
    const updateMapStyle = () => {
      if (map) {
        const adjustedZoneLevel =
          ZoneLevel === "ULTRA-HIGH" ? "ULTRA_HIGH" : ZoneLevel;
        if (TimeFrame === "Day") {
          if (ZoneLevel != "ALL-ZONE") {
            // map.setFilter("polar-zone-day", [
            //   "all",
            //   ["==", "$type", "Polygon"],
            //   ["==", "ZONE_DAY", adjustedZoneLevel],
            // ]);
            map.setLayoutProperty("Ada_day_zone", "visibility", "visible");
            map.setLayoutProperty(
              "Ada_day_zone_symbol",
              "visibility",
              "visible"
            );
            map.setLayoutProperty("polar-zone-night", "visibility", "none");
          } else {
            map.setFilter("polar-zone-day", [
              "all",
              ["==", "$type", "Polygon"],
            ]);
            map.setLayoutProperty("polar-zone-day", "visibility", "visible");
            map.setLayoutProperty("polar-zone-night", "visibility", "none");
          }
        } else if (TimeFrame === "Night") {
          if (ZoneLevel != "ALL-ZONE") {
            map.setFilter("polar-zone-night", [
              "all",
              ["==", "$type", "Polygon"],
              ["==", "ZONE_NIGHT", adjustedZoneLevel],
            ]);
            map.setLayoutProperty("polar-zone-day", "visibility", "none");
            map.setLayoutProperty("polar-zone-night", "visibility", "visible");
          } else {
            map.setFilter("polar-zone-night", [
              "all",
              ["==", "$type", "Polygon"],
            ]);
            map.setLayoutProperty("polar-zone-day", "visibility", "none");
            map.setLayoutProperty("polar-zone-night", "visibility", "visible");
          }
        } else {
          map.setLayoutProperty("polar-zone-day", "visibility", "none");
          map.setLayoutProperty("polar-zone-night", "visibility", "none");
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
  }, [TimeFrame, ZoneLevel, myMapA]);
};

export default useSwitchDayNight;
