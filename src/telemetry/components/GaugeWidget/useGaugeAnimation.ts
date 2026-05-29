import { useEffect } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';

export function useGaugeAnimation(value: number, max: number) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(Math.max(0, Math.min(1, value / max)), { damping: 20 });
  }, [value, max]);

  return progress;
}
