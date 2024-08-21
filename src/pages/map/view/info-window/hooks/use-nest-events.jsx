import { useCallback } from 'react';

const useNestEvents = () => {
  const nestEvents = useCallback((events) => {
    if (!events || typeof events !== 'object') {
      return [];
    }

    const buildTree = (eventId, events) => {
      const event = events[eventId];
      return {
        ...event,
        children: event.deps.map(depId => buildTree(depId, events))
      };
    };

    const rootEventIds = Object.keys(events).filter(id => 
      !Object.values(events).some(event => event.deps.includes(parseInt(id)))
    );

    return rootEventIds.map(rootId => buildTree(rootId, events));
  }, []);

  return { nestEvents };
};

export default useNestEvents;
