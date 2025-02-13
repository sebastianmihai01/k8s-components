import { SQS } from 'aws-sdk';

export class SQSQueue {
  private sqs: SQS;

  constructor(private readonly queueUrl: string) {
    this.sqs = new SQS();
  }

  async sendMessage(message: any): Promise<SQS.SendMessageResult> {
    const params: SQS.SendMessageRequest = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(message),
    };

    return await this.sqs.sendMessage(params).promise();
  }

  async receiveMessages(maxMessages: number = 10): Promise<SQS.Message[]> {
    const params: SQS.ReceiveMessageRequest = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: maxMessages,
      WaitTimeSeconds: 20,
    };

    const result = await this.sqs.receiveMessage(params).promise();
    return result.Messages || [];
  }

  async deleteMessage(receiptHandle: string): Promise<void> {
    const params: SQS.DeleteMessageRequest = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };

    await this.sqs.deleteMessage(params).promise();
  }
} 