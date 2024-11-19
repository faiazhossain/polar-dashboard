import { useAppSelector } from '@/lib/store/hooks';
import React from 'react';
import { Marker } from 'react-map-gl';
import { motion } from 'framer-motion';
import Cirle from '@/public/circle.svg';

const ZoneClickedMarkers = () => {
  const clickedZoneMarkers = useAppSelector(
    (state) => state.mapdata.clickedCoordinates
  );
  console.log(
    '🚀 ~ ZoneClickedMarkers ~ clickedZoneMarkers:',
    clickedZoneMarkers
  );

  return (
    <div>
      {clickedZoneMarkers.map((coord, index) => {
        return (
          <Marker
            key={index}
            latitude={coord.coordinates[1]} // Latitude is the second value in the coordinates array
            longitude={coord.coordinates[0]} // Longitude is the first value in the coordinates array
          >
            <motion.img
              initial={{ y: -100, opacity: 0 }} // Start above the map
              animate={{ y: 0, opacity: 1 }} // Drop to the marker position
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                duration: 0.5,
                delay: index * 0.05, // Sequential delay based on index
              }}
              style={{
                width: '30px', // Adjust size as needed
                height: '30px',
              }}
              src={Cirle.src} // Use .src if using imported image
              alt="Marker Icon"
            />
          </Marker>
        );
      })}
    </div>
  );
};

export default ZoneClickedMarkers;
