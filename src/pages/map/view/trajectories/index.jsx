import React, { useMemo, useCallback } from 'react';
import { Polyline, Pane } from 'react-leaflet';

const Trajectories = React.memo(({ selectedRobot, isWindowVisible, trajectoryData, theme }) => {

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `#${[0, 1, 2].map(j => ((hash >> (j * 8)) & 0xFF).toString(16).padStart(2, '0')).join('')}`;
  };

  const renderTrajectories = useCallback(() => {
    if (!selectedRobot || !isWindowVisible || !trajectoryData) return null;

    return trajectoryData
      .filter(route => route.robot_name === selectedRobot.name)
      .map((route, index) => {
        const color = stringToColor(route.robot_name);
        const segments = route.segments.map(segment => [segment.x[1], segment.x[0]]);
        return (
          <Polyline
            key={`${index}-${theme.token.colorPrimary}`}  
            positions={segments}
            color={color}
            weight={5}
            pane="trajectories"
          />
        );
      });
  }, [selectedRobot, isWindowVisible, trajectoryData, theme]);

  return (
    <Pane name="trajectories" style={{ zIndex: 645 }}>
      {renderTrajectories()}
    </Pane>
  );
});

export default Trajectories;
