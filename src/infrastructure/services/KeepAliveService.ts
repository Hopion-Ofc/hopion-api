export class KeepAliveService {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly pingInterval = 10 * 60 * 1000; 

  constructor(private readonly baseUrl: string) {}

  start(): void {
    if (this.intervalId) {
      console.log('⚠️  KeepAlive service already running');
      return;
    }

    this.ping();

    this.intervalId = setInterval(() => {
      this.ping();
    }, this.pingInterval);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('🛑 KeepAlive service stopped');
    }
  }

  private async ping(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      const data = await response.json();
      console.log(`✅ Ping successful at ${new Date().toLocaleTimeString('pt-BR')}`, data);
    } catch (error) {
      console.error('❌ Ping failed:', error);
    }
  }
}
