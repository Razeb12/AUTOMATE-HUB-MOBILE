import { useRef, useEffect, useCallback } from 'react';
import { useTelemetryStore } from '../store/telemetry.slice';
import { PID_TO_FIELD } from '../constants/pid.constants';
import { IncomingFrame } from '@websocket/websocket.types';

export function useFrameThrottle() {
  const buffer = useRef<IncomingFrame[]>([]);
  const updateField = useTelemetryStore(s => s.updateField);

  const enqueue = useCallback((frame: IncomingFrame) => {
    buffer.current.push(frame);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const frames = buffer.current.splice(0, buffer.current.length);
      for (const frame of frames) {
        const field = PID_TO_FIELD[frame.pid];
        if (field) updateField(field, frame.value);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [updateField]);

  return { enqueue };
}
