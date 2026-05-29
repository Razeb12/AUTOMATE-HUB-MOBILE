import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(): AppStateStatus {
  const [status, setStatus] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', setStatus);
    return () => sub.remove();
  }, []);

  return status;
}
