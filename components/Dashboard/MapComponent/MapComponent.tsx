import * as React from "react";
import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "@/components/ui/switch";
import BarikoiLogo from "@/app/image/barikoi-logo-black.svg";
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

import { useAppSelector } from "@/lib/store/hooks";
import useFilterLayers from "./ui/FilterLayers";
import StatisticsOnHover from "./ui/StatisticsOnClick";
import PopUpOnClick from "./ui/PopUpOnClick";
import ToggleButton from "./ui/ToggleButton";
import BuildingStatisticsOnClick from "./ui/BuildingStatisticsOnClick";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { Padding } from "maplibre-gl";

function MapComponent() {
  const mapRef = React.useRef<MapRef>(null);
  const TimeFrame = useAppSelector((state: any) => state.leftPanel.timeState);
  const [zoomLevel, setZoomLevel] = React.useState(14.3);
  const { statistics } = useAppSelector((state) => state.statistics);
  const statisticsBuilding = useAppSelector(
    (state) => state.buildingstatistics.buildingStatistics
  );
  const bbox = useAppSelector((state: any) => state.leftPanel.boundingBox);
  const selection = useAppSelector((state) => state?.mapdata?.selectedButton);
  const region = useAppSelector((state: any) => state.leftPanel.selectedRegion);
  const ageGroup = useAppSelector(
    (state: any) => state.leftPanel.selectedAgeGroup
  );
  const genderGroup = useAppSelector(
    (state: any) => state.leftPanel.selectedGender
  );
  const affluenceGroup = useAppSelector(
    (state: any) => state.leftPanel.selectedAffluence
  );
  useFilterLayers();

  // Update zoom level on zoom event
  const handleZoom = React.useCallback(() => {
    const zoom = mapRef?.current?.getZoom();
    if (zoom) {
      setZoomLevel(zoom);
    }
  }, []);

  React.useEffect(() => {
    if (statistics.lng != 0 && selection === "Zone" && mapRef.current) {
      mapRef.current.flyTo({
        center: [statistics.lng, statistics.lat],
        essential: true,
      });
    }
  }, [statistics, selection]);

  React.useEffect(() => {
    if (
      statisticsBuilding.details &&
      selection === "Building" &&
      mapRef.current
    ) {
      mapRef.current.flyTo({
        center: [statisticsBuilding.lng, statisticsBuilding.lat],
        essential: true,
      });
    }
  }, [statisticsBuilding, selection]);

  React.useEffect(() => {
    if (bbox) {
      mapRef?.current?.fitBounds(
        [
          //@ts-ignore
          [bbox?.minLng, bbox?.minLat],
          //@ts-ignore
          [bbox?.maxLng, bbox?.maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  }, [bbox]);

  return (
    <div className="rounded-[20px] relative h-full md:min-h-[68vh] w-full mr-1 @apply shadow-[0px_4px_4px_0px_#00000040]">
      <nav className="bg-white flex justify-between p-2 @apply shadow-[0px_2px_2px_0px_#00000066] z-40 absolute top-0 left-0 right-0 rounded-t-[20px]">
        <div className=" flex justify-center items-center">
          <span className="ml-4 mr-2 text-md">Current zoom level: </span>
          <div
            className={`${
              parseFloat(zoomLevel.toFixed(2)) >= 14
                ? "text-green-600"
                : "text-red-400"
            } font-bold text-md`}
          >
            {zoomLevel.toFixed(2)}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="ml-1" type="text">
                  <FaInfoCircle className="text-md" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm border-none">
                  {" "}
                  Zoom in to at least level 14 to view detailed building and
                  zone data.{" "}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="ml-4 mr-2 text-md font-semibold text-gray-700 rounded-md p-2 ">
          Latest Update: October 10
        </div>
        <div className=" flex justify-center items-center">
          <Switch />
          <span className="ml-2">Switch Polar Outlet</span>
        </div>
      </nav>
      <Map
        ref={mapRef}
        id="myMapA"
        initialViewState={{
          longitude: 90.42214,
          latitude: 23.71421,
          zoom: 14.3,
        }}
        onZoom={handleZoom} // Listen for zoom changes
        style={{
          width: "100%",
          height: "100%",
          minHeight: "68vh",
          borderRadius: 20,
          position: "relative",
        }}
        mapStyle="http://localhost:4006/styles/barkoi_green/style.json"
        attributionControl={false}
      >
        {/* {region?.title && (
          <div
            style={{
              position: "absolute",
              top: "200px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            {affluenceGroup && (
              <p
                style={{
                  backgroundColor: "rgba(0, 255, 0, .3)",
                  padding: "0 4px",
                }}
              >
                AFFLUENCE
              </p>
            )}
            {genderGroup && (
              <p
                style={{
                  backgroundColor: "rgba(0, 0, 255, .3)",
                  padding: "0 4px",
                }}
              >
                GENDER
              </p>
            )}
            {ageGroup && (
              <p
                style={{
                  backgroundColor: "rgba(255, 0, 0, .3)",
                  padding: "0 4px",
                }}
              >
                AGE
              </p>
            )}
          </div>
        )} */}
        <Link
          href="https://barikoi.com/"
          className="absolute bottom-2 left-3 w-16"
          target="_blank"
        >
          <Image
            src={BarikoiLogo}
            alt="Logo"
            width={20}
            height={24}
            layout="responsive"
          />
        </Link>
        {TimeFrame && <ToggleButton />}
        {/* <AttributionControl /> */}
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <PopUpOnClick mode={TimeFrame} />
        <StatisticsOnHover mode={TimeFrame} />
        <BuildingStatisticsOnClick mode={TimeFrame} />

        {statistics && selection === "Zone" && (
          <Marker
            longitude={statistics?.lng}
            color="red"
            latitude={statistics?.lat}
          />
        )}
        {statisticsBuilding.details && selection === "Building" && (
          <Marker
            longitude={statisticsBuilding?.lng}
            color="blue"
            latitude={statisticsBuilding?.lat}
          />
        )}
      </Map>
    </div>
  );
}

export default MapComponent;
