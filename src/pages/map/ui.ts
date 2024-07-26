import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const FullHeightMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme?.token?.colorBgContainer};
`;

export const LayersControlContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 1000;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;
