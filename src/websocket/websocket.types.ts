export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  RECONNECTING = 'RECONNECTING',
  ERROR = 'ERROR'
}

export interface WSConfig {
  baseUrl: string;
  sessionId: string;
  token: string;
}

export interface IncomingFrame {
  session_id: string;
  pid: string;
  label: string;
  value: number;
  unit: string;
  timestamp: string;
}
