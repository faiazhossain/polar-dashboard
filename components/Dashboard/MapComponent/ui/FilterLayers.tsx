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

  const getHighestValueFeature = (
    dataKey: string,
    filterData: any[],
    region: any
  ): any => {
    const filteredFeatures = filterData.filter((feature: any) => {
      return (
        feature?.layer?.id === "ada day bounds" &&
        feature?.properties?.area === region?.title
      );
    });

    let highestValue = 0;
    let highestFeature = null;

    // Loop through the filtered features to find the highest value
    filteredFeatures.forEach((feature: any) => {
      const value = feature.properties[dataKey];
      if (value && value > highestValue) {
        highestValue = value;
        highestFeature = feature;
      }
    });

    return highestFeature;
  };

  const getFilters = (): any[] => {
    const filters: any[] = ["all", ["==", ["geometry-type"], "Polygon"]];
    const filteredData = myMapA?.queryRenderedFeatures();

    const featuresWithId = filteredData?.filter(
      (feature) => feature.layer.id === "ada day bounds"
    );

    if (!featuresWithId) {
      return filters;
    }

    if (ageGroup) {
      highestAgeFeature = getHighestValueFeature(
        ageGroup,
        featuresWithId,
        region
      );
    }

    const transformedGender = transformGender(genderGroup);
    if (transformedGender) {
      highestGenderFeature = getHighestValueFeature(
        transformedGender,
        featuresWithId,
        region
      );
    }

    const transformedAffluence = transformAffluence(affluenceGroup);
    if (transformedAffluence) {
      highestAffluenceFeature = getHighestValueFeature(
        transformedAffluence,
        featuresWithId,
        region
      );
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

    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [feature],
      },
    });

    map.addLayer({
      id: fillLayerId,
      type: "fill",
      source: sourceId,
      layout: {},
      paint: {
        "fill-color": color,
        "fill-opacity": 0.2,
      },
    });

    map.addLayer({
      id: strokeLayerId,
      type: "line",
      source: sourceId,
      layout: {},
      paint: {
        "line-color": color,
        "line-width": 4,
        "line-opacity": 0.5,
      },
    });

    const centerCoordinates = turf.center(feature).geometry.coordinates;
    map.flyTo({
      center: centerCoordinates,
      zoom: 14,
      speed: 1,
      curve: 1,
      essential: true,
    });
  };

  useEffect(() => {
    const map = myMapA?.getMap();

    if (!map) return;

    const updateMapStyle = () => {
      const filters = getFilters();

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
