import { TelemetryValues } from '../store/telemetry.slice';

export const PID_TO_FIELD: Record<string, keyof TelemetryValues> = {
  '010C': 'rpm',
  '010D': 'speed',
  '0105': 'coolantTemp',
  '010F': 'intakeAirTemp',
  '0111': 'throttle',
  '012F': 'fuelLevel',
  '0104': 'engineLoad',
};
