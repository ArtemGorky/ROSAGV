import { useState, useEffect, useMemo } from 'react';

const convertToGeoJson = (graph, type) => {
  const color = type === 'wallGraph' ? 'black' : '#FFD700';
  const lineFeatures = graph.edges.map(edge => {
    const startVertex = graph.vertices[edge.v1_idx];
    const endVertex = graph.vertices[edge.v2_idx];
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [startVertex.x, startVertex.y],
          [endVertex.x, endVertex.y]
        ]
      },
      properties: {
        type,
        color,
        ...edge.params.reduce((acc, param) => ({
          ...acc,
          [param.name]: param.value_string || param.value_float || param.value_int || param.value_bool
        }), {})
      }
    };
  });

  const vertexFeatures = graph.vertices.flatMap(vertex => {
    const features = [];
    const x = vertex.x;
    const y = vertex.y;

    if (vertex.params && vertex.params.length > 0) {
      const size = 0.25;
      const paramsText = vertex.params.map(param => param.name).join(', ');

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [x - size, y - size],
            [x + size, y - size],
            [x + size, y + size],
            [x - size, y + size],
            [x - size, y - size]
          ]]
        },
        properties: {
          type: 'vertexSquare',
          params: paramsText
        }
      });
    }

    if (vertex.name) {
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [x, y]
        },
        properties: {
          type: 'vertexCircle',
          name: vertex.name
        }
      });
    }

    return features;
  });

  return { lineFeatures, vertexFeatures };
};

const convertDoorsToGeoJson = (doors, doorStates) => {
  return doors.map(door => {
    const color = doorStates[door.name] || 'red';
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

const useBuildingMapData = (wallGraph, navGraphs, doors, doorStates) => {
  const geoJsonData = useMemo(() => {
    const lineFeatures = [];
    const vertexFeatures = [];

    if (wallGraph) {
      const { lineFeatures: wallLineFeatures, vertexFeatures: wallVertexFeatures } = convertToGeoJson(wallGraph, 'wallGraph');
      lineFeatures.push(...wallLineFeatures);
      vertexFeatures.push(...wallVertexFeatures);
    }

    if (navGraphs) {
      navGraphs.forEach(navGraph => {
        const { lineFeatures: navLineFeatures, vertexFeatures: navVertexFeatures } = convertToGeoJson(navGraph, 'navGraph');
        lineFeatures.push(...navLineFeatures);
        vertexFeatures.push(...navVertexFeatures);
      });
    }

    if (doors) {
      lineFeatures.push(...convertDoorsToGeoJson(doors, doorStates));
    }

    const geoJsonLines = {
      type: 'FeatureCollection',
      features: lineFeatures
    };

    const geoJsonPoints = {
      type: 'FeatureCollection',
      features: vertexFeatures
    };

    return { geoJsonLines, geoJsonPoints };
  }, [wallGraph, navGraphs, doors, doorStates]);

  return geoJsonData;
};

export default useBuildingMapData;
