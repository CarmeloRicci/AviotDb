export interface IResultRequest {
    body?: any;
    error?: any;
    success: boolean;
}

export interface FormatLeases {
    timestamp: string;
    mac: string;
    ip: string;
    host: string;
    id: string;
}