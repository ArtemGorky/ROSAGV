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