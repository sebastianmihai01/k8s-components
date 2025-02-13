import { SNS } from 'aws-sdk';

export class SNSNotificationService {
  private sns: SNS;

  constructor(private readonly topicArn: string) {
    this.sns = new SNS();
  }

  async publish(message: any, subject?: string): Promise<SNS.PublishResponse> {
    const params: SNS.PublishInput = {
      TopicArn: this.topicArn,
      Message: JSON.stringify(message),
      Subject: subject,
      MessageAttributes: {
        'timestamp': {
          DataType: 'String',
          StringValue: new Date().toISOString()
        }
      }
    };

    return await this.sns.publish(params).promise();
  }

  async createSubscription(protocol: string, endpoint: string): Promise<SNS.SubscribeResponse> {
    const params: SNS.SubscribeInput = {
      TopicArn: this.topicArn,
      Protocol: protocol,
      Endpoint: endpoint
    };

    return await this.sns.subscribe(params).promise();
  }
} 