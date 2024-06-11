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

function MapComponent() {
  const mapRef = React.useRef<MapRef>(null);
  const TimeFrame = useAppSelector((state: any) => state.leftPanel.timeState);
  const { statistics } = useAppSelector((state) => state.statistics);
  const statisticsBuilding = useAppSelector(
    (state) => state.buildingstatistics.buildingStatistics
  );
  const selection = useAppSelector((state) => state?.mapdata?.selectedButton);
  useFilterLayers();

  React.useEffect(() => {
    if (statistics && selection === "Zone" && mapRef.current) {
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

  return (
    <div className="rounded-[20px] relative h-full md:min-h-[68vh] w-full mr-1 @apply shadow-[0px_4px_4px_0px_#00000040]">
      <nav className="bg-white flex justify-end p-2 @apply shadow-[0px_2px_2px_0px_#00000066] z-40 absolute top-0 left-0 right-0 rounded-t-[20px]">
        <Switch />
        <span className="ml-2">Switch Polar Outlet</span>
      </nav>
      <Map
        ref={mapRef}
        id="myMapA"
        initialViewState={{
          longitude: 90.403387,
          latitude: 23.71253,
          zoom: 16.5,
        }}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "68vh",
          borderRadius: 20,
          position: "relative",
        }}
        mapStyle="https://tiles.barikoimaps.dev/styles/barkoi_green/style.json"
        attributionControl={false}
      >
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
