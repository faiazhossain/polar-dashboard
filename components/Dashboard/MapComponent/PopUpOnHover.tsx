import React, { useState, useEffect } from "react";
import { Popup, useMap } from "react-map-gl";

// Define the interface for the popup data
interface PopUpData {
  DayCount: number;
  NightCount: number;
  ZONE_DAY: string;
  ZONE_NIGHT: string;
  combinecount: number;
  geohash: string;
  lat: number;
  lng: number;
  rank_day: number;
  rank_night: number;
}

const PopUpOnHover: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popUpData, setPopUpData] = useState<Partial<PopUpData>>({});
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

    map.on("click", "polar-zone-day", handleMapClick);

    return () => {
      map.off("click", "polar-zone-day", handleMapClick);
    };
  }, [map]);

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
        >
          <div>
            <h1 className="text-xl font-bold mb-2">Location Details</h1>
            <ul className="grid grid-cols-2 gap-4 text-sm">
              <li className="font-bold">DayCount:</li>
              <li>{popUpData.DayCount}</li>
              <li className="font-bold">NightCount:</li>
              <li>{popUpData.NightCount}</li>
              <li className="font-bold">ZONE_DAY:</li>
              <li>{popUpData.ZONE_DAY}</li>
              <li className="font-bold">ZONE_NIGHT:</li>
              <li>{popUpData.ZONE_NIGHT}</li>
              <li className="font-bold">CombineCount:</li>
              <li>{popUpData.combinecount}</li>
              <li className="font-bold">Rank Day:</li>
              <li>{popUpData.rank_day}</li>
              <li className="font-bold">Rank Night:</li>
              <li>{popUpData.rank_night}</li>
            </ul>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default PopUpOnHover;
