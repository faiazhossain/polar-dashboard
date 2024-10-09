import { setBuildingStatistics } from "@/lib/store/features/statistics/buildingStatisticsSlice";
import {
  clearClickedEntity,
  setClickedEntity,
} from "@/lib/store/features/statistics/clickedEntitySlice";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import { useMap } from "react-map-gl";
import { useDispatch } from "react-redux";

interface StatisticsOnHoverProps {
  mode: "Day" | "Night";
}

const BuildingStatisticsOnClick: React.FC<StatisticsOnHoverProps> = ({
  mode,
}) => {
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
      const layers = [
        mode === "Day" ? "ada-day-buildings" : "ada-night-buildings",
      ];

      const features = map.queryRenderedFeatures(e.point, { layers });

      if (features.length) {
        const coordinates = e.lngLat;
        const properties = features[0]?.properties;

        if (properties) {
          dispatch(
            setBuildingStatistics({
              details: formatDetails(properties.details),
              lat: coordinates.lat,
              lng: coordinates.lng,
              poi_count: properties.poi_count || 0,
              region: properties.region || "",
              rank: properties.rank || 0,
            })
          );
          dispatch(setClickedEntity({ type: "building" }));
        }
      } else {
        if (selection === "Building") {
          dispatch(clearClickedEntity());
        }
      }
    };

    map.on("click", handleMapMouseClick);
    return () => {
      map.off("click", handleMapMouseClick);
    };
  }, [map, mode]);

  return null;
};

export default BuildingStatisticsOnClick;
