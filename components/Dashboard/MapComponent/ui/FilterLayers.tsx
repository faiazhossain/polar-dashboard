"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import { useMap } from "react-map-gl";

type State = {
  leftPanel: {
    timeState: string;
    selectedAgeGroup: string;
    selectedGender: string;
    selectedAffluence: string;
    selectedRegion: string;
  };
  leftPanelPercentage: {
    selectedAgeGroupPercentage: number;
    genderPercentage: number;
    affluencePercentage: number;
  };
};

const useFilterLayers = () => {
  const { myMapA } = useMap();
  const timeFrame = useAppSelector((state: State) => state.leftPanel.timeState);
  console.log("🚀 ~ useFilterLayers ~ timeFrame:", timeFrame);
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
  const percentageAge = useAppSelector(
    (state: State) => state.leftPanelPercentage.selectedAgeGroupPercentage
  );
  const percentageGender = useAppSelector(
    (state: State) => state.leftPanelPercentage.genderPercentage
  );
  const percentAffluence = useAppSelector(
    (state: State) => state.leftPanelPercentage.affluencePercentage
  );

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

  const getFilters = (): any[] => {
    const filters: any[] = ["all", ["==", ["geometry-type"], "Polygon"]];

    if (ageGroup) {
      filters.push([
        "any",
        ["!", ["has", ageGroup]],
        [
          "all",
          [">=", ["get", ageGroup], 0],
          ["<=", ["get", ageGroup], percentageAge / 100],
        ],
      ]);
    }

    const transformedGender = transformGender(genderGroup);
    if (transformedGender) {
      filters.push([
        "any",
        ["!", ["has", transformedGender]],
        [
          "all",
          [">=", ["get", transformedGender], 0],
          ["<=", ["get", transformedGender], percentageGender / 100],
        ],
      ]);
    }
    if (region) {
      filters.push([
        "all",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["get", "region"], region],
      ]);
    }

    const transformedAffluence = transformAffluence(affluenceGroup);
    if (transformedAffluence) {
      filters.push([
        "any",
        ["!", ["has", transformedAffluence]],
        [
          "all",
          [">=", ["get", transformedAffluence], 0],
          ["<=", ["get", transformedAffluence], percentAffluence / 100],
        ],
      ]);
    }

    return filters;
  };

  useEffect(() => {
    const map = myMapA?.getMap();

    if (!map) return;

    const updateMapStyle = () => {
      const filters = getFilters();

      if (timeFrame === "Day") {
        map.setFilter("ada-day-buildings", filters);
        map.setFilter("ada day bounds", filters);
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
  }, [
    timeFrame,
    myMapA,
    ageGroup,
    percentageAge,
    genderGroup,
    percentageGender,
    percentAffluence,
    region,
  ]);
};

export default useFilterLayers;
