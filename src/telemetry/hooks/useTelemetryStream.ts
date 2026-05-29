import { useEffect, useRef } from 'react';
import { OBDWebSocketService } from '@websocket/OBDWebSocketService';
import { useConnectionStore } from '../store/connection.slice';
import { useFrameThrottle } from './useFrameThrottle';

const WS_BASE_URL = process.env.EXPO_PUBLIC_WS_URL || "ws://localhost:8000/telemetry/ws";

export function useTelemetryStream(sessionId: string, token: string) {
  const serviceRef = useRef<OBDWebSocketService | null>(null);
  const setStatus = useConnectionStore(s => s.setStatus);
  const { enqueue } = useFrameThrottle();

  useEffect(() => {
    if (!token) return;

    const service = new OBDWebSocketService({ sessionId, token, baseUrl: WS_BASE_URL });
    serviceRef.current = service;

    service.onMessage(enqueue);
    service.onStatusChange(setStatus);
    service.connect();

    return () => service.disconnect();
  }, [sessionId, token]);
}
