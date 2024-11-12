//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { useMap } from "react-map-gl";

type State = {
  leftPanel: {
    selectedRegion: {
      value: string;
    };
  };
};

const useFilteredFeaturesByRegion = () => {
  const { myMapA } = useMap();
  const region = useAppSelector(
    (state: State) => state.leftPanel.selectedRegion
  );
  const [filteredFeatures, setFilteredFeatures] = useState([]);

  useEffect(() => {
    const map = myMapA?.getMap();
    if (!map || !region?.value) return;

    const fetchFilteredFeatures = () => {
      const allFeatures = myMapA?.queryRenderedFeatures();
      if (!allFeatures) return;

      const regionFeatures = allFeatures.filter((feature) => {
        return (
          feature?.layer?.id === "polar-zone" &&
          feature?.properties?.area === region.value &&
          feature?.properties?.geohash
        );
      });

      setFilteredFeatures(regionFeatures);
      console.log("Filtered Features:", regionFeatures); // Log filtered features here
    };

    fetchFilteredFeatures();
    map.on("moveend", fetchFilteredFeatures);

    return () => {
      map.off("moveend", fetchFilteredFeatures);
    };
  }, [myMapA, region]);

  return filteredFeatures;
};

export default useFilteredFeaturesByRegion;
