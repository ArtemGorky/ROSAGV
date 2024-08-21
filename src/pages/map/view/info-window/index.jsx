import React, { useMemo, useCallback } from 'react';
import { Button, Progress, message, Tree } from 'antd';
import { ThunderboltOutlined, CloseOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import axios from 'axios';
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
import useNestEvents from './hooks/use-nest-events';

const InfoWindow = ({ robot, tasks, onClose, collapsed, onMove }) => {
  const theme = useTheme();
  const intl = useIntl();
  const { nestEvents } = useNestEvents();

  const getLocalizedCategory = useCallback((category) => {
    if (category) {
      if (category.startsWith("Go to [place:")) {
        const place = category.match(/\[place:(.*?)\]/)[1];
        return intl.formatMessage(
          { id: "category.go_to_place", defaultMessage: `Go to [place:${place}]` },
          { place }
        );
      }

      return intl.formatMessage({ id: `category.${category.toLowerCase()}` });
    }
  }, [intl]);

  const getLocalizedStatus = useCallback((status) => {
    return intl.formatMessage({ id: `status.${status.toLowerCase()}` });
  }, [intl]);

  const getLocalizedEventName = useCallback((name, detail) => {
    const templateMapping = {
      "Sequence": "event.sequence",
      "Go to [place:": "event.go_to_place",
      "Moving the robot from [place:": "event.moving_robot",
      "Move to [place:": "event.move_to_place_through_points",
      "Move to [graph-wp:": "event.move_to_graph_wp_through_points",
      "Dock robot to": "event.dock_robot_to",
      "Perform action": "event.perform_action"
    };
    const matchedTemplate = Object.keys(templateMapping).find(key => name.startsWith(key));
  
    if (matchedTemplate) {
      const templateId = templateMapping[matchedTemplate];
      let templateString = intl.formatMessage({ id: templateId });
  
      if (templateId === "event.go_to_place") {
        const place = name.match(/\[place:(.*?)\]/)?.[1] || '';
        templateString = templateString.replace("{place}", place);
      } else if (templateId === "event.moving_robot") {
        const places = name.match(/\[place:(.*?)\]/g)?.map(p => p.match(/\[place:(.*?)\]/)[1]) || ['', ''];
        templateString = templateString.replace("{from}", places[0]).replace("{to}", places[1]);
      } else if (templateId === "event.move_to_place_through_points") {
        const place = name.match(/\[place:(.*?)\]/)?.[1] || '';
        const points = name.match(/through (\d+) points/)?.[1] || '';
        templateString = templateString.replace("{place}", place).replace("{points}", points);
      } else if (templateId === "event.move_to_graph_wp_through_points") {
        const place = name.match(/\[graph-wp:(.*?)\]/)?.[1] || '';
        const points = name.match(/through (\d+) points/)?.[1] || '';
        templateString = templateString.replace("{place}", place).replace("{points}", points);
      } else if (templateId === "event.dock_robot_to") {
        const dock = name.match(/dock_(\d+)/)?.[1] || '';
        templateString = templateString.replace("{dock}", dock);
      } else if (templateId === "event.perform_action") {
        const actionDetail = detail?.match(/Performing action (.+)/)?.[1] || '';
        templateString = `${intl.formatMessage({ id: templateId })}: ${actionDetail}`;
      }
  
      return templateString;
    }
  
    return intl.formatMessage({ id: `event.${name.toLowerCase()}`, defaultMessage: name });
  }, [intl]);
  


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

  const handleCancel = useCallback(async (taskId) => {
    try {
      await axios.post(`${import.meta.env.VITE_AGV_API_SERVER}/tasks/cancel_task`, {
        type: 'cancel_task_request',
        task_id: taskId
      });
      message.success(intl.formatMessage({ id: 'infowindow.taskCanceled' }));
    } catch (error) {
      console.error('Task cancel error:', error);
      message.error(intl.formatMessage({ id: 'infowindow.taskCancelError' }));
    }
  }, [intl]);

  const cleanName = (name) => name.replace(/<.*?>/g, '');
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'failed':
        return 'red';
      case 'canceled':
        return 'blue';
      default:
        return 'orange';
    }
  };

  const convertToTreeData = useCallback((events) => {
    if (!events || !Array.isArray(events)) {
      console.error('Invalid events array:', events);
      return [];
    }

    const buildTree = (event) => ({
      title: (
        <span style={{ color: getStatusColor(event.status) }}>
          {getLocalizedEventName(cleanName(event.name))} ({getLocalizedStatus(event.status)})
        </span>
      ),
      key: event.id,
      children: event.children ? event.children.map(child => buildTree(child)) : []
    });
    return events.map(event => buildTree(event));
  }, [getLocalizedEventName, getLocalizedStatus]);

  const getItems = useCallback((tasks) => {
    return tasks.map(task => ({
      key: task.booking.id,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: getStatusColor(task.status) }}>
            {getLocalizedCategory(task.category)} ({getLocalizedStatus(task.status)})
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {task.unix_millis_finish_time && <span>{formatTime(task.unix_millis_finish_time)}</span>}
            {task.status !== 'canceled' && task.status !== 'failed' && task.status !== 'completed' && (
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => handleCancel(task.booking.id)}
                style={{ padding: '0', fontSize: '12px', lineHeight: '12px', height: '20px', width: '20px' }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <React.Fragment key={task.booking.id}>
          {Object.values(task.phases || {}).map((phase, phaseIndex) => (
            <div key={phaseIndex} style={{ marginBottom: '8px', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{intl.formatMessage({ id: 'phase' })} {phase.id}: {getLocalizedCategory(phase.category)}</span>
                {phase.unix_millis_finish_time && <span>{formatTime(phase.unix_millis_finish_time)}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', borderLeft: '2px solid #d9d9d9', marginTop: '8px' }}>
                <Tree
                  treeData={convertToTreeData(nestEvents(phase.events))}
                  defaultExpandAll
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      )
    }));
  }, [formatTime, intl, handleCancel, nestEvents, getLocalizedCategory, getLocalizedStatus, convertToTreeData]);

  return (
    <InfoWindowContainer theme={theme} $collapsed={collapsed} onClick={(e) => e.stopPropagation()}>
      <InfoHeader>
        <Button
          shape="default"
          size="large"
          onClick={onClose}
          icon={<BackIcon />}
        />
        {robot.status === 'idle' && (
          <Button
            type="primary"
            size="small"
            onClick={onMove}
            style={{ marginLeft: '8px' }}
          >
            {intl.formatMessage({ id: 'infowindow.move' })}
          </Button>
        )}
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
          <div>{intl.formatMessage({ id: `status.${robot.status.toLowerCase()}` })}</div>
        </div>
      </RobotInfo>
      {firstTask && (
        <div style={{ padding: '0 0 8px 0', borderBottom: `1px solid ${theme?.token?.colorTextSecondary}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>{intl.formatMessage({ id: 'infowindow.task' })}: {getLocalizedCategory(firstTask.category)}</div>
            <div>{intl.formatMessage({ id: 'infowindow.status' })}: {getLocalizedStatus(firstTask.status)}</div>
            <div>{intl.formatMessage({ id: 'infowindow.completion' })}: {formatTime(firstTask.unix_millis_finish_time)}</div>
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

export default InfoWindow;
