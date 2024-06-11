import React, { useState, useEffect } from "react";
import { Popup, useMap } from "react-map-gl";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppSelector } from "@/lib/store/hooks";
import { clearClickedEntity } from "@/lib/store/features/statistics/clickedEntitySlice";
import { useDispatch } from "react-redux";

interface PopUpOnClickProps {
  mode: "Day" | "Night";
}

const PopUpOnClick: React.FC<PopUpOnClickProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const selection = useAppSelector((state) => state?.mapdata?.selectedButton);
  const statistics = useAppSelector((state) => state.statistics.statistics);
  const showPopup = useAppSelector(
    (state) => state.clickedEntitySlice.clickedEntity
  );
  console.log("🚀 ~ showPopup:", showPopup);
  const statisticsBuilding = useAppSelector(
    (state) => state.buildingstatistics.buildingStatistics
  );

  const formatPercentage = (value?: number) => {
    return value !== undefined ? (value * 100).toFixed(2) + "%" : "N/A";
  };

  const renderBuildingDetails = () => {
    const formatDetails = (details: any) => {
      return details.split(",").join(",<br />");
    };

    return (
      <div className="bg-white p-2 absolute rounded-xl bottom-1 left-1">
        <div className="w-full relative">
          <IoIosCloseCircleOutline
            onClick={() => dispatch(clearClickedEntity())}
            className="absolute right-0 top-0 text-xl hover:text-red-600"
          />
          {statisticsBuilding.details && (
            <div className=" w-40">
              <h1 className="font-bold mb-2 w-full">Building Details:</h1>
              <div className="font-bold">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatDetails(statisticsBuilding.details),
                  }}
                />
              </div>
              <ul className="flex text-sm mt-2">
                <li className="font-bold">Rank:</li>
                <li className="ml-2">{statisticsBuilding.rank}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderZoneDetails = () => (
    <div className="bg-white p-2 absolute rounded-xl bottom-1 left-1">
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
        statisticsBuilding?.details &&
        selection === "Building" &&
        renderBuildingDetails()}
      {showPopup && statistics && selection === "Zone" && renderZoneDetails()}
    </div>
  );
};

export default PopUpOnClick;
