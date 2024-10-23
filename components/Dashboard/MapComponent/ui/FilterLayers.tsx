//@ts-nocheck
"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import { useMap } from "react-map-gl";
import * as turf from "@turf/turf";

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
  const region = useAppSelector(
    (state: State) => state.leftPanel.selectedRegion
  );
  const ageGroup = useAppSelector(
    (state: State) => state.leftPanel.selectedAgeGroup
  );
  const genderGroup = useAppSelector(
    (state: State) => state.leftPanel.selectedGender
  );
  const affluenceGroup = useAppSelector(
    (state: State) => state.leftPanel.selectedAffluence
  );

  let highestAgeFeature = null;
  let highestGenderFeature = null;
  let highestAffluenceFeature = null;

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

  const getExactBoundFeature = (
    dataKey: string,
    filterData: any[],
    region: any
  ): any => {
    const filteredFeatures = filterData.filter((feature: any) => {
      return (
        feature?.layer?.id === "polar-zone" &&
        feature?.properties?.area === region?.value &&
        feature?.properties?.geohash
      );
    });

    let highestValueFeature = null;
    filteredFeatures.forEach((feature: any) => {
      const value = feature.properties[timeFrame];
      const properties = JSON.parse(value);
      const propertiesValue = properties[dataKey];
      const geohash = feature;
      if (
        propertiesValue &&
        (!highestValueFeature ||
          propertiesValue > highestValueFeature.properties[dataKey])
      ) {
        highestValueFeature = feature;
      }
    });

    return highestValueFeature;
  };

  const getFilters = (): any[] => {
    const filters: any[] = ["all", ["==", ["geometry-type"], "Polygon"]];
    const filteredData = myMapA?.queryRenderedFeatures();

    const featuresWithId = filteredData?.filter(
      (feature) =>
        feature?.layer?.id === "polar-zone" ||
        feature?.layer?.id === "polar_buildings_symbol"
    );

    if (!featuresWithId) {
      return filters;
    }

    if (ageGroup) {
      highestAgeFeature = getExactBoundFeature(
        ageGroup,
        featuresWithId,
        region
      );
    }

    const transformedGender = transformGender(genderGroup);
    if (transformedGender) {
      highestGenderFeature = getExactBoundFeature(
        transformedGender,
        featuresWithId,
        region
      );
    }

    const transformedAffluence = transformAffluence(affluenceGroup);
    if (transformedAffluence) {
      highestAffluenceFeature = getExactBoundFeature(
        transformedAffluence,
        featuresWithId,
        region
      );
    }

    if (region.value) {
      filters.push([
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["get", "area"], `${region?.value}`],
      ]);
    }

    return filters;
  };

  const addHighlightLayer = (
    map,
    sourceId,
    strokeLayerId,
    fillLayerId,
    color,
    feature
  ) => {
    if (!map || !feature) return;

    if (map.getLayer(strokeLayerId)) {
      map.removeLayer(strokeLayerId);
    }
    if (map.getLayer(fillLayerId)) {
      map.removeLayer(fillLayerId);
    }

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    // Add source with the feature
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [feature],
      },
    });

    // Add a fill layer without color (transparent)
    map.addLayer({
      id: fillLayerId,
      type: "fill",
      source: sourceId,
      layout: {},
      paint: {
        "fill-color": "#000000", // Set color to black (or any color you prefer)
        "fill-opacity": 0, // Set fill opacity to 0 (completely transparent)
      },
    });

    // Add a stroke layer without color (transparent)
    map.addLayer({
      id: strokeLayerId,
      type: "line",
      source: sourceId,
      layout: {},
      paint: {
        "line-color": "#000000", // Set line color to black (or any color you prefer)
        "line-width": 4,
        "line-opacity": 0, // Set line opacity to 0 (completely transparent)
      },
    });

    // Use setCenter and setZoom to show the bounds without flying
    // const centerCoordinates = turf.center(feature).geometry.coordinates;
    // map.setCenter(centerCoordinates); // Set the map center immediately
    // map.setZoom(14);
  };

  useEffect(() => {
    const map = myMapA?.getMap();

    if (!map) return;

    const updateMapStyle = () => {
      const filters = getFilters();
      const filteredData = myMapA?.queryRenderedFeatures(); // Query features again to ensure we have the latest

      // Define the dynamic colors based on the time frame
      const timeBasedFillColor = {
        "6AM-12PM": [
          "case",
          ["has", "geohash"],
          "rgba(109, 41, 50, .1)",
          ["all", [">=", ["get", "rank"], 1], ["<=", ["get", "rank"], 4]],
          "#FF9B50",
          ["all", [">=", ["get", "rank"], 5], ["<=", ["get", "rank"], 10]],
          "#E25E3E",
          ["all", [">", ["get", "rank"], 10], ["<=", ["get", "rank"], 20]],
          "#C63D2F",
          "#4D2932",
        ],
        "12PM-6PM": [
          "case",
          ["has", "geohash"],
          "rgba(89, 33, 40, .2)",
          ["all", [">=", ["get", "rank"], 1], ["<=", ["get", "rank"], 4]],
          "#E68946",
          ["all", [">=", ["get", "rank"], 5], ["<=", ["get", "rank"], 10]],
          "#C14F34",
          ["all", [">", ["get", "rank"], 10], ["<=", ["get", "rank"], 20]],
          "#A53229",
          "#3D2227",
        ],
        "6PM-12AM": [
          "case",
          ["has", "geohash"],
          "rgba(41, 50, 109, .1)",
          ["all", [">=", ["get", "rank"], 1], ["<=", ["get", "rank"], 4]],
          "#99afff",
          ["all", [">=", ["get", "rank"], 5], ["<=", ["get", "rank"], 10]],
          "#3352ff",
          ["all", [">", ["get", "rank"], 10], ["<=", ["get", "rank"], 20]],
          "#2432b3",
          "#1a204d",
        ],
        "12AM-6AM": [
          "case",
          ["has", "geohash"],
          "rgba(41, 50, 109, .2)",
          ["all", [">=", ["get", "rank"], 1], ["<=", ["get", "rank"], 4]],
          "#8097ff",
          ["all", [">=", ["get", "rank"], 5], ["<=", ["get", "rank"], 10]],
          "#002ae6",
          ["all", [">", ["get", "rank"], 10], ["<=", ["get", "rank"], 20]],
          "#001780",
          "#000933",
        ],
      };

      // Get the current fill color based on the selected time frame
      const currentFillColor = timeBasedFillColor[timeFrame];

      // Set the fill-color dynamically for the polar-zone layer
      if (currentFillColor) {
        map.setPaintProperty("polar-zone", "fill-color", currentFillColor);
      }

      // Highlight layers logic remains unchanged
      const featuresWithId = filteredData?.filter(
        (feature) => feature.layer.id === "polar-zone"
      );

      highestAgeFeature = getExactBoundFeature(
        ageGroup,
        featuresWithId,
        region
      );

      highestGenderFeature = getExactBoundFeature(
        transformGender(genderGroup),
        featuresWithId,
        region
      );
      highestAffluenceFeature = getExactBoundFeature(
        transformAffluence(affluenceGroup),
        featuresWithId,
        region
      );

      // Add highlight layers
      addHighlightLayer(
        map,
        "highest-age-feature",
        "highlight-highest-age-stroke",
        "highlight-highest-age",
        "#FF0000",
        highestAgeFeature
      );
      addHighlightLayer(
        map,
        "highest-gender-feature",
        "highlight-highest-gender-stroke",
        "highlight-highest-gender",
        "#0000FF",
        highestGenderFeature
      );
      addHighlightLayer(
        map,
        "highest-affluence-feature",
        "highlight-highest-affluence-stroke",
        "highlight-highest-affluence",
        "#00FF00",
        highestAffluenceFeature
      );

      // Hide all layers by default
      const allLayers = ["polar-zone", "polar_buildings_symbol"];

      allLayers.forEach((layer) => {
        map.setLayoutProperty(layer, "visibility", "none");
      });

      // Set visibility and filters for the current time frame layer
      map.setLayoutProperty("polar-zone", "visibility", "visible");
      map.setFilter("polar-zone", filters);
      map.setLayoutProperty("polar_buildings_symbol", "visibility", "visible");
      map.setFilter("polar_buildings_symbol", filters);
    };

    if (map.isStyleLoaded()) {
      updateMapStyle();
    } else {
      map.on("style.load", updateMapStyle);
    }

    return () => {
      map.off("style.load", updateMapStyle);
    };
  }, [timeFrame, ageGroup, region, genderGroup, affluenceGroup]);

  return null; // Or return something meaningful if needed
};

export default useFilterLayers;
