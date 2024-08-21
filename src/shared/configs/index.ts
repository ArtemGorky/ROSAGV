export const parksAndRobotsReqConfig = {
    baseURL: import.meta.env.VITE_AGV_API_SERVER,
    headers: {
        "Content-type": "application/json",
    }
}

export const robotsTasksReqConfig = {
    baseURL: import.meta.env.VITE_AGV_API_SERVER,
    headers: {
        "Content-type": "application/json",
    }
}