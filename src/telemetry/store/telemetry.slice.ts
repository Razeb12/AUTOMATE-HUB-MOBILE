import { create } from 'zustand';

export interface TelemetryValues {
  rpm: number;
  speed: number;
  coolantTemp: number;
  throttle: number;
  fuelLevel: number;
  engineLoad: number;
  intakeAirTemp: number;
  lastUpdatedAt: number;
}

interface TelemetryActions {
  updateField: (field: keyof TelemetryValues, value: number) => void;
}

export const useTelemetryStore = create<TelemetryValues & TelemetryActions>((set) => ({
  rpm: 0, speed: 0, coolantTemp: 0, throttle: 0,
  fuelLevel: 0, engineLoad: 0, intakeAirTemp: 0, lastUpdatedAt: 0,
  updateField: (field, value) => set({ [field]: value, lastUpdatedAt: Date.now() }),
}));
