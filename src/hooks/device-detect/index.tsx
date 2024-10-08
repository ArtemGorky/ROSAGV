import { DeviceDetectContext } from "@/providers";
import { useContext } from "react";

export const useDeviceDetect = () => {
    return useContext(DeviceDetectContext);
};