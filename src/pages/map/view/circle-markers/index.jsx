import React, { useMemo, useCallback } from 'react';
import { CircleMarker, Tooltip, GeoJSON, FeatureGroup, Pane } from 'react-leaflet';

const CircleMarkers = React.memo(({ points, hoveredPoint, clickedPoint, setHoveredPoint, setClickedPoint, setSelectedPoint, theme }) => {
  const renderCircleMarkers = useCallback(() => {
    return points.features.map((feature, index) => {
      if (feature.geometry.type === 'Point') {
        const [x, y] = feature.geometry.coordinates;
        const isHovered = hoveredPoint === index;
        const isClicked = clickedPoint === index;
        return (
          <CircleMarker 
            key={`${index}-${theme.token.colorPoint}`}  
            center={[y, x]} 
            radius={isHovered ? 6 : 3} 
            color={isClicked ? theme.token.colorPrimary : theme.token.colorPoint}
            eventHandlers={{
              mouseover: () => setHoveredPoint(index),
              mouseout: () => setHoveredPoint(null),
              click: () => {
                setClickedPoint(index);
                setSelectedPoint(feature); 
              }
            }}
          >
            {feature.properties.name && (
              <Tooltip direction="top" style={{ color: theme.token.colorTextBase }}>
                {feature.properties.name}
              </Tooltip>
            )}
          </CircleMarker>
        );
      } else if (feature.geometry.type === 'Polygon') {
        return (
          <GeoJSON key={`${index}-${theme.token.colorRoad}`} data={feature} style={{ color: theme.token.colorRoad }} />
        );
      }
      return null;
    });
  }, [points, hoveredPoint, clickedPoint, theme, setHoveredPoint, setClickedPoint, setSelectedPoint]);

  return (
    <Pane name="geojsonObjects" style={{ zIndex: 650 }}>
      <FeatureGroup>
        {renderCircleMarkers()}
      </FeatureGroup>
    </Pane>
  );
});

export default CircleMarkers;
