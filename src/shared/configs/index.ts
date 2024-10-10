export const parksAndRobotsReqConfig = {
    baseURL: import.meta.env.VITE_AGV_TASK_MANAGER_API,
    headers: {
        "Content-type": "application/json",
    }
}

export const robotsTasksReqConfig = {
    baseURL: import.meta.env.VITE_AGV_TASK_MANAGER_API,
    headers: {
        "Content-type": "application/json",
    }
}

export const robotsFleetReqConfig = {
    baseURL: import.meta.env.VITE_AGV_FLEET_MANAGER_API,
    headers: {
        "Content-type": "application/json",
    }
}

export const robotsInfoReqConfig = {
    baseURL: import.meta.env.VITE_AGV_ROBOTS_INFO_SOCKET,
    headers: {
        "Content-type": "application/json",
    }
}