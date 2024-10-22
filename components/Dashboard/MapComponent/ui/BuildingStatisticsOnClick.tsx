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
  mode: "6AM-12PM" | "12PM-6PM" | "6PM-12AM" | "12AM-6AM";
}

const BuildingStatisticsOnClick: React.FC<StatisticsOnHoverProps> = ({
  mode,
}) => {
  const { current: map } = useMap();
  const dispatch = useDispatch();
  const selection = useAppSelector((state) => state.mapdata.selectedButton);

  const LAYERS = ["polar-zone"]; // Constant for layers

  useEffect(() => {
    if (!map) return;

    const handleMapMouseClick = (e: any) => {
      const features = map.queryRenderedFeatures(e.point, { layers: LAYERS });
      const featuresWithoutGeohash = features.filter(
        (feature) => !feature?.properties?.geohash
      );

      // If there are features without geohash
      if (featuresWithoutGeohash.length) {
        const coordinates = e.lngLat;
        const properties = featuresWithoutGeohash[0]?.properties;

        if (properties) {
          // Create the poi_info string while excluding the area property
          const poiInfoArray = Object.entries(properties)
            .filter(([key]) => key !== "area")
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");

          dispatch(
            setBuildingStatistics({
              poi_info: poiInfoArray,
              lat: coordinates.lat,
              lng: coordinates.lng,
              region: properties.region || "",
              rank: properties.rank || 0,
            })
          );
          dispatch(setClickedEntity({ type: "building" }));
        }
      } else if (selection === "Building") {
        dispatch(clearClickedEntity());
      }
    };

    map.on("click", handleMapMouseClick);

    return () => {
      map.off("click", handleMapMouseClick);
    };
  }, [mode, dispatch, selection]);

  return null;
};

export default BuildingStatisticsOnClick;
