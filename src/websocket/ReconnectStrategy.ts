export interface ReconnectStrategy {
  nextDelayMs(): number;
  reset(): void;
  hasExceededLimit(): boolean;
}

export class ExponentialBackoff implements ReconnectStrategy {
  private attempt = 0;

  constructor(
    private readonly initialMs = 1000,
    private readonly maxMs = 30_000,
    private readonly multiplier = 2,
    private readonly maxAttempts = 10,
  ) {}

  nextDelayMs(): number {
    const delay = Math.min(this.initialMs * this.multiplier ** this.attempt, this.maxMs);
    this.attempt++;
    return delay;
  }

  reset(): void { this.attempt = 0; }

  hasExceededLimit(): boolean { return this.attempt >= this.maxAttempts; }
}
