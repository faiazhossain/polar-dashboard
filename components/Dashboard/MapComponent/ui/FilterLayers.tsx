//@ts-nocheck
"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import { useMap } from "react-map-gl";
import * as turf from "@turf/turf"; // Import all Turf functions as turf

type State = {
  leftPanel: {
    timeState: string;
    selectedAgeGroup: string;
    selectedGender: string;
    selectedAffluence: string;
    selectedRegion: string;
  };
};

const useFilterLayers = () => {
  const { myMapA } = useMap();
  const timeFrame = useAppSelector((state: State) => state.leftPanel.timeState);
  const ageGroup = useAppSelector(
    (state: State) => state.leftPanel.selectedAgeGroup
  );
  const region = useAppSelector(
    (state: State) => state.leftPanel.selectedRegion
  );
  const genderGroup = useAppSelector(
    (state: State) => state.leftPanel.selectedGender
  );
  const affluenceGroup = useAppSelector(
    (state: State) => state.leftPanel.selectedAffluence
  );

  let highestAgeFeature = null; // Declare here

  const transformValue = (value: string, map: Record<string, string>): string =>
    map[value] || value;

  const transformGender = (gender: string): string =>
    transformValue(gender, {
      Male: "M",
      Female: "F",
    });

  const transformAffluence = (affluence: string): string =>
    transformValue(affluence, {
      "Ultra High": "Ultra_High",
      High: "High",
      Low: "low",
      Medium: "Mid",
    });

  const getHighestValueFeature = (dataKey: string, filterData: any[]): any => {
    let highestValue = 0;
    let highestFeature = null;

    filterData.forEach((feature: any) => {
      const value = feature.properties[dataKey];
      if (value && value > highestValue) {
        highestValue = value;
        highestFeature = feature; // Save the feature with the highest value
      }
    });

    return highestFeature; // Return the feature with the highest value
  };

  const getFilters = (): any[] => {
    const filters: any[] = ["all", ["==", ["geometry-type"], "Polygon"]];
    const filteredData = myMapA?.queryRenderedFeatures(); // Get data from map
    if (!filteredData) {
      return filters;
    }

    if (ageGroup) {
      highestAgeFeature = getHighestValueFeature(ageGroup, filteredData); // Update the variable here
      if (highestAgeFeature) {
        console.log("🚀 ~ getFilters ~ highestAgeFeature:", highestAgeFeature);
        const highestAgeValue = highestAgeFeature.properties[ageGroup];
      }
    }

    const transformedGender = transformGender(genderGroup);
    if (transformedGender) {
      const highestGenderFeature = getHighestValueFeature(
        transformedGender,
        filteredData
      );
      if (highestGenderFeature) {
        console.log(
          "🚀 ~ getFilters ~ highestGenderFeature:",
          highestGenderFeature
        );
      }
    }

    const transformedAffluence = transformAffluence(affluenceGroup);
    if (transformedAffluence) {
      const highestAffluenceFeature = getHighestValueFeature(
        transformedAffluence,
        filteredData
      );
      if (highestAffluenceFeature) {
        console.log(
          "🚀 ~ getFilters ~ highestAffluenceFeature:",
          highestAffluenceFeature
        );
      }
    }

    if (region.pId === "Division") {
      filters.push([
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["get", "division"], region?.title],
      ]);
    }
    if (region.pId === "Dhaka") {
      filters.push([
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["get", "region"], `${region?.title} City Corporation`],
      ]);
    }
    if (region.pId === "Dhaka North" || region.pId === "Dhaka South") {
      filters.push([
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["get", "area"], `${region?.title}`],
      ]);
    }

    return filters;
  };

  useEffect(() => {
    const map = myMapA?.getMap();

    if (!map) return;

    const updateMapStyle = () => {
      const filters = getFilters();
      // Highlight the feature with the highest age value
      // Inside your updateMapStyle function:
      // Clean up existing layers and sources if they exist
      const map = myMapA?.getMap();
      if (!map) return;

      // Check if the highlight layers exist and remove them first
      if (map.getLayer("highlight-highest-age-stroke")) {
        map.removeLayer("highlight-highest-age-stroke");
      }
      if (map.getLayer("highlight-highest-age")) {
        map.removeLayer("highlight-highest-age");
      }

      // Remove sources after layers
      if (map.getSource("highest-age-feature")) {
        map.removeSource("highest-age-feature");
      }
      if (map.getSource("highlight-highest-age-stroke")) {
        map.removeSource("highlight-highest-age-stroke");
      }

      if (highestAgeFeature) {
        // Add a source for the highest age feature if it doesn't exist
        if (!map.getSource("highest-age-feature")) {
          map.addSource("highest-age-feature", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [highestAgeFeature],
            },
          });
        } else {
          // If the source exists, update its data
          map.getSource("highest-age-feature").setData({
            type: "FeatureCollection",
            features: [highestAgeFeature],
          });
        }

        // Check if the fill layer already exists
        if (!map.getLayer("highlight-highest-age")) {
          // Add a layer to highlight the highest age feature with fill
          map.addLayer({
            id: "highlight-highest-age",
            type: "fill",
            source: "highest-age-feature",
            layout: {},
            paint: {
              "fill-color": "#FF0000", // Set the fill color to red
              "fill-opacity": 0.2, // Set the opacity
            },
          });
        }

        // Check if the stroke layer already exists
        if (!map.getLayer("highlight-highest-age-stroke")) {
          // Add a stroke layer to make it appear larger
          map.addLayer({
            id: "highlight-highest-age-stroke",
            type: "line",
            source: "highest-age-feature",
            layout: {},
            paint: {
              "line-color": "#FF0000", // Set the stroke color to red
              "line-width": 4, // Set the stroke width
              "line-opacity": 0.5,
            },
          });
        }

        // Fly to the highest age feature's center
        const centerCoordinates =
          turf.center(highestAgeFeature).geometry.coordinates;
        map.flyTo({
          center: centerCoordinates, // Coordinates should be in [lng, lat] format
          zoom: 14.5, // Adjust the zoom level as needed
          speed: 1, // Adjust the speed of the flyTo animation
          curve: 1, // Adjust the curve of the animation
          essential: true, // This animation is considered essential
        });
      }

      if (timeFrame === "Day") {
        map.setFilter("ada-day-buildings", filters);
        map.setFilter("ada day bounds", filters);
        map.setFilter("ada_day_buildings_symbol", filters);
        map.setLayoutProperty("ada-day-buildings", "visibility", "visible");
        map.setLayoutProperty("ada day bounds", "visibility", "visible");
        map.setLayoutProperty(
          "ada_day_buildings_symbol",
          "visibility",
          "visible"
        );
        map.setLayoutProperty("ada-night-buildings", "visibility", "none");
        map.setLayoutProperty("ada night bounds", "visibility", "none");
        map.setLayoutProperty(
          "ada_night_buildings_symbol",
          "visibility",
          "none"
        );
      } else if (timeFrame === "Night") {
        map.setFilter("ada-night-buildings", filters);
        map.setFilter("ada night bounds", filters);
        map.setFilter("ada_night_buildings_symbol", filters);
        map.setLayoutProperty("ada-night-buildings", "visibility", "visible");
        map.setLayoutProperty("ada night bounds", "visibility", "visible");
        map.setLayoutProperty(
          "ada_night_buildings_symbol",
          "visibility",
          "visible"
        );
        map.setLayoutProperty("ada-day-buildings", "visibility", "none");
        map.setLayoutProperty("ada day bounds", "visibility", "none");
        map.setLayoutProperty("ada_day_buildings_symbol", "visibility", "none");
      } else {
        map.setLayoutProperty("ada-day-buildings", "visibility", "none");
        map.setLayoutProperty("ada night bounds", "visibility", "none");
        map.setLayoutProperty("ada_day_buildings_symbol", "visibility", "none");
        map.setLayoutProperty("ada-night-buildings", "visibility", "none");
        map.setLayoutProperty("ada day bounds", "visibility", "none");
        map.setLayoutProperty(
          "ada_night_buildings_symbol",
          "visibility",
          "none"
        );
      }
    };

    if (map.isStyleLoaded()) {
      updateMapStyle();
    } else {
      map.on("styledata", updateMapStyle);
    }

    return () => {
      map.off("styledata", updateMapStyle);
    };
  }, [timeFrame, myMapA, ageGroup, genderGroup, region, affluenceGroup]);
};

export default useFilterLayers;
