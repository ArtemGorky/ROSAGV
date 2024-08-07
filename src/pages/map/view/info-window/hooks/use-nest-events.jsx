import { useCallback } from 'react';

const useNestEvents = () => {
  const nestEvents = useCallback((events) => {
    // Helper function to nest events recursively
    const buildTree = (eventId, events) => {
      const event = events[eventId];
      return {
        ...event,
        children: event.deps.map(depId => buildTree(depId, events))
      };
    };

    // Get the root events (events that are not dependencies of any other event)
    const rootEventIds = Object.keys(events).filter(id => 
      !Object.values(events).some(event => event.deps.includes(parseInt(id)))
    );

    // Build the nested structure starting from root events
    const nestedEvents = rootEventIds.map(rootId => buildTree(rootId, events));
    
    console.log(nestedEvents);
    return nestedEvents;
  }, []);

  return { nestEvents };
};

export default useNestEvents;

