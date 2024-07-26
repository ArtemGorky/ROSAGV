import { useState, useEffect, useMemo } from 'react';

const convertDoorsToGeoJson = (doors, doorStates) => {
  return doors.map(door => {
    let color;
    switch (doorStates[door.name]) {
      case 1:
        color = 'yellow';
        break;
      case 2:
        color = 'green';
        break;
      default:
        color = 'red';
    }
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [door.v1_x, door.v1_y],
          [door.v2_x, door.v2_y]
        ]
      },
      properties: {
        type: 'door',
        color,
        name: door.name
      }
    };
  });
};

const useDoorData = (doors, doorStates) => {
  const geoJsonData = useMemo(() => {
    if (!doors) return null;
    const features = convertDoorsToGeoJson(doors, doorStates);
    return {
      type: 'FeatureCollection',
      features
    };
  }, [doors, doorStates]);

  return geoJsonData;
};

export default useDoorData;
