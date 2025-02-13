import { Context } from "aws-lambda";

export interface LambdaMiddleware {
  before?(event: any, context: Context): Promise<void>;
  after?(response: any): Promise<void>;
  onError?(error: Error): Promise<void>;
}

export class LoggingMiddleware implements LambdaMiddleware {
  async before(event: any, context: Context): Promise<void> {
    console.log("Lambda execution started", {
      requestId: context.awsRequestId,
      event: event,
    });
  }

  async after(response: any): Promise<void> {
    console.log("Lambda execution completed", {
      response: response,
    });
  }

  async onError(error: Error): Promise<void> {
    console.error("Lambda execution failed", {
      error: error,
    });
  }
}

export class MetricsMiddleware implements LambdaMiddleware {
  private startTime: number = 0;``

  async before(event: any, context: Context): Promise<void> {
    this.startTime = Date.now();
  }

  async after(response: any): Promise<void> {
    const duration = Date.now() - this.startTime;
    console.log("Lambda execution metrics", {
      durationMs: duration,
      memoryUsedMB: process.memoryUsage().heapUsed / 1024 / 1024,
    });
  }
}
