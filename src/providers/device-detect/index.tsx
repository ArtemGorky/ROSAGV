import { createContext } from "react";
import * as deviceDetect from 'react-device-detect';

const initialState: typeof deviceDetect | null = null

export const DeviceDetectContext = createContext(initialState);

export const DeviceDetectProvider = ({ children, deviceDetect }) => {
    return (
        <DeviceDetectContext.Provider value={deviceDetect}>
            {children}
        </DeviceDetectContext.Provider>
    );
};
