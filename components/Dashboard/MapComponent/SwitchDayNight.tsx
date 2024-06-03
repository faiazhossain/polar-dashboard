"use client";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";

const useSwitchDayNight = () => {
  const { myMapA } = useMap();
  const TimeFrame = useAppSelector((state) => state.time.timeState);
  console.log("🚀 ~ useSwitchDayNight ~ TimeFrame:", TimeFrame);

  useEffect(() => {
    if (TimeFrame === "Day") {
      myMapA
        ?.getMap()
        .setLayoutProperty("polar-zone-day", "visibility", "visible");
      myMapA
        ?.getMap()
        .setLayoutProperty("polar-zone-night", "visibility", "none");
    } else if (TimeFrame === "Night") {
      myMapA
        ?.getMap()
        .setLayoutProperty("polar-zone-night", "visibility", "visible");
      myMapA
        ?.getMap()
        .setLayoutProperty("polar-zone-day", "visibility", "none");
    } else {
      myMapA
        ?.getMap()
        .setLayoutProperty("polar-zone-day", "visibility", "visible");
      myMapA
        ?.getMap()
        .setLayoutProperty("polar-zone-night", "visibility", "visible");
    }
  }, [TimeFrame, myMapA]); // Dependency array ensures this runs when TimeFrame or mainMap changes
};

export default useSwitchDayNight;
