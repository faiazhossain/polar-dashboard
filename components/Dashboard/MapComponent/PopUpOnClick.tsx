import React, { useState, useEffect } from "react";
import { Popup, useMap } from "react-map-gl";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppSelector } from "@/lib/store/hooks";

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
  details?: string;
  geohash: string;
  id: number;
  lat: number;
  lng: number;
  low: number;
  rank: number;
}

interface StatisticsData {
  "18-24": number;
  "25-34": number;
  "35-49": number;
  "50": number;
  DayCount: number;
  NightCount: number;
  F: number;
  High: number;
  M: number;
  Mid: number;
  Ultra_High: number;
  details: string;
  geohash: string;
  lat: number;
  lng: number;
  low: number;
  poi_count: number;
  region: string;
}

interface PopUpOnClickProps {
  mode: "Day" | "Night";
}

const PopUpOnClick: React.FC<PopUpOnClickProps> = ({ mode }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popUpData, setPopUpData] = useState<Partial<PopUpData>>({});
  const selection = useAppSelector((state) => state?.mapdata?.selectedButton);
  const statistics: StatisticsData = useAppSelector(
    (state) => state.statistics.statistics
  );
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: any) => {
      map.getCanvas().style.cursor = "pointer";
      const coordinates = e?.lngLat;
      setShowPopup(true);
      setPopUpData({
        ...e?.features[0]?.properties,
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
    };

    const layer = getLayer(mode, selection);
    if (layer) {
      map.on("click", layer, handleMapClick);
    }

    return () => {
      if (layer) {
        map.off("click", layer, handleMapClick);
      }
    };
  }, [map, mode, selection]);

  const getLayer = (mode: string, selection: string) => {
    if (mode === "Day" && selection === "Building") return "ada_day_zone";
    if (mode === "Night" && selection === "Building") return "ada_night_zone";
    if (mode === "Day" && selection === "Zone") return "ada-day-bounds";
    if (mode === "Night" && selection === "Zone") return "ada-night-bounds";
    return "";
  };

  const formatPercentage = (value?: number) => {
    return value !== undefined ? (value * 100).toFixed(2) + "%" : "N/A";
  };

  const formatDetails = (details?: string) => {
    if (!details) return "There is no POI in the building";

    try {
      const detailsObj = JSON.parse(details);

      if (Object.keys(detailsObj).length === 0) {
        return "There is no POI in the building";
      }

      const formattedDetails = Object.entries(detailsObj)
        .map(([key, value]) => `${key}: ${value}`)
        .join(",\n");

      const totalPOI = Object.values(detailsObj).reduce(
        (sum: number, value: any) => sum + value,
        0
      );

      return `${formattedDetails},\nTotal POI: ${totalPOI}`;
    } catch (error) {
      console.error("Error parsing details:", error);
      return "No POI in the building";
    }
  };

  const renderBuildingDetails = () => (
    <div className="bg-white p-2 absolute rounded-xl bottom-1 left-1">
      <div className="w-full relative">
        <IoIosCloseCircleOutline
          onClick={() => setShowPopup(false)}
          className="absolute right-0 top-0 text-xl hover:text-red-600"
        />
        {formatDetails(popUpData.details) && (
          <div className="flex flex-wrap justify-start w-40">
            <h1 className="font-bold mb-2 w-full">Building Details:</h1>
            <pre className="font-bold whitespace-pre-wrap">
              {formatDetails(popUpData.details)}
            </pre>
            <ul className="grid grid-cols-2 text-sm">
              <li className="font-bold">Rank:</li>
              <li className="ml-2">{popUpData.rank}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderZoneDetails = () => (
    <div className="bg-white p-2 absolute rounded-xl bottom-1 left-1">
      <div className="w-full relative">
        <IoIosCloseCircleOutline
          onClick={() => setShowPopup(false)}
          className="absolute right-0 top-0 text-xl hover:text-red-600"
        />
        <h1 className="font-bold mb-2 text-md">Age Group</h1>
        <ul className="grid grid-cols-2 text-sm">
          <li className="font-bold">18-24:</li>
          <li>{formatPercentage(statistics["18-24"])}</li>
          <li className="font-bold">25-34:</li>
          <li>{formatPercentage(statistics["25-34"])}</li>
          <li className="font-bold">35-49:</li>
          <li>{formatPercentage(statistics["35-49"])}</li>
          <li className="font-bold">50:</li>
          <li>{formatPercentage(statistics["50"])}</li>
        </ul>
        <h1 className="font-bold my-2 text-md">Region Details</h1>
        <ul className="grid grid-cols-2 text-sm">
          {statistics.DayCount > 0 && (
            <>
              <li className="font-bold">Day Count:</li>
              <li>{statistics.DayCount}</li>
            </>
          )}
          {statistics.NightCount > 0 && (
            <>
              <li className="font-bold">Night Count:</li>
              <li>{statistics.NightCount}</li>
            </>
          )}
          <li className="font-bold">Female:</li>
          <li>{formatPercentage(statistics.F)}</li>
          <li className="font-bold">Male:</li>
          <li>{formatPercentage(statistics.M)}</li>
        </ul>
        <h1 className="font-bold my-2 text-md">Affluance</h1>
        <ul className="grid grid-cols-2 text-sm">
          <li className="font-bold">Ulra-High</li>
          <li>{formatPercentage(statistics.Ultra_High)}</li>{" "}
          <li className="font-bold">High</li>
          <li>{formatPercentage(statistics.High)}</li>{" "}
          <li className="font-bold">Medium</li>
          <li>{formatPercentage(statistics.Mid)}</li>{" "}
          <li className="font-bold">Low</li>
          <li>{formatPercentage(statistics.low)}</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      {showPopup &&
        popUpData?.details &&
        selection === "Building" &&
        renderBuildingDetails()}
      {showPopup && statistics && selection === "Zone" && renderZoneDetails()}
    </div>
  );
};

export default PopUpOnClick;
