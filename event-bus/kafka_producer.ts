import { Kafka, Producer, ProducerRecord } from 'kafkajs';

export class KafkaProducerService {
  private producer: Producer;

  constructor(private readonly kafka: Kafka) {
    this.producer = kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: any, key?: string): Promise<void> {
    const record: ProducerRecord = {
      topic,
      messages: [
        {
          key: key || Date.now().toString(),
          value: JSON.stringify(message),
        },
      ],
    };

    await this.producer.send(record);
  }
} 