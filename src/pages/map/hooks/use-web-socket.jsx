import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import useBuildingMapData from './use-building-map-data';
import useDoorData from './use-door-data';

const useWebSocket = (isWindowVisible) => {
  const wsRef = useRef(null);
  const wsTrajectoryRef = useRef(null);
  const [mapData, setMapData] = useState({
    mapImageUrl: null,
    wallGraph: null,
    navGraphs: null,
    doors: null,
    doorStates: {},
    robots: {},
    trajectoryData: null,
    tasks: [],
    fleets: [],
    doorsName: [],
    scale: null,
    imageBounds: null,
  });

  const { geoJsonLines, geoJsonPoints } = useBuildingMapData(mapData.wallGraph, mapData.navGraphs, mapData.doors, mapData.doorStates);
  const doorGeoJsonData = useDoorData(mapData.doors, mapData.doorStates);

  const connectWebSocket = useCallback(async () => {
    try {
      const response = await axios.get('http://rosagv.ru:8000/socket.io/', {
        params: { EIO: 4, transport: 'polling', t: Date.now() },
      });

      const { sid } = JSON.parse(response.data.slice(1));

      await axios.post('http://rosagv.ru:8000/socket.io/', '40', {
        params: { EIO: 4, transport: 'polling', t: Date.now(), sid },
        headers: { 'Content-Type': 'text/plain' },
      });

      const wsUrl = `ws://rosagv.ru:8000/socket.io/?EIO=4&transport=websocket&sid=${sid}`;
      const ws = new WebSocket(wsUrl);

      wsRef.current = ws;

      ws.onopen = async () => {
        console.log('WebSocket соединение установлено.');
        try {
          ws.send('2probe');
          ws.send('5');
          ws.send('42' + JSON.stringify(["subscribe", { room: "/building_map" }]));

          const fleetResponse = await axios.get('http://rosagv.ru:8000/fleets');
          const fleets = fleetResponse.data;
          setMapData((prevData) => ({ ...prevData, fleets }));

          fleets.forEach(fleet => {
            ws.send('42' + JSON.stringify(["subscribe", { room: `/fleets/${fleet.name}/state` }]));
          });

          const doorsResponse = await axios.get('http://rosagv.ru:8000/doors');
          const doorsName = doorsResponse.data;
          setMapData((prevData) => ({ ...prevData, doorsName }));

          doorsName.forEach(door => {
            ws.send('42' + JSON.stringify(["subscribe", { room: `/doors/${door.name}/state` }]));
          });
        } catch (error) {
          console.error('Ошибка при отправке сообщения:', error);
        }
      };

      ws.onmessage = (event) => {
        try {
          if (event.data === '2') {
            ws.send('3');
          } else if (event.data.startsWith('42')) {
            const message = JSON.parse(event.data.slice(2));
            handleWebSocketMessage(message);
          }
        } catch (error) {
          console.error('Ошибка при обработке сообщения:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('Ошибка WebSocket:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket соединение закрыто.');
      };
    } catch (error) {
      console.error('Ошибка при получении идентификатора сессии или подключении к WebSocket:', error);
    }
  }, []);

  const handleWebSocketMessage = useCallback((message) => {
    if (message[0] === '/building_map' && message[1]) {
      const buildingData = message[1];
      console.log('buildingData:', buildingData);
      const level = buildingData.levels[0];
      const wallGraph = level.wall_graph;
      const navGraphs = level.nav_graphs;
      const doors = level.doors;
      const imageUrl = level.images && level.images.length > 0 ? level.images[0].data : null;
      const imageScale = level.images && level.images.length > 0 ? level.images[0].scale : null;

      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const width = img.naturalWidth * imageScale;
          const height = img.naturalHeight * imageScale;
          setMapData((prevData) => ({
            ...prevData,
            mapImageUrl: imageUrl,
            scale: imageScale,
            imageBounds: [[-height, 0], [0, width]],
            wallGraph,
            navGraphs,
            doors,
          }));
        };
      } else {
        setMapData((prevData) => ({
          ...prevData,
          wallGraph,
          navGraphs,
          doors,
        }));
      }
    } else if (message[0] === '/fleets/tinyRobot/state' && message[1]) {
      setMapData((prevData) => ({
        ...prevData,
        robots: message[1].robots,
      }));
    } else if (message[0].startsWith('/doors/') && message[1]) {
      const { door_name, current_mode } = message[1];
      setMapData((prevData) => ({
        ...prevData,
        doorStates: { ...prevData.doorStates, [door_name]: current_mode.value },
      }));
    }
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  useEffect(() => {
    const connectToTrajectorySocket = () => {
      const wsTrajectory = new WebSocket('ws://rosagv.ru:8006/');

      wsTrajectoryRef.current = wsTrajectory;

      wsTrajectory.onopen = () => {
        console.log('WebSocket Trajectory соединение установлено.');
        const message = {
          request: "trajectory",
          param: { map_name: "L1", duration: 300000, trim: true }
        };
        wsTrajectory.send(JSON.stringify(message));
      };

      wsTrajectory.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.response === "trajectory" && message.values) {
          setMapData((prevData) => ({
            ...prevData,
            trajectoryData: message.values,
          }));
        } else {
          setMapData((prevData) => ({
            ...prevData,
            trajectoryData: null,
          }));
        }
      };

      wsTrajectory.onerror = (error) => {
        console.error('Ошибка WebSocket Trajectory:', error);
      };

      wsTrajectory.onclose = () => {
        console.log('WebSocket Trajectory соединение закрыто.');
      };
    };

    connectToTrajectorySocket();

    const intervalId = setInterval(() => {
      if (wsTrajectoryRef.current && wsTrajectoryRef.current.readyState === WebSocket.OPEN) {
        const message = {
          request: "trajectory",
          param: { map_name: "L1", duration: 300000, trim: true }
        };
        wsTrajectoryRef.current.send(JSON.stringify(message));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (wsTrajectoryRef.current) {
        wsTrajectoryRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isWindowVisible) return;

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://rosagv.ru:8000/tasks', {
          params: {
            limit: 10,
            offset: 0,
            order_by: '-unix_millis_start_time'
          }
        });
        setMapData((prevData) => ({
          ...prevData,
          tasks: response.data,
        }));
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };

    fetchTasks();

    const intervalId = setInterval(fetchTasks, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isWindowVisible]);

  return { 
    mapImageUrl: mapData.mapImageUrl, 
    geoJsonLines, 
    geoJsonPoints, 
    doorGeoJsonData, 
    robots: mapData.robots, 
    trajectoryData: mapData.trajectoryData, 
    tasks: mapData.tasks, 
    imageBounds: mapData.imageBounds 
  };
};

export default useWebSocket;
