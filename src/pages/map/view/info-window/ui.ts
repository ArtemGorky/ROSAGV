import styled from 'styled-components';
import { Collapse } from 'antd';
import { MapIcon } from '../../../../icons/Icons';

interface BatteryInfoProps {
  $battery: number;
}

const getBatteryColor = (battery: number) => {
  if (battery > 0.8) return 'darkgreen';
  if (battery > 0.6) return 'green';
  if (battery > 0.4) return 'goldenrod';
  if (battery > 0.2) return 'darkorange';
  return 'darkred';
};

export const BatteryGradient = styled.div<BatteryInfoProps>`
  width: 100%;
  height: 20px;
  background: linear-gradient(
    to right,
    darkred ${(props) => (props.$battery <= 0.2 ? '100%' : '0%')},
    darkorange ${(props) => (props.$battery > 0.2 && props.$battery <= 0.4 ? '100%' : '0%')},
    goldenrod ${(props) => (props.$battery > 0.4 && props.$battery <= 0.6 ? '100%' : '0%')},
    green ${(props) => (props.$battery > 0.6 && props.$battery <= 0.8 ? '100%' : '0%')},
    darkgreen ${(props) => (props.$battery > 0.8 ? '100%' : '0%')}
  );
  border: 1px solid #000;
  border-radius: 4px;
  overflow: hidden;
`;

export const InfoWindowContainer = styled.div<{$collapsed: boolean}>`
  position: absolute;
  top: 18px;
  left: ${(props) => (props.$collapsed ? '96px' : '216px')};
  width: 530px;
  max-height: calc(100vh - 36px); 
  min-height: 100px;
  padding: 20px;
  background-color: ${(props) => props.theme?.token?.colorBgContainer};
  color: ${(props) => props.theme?.token?.colorTextBase};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  z-index: 2000;
  pointer-events: auto;
  transition: left 0.2s;
  overflow-y: auto;  /* Добавляем вертикальную прокрутку */
  scrollbar-width: none;  /* Для Firefox */
  -ms-overflow-style: none;  /* Для Internet Explorer и Edge */
  
  &::-webkit-scrollbar {
    width: 0;  /* Для Webkit-браузеров, таких как Chrome и Safari */
    height: 0;
  }
`;

export const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
`;

export const BatteryInfo = styled.div<BatteryInfoProps>`
  display: flex;
  align-items: center;
  color: ${(props) => getBatteryColor(props.$battery)};
  font-weight: bold;
  font-size: 20px;
`;

export const RobotInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 20px;

  img {
    width: 48px;
    height: 48px;
  }
`;

export const StyledPanel = styled(Collapse.Panel)`
  &&& {
    margin-bottom: 16px;
    background: ${(props) => props.theme.token.colorBgContainer};
    border-radius: 4px;
  }
`;

export const StyledCollapse = styled(Collapse)`
  .ant-collapse-item {
    border-bottom: none;
  }

  .ant-collapse-header {
    padding: 6px 16px !important;
  }

  .ant-collapse-content {
    border-top: none;
  }

  .ant-collapse-expand-icon {
    order: 1;
  }
`;

export const ProgressContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const MarkerIcon = styled(MapIcon)<{ percent: number }>`
  position: absolute;
  left: ${({ percent }) => `${percent}%`};
  transform: translateX(-50%) translateY(2px) rotate(135deg);
  font-size: 24px; /* Увеличен размер иконки */
  color: ${({ theme }) => theme.token.colorPrimary};
  transition: left 0.5s ease;
`;
