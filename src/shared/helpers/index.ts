export { getParksAndRobotsStructuredData } from './parks-and-robots';
export { getTasksStatusLocale } from './robots-tasks';
export { getRobotsInfoStructuredData, getStatusBatteryRobotsInfo, getFilterListRobotsInfo } from './robots-info';

export const mockDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));
