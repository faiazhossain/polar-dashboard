//@ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useMap } from 'react-map-gl';
import { addClickedCoordinate } from '@/lib/store/features/MapSlice/mapSlice';

type State = {
  leftPanel: {
    selectedRegion: {
      value: string;
    };
  };
};

const useFilteredFeaturesByRegion = () => {
  const { myMapA } = useMap();
  const dispatch = useAppDispatch();
  const region = useAppSelector(
    (state: State) => state.leftPanel.selectedRegion
  );

  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const selectedRank = useAppSelector(
    (state: any) => state?.mapdata?.selectedRankFromSlider
  );
  const toggleInfo = useAppSelector(
    (state: any) => state?.leftPanel?.toggleInfo
  );

  useEffect(() => {
    const map = myMapA?.getMap();
    if (!map || !region?.value) return;

    const fetchFilteredFeatures = () => {
      const allFeatures = map.queryRenderedFeatures();
      if (!allFeatures) return;

      const regionFeatures = allFeatures.filter((feature) => {
        return (
          feature?.layer?.id === 'polar-zone' &&
          feature?.properties?.area === region.value &&
          feature?.properties?.geohash
        );
      });

      setFilteredFeatures(regionFeatures);
    };

    // Fetch filtered features after the map style is loaded
    fetchFilteredFeatures();
    map.on('moveend', fetchFilteredFeatures);

    const handleClick = (e) => {
      if (!toggleInfo) return;
      const clickedFeature = e.features[0];
      if (!clickedFeature || !clickedFeature.properties.geohash) return;

      const clickedGeoHash = clickedFeature.properties.geohash;

      // Query all features and find those with matching geohash === b_hash and rank > selectedRank
      const allFeatures = map.queryRenderedFeatures();
      const selectedRankNumber = Number(selectedRank); // Use the updated value from `useAppSelector`

      const matchingFeatures = allFeatures.filter(
        (feature) =>
          feature?.layer?.id === 'polar-zone' &&
          feature?.properties?.b_hash === clickedGeoHash &&
          feature?.properties?.rank != null &&
          Number(feature?.properties?.rank) > selectedRankNumber
      );

      const markerGeoJSON = {
        type: 'FeatureCollection',
        features: matchingFeatures.map((feature) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates:
              feature.geometry.type === 'Point'
                ? feature.geometry.coordinates
                : getFeatureCenter(feature.geometry),
          },
          properties: {
            rank: feature.properties.rank,
          },
        })),
      };

      if (markerGeoJSON.features) {
        markerGeoJSON.features.map((marker) => {
          dispatch(
            addClickedCoordinate({
              coordinates: marker.geometry.coordinates,
              rank: marker.properties.rank,
            })
          );
        });
      }

      const center =
        clickedFeature.geometry.type === 'Point'
          ? clickedFeature.geometry.coordinates
          : getFeatureCenter(clickedFeature.geometry);

      if (center) {
        map.flyTo({ center, zoom: 15 });
      }
    };

    map.on('click', 'polar-zone', handleClick);

    return () => {
      map.off('moveend', fetchFilteredFeatures);
      map.off('click', 'polar-zone', handleClick);

      if (map.getLayer('matched-features-markers')) {
        map.removeLayer('matched-features-markers');
        map.removeSource('matched-features-markers');
      }
    };
  }, [myMapA, region, selectedRank, hoveredFeatureId, toggleInfo, dispatch]);

  return filteredFeatures;
};

export default useFilteredFeaturesByRegion;

// Helper function to calculate the center of a non-point feature
const getFeatureCenter = (geometry) => {
  if (!geometry || geometry.type !== 'Polygon') return null;

  const coordinates = geometry.coordinates[0]; // Outer ring
  const [sumX, sumY] = coordinates.reduce(
    ([sumX, sumY], [x, y]) => [sumX + x, sumY + y],
    [0, 0]
  );
  const count = coordinates.length;
  return [sumX / count, sumY / count]; // Average coordinates
};
