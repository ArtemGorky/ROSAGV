import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Polyline, ImageOverlay, GeoJSON, Pane, CircleMarker, Tooltip, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Spin, Button, Tree, Modal, Input } from 'antd'; 
import AnimatedMarker from './view/animated-marker/index';
import { useTheme } from '../../themes';
import { useIntl } from 'react-intl';
import useWebSocket from './hooks/use-web-socket';
import { FullHeightMapContainer } from './ui';
import InfoWindow from './view/info-window/index';
import PointInfoWindow from './view/point-window';
import L from 'leaflet';
import CursorMarker from './view/cursor-marker/index';
import CreateTaskWindow from './view/create-task-window'; 

const initialZoom = 5;
const maxZoom = 8;
const minZoom = 0.5;

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xFF;
    color += value.toString(16).padStart(2, '0');
  }
  return color;
};

const Map = ({ collapsed }) => {
  const theme = useTheme();
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateTaskWindowOpen, setIsCreateTaskWindowOpen] = useState(false); 
  const [visibleLayers, setVisibleLayers] = useState(['mapImage', 'lines', 'points', 'robots', 'trajectories']);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalCoords, setModalCoords] = useState(null); 
  const [showCursorMarker, setShowCursorMarker] = useState(false); 
  const mapRef = useRef(null);
  const intl = useIntl();

  const { mapImageUrl, geoJsonLines, geoJsonPoints, doorGeoJsonData, robots, trajectoryData, tasks, imageBounds } = useWebSocket(true);

  useEffect(() => {
    if (imageBounds) {
      setIsReady(true);
    } else {
      const timer = setTimeout(() => setIsReady(true), 200);
      return () => clearTimeout(timer);
    }
  }, [imageBounds]);

  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties) {
      const { color, params, name } = feature.properties;
      if (color) layer.setStyle({ color });
      if (params) layer.bindTooltip(params, { permanent: false, direction: 'top' });
      if (name) layer.bindTooltip(name, { permanent: false, direction: 'top' });
    }
  }, []);

  const handleRobotClick = useCallback((robot) => {
    setSelectedRobot(robot);
    setIsWindowVisible(true);
  }, []);

  const handleWindowClose = useCallback(() => {
    setIsWindowVisible(false);
    setSelectedRobot(null);
  }, []);

  const handleMoveClick = useCallback(() => {
    setVisibleLayers(prev => prev.filter(layer => layer !== 'robots'));
    setIsWindowVisible(false);
    setShowCursorMarker(true);
  }, []);

  const handleMapClick = (coords) => {
    setModalCoords(coords);
    setIsModalVisible(true);
    setVisibleLayers(prev => [...prev, 'robots']);
    setShowCursorMarker(false); 
  };

  const renderCircleMarkers = useCallback((points) => {
    return points.features.map((feature, index) => {
      if (feature.geometry.type === 'Point') {
        const [x, y] = feature.geometry.coordinates;
        const isHovered = hoveredPoint === index;
        const isClicked = clickedPoint === index;
        return (
          <CircleMarker 
            key={index} 
            center={[y, x]} 
            radius={isHovered ? 6 : 3} 
            color={isClicked ? "red" : "green"}
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
              <Tooltip direction="top">{feature.properties.name}</Tooltip>
            )}
          </CircleMarker>
        );
      } else if (feature.geometry.type === 'Polygon') {
        const coordinates = feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);
        return (
          <GeoJSON key={index} data={feature} style={{ color: 'blue' }} />
        );
      }
      return null;
    });
  }, [hoveredPoint, clickedPoint]);

  const getCenter = useMemo(() => {
    if (imageBounds?.length >= 2 && imageBounds[0].length > 0 && imageBounds[1].length > 0) {
      return [imageBounds[0][0] / 2, imageBounds[1][1] / 2];
    }
    return [0, 0];
  }, [imageBounds]);

  const handleLayerVisibilityChange = useCallback((checkedKeys) => {
    setVisibleLayers(checkedKeys);
  }, []);

  const treeData = useMemo(() => [
    {
      title: intl.formatMessage({ id: 'layers' }),
      key: 'layers',
      children: [
        { title: intl.formatMessage({ id: 'layers.mapImage' }), key: 'mapImage' },
        { title: intl.formatMessage({ id: 'layers.lines' }), key: 'lines' },
        { title: intl.formatMessage({ id: 'layers.points' }), key: 'points' },
        { title: intl.formatMessage({ id: 'layers.robots' }), key: 'robots' },
        { title: intl.formatMessage({ id: 'layers.trajectories' }), key: 'trajectories' },
      ],
    },
  ], [intl]);

  const renderTrajectories = useCallback(() => {
    if (!selectedRobot || !isWindowVisible || !trajectoryData) return null;

    return trajectoryData
      .filter(route => route.robot_name === selectedRobot.name)
      .map((route, index) => {
        const color = stringToColor(route.robot_name);
        const segments = route.segments.map(segment => [segment.x[1], segment.x[0]]);
        return (
          <Polyline
            key={index}
            positions={segments}
            color={color}
            weight={5}
            pane="trajectories"
          />
        );
      });
  }, [selectedRobot, isWindowVisible, trajectoryData]);

  if (!isReady) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <FullHeightMapContainer
        center={getCenter}
        zoom={initialZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        attributionControl={false}
        zoomControl={false}
        crs={L.CRS.Simple}
        ref={mapRef}
        className={showCursorMarker ? 'hide-cursor' : ''}
      >
        {visibleLayers.includes('mapImage') && mapImageUrl && imageBounds && (
          <ImageOverlay url={mapImageUrl} bounds={imageBounds} />
        )}
        <>
          {visibleLayers.includes('lines') && (
            <Pane name="geojson" style={{ zIndex: 640 }}>
              {geoJsonLines && (
                <GeoJSON key={JSON.stringify(geoJsonLines)} data={geoJsonLines} onEachFeature={onEachFeature} pane="geojson" />
              )}
              {doorGeoJsonData && (
                <GeoJSON key={JSON.stringify(doorGeoJsonData)} data={doorGeoJsonData} onEachFeature={onEachFeature} pane="geojson" />
              )}
            </Pane>
          )}
          {visibleLayers.includes('points') && (
            <Pane name="geojsonObjects" style={{ zIndex: 650 }}>
              <FeatureGroup>{geoJsonPoints && renderCircleMarkers(geoJsonPoints)}</FeatureGroup>
            </Pane>
          )}
          {visibleLayers.includes('trajectories') && (
            <Pane name="trajectories" style={{ zIndex: 645 }}>
              {renderTrajectories()}
            </Pane>
          )}
          {visibleLayers.includes('robots') && (
            <Pane name="robots" style={{ zIndex: 660 }}>
              {Object.values(robots).map((robot, index) => (
                robot.location?.x !== undefined && robot.location?.y !== undefined && (
                  <AnimatedMarker
                    key={index}
                    position={[robot.location.y, robot.location.x]}
                    name={robot.name}
                    robot={robot}
                    onClick={() => handleRobotClick(robot)}
                    pane="robots"
                  />
                )
              ))}
            </Pane>
          )}
        </>
        <CursorMarker show={showCursorMarker} onClick={handleMapClick} />
      </FullHeightMapContainer>
      {isWindowVisible && selectedRobot && (
        <InfoWindow
          robot={robots[selectedRobot.name]}
          tasks={tasks}
          onClose={handleWindowClose}
          collapsed={collapsed}
          onMove={handleMoveClick}
        />
      )}
      {selectedPoint && (
        <PointInfoWindow
          open={selectedPoint !== null}
          onClose={() => setSelectedPoint(null)}
          point={selectedPoint}
        />
      )}
      <Button
        type="primary"
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000 }}
        onClick={() => setIsCreateTaskWindowOpen(true)}
      >
        {intl.formatMessage({ id: 'createTask.createButton' })}
      </Button>
      <div style={{ position: 'absolute', top: 70, right: 20, zIndex: 1000 }}>
        <Tree
          checkable
          defaultExpandAll={false}
          onCheck={handleLayerVisibilityChange}
          checkedKeys={visibleLayers}
          treeData={treeData}
        />
      </div>
      <Modal
        title="Координаты клика"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Input value={modalCoords ? `x: ${modalCoords[0]}, y: ${modalCoords[1]}` : ''} readOnly />
      </Modal>
      <CreateTaskWindow
        isOpen={isCreateTaskWindowOpen} 
        onClose={() => setIsCreateTaskWindowOpen(false)}
        geoJsonPoints={geoJsonPoints} 
      />
    </>
  );
};

export default React.memo(Map);
