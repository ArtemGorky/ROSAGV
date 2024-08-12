import axios from "axios";

export const httpClient = (config: any) => axios.create(config);
