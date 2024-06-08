import React, { useState, useEffect } from "react";
import { Popup, useMap } from "react-map-gl";

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

interface PopUpOnHoverProps {
  mode: "Day" | "Night";
}

const PopUpOnHover: React.FC<PopUpOnHoverProps> = ({ mode }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popUpData, setPopUpData] = useState<Partial<PopUpData>>({});
  console.log("🚀 ~ popUpData:", popUpData);

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
    {
      mode === "Day"
        ? map.on("click", "ada_day_zone", handleMapClick)
        : map.on("click", "ada_night_zone", handleMapClick);
    }

    return () => {
      mode === "Day"
        ? map.off("click", "ada_day_zone", handleMapClick)
        : map.off("click", "ada_night_zone", handleMapClick);
    };
  }, [map, mode]);

  // Function to format numbers as percentages
  const formatPercentage = (value?: number) => {
    return value !== undefined ? (value * 100).toFixed(2) + "%" : "N/A";
  };

  // Function to format details JSON string
  const formatDetails = (details?: string) => {
    if (!details) return "";
    try {
      const detailsObj = JSON.parse(details);
      return Object.entries(detailsObj)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");
    } catch (error) {
      console.error("Error parsing details:", error);
      return "";
    }
  };

  return (
    <div>
      {showPopup && (
        <Popup
          longitude={popUpData.lng ?? 0}
          latitude={popUpData.lat ?? 0}
          anchor="bottom"
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          className="rounded-xl"
          maxWidth="400px"
        >
          <div className="w-full">
            <h1 className="font-bold mb-2 text-md">Age Group</h1>
            <ul className="grid grid-cols-2 text-sm">
              <li className="font-bold">18-24:</li>
              <li>{formatPercentage(popUpData["18-24"])}</li>
              <li className="font-bold">25-34:</li>
              <li>{formatPercentage(popUpData["25-34"])}</li>
              <li className="font-bold">35-49:</li>
              <li>{formatPercentage(popUpData["35-49"])}</li>
              <li className="font-bold">50:</li>
              <li>{formatPercentage(popUpData["50"])}</li>
            </ul>
            <h1 className="font-bold my-2 text-md">Region Details</h1>
            <ul className="grid grid-cols-2 text-sm">
              <li className="font-bold">Day Count:</li>
              <li>{popUpData.DayCount}</li>
              <li className="font-bold">Female:</li>
              <li>{formatPercentage(popUpData.F)}</li>
              <li className="font-bold">Male:</li>
              <li>{formatPercentage(popUpData.M)}</li>
              <li className="font-bold">Rank:</li>
              <li>{popUpData.rank}</li>
            </ul>
            {formatDetails(popUpData.details) && (
              <div className="flex flex-wrap justify-start w-40 mt-4">
                <h1 className="font-bold mb-2 w-full">Building Details:</h1>
                <h1
                  className="font-bold"
                  title={formatDetails(popUpData.details)}
                >
                  {formatDetails(popUpData.details)}
                </h1>
              </div>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default PopUpOnHover;
