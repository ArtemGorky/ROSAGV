import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ImageOverlay, GeoJSON, Pane, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Spin, Button, Tree, Modal, Input } from 'antd'; 
import L from 'leaflet';
import { useTheme } from '../../themes';
import { useIntl } from 'react-intl';
import useWebSocket from './hooks/use-web-socket';

import AnimatedMarker from './view/animated-marker';
import CursorMarker from './view/cursor-marker';
import CreateTaskWindow from './view/create-task-window';
import CircleMarkers from './view/circle-markers';
import Trajectories from './view/trajectories';
import InfoWindow from './view/info-window';
import PointInfoWindow from './view/point-window';
import { FullHeightMapContainer } from './ui';

const initialZoom = 2;
const maxZoom = 6;
const minZoom = 2;

const Map = ({ collapsed }) => {
  const theme = useTheme();
  const intl = useIntl();
  
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
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(initialZoom);
  const [savedCenter, setSavedCenter] = useState(null);
  const [savedZoom, setSavedZoom] = useState(null);

  const mapRef = useRef(null);
  
  const { mapImageUrl, geoJsonLines, geoJsonPoints, doorGeoJsonData, robots, trajectoryData, tasks, imageBounds } = useWebSocket(true);

  useEffect(() => {
    if (imageBounds) {
      setIsReady(true);
      setCenter([imageBounds[0][0] / 2, imageBounds[1][1] / 2]);
    } else {
      const timer = setTimeout(() => setIsReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [imageBounds]);

  useEffect(() => {
    if (savedCenter && savedZoom) {
      setCenter(savedCenter);
      setZoom(savedZoom);
    }
  }, [theme]);

  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties) {
      const { color, params, name } = feature.properties;
      layer.setStyle({ color: color || theme.token.colorRoad });
      if (params) layer.bindTooltip(params, { permanent: false, direction: 'top' });
      if (name) layer.bindTooltip(name, { permanent: false, direction: 'top' });
    }
  }, [theme]);

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

  const handleLayerVisibilityChange = useCallback((checkedKeys) => setVisibleLayers(checkedKeys), []);

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

  const updateMapState = useCallback(() => {
    const map = mapRef.current;
    if (map) {
      setSavedCenter(map.getCenter());
      setSavedZoom(map.getZoom());
    }
  }, []);

  const MapEvents = () => {
    useMapEvent('moveend', updateMapState);
    useMapEvent('zoomend', updateMapState);
    return null;
  };

  if (!isReady) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: theme.token.colorBgBase }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <FullHeightMapContainer
        key={theme.token.colorBgBase}
        center={savedCenter || center}
        zoom={savedZoom || zoom} 
        minZoom={minZoom}
        maxZoom={maxZoom}
        attributionControl={false}
        zoomControl={false}
        crs={L.CRS.Simple}
        ref={mapRef}
        style={{ backgroundColor: theme.token.colorBgBase }}
        className={showCursorMarker ? 'hide-cursor' : ''}
      >
        <MapEvents />
        {visibleLayers.includes('mapImage') && mapImageUrl && imageBounds && (
          <ImageOverlay 
            key={`${mapImageUrl}-${theme.token.colorBgContainer}`}  
            url={mapImageUrl} 
            bounds={imageBounds} 
            opacity={theme.token.opacity || 1}
            style={{ backgroundColor: theme.token.colorBgContainer }} 
          />
        )}
        {visibleLayers.includes('lines') && (
          <Pane name="geojson" style={{ zIndex: 640 }}>
            {geoJsonLines && (
              <GeoJSON key={`${JSON.stringify(geoJsonLines)}-${theme.token.colorRoad}`} data={geoJsonLines} onEachFeature={onEachFeature} pane="geojson" />
            )}
            {doorGeoJsonData && (
              <GeoJSON key={`${JSON.stringify(doorGeoJsonData)}-${theme.token.colorRoad}`} data={doorGeoJsonData} onEachFeature={onEachFeature} pane="geojson" />
            )}
          </Pane>
        )}
        {visibleLayers.includes('points') && (
          <CircleMarkers 
            points={geoJsonPoints} 
            hoveredPoint={hoveredPoint} 
            clickedPoint={clickedPoint} 
            setHoveredPoint={setHoveredPoint} 
            setClickedPoint={setClickedPoint} 
            setSelectedPoint={setSelectedPoint} 
            theme={theme} 
          />
        )}
        {visibleLayers.includes('trajectories') && (
          <Trajectories 
            selectedRobot={selectedRobot} 
            isWindowVisible={isWindowVisible} 
            trajectoryData={trajectoryData} 
            theme={theme} 
          />
        )}
        {visibleLayers.includes('robots') && (
          <Pane name="robots" style={{ zIndex: 660 }}>
            {Object.values(robots).map((robot, index) => (
              robot.location?.x !== undefined && robot.location?.y !== undefined && (
                <AnimatedMarker
                  key={`${index}-${theme.token.colorPrimary}`}  
                  position={[robot.location.y, robot.location.x]}
                  name={robot.name}
                  robot={robot}
                  onClick={() => handleRobotClick(robot)}
                  pane="robots"
                  color={theme.token.colorPrimary}
                />
              )
            ))}
          </Pane>
        )}
        <CursorMarker show={showCursorMarker} onClick={handleMapClick} />
      </FullHeightMapContainer>
      {isWindowVisible && selectedRobot && (
        <InfoWindow
          robot={robots[selectedRobot.name]}
          tasks={tasks}
          onClose={handleWindowClose}
          collapsed={collapsed}
          onMove={handleMoveClick}
          theme={theme}
        />
      )}
      {selectedPoint && (
        <PointInfoWindow
          open={selectedPoint !== null}
          onClose={() => setSelectedPoint(null)}
          point={selectedPoint}
          theme={theme} 
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
        theme={theme}
      />
    </>
  );
};

export default React.memo(Map);
