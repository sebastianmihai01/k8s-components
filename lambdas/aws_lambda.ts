import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

export interface LambdaConfig {
  timeout?: number;
  memorySize?: number;
  environment?: Record<string, string>;
}

export interface BaseLambdaHandler<T = any, R = any> {
  execute(event: T, context: Context): Promise<R>;
}

export abstract class ApiGatewayLambdaHandler
  implements BaseLambdaHandler<APIGatewayEvent, APIGatewayProxyResult>
{
  protected config: LambdaConfig;

  constructor(config: LambdaConfig = {}) {
    this.config = {
      timeout: 30,
      memorySize: 128,
      ...config,
    };
  }

  public async handler(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    try {
      return await this.execute(event, context);
    } catch (error) {
      return this.handleError(error);
    }
  }

  abstract execute(
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult>;

  protected handleError(error: any): APIGatewayProxyResult {
    console.error("Lambda execution error:", error);

    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message: error.message || "Internal Server Error",
        errorCode: error.code || "INTERNAL_ERROR",
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  protected createResponse(
    statusCode: number,
    body: any
  ): APIGatewayProxyResult {
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
}
