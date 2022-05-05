export class TimeTracker {
  private startedAt: number;
  private stoppedAt: number;
  private _isRunning: boolean;

  public get isRunning(): boolean {
    return this._isRunning;
  }

  public constructor() {
    this.startedAt = 0;
    this.stoppedAt = 0;
    this._isRunning = false;
  }

  public start(): void {
    this._isRunning = true;
    this.startedAt = Date.now();
  }

  public stop(): void {
    this._isRunning = false;
    this.stoppedAt = Date.now();
  }

  public getTime(): number {
    return this.stoppedAt - this.startedAt;
  }
}
