//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { useMap } from "react-map-gl";
import { useDispatch } from "react-redux";
import * as turf from "@turf/turf";
import { setFilteredGeohash } from "@/lib/store/features/MapSlice/mapSlice";
import ngeohash from "ngeohash";

type State = {
  leftPanel: {
    selectedRegion: {
      value: string;
    };
  };
};

const getRandomColor = () => {
  return `#FF0000`;
};

const useFilteredFeaturesByRegion = () => {
  const { myMapA } = useMap();
  const region = useAppSelector(
    (state: State) => state.leftPanel.selectedRegion
  );
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [geohashColors, setGeohashColors] = useState({});
  const { geohash: selectedGeohash } = useAppSelector(
    (state) => state.buildingstatistics.geohash
  );
  const dispatch = useDispatch();
  console.log(
    "🚀 ~ useFilteredFeaturesByRegion ~ selectedGeohash:",
    selectedGeohash
  );

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
    };

    fetchFilteredFeatures();
    map.on("moveend", fetchFilteredFeatures);

    return () => {
      map.off("moveend", fetchFilteredFeatures);
    };
  }, [myMapA, region]);

  useEffect(() => {
    const uniqueGeohashes = [
      ...new Set(filteredFeatures.map((feature) => feature.properties.geohash)),
    ];

    if (uniqueGeohashes.length > 0) {
      dispatch(setFilteredGeohash(uniqueGeohashes));
    }

    const colors = uniqueGeohashes.reduce((acc, geohash) => {
      acc[geohash] = getRandomColor();
      return acc;
    }, {});
    setGeohashColors(colors);
  }, [filteredFeatures, dispatch]);

  useEffect(() => {
    const map = myMapA?.getMap();
    if (!map) return;

    const addGeohashLayers = () => {
      filteredFeatures.forEach((feature) => {
        const geohash = feature.properties.geohash;

        if (map.getSource(geohash)) return;

        // Generate a bounding box polygon using ngeohash or feature geometry
        let geojsonPolygon;
        if (feature.geometry) {
          geojsonPolygon = feature.geometry;
        } else {
          const [minLng, minLat, maxLng, maxLat] =
            ngeohash.decode_bbox(geohash);
          geojsonPolygon = turf.bboxPolygon([
            minLng,
            minLat,
            maxLng,
            maxLat,
          ]).geometry;
        }

        map.addSource(geohash, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: geojsonPolygon,
          },
        });

        const fillColor = geohash === selectedGeohash ? "#0000FF" : "#FF0000"; // Blue if matched, otherwise red

        map.addLayer({
          id: geohash,
          type: "fill",
          source: geohash,
          paint: {
            "fill-color": fillColor,
            "fill-opacity": geohash === selectedGeohash ? 0.5 : 0.2,
          },
        });

        if (geohash === selectedGeohash) {
          console.log("Matched feature:", feature); // Log the matched feature
        }

        map.on("mouseenter", geohash, () => {
          map.setPaintProperty(geohash, "fill-opacity", 0.4);
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", geohash, () => {
          map.setPaintProperty(
            geohash,
            "fill-opacity",
            geohash === selectedGeohash ? 0.5 : 0.2
          );
          map.getCanvas().style.cursor = "";
        });
      });
    };

    addGeohashLayers();

    return () => {
      filteredFeatures.forEach((feature) => {
        const geohash = feature.properties.geohash;
        if (map.getLayer(geohash)) {
          map.removeLayer(geohash);
          map.removeSource(geohash);
        }
      });
    };
  }, [myMapA, filteredFeatures, selectedGeohash]);

  return filteredFeatures;
};

export default useFilteredFeaturesByRegion;
