import { ExponentialBackoff } from './ReconnectStrategy';
import { AppStateWatcher } from './AppStateWatcher';
import { ConnectionStatus, WSConfig, IncomingFrame } from './websocket.types';

export class OBDWebSocketService {
  private ws: WebSocket | null = null;
  private statusListeners: Array<(s: ConnectionStatus) => void> = [];
  private messageListeners: Array<(f: IncomingFrame) => void> = [];

  constructor(
    private readonly config: WSConfig,
    private readonly backoff: ExponentialBackoff = new ExponentialBackoff(),
    private readonly appStateWatcher: AppStateWatcher = new AppStateWatcher(),
  ) {}

  connect(): void {
    this._setStatus(ConnectionStatus.CONNECTING);
    this.ws = new WebSocket(this._buildUrl());
    this.ws.onopen = () => this._onOpen();
    this.ws.onmessage = (e) => this._onMessage(e);
    this.ws.onclose = () => this._onClose();
    this.ws.onerror = () => this._setStatus(ConnectionStatus.ERROR);

    this.appStateWatcher.start((event, duration) => {
      if (event === 'foreground' && duration > 10_000) this._forceReconnect();
    });
  }

  disconnect(): void {
    this.appStateWatcher.stop();
    this.ws?.close();
    this.ws = null;
    this._setStatus(ConnectionStatus.DISCONNECTED);
  }

  onMessage(cb: (frame: IncomingFrame) => void): void { this.messageListeners.push(cb); }
  onStatusChange(cb: (status: ConnectionStatus) => void): void { this.statusListeners.push(cb); }

  private _buildUrl(): string {
    return `${this.config.baseUrl}/ws/telemetry/${this.config.sessionId}?token=${this.config.token}`;
  }

  private _onOpen(): void {
    this.backoff.reset();
    this._setStatus(ConnectionStatus.CONNECTED);
  }

  private _onMessage(event: MessageEvent): void {
    try {
      const frame = JSON.parse(event.data) as IncomingFrame;
      this.messageListeners.forEach(cb => cb(frame));
    } catch {  }
  }

  private _onClose(): void {
    if (this.backoff.hasExceededLimit()) {
      this._setStatus(ConnectionStatus.ERROR);
      return;
    }
    this._setStatus(ConnectionStatus.RECONNECTING);
    setTimeout(() => this.connect(), this.backoff.nextDelayMs());
  }

  private _forceReconnect(): void {
    this.ws?.close();
  }

  private _setStatus(status: ConnectionStatus): void {
    this.statusListeners.forEach(cb => cb(status));
  }
}
