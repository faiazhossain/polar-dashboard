import * as React from "react";
import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "@/components/ui/switch";
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";

import { useAppSelector } from "@/lib/store/hooks";
import useFilterLayers from "./FilterLayers";
import StatisticsOnHover from "./StatisticsOnClick";
import PopUpOnClick from "./PopUpOnClick";
import ToggleButton from "./ui/ToggleButton";
import BuildingStatisticsOnClick from "./BuildingStatisticsOnClick";

function MapComponent() {
  const mapRef = React.useRef<MapRef>(null);
  const TimeFrame = useAppSelector((state: any) => state.leftPanel.timeState);
  const { statistics } = useAppSelector((state) => state.statistics);
  useFilterLayers();

  const layersConfig = {
    dayLayers: ["ada-day-bounds", "ada_day_zone"],
    nightLayers: ["ada-night-bounds", "ada_night_zone"],
  };

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
          longitude: 90.37839,
          latitude: 23.76663,
          zoom: 13,
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
        {TimeFrame && <ToggleButton />}
        <AttributionControl customAttribution="Map designed by barikoi" />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <PopUpOnClick mode={TimeFrame} />
        <StatisticsOnHover mode={TimeFrame} />
        <BuildingStatisticsOnClick mode={TimeFrame} />
        {statistics && (
          <Marker
            longitude={statistics?.lng}
            color="red"
            latitude={statistics?.lat}
          />
        )}
      </Map>
    </div>
  );
}

export default MapComponent;
