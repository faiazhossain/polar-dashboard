import {
  clearClickedEntity,
  setClickedEntity,
} from "@/lib/store/features/statistics/clickedEntitySlice";
import { setStatistics } from "@/lib/store/features/statistics/zoneStatisticsSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";
import { useDispatch } from "react-redux";

interface StatisticsOnHoverProps {
  mode: "6AM-12PM" | "12PM-6PM" | "6PM-12AM" | "12AM-6AM";
}

const StatisticsOnHover: React.FC<StatisticsOnHoverProps> = ({ mode }) => {
  const { current: map } = useMap();
  const dispatch = useDispatch();
  const selection = useAppSelector(
    (state: any) => state.mapdata.selectedButton
  );
  const TimeFrame = useAppSelector((state: any) => state.leftPanel.timeState);
  const LAYERS = ["polar-zone"]; // Constant for layers
  // Function to format details JSON string
  const formatDetails = (details?: string) => {
    if (!details) return "";

    try {
      const detailsObj = JSON.parse(details);
      const formattedDetails = Object.entries(detailsObj)
        .map(([key, value]) => `${value} ${key}`)
        .join(", ");

      return formattedDetails;
    } catch (error) {
      console.error("Error parsing details:", error);
      return "";
    }
  };

  useEffect(() => {
    if (!map) return;

    const handleMapMouseClick = (e: any) => {
      const features = map.queryRenderedFeatures(e.point, { layers: LAYERS });
      const featuresWithGeohash = features.filter(
        (feature) => feature?.properties?.geohash
      );

      // Get the raw string from featuresWithGeohash
      const rawPoiInfo = featuresWithGeohash[0]?.properties?.poi_info;

      // Clean the string and parse it into an object
      let cleanedPoiInfo: { [key: string]: number } = {}; // Explicit type for parsed object
      if (rawPoiInfo) {
        cleanedPoiInfo = JSON.parse(
          rawPoiInfo.replace(/[\[\]]/g, "").replace(/\\/g, "")
        );
      }

      // Summing all the values in the cleaned object
      const totalCount: number = Object.values(cleanedPoiInfo).reduce(
        (acc: number, value: number) => acc + value,
        0
      );

      // Create a string from the keys where values are greater than 0
      const filteredPoiInfoString: string = Object.entries(cleanedPoiInfo)
        .filter(([key, value]) => value > 0) // Filter where value > 0
        .map(([key, value]) => `${key}: ${value}`) // Convert to "key: value" format
        .join(", "); // Join into a single string

      if (features.length) {
        const coordinates = e.lngLat;
        const propertiesString =
          featuresWithGeohash[0]?.properties?.[TimeFrame];
        const properties = JSON.parse(propertiesString);

        if (properties) {
          dispatch(
            setStatistics({
              "18-24": properties["18-24"] || 0,
              "25-34": properties["25-34"] || 0,
              "35-49": properties["35-49"] || 0,
              "50": properties["50"] || 0,
              DayCount: properties.DayCount || 0,
              NightCount: properties.NightCount || 0,
              F: properties.F || 0,
              High: properties.High || 0,
              M: properties.M || 0,
              Mid: properties.Mid || 0,
              Ultra_High: properties.Ultra_High || 0,
              details: formatDetails(properties.details),
              geohash: properties.geohash || "",
              lat: coordinates.lat,
              lng: coordinates.lng,
              low: properties.low || 0,
              poi_count: totalCount,
              poi_info: filteredPoiInfoString,
              region: properties.region || "",
            })
          );
          dispatch(setClickedEntity({ type: "zone" }));
        } else {
          if (selection === "Zone") {
            dispatch(clearClickedEntity());
          }
        }
        // map.flyTo({ center: [coordinates.lng, coordinates.lat] });
      }
    };

    map.on("click", handleMapMouseClick);
    return () => {
      map.off("click", handleMapMouseClick);
    };
  }, [mode]);

  return null;
};

export default StatisticsOnHover;
