import Image from "next/image";
import React from "react";
import total_outlet from "@/public/statistics/outlet.svg";
import total_polar_outlet from "@/public/statistics/outlet.svg";
import poi from "@/public/statistics/poi.svg";
import suggestion from "@/public/statistics/light.svg";
import highlight from "@/public/statistics/light.svg";
const Statistics = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white rounded-[20px]">
      <div className="flex items-center justify-around border border-gray-200 rounded-lg shadow flex-row md:max-w-x">
        <div className="flex flex-col justify-between p-1 leading-normal">
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            Total Outlet
          </p>
          <p className="mb-3 text-2xl font-bold text-[#EC1B23] dark:text-gray-400">
            1547
          </p>
        </div>
        <div>
          <Image
            className="object-cover"
            src={total_outlet}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="flex items-center justify-around border border-gray-200 rounded-lg shadow flex-row md:max-w-x">
        <div className="flex flex-col justify-between p-1 leading-normal">
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            Total Polar Outlet
          </p>
          <p className="mb-3 text-2xl font-bold text-[#EC1B23] dark:text-gray-400">
            584
          </p>
        </div>
        <div>
          <Image
            className="object-cover"
            src={total_polar_outlet}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="flex items-center justify-around  border border-gray-200 rounded-lg shadow flex-row md:max-w-x">
        <div className="flex flex-col justify-between p-1 leading-normal">
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            Number of POI
          </p>
          <p className="mb-3 text-2xl font-bold text-[#EC1B23] dark:text-gray-400">
            2274
          </p>
        </div>
        <div>
          <Image
            className="object-cover"
            src={poi}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="flex items-center justify-around  border border-gray-200 rounded-lg shadow flex-row md:max-w-x">
        <div className="flex flex-col justify-between p-1 leading-normal">
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            Suggestion
          </p>
          <p className="mb-3 text-md font-bold text-[#EC1B23] dark:text-gray-400">
            Established More Outlet
          </p>
        </div>
        <div>
          <Image
            className="object-cover"
            src={suggestion}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 flex items-center justify-between px-8 border border-gray-200 rounded-lg shadow flex-row md:max-w-x">
        <div className="flex flex-col justify-between p-1 leading-normal">
          <p className="mb-2 text-sm tracking-tight text-gray-900 dark:text-white">
            Key Highlight
          </p>
          <p className="mb-3 text-md font-bold text-[#EC1B23] dark:text-gray-400">
            2 School, 3 Shopping Outlet, 1 Coaching Center
          </p>
        </div>
        <div>
          <Image
            className="object-cover"
            src={highlight}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
