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
  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);

  useEffect(() => {
    const map = myMapA?.getMap();
    if (!map || !region?.value) return;

    const fetchFilteredFeatures = () => {
      const allFeatures = map.queryRenderedFeatures();
      if (!allFeatures) return;

      const regionFeatures = allFeatures.filter((feature) => {
        return (
          feature?.layer?.id === "polar-zone" &&
          feature?.properties?.area === region.value &&
          feature?.properties?.geohash
        );
      });

      setFilteredFeatures(regionFeatures); // Log filtered features here
    };

    // Fetch filtered features after the map style is loaded
    fetchFilteredFeatures();
    map.on("moveend", fetchFilteredFeatures);

    // Track feature under the cursor on mousemove
    map.on("mousemove", "polar-zone", (e) => {
      const hoveredFeature = e.features[0];

      if (!hoveredFeature || !hoveredFeature.properties.geohash) return;

      const featureGeoHash = hoveredFeature.properties.geohash;

      // Avoid updating the layer if already highlighting this feature
      if (hoveredFeatureId === featureGeoHash) return;

      setHoveredFeatureId(featureGeoHash);

      const sourceData = {
        type: "FeatureCollection",
        features: [hoveredFeature],
      };

      // Add or update the highlight layer with the hovered feature
      if (map.getLayer("highlighted-feature")) {
        map.getSource("highlighted-feature").setData(sourceData);
      } else {
        map.addSource("highlighted-feature", {
          type: "geojson",
          data: sourceData,
        });
        map.addLayer({
          id: "highlighted-feature",
          type: "fill",
          source: "highlighted-feature",
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.6,
          },
        });
      }
    });

    map.on("mouseleave", "polar-zone", () => {
      // Remove the highlight layer and reset hoveredFeatureId when the cursor leaves the layer
      setHoveredFeatureId(null);
      if (map.getLayer("highlighted-feature")) {
        map.removeLayer("highlighted-feature");
        map.removeSource("highlighted-feature");
      }
    });

    return () => {
      map.off("moveend", fetchFilteredFeatures);
      map.off("mousemove", "polar-zone");
      map.off("mouseleave", "polar-zone");
    };
  }, [myMapA, region, hoveredFeatureId]);

  return filteredFeatures;
};

export default useFilteredFeaturesByRegion;
