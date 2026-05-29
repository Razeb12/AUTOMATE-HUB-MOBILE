import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native';

export type AppLifecycleEvent = 'foreground' | 'background';
export type AppLifecycleListener = (event: AppLifecycleEvent, backgroundDuration: number) => void;

export class AppStateWatcher {
  private lastActiveAt = Date.now();
  private subscription: NativeEventSubscription | null = null;

  start(onEvent: AppLifecycleListener): void {
    this.subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (status === 'active') {
        const duration = Date.now() - this.lastActiveAt;
        onEvent('foreground', duration);
        this.lastActiveAt = Date.now();
      } else if (status === 'background') {
        this.lastActiveAt = Date.now();
        onEvent('background', 0);
      }
    });
  }

  stop(): void { this.subscription?.remove(); }
}
