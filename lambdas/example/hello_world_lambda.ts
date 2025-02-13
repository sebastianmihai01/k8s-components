import { APIGatewayEvent, Context } from "aws-lambda";
import { ApiGatewayLambdaHandler, LambdaConfig } from "../aws_lambda";

export class HelloWorldLambda extends ApiGatewayLambdaHandler {
  constructor() {
    const config: LambdaConfig = {
      timeout: 10,
      memorySize: 128,
      environment: {
        STAGE: process.env.STAGE || "dev",
      },
    };
    super(config);
  }

  async execute(event: APIGatewayEvent, context: Context) {
    const name = event.queryStringParameters?.name || "World";

    return this.createResponse(200, {
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
    });
  }
}

// Lambda handler function
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const lambda = new HelloWorldLambda();
  return await lambda.handler(event, context);
};
