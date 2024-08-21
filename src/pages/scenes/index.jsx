import React, { useState, useEffect } from 'react';
import { Card, Modal, Input } from 'antd';
import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import initialSceneImage from '../../../assets/initial-scene.svg';

const { Meta } = Card;

const Scenes = () => {
  const intl = useIntl();
  const [cards, setCards] = useState([{ id: 1, title: intl.formatMessage({ id: 'page.scenes.initialScene' }) }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSceneTitle, setNewSceneTitle] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    setCards(cards => 
      cards.map(card => 
        card.id === 1 ? { ...card, title: intl.formatMessage({ id: 'page.scenes.initialScene' }) } : card
      )
    );
  }, [intl]);

  const showModal = (card = null) => {
    setEditingCard(card);
    setNewSceneTitle(card ? card.title : '');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (editingCard) {
      setCards(cards.map(card => 
        card.id === editingCard.id ? { ...card, title: newSceneTitle } : card
      ));
    } else {
      const newId = cards.length + 1;
      setCards([...cards, { id: newId, title: newSceneTitle || `Scene ${newId}` }]);
    }
    setIsModalOpen(false);
    setNewSceneTitle('');
    setEditingCard(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCard(null);
  };

  const handleInputChange = (e) => {
    setNewSceneTitle(e.target.value);
  };

  return (
    <div>
      <h2>{intl.formatMessage({ id: 'page.scenes.title' })}</h2>
      <p>{intl.formatMessage({ id: 'page.scenes.description' })}</p>
      <div className="scenes-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            hoverable
            style={{ width: 240, margin: '0 10px 10px 0', position: 'relative', textAlign: 'center' }}
            cover={
              <img
                alt={card.title}
                src={index === 0 ? initialSceneImage : `https://via.placeholder.com/240x150?text=${card.title}`}
                onClick={index === 0 ? () => showModal() : undefined}
              />
            }
            actions={
              index !== 0
                ? [
                    <EditOutlined key="edit" onClick={() => showModal(card)} />,
                    <SettingOutlined key="setting" />,
                  ]
                : undefined
            }
          >
            <Meta 
              title={card.title} 
              description={index === 0 ? intl.formatMessage({ id: 'page.scenes.initialScene.description' }) : ''} 
              style={{ textAlign: 'center' }}
            />
          </Card>
        ))}
      </div>

      <Modal
        title={editingCard ? "Edit Scene Title" : "Enter Scene Title"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter scene title"
          value={newSceneTitle}
          onChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default Scenes;
