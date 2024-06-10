import { setSelectedButton } from "@/lib/store/features/MapSlice/mapSlice";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";
import { useDispatch } from "react-redux";

const ToggleButton = () => {
  const selection = useAppSelector((state) => state.mapdata.selectedButton);
  const dispatch = useDispatch();
  return (
    <div className="absolute right-2 top-12">
      <button
        className={`px-4 py-2 rounded-l ${
          selection === "Building"
            ? "bg-[#ec1b23] text-white border-2 border-[#ec1b23] font-bold"
            : "bg-gray-300"
        }`}
        onClick={() => dispatch(setSelectedButton("Building"))}
      >
        Building
      </button>
      <button
        className={`px-4 py-2 rounded-r ${
          selection === "Zone"
            ? "bg-[#ec1b23] text-white border-2 border-[#ec1b23] font-bold"
            : "bg-gray-300"
        }`}
        onClick={() => dispatch(setSelectedButton("Zone"))}
      >
        Zone
      </button>
    </div>
  );
};

export default ToggleButton;
