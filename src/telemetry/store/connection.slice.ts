import { create } from 'zustand';
import { ConnectionStatus } from '@websocket/websocket.types';

interface ConnectionState {
  status: ConnectionStatus;
  setStatus: (status: ConnectionStatus) => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: ConnectionStatus.DISCONNECTED,
  setStatus: (status) => set({ status }),
}));
