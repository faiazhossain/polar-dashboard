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
  mode: "Day" | "Night";
}

const StatisticsOnHover: React.FC<StatisticsOnHoverProps> = ({ mode }) => {
  const { current: map } = useMap();
  const dispatch = useDispatch();
  const selection = useAppSelector((state) => state.mapdata.selectedButton);
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
        layers: [mode === "Day" ? "ada day bounds" : "ada night bounds"],
      });

      if (features.length) {
        const coordinates = e.lngLat;
        const properties = features[0]?.properties;

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
              poi_count: properties.poi_count || 0,
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
  }, [map, mode]);

  return null;
};

export default StatisticsOnHover;
