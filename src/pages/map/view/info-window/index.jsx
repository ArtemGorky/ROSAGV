import React, { useMemo, useCallback } from 'react';
import { Button, Progress } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import {
  InfoWindowContainer,
  InfoHeader,
  BatteryInfo,
  RobotInfo,
  StyledCollapse,
  ProgressContainer,
  MarkerIcon
} from './ui';
import { useTheme } from '../../../../themes';
import { BackIcon, RobotIcon } from '../../../../icons/Icons';

const InfoWindow = ({ robot, tasks, onClose, collapsed }) => {
  const theme = useTheme();
  const intl = useIntl();

  const formatBatteryPercentage = useCallback((battery) => `${(battery * 100).toFixed(0)}%`, []);

  const formatTime = useCallback((unixMillis) => {
    if (!unixMillis) return '';
    const date = new Date(unixMillis);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }, []);

  const calculateCompletionPercentage = useCallback((start, finish, estimate) => {
    if (!start || !finish || !estimate) return 0;
    const totalTime = finish - start;
    if (totalTime <= 0) return 0;
    return ((1 - estimate / totalTime) * 100).toFixed(2);
  }, []);

  const robotTasks = useMemo(() => tasks.filter(task => task.assigned_to?.name === robot.name), [tasks, robot.name]);
  const firstTask = useMemo(() => (robotTasks.length > 0 ? robotTasks[0] : null), [robotTasks]);

  const getItems = useCallback((tasks) => {
    return tasks.map(task => ({
      key: task.booking.id,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{task.category} ({task.status})</span>
          {task.unix_millis_finish_time && <span>{formatTime(task.unix_millis_finish_time)}</span>}
        </div>
      ),
      children: (
        <React.Fragment key={task.booking.id}>
          {Object.values(task.phases || {}).map((phase, phaseIndex) => (
            <div key={phaseIndex} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{intl.formatMessage({ id: 'phase' })} {phase.id}: {phase.category}</span>
                {phase.unix_millis_finish_time && <span>{formatTime(phase.unix_millis_finish_time)}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '2px solid #d9d9d9', marginTop: '8px' }}>
                {Object.values(phase.events || {}).map((event) => (
                  <div key={event.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>{event.name}</div>
                    <div style={{ color: event.status === 'completed' ? '#62C655' : '#E1A011' }}>{event.status}</div>
                    {event.unix_millis_finish_time && <div>{formatTime(event.unix_millis_finish_time)}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </React.Fragment>
      )
    }));
  }, [formatTime, intl]);

  return (
    <InfoWindowContainer theme={theme} $collapsed={collapsed} onClick={(e) => e.stopPropagation()}>
      <InfoHeader>
        <Button
          shape="default"
          size="large"
          onClick={onClose}
          icon={<BackIcon />}
        />
        <BatteryInfo $battery={robot.battery}>
          {formatBatteryPercentage(robot.battery)} <ThunderboltOutlined />
        </BatteryInfo>
      </InfoHeader>
      <RobotInfo>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: `1px solid ${theme?.token?.colorTextSecondary}`, padding: '0 0 8px 0', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RobotIcon style={{ marginRight: '8px', width: '48px', height: '48px' }} />
            <div>{robot.name}</div>
          </div>
          <div>{robot.status}</div>
        </div>
      </RobotInfo>
      {firstTask && (
        <div style={{ padding: '0 0 8px 0', borderBottom: `1px solid ${theme?.token?.colorTextSecondary}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>{intl.formatMessage({ id: 'task' })}: {firstTask.category}</div>
            <div>{intl.formatMessage({ id: 'status' })}: {firstTask.status}</div>
            <div>{intl.formatMessage({ id: 'completion' })}: {formatTime(firstTask.unix_millis_finish_time)}</div>
          </div>
          <ProgressContainer>
            <Progress
              percent={calculateCompletionPercentage(firstTask.unix_millis_start_time, firstTask.unix_millis_finish_time, firstTask.estimate_millis)}
              status="active"
              showInfo={false}
              style={{ flexGrow: 1 }}
            />
            <MarkerIcon percent={calculateCompletionPercentage(firstTask.unix_millis_start_time, firstTask.unix_millis_finish_time, firstTask.estimate_millis)} theme={theme} />
          </ProgressContainer>
        </div>
      )}
      <StyledCollapse
        accordion
        bordered={false}
        expandIconPosition="end"
        style={{ background: theme?.token?.colorBgContainer }}
        items={getItems(robotTasks)}
      />
    </InfoWindowContainer>
  );
};

export default React.memo(InfoWindow);
