import * as React from "react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Switch } from "@/components/ui/switch";
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";

function MapComponent() {
  return (
    <div className="rounded-[20px] relative h-full min-h-72 w-full mr-1 @apply shadow-[0px_4px_4px_0px_#00000040]">
      <nav className="bg-white flex justify-end p-2 @apply shadow-[0px_2px_2px_0px_#00000066] z-40 absolute top-0 left-0 right-0 rounded-t-[20px]">
        <Switch />
        <span className="ml-2">Switch Polar Outlet</span>
      </nav>
      <Map
        initialViewState={{
          longitude: 90.37839,
          latitude: 23.76663,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
        mapStyle="https://map.barikoi.com/styles/osm-liberty/style.json?key=NDE2NzpVNzkyTE5UMUoy"
        attributionControl={false}
      >
        <AttributionControl customAttribution="Map designed by barikoi" />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
      </Map>
    </div>
  );
}

export default MapComponent;
