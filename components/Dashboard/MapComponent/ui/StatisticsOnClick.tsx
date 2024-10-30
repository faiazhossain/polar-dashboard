import {
  clearClickedEntity,
  setClickedEntity,
} from "@/lib/store/features/statistics/clickedEntitySlice";
import { setStatistics } from "@/lib/store/features/statistics/zoneStatisticsSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
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
  const LAYERS = ["polar-zone"];

  // State to store the last clicked coordinates
  const [lastClickedCoords, setLastClickedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const formatDetails = (details?: string) => {
    if (!details) return "";
    try {
      const detailsObj = JSON.parse(details);
      return Object.entries(detailsObj)
        .map(([key, value]) => `${value} ${key}`)
        .join(", ");
    } catch (error) {
      console.error("Error parsing details:", error);
      return "";
    }
  };

  const handleMapClick = (coordinates: { lat: number; lng: number }) => {
    if (!map) return;
    const point = map.project([coordinates.lng, coordinates.lat]);
    const features = map.queryRenderedFeatures(point, { layers: LAYERS });
    const featuresWithGeohash = features.filter(
      (feature) => feature?.properties?.geohash
    );

    const rawPoiInfo = featuresWithGeohash[0]?.properties?.poi_info;
    let cleanedPoiInfo: { [key: string]: number } = {};
    if (rawPoiInfo) {
      cleanedPoiInfo = JSON.parse(
        rawPoiInfo.replace(/[\[\]]/g, "").replace(/\\/g, "")
      );
    }

    const totalCount: number = Object.values(cleanedPoiInfo).reduce(
      (acc: number, value: number) => acc + value,
      0
    );

    const filteredPoiInfoString: string = Object.entries(cleanedPoiInfo)
      .filter(([key, value]) => value > 0)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    if (features.length) {
      const propertiesString = featuresWithGeohash[0]?.properties?.[TimeFrame];
      const properties = propertiesString
        ? JSON.parse(propertiesString)
        : featuresWithGeohash[0]?.properties;

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
    }
  };

  useEffect(() => {
    if (!map) return;

    const onMapClick = (e: any) => {
      const coordinates = e.lngLat;
      setLastClickedCoords(coordinates);
      handleMapClick(coordinates);
    };

    map.on("click", onMapClick);
    return () => {
      map.off("click", onMapClick);
    };
  }, [map, mode]);

  // Re-run handleMapClick when TimeFrame changes and last clicked coordinates are available
  useEffect(() => {
    if (lastClickedCoords) {
      handleMapClick(lastClickedCoords);
    }
  }, [TimeFrame]);

  return null;
};

export default StatisticsOnHover;
