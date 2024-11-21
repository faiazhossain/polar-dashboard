import {
  setBuildingStatistics,
  setLoading,
} from '@/lib/store/features/statistics/buildingStatisticsSlice';
import {
  clearClickedEntity,
  setClickedEntity,
} from '@/lib/store/features/statistics/clickedEntitySlice';
import { useAppSelector } from '@/lib/store/hooks';
import React, { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import { useDispatch } from 'react-redux';

interface StatisticsOnHoverProps {
  mode: '6AM-12PM' | '12PM-6PM' | '6PM-12AM' | '12AM-6AM';
}

const BuildingStatisticsOnClick: React.FC<StatisticsOnHoverProps> = ({
  mode,
}) => {
  const { current: map } = useMap();
  const dispatch = useDispatch();
  const selection = useAppSelector((state) => state.mapdata.selectedButton);
  console.log('🚀 ~ selection:', selection);

  const LAYERS = ['polar-zone']; // Constant for layers
  const fetchLocationData = async (longitude: number, latitude: number) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `/api/reverse-geocode?longitude=${longitude}&latitude=${latitude}`
      );
      if (!response.ok) throw new Error('Failed to fetch location data');

      const data = await response.json();
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.error('Error fetching location data:', error);
      dispatch(setLoading(false));
      return null;
    }
  };
  useEffect(() => {
    if (!map) return;

    const handleMapMouseClick = async (e: any) => {
      const features = map.queryRenderedFeatures(e.point, { layers: LAYERS });
      const coordinates = e.lngLat;
      const featuresWithoutGeohash = features.filter(
        (feature) => !feature?.properties?.geohash
      );

      if (featuresWithoutGeohash.length) {
        const properties = featuresWithoutGeohash[0]?.properties;

        if (properties) {
          // Fetch location data based on the clicked coordinates
          const locationData = await fetchLocationData(
            coordinates.lng,
            coordinates.lat
          );

          if (locationData) {
            // Create the poi_info string while excluding the area property
            const poiInfoArray = Object.entries(properties)
              .filter(([key]) => key !== 'area')
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ');

            // Update Redux with building statistics and location data
            dispatch(
              setBuildingStatistics({
                poi_info: poiInfoArray,
                lat: coordinates.lat,
                lng: coordinates.lng,
                region: properties.region || '',
                rank: properties.rank || 0,
                locationData: locationData, // Include fetched location data
              })
            );
            dispatch(setClickedEntity({ type: 'building' }));
          }
        }
      } else if (selection === 'Building') {
        dispatch(clearClickedEntity());
      }
    };

    map.on('click', handleMapMouseClick);

    return () => {
      map.off('click', handleMapMouseClick);
    };
  }, [mode, dispatch, selection]);

  return null;
};

export default BuildingStatisticsOnClick;
