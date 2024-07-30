import React, { useEffect, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const CursorMarker = ({ show, onClick }) => {
  const [cursorPosition, setCursorPosition] = useState(null);

  useMapEvents({
    mousemove: (e) => {
      if (show) {
        setCursorPosition([e.latlng.lat, e.latlng.lng]);
      }
    },
    click: (e) => {
      if (show) {
        onClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  if (!show || !cursorPosition) return null;

  return <Marker position={cursorPosition} icon={new L.Icon.Default()} />;
};

export default CursorMarker;
