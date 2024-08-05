export const getParksAndRobotsStructuredData = (data: any) => {

    const StructuredData = Object.keys(data.robots).map((item, index) => {

        const obj = data.robots[item];

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