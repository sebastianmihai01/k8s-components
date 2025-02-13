import { Client } from '@elastic/elasticsearch';

export class ElasticsearchService {
  private client: Client;

  constructor(config: { node: string; auth?: { username: string; password: string } }) {
    this.client = new Client(config);
  }

  async indexDocument<T>(index: string, document: T, id?: string): Promise<void> {
    await this.client.index({
      index,
      id,
      document,
    });
  }

  async search<T>(index: string, query: any): Promise<T[]> {
    const result = await this.client.search({
      index,
      query,
    });

    return result.hits.hits.map((hit) => hit._source as T);
  }
} 