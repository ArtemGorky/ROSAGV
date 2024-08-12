import { ParksAndRobotsTypes } from "@/pages/parks-and-robots/types";

export const getParksAndRobotsStructuredData = (data: ParksAndRobotsTypes[]) => {

    const StructuredData = Object.keys(data).map((item, index) => {

        const obj = data[item];

        return {
            key: index,
            name: obj.name,
            status: obj.status,
            task_id: obj.task_id,
            unix_millis_time: obj.unix_millis_time,
            battery: obj.battery,
            issues: obj.issues
        }

    });

    return StructuredData;
}