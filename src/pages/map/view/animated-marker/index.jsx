import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Marker, useMap } from 'react-leaflet';
import CustomIcon from './view/custom-icon';

const radToDeg = (radians) => -radians * (180 / Math.PI);

const getMarkerColor = (robot) => {
  if (robot.status === 0) return "#6C6C6D";
  if (robot.emergent === "yes") return "#D4B1F7";
  if (robot.charge < 40) return "#9DCDCD";
  if (robot.cross) return "#FE6D6D";
  if (robot.disabled === 1) return "#FFCF0A";
  return "#DB946A";
};

const AnimatedMarker = ({ position, name, robot, onClick }) => {
  const markerRef = useRef();
  const map = useMap();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [iconSize, setIconSize] = useState(40);
  const color = getMarkerColor(robot);

  useEffect(() => {
    const updateIconSize = () => {
      const zoom = map.getZoom();
      const newSize = Math.max(0, 40 * (zoom / 10)); // Размер можно настроить
      setIconSize(newSize);
    };

    updateIconSize();
    map.on('zoomend', updateIconSize);

    return () => {
      map.off('zoomend', updateIconSize);
    };
  }, [map]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const icon = marker.getElement();
    icon.style.transition = 'transform 1s';

    if (robot.location && robot.location.yaw !== undefined) {
      const angle = radToDeg(robot.location.yaw) - 90;
      setRotationAngle(angle);
    }

    marker.setLatLng(position); 
  }, [position, robot.location]);

  const customIcon = CustomIcon({ rotationAngle, name, color, jacking: robot.jacking, size: iconSize });

  const handleClick = useCallback(() => {
    onClick(robot);
  }, [onClick, robot]);

  return (
    <Marker
      position={position}
      icon={customIcon}
      ref={markerRef}
      eventHandlers={{ click: handleClick }}
    />
  );
};

export default memo(AnimatedMarker);
