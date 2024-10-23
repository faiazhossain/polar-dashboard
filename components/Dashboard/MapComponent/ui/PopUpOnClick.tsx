import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppSelector } from "@/lib/store/hooks";
import { clearClickedEntity } from "@/lib/store/features/statistics/clickedEntitySlice";
import { useDispatch } from "react-redux";

interface PopUpOnClickProps {
  mode: "6AM-12PM" | "12PM-6PM" | "6PM-12AM" | "12AM-6AM";
}

const PopUpOnClick: React.FC<PopUpOnClickProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const selection = useAppSelector((state) => state?.mapdata?.selectedButton);
  const statistics = useAppSelector((state) => state.statistics.statistics);

  const showPopup = useAppSelector(
    (state) => state.clickedEntitySlice.clickedEntity
  );

  const statisticsBuilding = useAppSelector(
    (state) => state.buildingstatistics.buildingStatistics
  );

  const formatPercentage = (value?: number) => {
    return value !== undefined ? (value * 100).toFixed(2) + "%" : "N/A";
  };

  const renderBuildingDetails = () => {
    const formatPoiInfo = (poiInfo: string) => {
      return poiInfo.split(",").map((entry) => {
        const [key, value] = entry.split(":");
        return { key: key.trim(), value: parseInt(value.trim(), 10) };
      });
    };

    const poiDetails = formatPoiInfo(statisticsBuilding.poi_info || "");
    const rankObj = poiDetails.find((item) => item.key === "rank");

    return (
      <div className="bg-white p-2 absolute rounded-xl bottom-9 left-1 w-44">
        {" "}
        {rankObj && rankObj?.value > 1 ? (
          <div className="w-full relative">
            <IoIosCloseCircleOutline
              onClick={() => dispatch(clearClickedEntity())}
              className="absolute right-0 top-0 text-xl hover:text-red-600"
            />
            <h1 className="font-bold mb-2 w-full">Building Details:</h1>
            <ul className="text-sm">
              {poiDetails
                .filter(({ key, value }: any) => value > 0)
                .map(({ key, value }) => (
                  <li key={key} className="flex">
                    <span className="font-bold">{key}:</span>
                    <span className="ml-2">{value}</span>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <h1 className="font-bold mb-2 w-full">
            This building don't have any POI
          </h1>
        )}
      </div>
    );
  };

  const renderZoneDetails = () => (
    <div className="bg-white p-2 absolute rounded-xl bottom-9 left-1 w-44">
      {" "}
      {/* Fixed width added here */}
      <div className="w-full relative">
        <IoIosCloseCircleOutline
          onClick={() => dispatch(clearClickedEntity())}
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
          <li className="font-bold">Ultra-High</li>
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
        statisticsBuilding?.poi_info &&
        selection === "Building" &&
        renderBuildingDetails()}
      {showPopup &&
        (statistics.geohash || statistics.NightCount > 0) &&
        selection === "Zone" &&
        renderZoneDetails()}
    </div>
  );
};

export default PopUpOnClick;
