import { useConnectionStore } from '../store/connection.slice';
import { ConnectionStatus } from '@websocket/websocket.types';

export function useConnectionStatus(): ConnectionStatus {
  return useConnectionStore(s => s.status);
}
