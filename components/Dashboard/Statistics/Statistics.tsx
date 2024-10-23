import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import total_polar_outlet from "@/public/statistics/outlet.svg";
import poi from "@/public/statistics/poi.svg";
import suggestion from "@/public/statistics/light.svg";
import highlight from "@/public/statistics/light.svg";
import export_png from "@/public/statistics/export.png";
import { useAppSelector } from "@/lib/store/hooks";

// Define the props for StatisticCard
interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: StaticImageData;
  isHighlighted?: boolean;
}

// Define the StatisticCard component
const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
  isHighlighted,
}) => {
  return (
    <div
      className={`flex items-center justify-between px-4 border border-gray-200 rounded-lg shadow flex-row ${
        isHighlighted ? "col-span-1 md:col-span-3" : ""
      } @apply shadow-[0px_4px_4px_0px_#00000040]`}
    >
      <div className="flex flex-col justify-between p-1 leading-normal">
        <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
          {title}
        </p>
        <p
          className={`text-${
            isHighlighted ? "md" : "lg"
          } font-bold text-[#EC1B23] dark:text-gray-400`}
        >
          {value}
        </p>
      </div>
      <div>
        <Image
          className="object-cover"
          src={icon}
          alt={title}
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

const parseAndFilterPoiInfo = (poiInfo: string): string => {
  // Split the string by commas to get individual key-value pairs
  const poiEntries = poiInfo.split(", ");

  // Convert the key-value pairs into an object
  const poiObject = poiEntries.reduce(
    (acc: Record<string, number | string>, entry) => {
      const [key, value] = entry.split(": ");
      if (key && value) {
        acc[key] = isNaN(Number(value)) ? value : Number(value);
      }
      return acc;
    },
    {}
  );
  // Filter the object to keep only values greater than 0 (excluding non-numeric values like 'region', 'division')
  const filteredPoiObject = Object.entries(poiObject)
    .filter(([key, value]) => typeof value === "number" && value > 0)
    .reduce((acc: Record<string, number>, [key, value]) => {
      acc[key] = value as number;
      return acc;
    }, {});

  // If no values are greater than 0, return a default message
  if (Object.keys(filteredPoiObject).length === 0) {
    return "No data greater than 0";
  }

  // Convert the filtered object back to a string
  return Object.entries(filteredPoiObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
};

// Define the Statistics component
const Statistics: React.FC = () => {
  const { statistics } = useAppSelector((state) => state.statistics);
  const statisticsBuilding = useAppSelector(
    (state) => state.buildingstatistics.buildingStatistics
  );
  const selection = useAppSelector((state) => state?.mapdata?.selectedButton);

  const calculateTotalFromDetails = (details: string): number => {
    // Match numbers that are not preceded by 'rank:'
    const numbers = details.match(/(?<!rank:\s*)\b\d+\b/g);
    return numbers ? numbers.map(Number).reduce((sum, num) => sum + num, 0) : 0;
  };

  return (
    <div className="bg-white rounded-[20px] h-full md:min-h-[30vh] relative @apply shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] pb-4">
      <div className="absolute rounded-t-[20px] w-[220px] h-[50px] flex justify-center items-center bg-[#EC1B23]">
        <p className="text-white font-bold">Statistics</p>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="gap-4 my-4">
          <div className="grid grid-cols-1 pt-12 md:grid-cols-3 gap-4 px-2 md:px-6">
            {selection === "Zone" ? (
              <>
                <StatisticCard
                  title="Total Polar Outlet (Zone)"
                  value="24 (static)"
                  icon={total_polar_outlet}
                />
                <StatisticCard
                  title="Number of POI (Zone)"
                  value={statistics?.poi_count || 0}
                  icon={poi}
                />
                <StatisticCard
                  title="Suggestion (Zone)"
                  value="Established More Outlet"
                  icon={suggestion}
                />
                <StatisticCard
                  title={`Key Highlight (Based on Zone)`}
                  value={
                    statistics?.poi_info ||
                    "Click a specific block of a region to see data"
                  }
                  icon={highlight}
                  isHighlighted
                />
              </>
            ) : (
              <>
                <StatisticCard
                  title="Total Polar Outlet (Building)"
                  value="24 (static)"
                  icon={total_polar_outlet}
                />
                <StatisticCard
                  title="Number of POI (Building)"
                  value={calculateTotalFromDetails(
                    statisticsBuilding?.poi_info || "0"
                  )}
                  icon={poi}
                />
                <StatisticCard
                  title="Suggestion (Building)"
                  value="Established More Outlet"
                  icon={suggestion}
                />
                <StatisticCard
                  title={`Key Highlight (Based on Building)`}
                  value={
                    parseAndFilterPoiInfo(statisticsBuilding?.poi_info || "") ||
                    "Click a specific building to see data"
                  }
                  icon={highlight}
                  isHighlighted
                />
              </>
            )}
            <button className="bg-[#EC1B23] text-white px-2 w-full py-4 rounded-[8px] hover:bg-[#dC1B23] transition-colors flex justify-center items-center gap-4">
              <p>EXPORT</p>
              <Image
                src={export_png}
                width={18}
                height={16}
                alt="export logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
