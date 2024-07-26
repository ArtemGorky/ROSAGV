import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal, Button, Form, Select, DatePicker, InputNumber, List, Row, Col } from 'antd';
import { UpOutlined, DownOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { StyledButton, ListItemContainer } from './ui';

const { Option } = Select;

const CreateTaskWindow = ({ isOpen, onClose, geoJsonPoints }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const filteredGeoJsonPoints = useMemo(() => (
    geoJsonPoints && geoJsonPoints.features 
      ? geoJsonPoints.features.filter(feature => feature.properties.name) 
      : []
  ), [geoJsonPoints]);

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        taskDate: moment(),
      });
    }
  }, [isOpen, form]);

  const handleSubmit = useCallback(async (values) => {
    const {
      taskCategory,
      taskDate,
      priority,
      loops
    } = values;

    const unixMillisEarliestStartTime = 0;
    const unixMillisRequestTime = taskDate ? taskDate.valueOf() : 0;

    const requestBody = {
      type: "dispatch_task_request",
      request: {
        category: taskCategory,
        description: {
          places: places,
          rounds: loops
        },
        unix_millis_earliest_start_time: unixMillisEarliestStartTime,
        unix_millis_request_time: unixMillisRequestTime,
        priority: {
          type: "binary",
          value: priority
        },
        requester: "stub"
      }
    };

    try {
      const response = await axios.post('http://rosagv.ru:8000/tasks/dispatch_task', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Success:', response.data);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [places, onClose]);

  const handleAddPlace = useCallback(() => {
    if (selectedPlace && !places.includes(selectedPlace)) {
      setPlaces([...places, selectedPlace]);
      setSelectedPlace(null);
    }
  }, [selectedPlace, places]);

  const handleRemovePlace = useCallback((place) => {
    setPlaces(places.filter(p => p !== place));
  }, [places]);

  const handleMoveUp = useCallback((index) => {
    if (index === 0) return;
    const newPlaces = [...places];
    [newPlaces[index - 1], newPlaces[index]] = [newPlaces[index], newPlaces[index - 1]];
    setPlaces(newPlaces);
  }, [places]);

  const handleMoveDown = useCallback((index) => {
    if (index === places.length - 1) return;
    const newPlaces = [...places];
    [newPlaces[index + 1], newPlaces[index]] = [newPlaces[index], newPlaces[index + 1]];
    setPlaces(newPlaces);
  }, [places]);

  return (
    <Modal
      title={intl.formatMessage({ id: 'createTask.title' })}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="taskCategory"
              label={intl.formatMessage({ id: 'createTask.taskCategory' })}
              rules={[{ required: true, message: intl.formatMessage({ id: 'createTask.selectTaskCategoryMessage' }) }]}
            >
              <Select placeholder={intl.formatMessage({ id: 'createTask.selectTaskCategory' })}>
                <Option value="patrol">{intl.formatMessage({ id: 'createTask.patrol' })}</Option>
                <Option value="clean">{intl.formatMessage({ id: 'createTask.clean' })}</Option>
                <Option value="delivery">{intl.formatMessage({ id: 'createTask.delivery' })}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="taskDate"
              label={intl.formatMessage({ id: 'createTask.startTime' })}
              rules={[{ required: true, message: intl.formatMessage({ id: 'createTask.selectStartTime' }) }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="priority"
              label={intl.formatMessage({ id: 'createTask.priority' })}
              rules={[{ required: true, message: intl.formatMessage({ id: 'createTask.inputPriority' }) }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="loops"
              label={intl.formatMessage({ id: 'createTask.loops' })}
              rules={[{ required: true, message: intl.formatMessage({ id: 'createTask.inputLoops' }) }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={intl.formatMessage({ id: 'createTask.addPlace' })}>
          <Select
            placeholder={intl.formatMessage({ id: 'createTask.selectPlace' })}
            value={selectedPlace}
            onChange={setSelectedPlace}
            style={{ width: '100%' }}
          >
            {filteredGeoJsonPoints.map((feature, index) => (
              <Option key={index} value={feature.properties.name}>
                {feature.properties.name}
              </Option>
            ))}
          </Select>
          <StyledButton type="dashed" onClick={handleAddPlace}>
            <PlusOutlined /> {intl.formatMessage({ id: 'createTask.addPlace' })}
          </StyledButton>
        </Form.Item>

        {places.length > 0 && (
          <List
            size="small"
            bordered
            dataSource={places}
            renderItem={(place, index) => (
              <List.Item key={place}>
                <ListItemContainer>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{place}</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                      icon={<UpOutlined />} 
                      onClick={() => handleMoveUp(index)} 
                      disabled={index === 0} 
                    />
                    <Button 
                      icon={<DownOutlined />} 
                      onClick={() => handleMoveDown(index)} 
                      disabled={index === places.length - 1} 
                    />
                    <Button 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleRemovePlace(place)} 
                    />
                  </div>
                </ListItemContainer>
              </List.Item>
            )}
          />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: '10px', width: '100%' }}>
            {intl.formatMessage({ id: 'createTask.createButton' })}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(CreateTaskWindow);
