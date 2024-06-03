"use client";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";

const useSwitchDayNight = () => {
  const { myMapA } = useMap();
  const TimeFrame = useAppSelector((state) => state.time.timeState);
  console.log("🚀 ~ useSwitchDayNight ~ TimeFrame:", TimeFrame);

  useEffect(() => {
    const map = myMapA?.getMap();
    const updateMapStyle = () => {
      if (TimeFrame === "Day") {
        map?.setLayoutProperty("polar-zone-day", "visibility", "visible");
        map?.setLayoutProperty("polar-zone-night", "visibility", "none");
      } else if (TimeFrame === "Night") {
        map?.setLayoutProperty("polar-zone-night", "visibility", "visible");
        map?.setLayoutProperty("polar-zone-day", "visibility", "none");
      } else {
        map?.setLayoutProperty("polar-zone-day", "visibility", "none");
        map?.setLayoutProperty("polar-zone-night", "visibility", "none");
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
  }, [TimeFrame, myMapA]);
};

export default useSwitchDayNight;
