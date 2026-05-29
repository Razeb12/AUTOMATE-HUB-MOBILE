export function formatTelemetryValue(value: number, precision: number): string {
  return value.toFixed(precision);
}

export function resolveGaugeColor(
  value: number,
  thresholds: { warn: number; critical: number },
): string {
  if (value >= thresholds.critical) return '#EF4444';
  if (value >= thresholds.warn) return '#F59E0B';
  return '#22C55E';
}
