import React from 'react';
import { useIntl } from 'react-intl';

const TranslatedEvent = ({ event }) => {
  const intl = useIntl();

  const sanitizeString = (str) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s]/gi, '') // удаляет все неалфавитные символы
      .replace(/\s+/g, '_'); // заменяет пробелы на подчеркивания
  };

  const translateEventName = (name, detail) => {
    const sanitizedKey = `event.${sanitizeString(name)}`;
    return intl.formatMessage(
      { id: sanitizedKey, defaultMessage: name }, // использование name в качестве запасного варианта
      {
        place: name.match(/\[place:(.*?)\]/)?.[1],
        from: detail.match(/from \[place:(.*?)\]/)?.[1],
        to: detail.match(/to \[place:(.*?)\]/)?.[1],
        points: name.match(/through (\d+) points/)?.[1],
      }
    );
  };

  const translatedName = translateEventName(event.name, event.detail);
  const translatedStatus = intl.formatMessage({
    id: `status.${event.status.toLowerCase()}`,
  });

  return (
    <div>
      <h3>{translatedName}</h3>
      <p>{translatedStatus}</p>
      {event.children && event.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {event.children.map(child => (
            <TranslatedEvent key={child.id} event={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslatedEvent;
