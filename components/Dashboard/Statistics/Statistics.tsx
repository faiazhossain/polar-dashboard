import Image, { StaticImageData } from "next/image";
import React from "react";
import total_outlet from "@/public/statistics/ice-cream.svg";
import total_polar_outlet from "@/public/statistics/outlet.svg";
import poi from "@/public/statistics/poi.svg";
import suggestion from "@/public/statistics/light.svg";
import highlight from "@/public/statistics/light.svg";

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
      className={`flex items-center justify-between px-8 border border-gray-200 rounded-lg shadow flex-row ${
        isHighlighted ? "col-span-1 md:col-span-2" : ""
      }`}
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

// Define the Statistics component
const Statistics: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] relative">
      <div className="absolute rounded-t-[20px] w-[220px] h-[50px] flex justify-center items-center bg-[#EC1B23]">
        <p className="text-white font-bold">Statistics</p>
      </div>
      <div className="grid grid-cols-1 pt-12 md:grid-cols-3 gap-4 px-2 md:px-6 mt-4">
        <StatisticCard title="Total Outlet" value="1547" icon={total_outlet} />
        <StatisticCard
          title="Total Polar Outlet"
          value="584"
          icon={total_polar_outlet}
        />
        <StatisticCard title="Number of POI" value="2274" icon={poi} />
        <StatisticCard
          title="Suggestion"
          value="Established More Outlet"
          icon={suggestion}
        />
        <StatisticCard
          title="Key Highlight"
          value="2 School, 3 Shopping Outlet, 1 Coaching Center"
          icon={highlight}
          isHighlighted
        />
      </div>
    </div>
  );
};

export default Statistics;
