//@ts-nocheck
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Spin } from "antd";
const AreaPopupOnClick = () => {
  const statisticsBuilding = useAppSelector(
    (state) => state.buildingstatistics.buildingStatistics
  );
  const loading = useAppSelector((state) => state.buildingstatistics.loading);

  // Extract only specific components needed for the address
  const { house, road } =
    statisticsBuilding?.locationData?.place?.address_components || {};

  const { sub_area } =
    statisticsBuilding?.locationData?.place?.area_components || {};

  const { area, city } = statisticsBuilding?.locationData?.place || {};

  // Only include these specific parts in the address
  const addressParts = [house, road, sub_area, area, city].filter(Boolean); // Filter out any null, undefined, or empty values

  // Join the address parts with commas
  const address =
    addressParts.length > 0 ? addressParts.join(", ") : "Address not available";

  return (
    <div className="absolute top-[120px] sm:top-[100px] md:top-[80px] lg:top-[80px] left-1 bg-white rounded-xl shadow-xl w-44 border border-gray-300 z-50">
      <div className="flex pt-2 items-center space-x-2 px-2">
        <IoLocationSharp className="text-blue-800 text-lg sm:text-md md:text-lg" />
        <h2 className="text-sm sm:text-base font-semibold text-blue-800">
          Building Address
        </h2>
      </div>
      <p className="text-xs tracking-wide flex justify-center px-2 pb-3 rounded-br-xl rounded-bl-xl text-gray-900 font-normal italic mt-1">
        {loading ? <Spin /> : address}
      </p>
    </div>
  );
};

export default AreaPopupOnClick;
