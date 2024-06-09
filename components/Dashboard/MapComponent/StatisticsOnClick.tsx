import { setStatistics } from "@/lib/store/features/statistics/statisticsSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";
import { useDispatch } from "react-redux";

// Define the interface for the popup data
interface PopUpData {
  "18-24": number;
  "25-34": number;
  "35-49": number;
  "50": number;
  DayCount: number;
  F: number;
  High: number;
  M: number;
  Mid: number;
  Ultra_High: number;
  ZONE: string;
  building: string;
  details?: string; // Mark details as optional
  geohash: string;
  id: number;
  lat: number;
  lng: number;
  low: number;
  rank: number;
}

interface StatisticsOnHoverProps {
  mode: "Day" | "Night";
}

const StatisticsOnHover: React.FC<StatisticsOnHoverProps> = ({ mode }) => {
  const { current: map } = useMap();
  const dispatch = useDispatch();
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
      const features = map.queryRenderedFeatures(e.point, {
        layers: [mode === "Day" ? "ada-day-bounds" : "ada-night-bounds"],
      });

      if (features.length) {
        const coordinates = e.lngLat;
        const properties = features[0]?.properties;
        if (properties) {
          dispatch(
            setStatistics({
              ...properties,
              lat: coordinates.lat,
              lng: coordinates.lng,
              details: formatDetails(properties.details),
            })
          );
        }
        map.flyTo({ center: [coordinates.lng, coordinates.lat] });
      }
    };

    map.on("click", handleMapMouseClick);
    return () => {
      map.off("click", handleMapMouseClick);
    };
  }, [map, mode]);

  return null;
};

export default StatisticsOnHover;
