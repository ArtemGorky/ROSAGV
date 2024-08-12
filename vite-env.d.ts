interface ImportMetaEnv {
    readonly VITE_AGV_API_SERVER: string;
    readonly VITE_AGV_TRAJECTORY_SOCKET: string;
    readonly VITE_AGV_DATA_SOCKET: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}